interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  dark = false,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";
  const titleColor = dark ? "text-white" : "text-black";
  const subtitleColor = dark ? "text-neutral-400" : "text-neutral-600";

  return (
    <div className={`${alignClass} mb-8`}>
      {eyebrow && (
        <div className={`mb-2.5 ${align === "center" ? "flex justify-center" : ""}`}>
          <span
            className={`inline-block px-3 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
              dark
                ? "bg-neutral-800 text-neutral-300 border border-neutral-700"
                : "bg-neutral-100 text-neutral-800 border border-neutral-200/60"
            }`}
            style={{
              fontFamily: "'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif",
            }}
          >
            {eyebrow}
          </span>
        </div>
      )}
      <h2
        className={`${titleColor} text-2xl sm:text-3xl font-bold tracking-[-0.025em] leading-[1.25]`}
        style={{
          fontFamily: "'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif",
          fontWeight: 700,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-2.5 text-sm sm:text-base max-w-2xl leading-relaxed font-normal ${subtitleColor} ${
            align === "center" ? "mx-auto" : ""
          }`}
          style={{
            fontFamily: "'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
