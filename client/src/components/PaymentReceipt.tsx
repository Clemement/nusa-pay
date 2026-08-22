/**
 * NusaPay / Batik Ledger — Receipt rail presents verifiable data as a compact,
 * right-aligned operational record rather than decorative blockchain telemetry.
 */
import { Check, Copy, ExternalLink, Fingerprint, LoaderCircle, Route, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { shortAddress } from "@/lib/solana";

type PaymentReceiptProps = {
  reference: string;
  signature: string | null;
  isFinding: boolean;
  onCopy: (value: string, label: string) => void;
  onCheck: () => void;
};

export function PaymentReceipt({
  reference,
  signature,
  isFinding,
  onCopy,
  onCheck,
}: PaymentReceiptProps) {
  const explorerUrl = signature
    ? `https://explorer.solana.com/tx/${signature}?cluster=devnet`
    : null;

  return (
    <aside className="receipt-rail">
      <div className="rail-heading">
        <span className="eyebrow">Settlement proof</span>
        <span className={signature ? "stamp stamp-verified" : "stamp stamp-pending"}>
          {signature ? "Verified" : "Awaiting"}
        </span>
      </div>

      <div className="rail-track">
        <div className="rail-step rail-step-active">
          <span className="rail-icon"><Route size={15} strokeWidth={2.25} /></span>
          <div>
            <p>Request routed</p>
            <span>Unique public reference created</span>
          </div>
        </div>
        <div className={signature ? "rail-step rail-step-active" : "rail-step"}>
          <span className="rail-icon">
            {signature ? <Check size={15} strokeWidth={2.75} /> : <Fingerprint size={15} strokeWidth={2.25} />}
          </span>
          <div>
            <p>{signature ? "Devnet confirmed" : "Wallet signature"}</p>
            <span>{signature ? "Payment matches a public transaction" : "Sign the USDC transfer in your wallet"}</span>
          </div>
        </div>
        <div className={signature ? "rail-step rail-step-active rail-step-final" : "rail-step rail-step-final"}>
          <span className="rail-icon"><ShieldCheck size={15} strokeWidth={2.25} /></span>
          <div>
            <p>Receipt shared</p>
            <span>{signature ? "Explorer-ready proof, no NusaPay login" : "Available once Devnet confirms"}</span>
          </div>
        </div>
      </div>

      <div className="proof-block">
        <div className="proof-row">
          <span>Reference</span>
          <button onClick={() => onCopy(reference, "Reference")} className="proof-copy" title="Copy payment reference">
            <code>{shortAddress(reference, 6)}</code><Copy size={13} />
          </button>
        </div>
        <div className="proof-row">
          <span>Network</span>
          <strong>Solana Devnet</strong>
        </div>
        <div className="proof-row">
          <span>Asset</span>
          <strong>USDC · SPL</strong>
        </div>
      </div>

      {signature ? (
        <a className="receipt-link" href={explorerUrl ?? "#"} target="_blank" rel="noreferrer">
          Open verified receipt <ExternalLink size={15} />
        </a>
      ) : (
        <Button onClick={onCheck} variant="outline" className="check-button" disabled={isFinding}>
          {isFinding ? <LoaderCircle className="animate-spin" size={16} /> : <Fingerprint size={16} />}
          {isFinding ? "Checking Devnet…" : "Check Devnet receipt"}
        </Button>
      )}
    </aside>
  );
}
