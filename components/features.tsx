import { CycleMock, IntakeMock, ProjectMock, ReviewMock } from "./mocks";

export function Features() {
  return (
    <section className="border-t border-line py-20 lg:py-28" aria-labelledby="features-title">
      <div className="mx-auto max-w-[1120px] px-5">
        <h2
          id="features-title"
          className="display max-w-[16ch] text-[clamp(2.1rem,4vw,3.35rem)]"
        >
          The week has four shapes.
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-mute">
          Intake, cycles, projects, and reviews share one model. You should not be reconciling
          four tools on Friday afternoon.
        </p>

        <div id="intake" className="mt-16 grid scroll-mt-24 items-center gap-10 lg:grid-cols-2">
          <div>
            <h3 className="text-[1.7rem] tracking-[-0.035em]">A thread becomes an issue.</h3>
            <p className="mt-4 max-w-md leading-relaxed text-mute">
              Keel watches the channels you choose, drafts the issue, and drops it in the right
              team’s triage. Labels come from the words people already used. You can see the
              draft before it lands.
            </p>
          </div>
          <IntakeMock />
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-0">
          <div id="cycles" className="scroll-mt-24 border-t border-line pt-8 lg:col-span-7 lg:pr-14">
            <h3 className="text-[1.7rem] tracking-[-0.035em]">A cycle is a promise with a date.</h3>
            <p className="mt-4 max-w-md leading-relaxed text-mute">
              Two weeks, a scope, and a count that does not hide the leftovers. Unfinished work
              rolls forward in the open. It does not vanish into a filter named later.
            </p>
            <CycleMock />
          </div>
          <div
            id="projects"
            className="scroll-mt-24 border-t border-line pt-8 lg:col-span-5 lg:border-l lg:pl-12"
          >
            <h3 className="text-[1.7rem] tracking-[-0.035em]">The roadmap is the work, in order.</h3>
            <p className="mt-4 leading-relaxed text-mute">
              A project is a bet: an outcome, an owner, and the issues that serve it. There is
              no second deck to keep honest.
            </p>
            <ProjectMock />
          </div>
        </div>
      </div>

      <div id="reviews" className="mt-16 scroll-mt-24 border-y border-line bg-panel">
        <div className="mx-auto grid max-w-[1120px] gap-10 px-5 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <h3 className="text-[1.7rem] tracking-[-0.035em]">The diff sits on the issue.</h3>
            <p className="mt-4 max-w-md leading-relaxed text-mute">
              Pull requests stay next to the reason they exist. The summary, the decision, and
              the argument live together, so review is not a hunt across tabs.
            </p>
          </div>
          <ReviewMock />
        </div>
      </div>
    </section>
  );
}
