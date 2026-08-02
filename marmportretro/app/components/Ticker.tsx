export default function Ticker({ items }: { items: string[] }) {
  const line = items.join(" ★ ") + " ★ ";
  return (
    <div className="ticker" aria-hidden="true">
      <span>{line + line}</span>
    </div>
  );
}