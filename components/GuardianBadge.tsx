import { CheckCircle2, ShieldCheck } from "lucide-react";

export function GuardianBadge({ compact = false }: { compact?: boolean }) {
  return <div className={`guardian-badge ${compact ? "compact" : ""}`}>
    <ShieldCheck size={compact ? 16 : 20} strokeWidth={1.8} />
    <span><b>Guardian verified</b>{!compact && <small>Trust &amp; validation layer</small>}</span>
    <CheckCircle2 size={compact ? 13 : 15} strokeWidth={2.2} />
  </div>;
}
