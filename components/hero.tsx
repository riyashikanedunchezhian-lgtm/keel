"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { HeroBoard } from "./mocks";

// Tuned by eye. Words first, then the actions, then the product.
// Nothing else on the page animates on load.
const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  const step = (delay: number, y = 18) =>
    reduce
      ? {
          initial: false as const,
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0 },
        }
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, delay, ease },
        };

  return (
    <section className="mx-auto grid max-w-[1120px] items-center gap-12 overflow-x-clip px-5 pb-10 pt-12 lg:grid-cols-[0.9fr_1.1fr] lg:pb-20 lg:pt-16">
      <div>
        <motion.h1
          className="display hero-reveal text-[clamp(2.75rem,5.2vw,4.7rem)]"
          {...step(0.04)}
        >
          A quieter home for product work.
        </motion.h1>
        <motion.p
          className="hero-reveal mt-6 max-w-md text-lg leading-relaxed text-mute"
          {...step(0.2, 12)}
        >
          Keel keeps issues, projects, and cycles in one fast workspace. Open it, say what
          changed, and go back to building.
        </motion.p>
        <motion.div className="hero-reveal mt-8 flex flex-wrap gap-3" {...step(0.34, 10)}>
          <Link className="btn btn-amber" href="/signup">
            Start a workspace
          </Link>
          <Link className="btn btn-quiet" href="/#pricing">
            See pricing
          </Link>
        </motion.div>
      </div>
      <motion.div
        className="hero-reveal"
        {...(reduce
          ? {
              initial: false as const,
              animate: { opacity: 1, y: 0, scale: 1 },
              transition: { duration: 0 },
            }
          : {
              initial: { opacity: 0, y: 36, scale: 0.975 },
              animate: { opacity: 1, y: 0, scale: 1 },
              transition: { duration: 0.95, delay: 0.46, ease },
            })}
      >
        <HeroBoard />
      </motion.div>
    </section>
  );
}
