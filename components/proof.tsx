const teams = [
  "Halcyon",
  "Northwind Supply",
  "Parcel & Rye",
  "Lowroom",
  "Marlowe",
  "Fieldwork",
  "Sable Health",
  "Kite Co",
];

const notes = [
  "Halcyon cut standup from twenty-five minutes to ten.",
  "Parcel & Rye retired the roadmap deck.",
  "Lowroom’s new hires stop asking where the work lives.",
];

export function Proof() {
  return (
    <section id="customers" className="scroll-mt-24 py-20 lg:py-28" aria-labelledby="customers-title">
      <div className="mx-auto max-w-[1120px] px-5">
        <h2 id="customers-title" className="display max-w-[14ch] text-[clamp(2.1rem,4vw,3.35rem)]">
          Teams that already had a tracker.
        </h2>
        <ul className="mt-12 flex flex-wrap gap-x-10 gap-y-4" aria-label="Teams using Keel">
          {teams.map((team) => (
            <li key={team} className="text-lg tracking-[-0.03em] text-mute">
              {team}
            </li>
          ))}
        </ul>
        <figure className="mt-14 max-w-3xl border-t border-line pt-8">
          <blockquote className="text-[1.65rem] leading-snug tracking-[-0.03em] text-paper">
            We deleted the roadmap spreadsheet in the second week. The project list was already
            the truth, and it updates when the issues do.
          </blockquote>
          <figcaption className="mt-5 text-mute">Nia Okonkwo, Head of Product, Halcyon</figcaption>
        </figure>
        <ul className="mt-10 grid gap-4 border-t border-line pt-8 md:grid-cols-3">
          {notes.map((note) => (
            <li key={note} className="text-mute md:pr-6">
              {note}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
