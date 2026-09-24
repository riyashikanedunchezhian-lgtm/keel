const issues = [
  {
    id: "ENG-184",
    title: "Render the list before sync finishes",
    state: "In progress",
    who: "Mira",
    hot: true,
  },
  {
    id: "ENG-191",
    title: "Burndown should ignore weekends",
    state: "Todo",
    who: "Jules",
    hot: false,
  },
  {
    id: "ENG-176",
    title: "Guest access on shared projects",
    state: "In review",
    who: "Anil",
    hot: false,
  },
  {
    id: "ENG-203",
    title: "Slack intake drops the second attachment",
    state: "Todo",
    who: "Priya",
    hot: false,
  },
  {
    id: "ENG-168",
    title: "Cycle name belongs in the tab title",
    state: "Done",
    who: "Mira",
    hot: false,
  },
];

export function HeroBoard() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-6 bg-[radial-gradient(ellipse_at_60%_40%,rgba(228,162,60,0.2),transparent_62%)]"
      />
      <div className="relative overflow-hidden rounded-2xl border border-line bg-[#101012]">
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-paper">Core</span>
            <span className="text-mute">/</span>
            <span className="text-mute">Cycle 18</span>
          </div>
          <span className="text-sm text-mute">12 open</span>
        </div>
        <ul>
          {issues.map((issue) => (
            <li
              key={issue.id}
              className={`grid grid-cols-[14px_minmax(0,1fr)] items-start gap-x-3 gap-y-1 border-t border-line px-4 py-3 sm:grid-cols-[14px_minmax(0,1fr)_auto] ${
                issue.hot ? "bg-[#18160f]" : ""
              }`}
            >
              <span
                className={`mt-1.5 h-3.5 w-3.5 rounded-full border ${
                  issue.hot ? "border-amber bg-amber/20" : "border-mute/50"
                }`}
                aria-hidden
              />
              <span className="min-w-0">
                <span className="mr-2 text-mute">{issue.id}</span>
                <span className={issue.state === "Done" ? "text-mute" : "text-paper"}>
                  {issue.title}
                </span>
              </span>
              <span className="col-start-2 text-sm text-mute sm:col-start-auto sm:text-right">
                <span className={issue.hot ? "text-amber" : undefined}>{issue.state}</span>
                <span className="mx-2 text-line">/</span>
                {issue.who}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between border-t border-line px-4 py-2.5 text-sm text-mute">
          <span>
            <kbd>C</kbd> <span className="ml-1">to file an issue</span>
          </span>
          <span>Cycle 18 ends Friday</span>
        </div>
      </div>
    </div>
  );
}

export function IntakeMock() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-[#101012]">
      <div className="border-b border-line px-4 py-3 text-sm text-mute">#ios, this morning</div>
      <div className="space-y-4 px-4 py-4 text-[15px] leading-relaxed">
        <p>
          <span className="text-paper">Lena</span>{" "}
          <span className="text-mute">
            Cold start still waits on a full sync. The shell could paint first.
          </span>
        </p>
        <p>
          <span className="text-paper">Didier</span>{" "}
          <span className="text-mute">Agreed. I’ll take it if someone files the issue.</span>
        </p>
        <p>
          <span className="text-paper">Andreas</span>{" "}
          <span className="text-mute">Filing it into Core, cycle 18.</span>
        </p>
      </div>
      <div className="border-t border-line bg-[#18160f] px-4 py-4">
        <p className="text-sm text-amber">Drafted into Core</p>
        <p className="mt-1 text-paper">Paint the home shell before sync finishes</p>
        <p className="mt-1 text-sm text-mute">Assigned to Didier. Label: performance.</p>
      </div>
    </div>
  );
}

export function CycleMock() {
  return (
    <div className="mt-8">
      <div className="flex h-3 overflow-hidden rounded-full bg-[#1c1b19]">
        <div className="h-full w-[68%] bg-amber" />
        <div className="h-full w-[22%] bg-[#3a3833]" />
        <div className="h-full w-[10%] bg-[#5c4630]" />
      </div>
      <dl className="mt-4 grid grid-cols-3 gap-3 text-sm">
        <div>
          <dt className="text-mute">Done</dt>
          <dd className="text-paper">18</dd>
        </div>
        <div>
          <dt className="text-mute">Still open</dt>
          <dd className="text-paper">6</dd>
        </div>
        <div>
          <dt className="text-mute">Rolled in</dt>
          <dd className="text-paper">2</dd>
        </div>
      </dl>
      <ul className="mt-5 space-y-2 text-sm text-mute">
        <li className="text-paper">ENG-191 Burndown should ignore weekends</li>
        <li>ENG-203 Slack intake drops the second attachment</li>
      </ul>
    </div>
  );
}

const projects = [
  { name: "UI refresh", state: "On track", team: "Core" },
  { name: "Guest accounts", state: "At risk", team: "Platform" },
  { name: "Offline drafts", state: "Not started", team: "Mobile" },
];

export function ProjectMock() {
  return (
    <ul className="mt-6 border-t border-line">
      {projects.map((project) => (
        <li
          key={project.name}
          className="flex items-baseline justify-between gap-4 border-b border-line py-3"
        >
          <span>
            <span className="text-paper">{project.name}</span>
            <span className="mt-0.5 block text-sm text-mute">{project.team}</span>
          </span>
          <span className={project.state === "At risk" ? "text-sm text-amber" : "text-sm text-mute"}>
            {project.state}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function ReviewMock() {
  return (
    <div>
      <p className="text-sm text-mute">ENG-184, pull request 482</p>
      <p className="mt-2 text-lg text-paper">Replace the blocking spinner on the home screen</p>
      <ul className="mt-4 space-y-2 text-mute">
        <li>The shell renders before vehicle state is fully synced.</li>
        <li>The dashboard receives sync status instead of a boolean.</li>
        <li>First paint is logged, so we can tell if this stuck.</li>
      </ul>
      <p className="mt-5 border-t border-line pt-4 text-paper">
        Anil: Can we keep the log for a cycle before we trust the number?
      </p>
    </div>
  );
}
