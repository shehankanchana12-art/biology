import { useState } from "react";
import { motion } from "framer-motion";
import { Check, CircleHelp, RotateCcw, X } from "lucide-react";
import type { QuizQuestion } from "../data/types";

const letters = ["A", "B", "C", "D", "E"];

export function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const attempt = (qi: number, oi: number) => {
    if (checked[qi]) return;
    setAnswers((a) => ({ ...a, [qi]: oi }));
    setChecked((c) => ({ ...c, [qi]: true }));
  };

  const score = questions.reduce(
    (s, q, i) => (checked[i] && answers[i] === q.answer ? s + 1 : s),
    0
  );
  const allDone = questions.every((_, i) => checked[i]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <CircleHelp size={14} className="text-lab-teal" />
          <span>ස්වයං-ඇගයීම් ප්‍රශ්න</span>
        </div>
        {allDone && (
          <span className="rounded-full border border-lab-teal/30 bg-lab-teal/10 px-2.5 py-1 text-[11px] font-semibold text-lab-teal">
            {score} / {questions.length}
          </span>
        )}
      </div>

      {questions.map((q, qi) => {
        const chosen = answers[qi];
        const isChecked = checked[qi];
        const correct = chosen === q.answer;
        return (
          <div key={qi} className="rounded-xl border border-white/10 bg-ink-900/60 p-3.5">
            <p className="si-body text-[13px] font-medium text-slate-100">
              <span className="mr-1.5 text-lab-teal">{qi + 1}.</span>
              {q.q}
            </p>
            <div className="mt-3 space-y-1.5">
              {q.options.map((opt, oi) => {
                const selected = chosen === oi;
                const right = isChecked && oi === q.answer;
                const wrong = isChecked && selected && !correct;
                return (
                  <button
                    key={oi}
                    onClick={() => attempt(qi, oi)}
                    className={[
                      "flex w-full items-start gap-2 rounded-lg border px-2.5 py-2 text-left text-[12px] transition",
                      right
                        ? "border-emerald-400/60 bg-emerald-400/10 text-emerald-100"
                        : wrong
                          ? "border-rose-400/60 bg-rose-400/10 text-rose-100"
                          : "border-white/10 bg-white/[0.02] text-slate-300 hover:border-white/25 hover:bg-white/[0.06]",
                      isChecked ? "cursor-default" : "cursor-pointer",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "mt-[1px] grid h-4 w-4 shrink-0 place-items-center rounded-full border text-[9px] font-bold",
                        right
                          ? "border-emerald-300 bg-emerald-400 text-emerald-950"
                          : wrong
                            ? "border-rose-300 bg-rose-400 text-rose-950"
                            : "border-white/25 text-slate-400",
                      ].join(" ")}
                    >
                      {right ? <Check size={9} /> : wrong ? <X size={9} /> : letters[oi]}
                    </span>
                    <span className="si-body leading-relaxed">{opt}</span>
                  </button>
                );
              })}
            </div>
            {isChecked && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="overflow-hidden"
              >
                <div className="mt-2.5 rounded-lg border-l-2 border-lab-teal/70 bg-lab-teal/[0.06] px-3 py-2">
                  <p className="si-body text-[11.5px] leading-relaxed text-slate-300">
                    <span className="font-semibold text-lab-teal">
                      {correct ? "නිවැරදියි! " : "නිවැරදි පිළිතුර: "}
                    </span>
                    {q.explain}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        );
      })}

      {allDone && (
        <button
          onClick={() => {
            setAnswers({});
            setChecked({});
          }}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-white/10 py-2 text-[11px] text-slate-400 transition hover:border-white/25 hover:text-white"
        >
          <RotateCcw size={12} /> නැවත උත්සාහ කරන්න
        </button>
      )}
    </div>
  );
}
