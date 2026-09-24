import { randomBytes, scrypt, timingSafeEqual, createHash } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { plans } from "./plans";

const FILE = path.join(process.cwd(), "data", "accounts.json");
const KEY_LEN = 32;
const SCRYPT = { N: 16384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 } as const;
const SESSION_MS = 1000 * 60 * 60 * 24 * 14;

export const SESSION_COOKIE = "keel_session";

export type PublicAccount = {
  email: string;
  workspace: string;
  plan: string;
  createdAt: string;
};

type Account = PublicAccount & {
  id: string;
  passwordHash: string;
  salt: string;
};

type Session = {
  tokenHash: string;
  accountId: string;
  expiresAt: string;
};

type Db = {
  accounts: Account[];
  sessions: Session[];
};

const empty = (): Db => ({ accounts: [], sessions: [] });

let queue: Promise<unknown> = Promise.resolve();

function locked<T>(work: (db: Db) => Promise<T>): Promise<T> {
  const run = queue.then(() => workThrough(work));
  queue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

async function workThrough<T>(work: (db: Db) => Promise<T>): Promise<T> {
  const db = await readDb();
  const result = await work(db);
  await writeDb(db);
  return result;
}

async function readDb(): Promise<Db> {
  try {
    const raw = await readFile(FILE, "utf8");
    const parsed = JSON.parse(raw) as Db;
    if (!Array.isArray(parsed.accounts) || !Array.isArray(parsed.sessions)) return empty();
    return parsed;
  } catch {
    return empty();
  }
}

async function writeDb(db: Db) {
  await mkdir(path.dirname(FILE), { recursive: true });
  const tmp = `${FILE}.${process.pid}.tmp`;
  await writeFile(tmp, JSON.stringify(db, null, 2), "utf8");
  await rename(tmp, FILE);
}

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function scryptHash(password: string, salt: Buffer) {
  return new Promise<Buffer>((resolve, reject) => {
    scrypt(password, salt, KEY_LEN, SCRYPT, (error, key) => {
      if (error) reject(error);
      else resolve(key);
    });
  });
}

export function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export function looksLikeEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

export function planId(value: string | undefined) {
  return plans.find((plan) => plan.id === value)?.id ?? "free";
}

function publicOf(account: Account): PublicAccount {
  return {
    email: account.email,
    workspace: account.workspace,
    plan: account.plan,
    createdAt: account.createdAt,
  };
}

function prune(db: Db) {
  const now = Date.now();
  db.sessions = db.sessions.filter((session) => Date.parse(session.expiresAt) > now);
}

export async function createAccount(input: {
  workspace: string;
  email: string;
  password: string;
  plan: string;
}) {
  const email = normalizeEmail(input.email);
  const workspace = input.workspace.trim();
  if (workspace.length < 2 || workspace.length > 80) {
    return { ok: false as const, status: 400, error: "Give the workspace a name the team will recognize." };
  }
  if (!looksLikeEmail(email)) {
    return { ok: false as const, status: 400, error: "Enter a work email like you@company.com." };
  }
  if (input.password.length < 8 || input.password.length > 128) {
    return { ok: false as const, status: 400, error: "Passwords in Keel are at least 8 characters." };
  }
  if (input.password.toLowerCase() === email) {
    return { ok: false as const, status: 400, error: "Use a password that is not the email." };
  }

  const salt = randomBytes(16);
  const passwordHash = (await scryptHash(input.password, salt)).toString("hex");
  const token = randomBytes(32).toString("hex");

  const created = await locked(async (db) => {
    prune(db);
    if (db.accounts.some((account) => account.email === email)) {
      return null;
    }
    const account: Account = {
      id: randomBytes(16).toString("hex"),
      email,
      workspace,
      plan: planId(input.plan),
      passwordHash,
      salt: salt.toString("hex"),
      createdAt: new Date().toISOString(),
    };
    db.accounts.push(account);
    db.sessions.push({
      tokenHash: hashToken(token),
      accountId: account.id,
      expiresAt: new Date(Date.now() + SESSION_MS).toISOString(),
    });
    return publicOf(account);
  });

  if (!created) {
    return { ok: false as const, status: 409, error: "That email already has a workspace. Log in instead." };
  }
  return { ok: true as const, account: created, token };
}

export async function loginAccount(emailInput: string, password: string) {
  const email = normalizeEmail(emailInput);
  const token = randomBytes(32).toString("hex");

  const account = await locked(async (db) => {
    prune(db);
    const found = db.accounts.find((item) => item.email === email);
    const salt = Buffer.from(found?.salt ?? "00".repeat(16), "hex");
    const actual = await scryptHash(password, salt.length === 16 ? salt : randomBytes(16));
    const expected = Buffer.from(found?.passwordHash ?? "00".repeat(KEY_LEN), "hex");
    const same =
      Boolean(found) &&
      expected.length === actual.length &&
      timingSafeEqual(expected, actual);
    if (!found || !same) return null;
    db.sessions.push({
      tokenHash: hashToken(token),
      accountId: found.id,
      expiresAt: new Date(Date.now() + SESSION_MS).toISOString(),
    });
    return publicOf(found);
  });

  if (!account) {
    return { ok: false as const, status: 401, error: "Email or password is wrong." };
  }
  return { ok: true as const, account, token };
}

export async function accountFromToken(token: string | undefined) {
  if (!token) return null;
  const tokenHash = hashToken(token);
  return locked(async (db) => {
    prune(db);
    const session = db.sessions.find((item) => item.tokenHash === tokenHash);
    if (!session) return null;
    const account = db.accounts.find((item) => item.id === session.accountId);
    return account ? publicOf(account) : null;
  });
}

export async function logoutToken(token: string | undefined) {
  if (!token) return;
  const tokenHash = hashToken(token);
  await locked(async (db) => {
    db.sessions = db.sessions.filter((session) => session.tokenHash !== tokenHash);
  });
}

export const sessionCookie = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_MS / 1000,
};
