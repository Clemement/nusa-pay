/** NusaPay / Batik Ledger — Brand knot remains a clear, practical receipt mark. */
import { cn } from "@/lib/utils";

type NusaMarkProps = { className?: string; label?: boolean };

export function NusaMark({ className, label = true }: NusaMarkProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <img
        src="/manus-storage/nusapay-logo_7a7492b9.png"
        alt="NusaPay payment knot"
        className="h-10 w-10 object-contain"
      />
      {label ? (
        <span className="font-display text-[1.45rem] tracking-[-0.06em] text-ink">NusaPay</span>
      ) : null}
    </div>
  );
}
