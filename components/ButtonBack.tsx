import { IconBack } from "./icons/IconBack";

export default function ButtonBack({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="outline"
      onClick={onClick}
      aria-label="Back"
      style={{ display: "inline-flex", alignItems: "center", gap: 5 }}
    >
      <IconBack />
      Back
    </button>
  );
}
