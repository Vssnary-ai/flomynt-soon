interface SectionLabelProps {
  text: string;
}

export default function SectionLabel({ text }: SectionLabelProps) {
  return (
    <span className="mono-label" style={{ color: "var(--text-secondary)" }}>
      [ {text} ]
    </span>
  );
}
