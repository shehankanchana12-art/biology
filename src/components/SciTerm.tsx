import { useApp } from "../lib/store";

export function SciTerm({ en, className = "" }: { en: string; className?: string }) {
  const { bilingual } = useApp();
  return (
    <span
      title={en}
      className={[
        "inline-flex shrink-0 translate-y-[-1px] items-center rounded border border-sky-400/25 bg-sky-400/10 px-1.5 py-[1px] align-middle",
        "font-sans text-[10px] font-medium italic leading-tight tracking-wide text-sky-300/90",
        bilingual ? "inline-flex" : "hidden group-hover:inline-flex",
        className,
      ].join(" ")}
    >
      {en}
    </span>
  );
}

export function TermLine({
  si,
  en,
  className = "",
}: {
  si: string;
  en: string;
  className?: string;
}) {
  return (
    <span className={`group inline-flex flex-wrap items-center gap-1.5 ${className}`}>
      <span>{si}</span>
      <SciTerm en={en} />
    </span>
  );
}
