export type DocBlock =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "keys"; rows: { keys: string; does: string }[] };

export type Doc = {
  slug: string;
  title: string;
  summary: string;
  blocks: DocBlock[];
};

export const docs: Doc[] = [
  {
    slug: "getting-started",
    title: "Getting started",
    summary: "Make one team, file ten real issues, and leave the sample data alone.",
    blocks: [
      {
        kind: "p",
        text: "Keel is organized around teams. A team owns a backlog, a cycle, and the projects it is actually betting on. That is the whole map.",
      },
      {
        kind: "h2",
        text: "Start smaller than you want to",
      },
      {
        kind: "list",
        items: [
          "Create a workspace and invite the people who already talk about the work.",
          "Make one team. Name it the way you already speak: Core, Mobile, Platform. Skip the org chart.",
          "File ten real issues. If you cannot find ten, you do not need a tracker yet.",
          "Put this week’s work in a cycle. Leave the rest in the backlog, untitled by status theater.",
        ],
      },
      {
        kind: "p",
        text: "A new teammate should be able to open the current cycle and tell what the team is doing. If they need a tour, the structure is wrong, not the teammate.",
      },
    ],
  },
  {
    slug: "keyboard",
    title: "Keyboard",
    summary: "The shortcuts that cover a normal day, and the ones we left out on purpose.",
    blocks: [
      {
        kind: "p",
        text: "Keel is keyboard-first. The mouse still works. You should not need it to create an issue, move it, or get back to the cycle you were just in.",
      },
      {
        kind: "keys",
        rows: [
          { keys: "C", does: "Create an issue" },
          { keys: "X", does: "Select the issue under the cursor" },
          { keys: "G then I", does: "Go to triage" },
          { keys: "G then C", does: "Go to the current cycle" },
          { keys: "/", does: "Filter the list you are looking at" },
          { keys: "Cmd Enter", does: "Save the issue you are editing" },
        ],
      },
      {
        kind: "p",
        text: "We do not bind a shortcut for every setting. If a command is rare, it can live in the menu. The keyboard is for the loop you repeat.",
      },
    ],
  },
  {
    slug: "cycles",
    title: "Cycles",
    summary: "A start, an end, and unfinished work that moves in the open.",
    blocks: [
      {
        kind: "p",
        text: "A cycle has a start, an end, and a scope. Two weeks is the default because most teams already plan that way. Change it if you have a real reason, not a preference for tidiness.",
      },
      {
        kind: "h2",
        text: "What happens on the last day",
      },
      {
        kind: "p",
        text: "Keel does not silently roll unfinished issues into the next cycle. On the last day you choose: finish, or move. Moved work shows up on the next cycle as rolled in, with the issue that carried it.",
      },
      {
        kind: "list",
        items: [
          "Done stays done. It does not linger in the count to flatter the chart.",
          "Rolled-in work is labeled so the next cycle’s scope is honest.",
          "Weekends are not counted in the burndown unless your team actually works them.",
        ],
      },
    ],
  },
  {
    slug: "triage",
    title: "Triage rules",
    summary: "Route an issue when it is created. If a rule fires, you can see which one.",
    blocks: [
      {
        kind: "p",
        text: "Rules look at the title and at the channel an issue came from. A rule can set the team, a label, and an assignee. They run when the issue is created.",
      },
      {
        kind: "list",
        items: [
          "If two rules match, the one higher in your list wins.",
          "The issue records which rule fired. There is no hidden score.",
          "A rule that assigns a person who is out is skipped, and the issue stays in triage.",
        ],
      },
      {
        kind: "p",
        text: "Triage is a queue, not a status you leave on for a month. If it grows past a few days of intake, the rules are wrong or the team is understaffed. Keel will not pretend otherwise.",
      },
    ],
  },
];

export function findDoc(slug: string) {
  return docs.find((doc) => doc.slug === slug);
}
