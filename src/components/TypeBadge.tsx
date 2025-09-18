interface TypeBadgeProps {
  type: string;
  label: string;
  variant?: "small" | "medium" | "large";
}

const TypeBadge = ({ type, label, variant = "small" }: TypeBadgeProps) => {
  const base = `text-white font-light text-center
  }`;
  const sizeClass = {
    small: "inline-block self-start text-12 py-6 px-8 rounded-5",
    medium:
      "flex justify-center items-center shrink-0 w-full max-w-200 h-50 rounded-15 text-14 sm:text-16",
    large:
      "flex justify-center items-center w-full h-120 rounded-15 text-24 md:text-28",
  }[variant];

  return (
    <div
      className={`${base} ${sizeClass}`}
      style={{ backgroundColor: `var(--${type}-wine)` }}
    >
      <span>{label}</span>
    </div>
  );
};

export default TypeBadge;
