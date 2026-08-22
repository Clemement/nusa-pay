/**
 * NusaPay / Batik Ledger — The payment request is the dominant field; route,
 * status, and receipt proof stay visible in a deliberately asymmetric desk.
 */
import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleHelp,
  Copy,
  ExternalLink,
  Info,
  LoaderCircle,
  QrCode,
  ReceiptText,
  Send,
  WalletCards,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { NusaMark } from "@/components/NusaMark";
import { PaymentReceipt } from "@/components/PaymentReceipt";
import {
  createPaymentReference,
  createSolanaPayUrl,
  demoPayment,
  findPaymentByReference,
  getWalletProvider,
  sendDevnetUsdcPayment,
  shortAddress,
} from "@/lib/solana";

const formatMyr = (value: number) =>
  new Intl.NumberFormat("en-MY", { style: "currency", currency: "MYR", maximumFractionDigits: 2 }).format(value);

export default function Home() {
  const [recipient, setRecipient] = useState(demoPayment.recipient);
  const [myrAmount, setMyrAmount] = useState(String(demoPayment.myrAmount));
  const [reference, setReference] = useState(createPaymentReference);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [isFinding, setIsFinding] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [qrImage, setQrImage] = useState("");

  const parsedMyr = Math.max(0, Number(myrAmount) || 0);
  const usdcAmount = useMemo(
    () => Number((parsedMyr / demoPayment.myrPerUsdc).toFixed(2)),
    [parsedMyr],
  );
  const memo = `NUSA:${demoPayment.id}`;
  const payUrl = useMemo(
    () => createSolanaPayUrl({ recipient, amount: usdcAmount, reference, invoiceId: demoPayment.id }),
    [recipient, usdcAmount, reference],
  );

  useEffect(() => {
    QRCode.toDataURL(payUrl, {
      errorCorrectionLevel: "M",
      margin: 1,
      width: 512,
      color: { dark: "#14221f", light: "#fffdf8" },
    })
      .then(setQrImage)
      .catch(() => setQrImage(""));
  }, [payUrl]);

  const copyToClipboard = async (value: string, label: string) => {
    await navigator.clipboard.writeText(value);
    toast.success(`${label} copied`);
  };

  const connectWallet = async () => {
    const provider = getWalletProvider();
    if (!provider) {
      toast.error("No Phantom-compatible wallet was found. Install a wallet, switch it to Devnet, then reload.");
      return;
    }
    try {
      setIsConnecting(true);
      const result = await provider.connect();
      setWalletAddress(result.publicKey.toBase58());
      toast.success("Wallet connected. Confirm that the wallet is on Solana Devnet.");
    } catch {
      toast.error("Wallet connection was cancelled or unavailable.");
    } finally {
      setIsConnecting(false);
    }
  };

  const sendPayment = async () => {
    const provider = getWalletProvider();
    if (!provider || !walletAddress) {
      await connectWallet();
      return;
    }
    if (parsedMyr <= 0) {
      toast.error("Enter a payment amount above 0 MYR.");
      return;
    }
    try {
      setIsPaying(true);
      const txSignature = await sendDevnetUsdcPayment({
        provider,
        recipient,
        amountUsdc: usdcAmount,
        reference,
        invoiceId: demoPayment.id,
      });
      setSignature(txSignature);
      toast.success("Devnet USDC payment confirmed. Your public receipt is ready.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "The Devnet payment could not be completed.");
    } finally {
      setIsPaying(false);
    }
  };

  const checkReference = async () => {
    try {
      setIsFinding(true);
      const foundSignature = await findPaymentByReference(reference);
      if (!foundSignature) {
        toast.message("No confirmed transfer was found for this reference yet.");
        return;
      }
      setSignature(foundSignature);
      toast.success("A confirmed Devnet transaction was found for this payment reference.");
    } catch {
      toast.error("Could not query Devnet. Please try again in a moment.");
    } finally {
      setIsFinding(false);
    }
  };

  const resetRequest = () => {
    setReference(createPaymentReference());
    setSignature(null);
    toast.success("Fresh payment reference created for the next request.");
  };

  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="site-frame">
        <nav className="topbar" aria-label="NusaPay navigation">
          <NusaMark />
          <div className="topbar-center">
            <span className="network-dot" />
            <span>Solana Devnet</span>
            <span className="topbar-divider" />
            <span>USDC payment rail</span>
          </div>
          <Button onClick={connectWallet} className="wallet-button" disabled={isConnecting}>
            {isConnecting ? <LoaderCircle className="animate-spin" size={16} /> : <WalletCards size={16} />}
            {walletAddress ? shortAddress(walletAddress, 4) : "Connect wallet"}
          </Button>
        </nav>

        <section className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow-row"><span className="eyebrow">Payments for Southeast Asia</span><span className="hero-route">MY → Regional</span></div>
            <h1>Send the brief.<br /><em>Settle the work.</em></h1>
            <p>
              A payment request and public settlement receipt for independent work across Southeast Asia — built around a real Solana Devnet USDC transfer.
            </p>
            <div className="hero-proof-line">
              <span><Check size={15} /> Pay in USDC</span>
              <span><Check size={15} /> Attach a public reference</span>
              <span><Check size={15} /> Verify without an account</span>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <img src="/manus-storage/nusapay-hero_b8691cb0.png" alt="" />
            <div className="hero-visual-caption"><span>Live payment request</span><strong>MYR → USDC</strong></div>
          </div>
        </section>

        <section className="desk-shell" aria-labelledby="payment-heading">
          <div className="desk-main">
            <div className="desk-heading">
              <div>
                <span className="eyebrow">Active request</span>
                <h2 id="payment-heading">Payment for a completed design sprint</h2>
              </div>
              <span className="stamp stamp-devnet">Devnet only</span>
            </div>

            <div className="request-meta">
              <span><ReceiptText size={14} /> {demoPayment.id}</span>
              <span className="meta-rule" />
              <span>Issued 22 Aug 2026</span>
              <span className="meta-rule" />
              <span>Quote: 1 USDC = {formatMyr(demoPayment.myrPerUsdc)}</span>
            </div>

            <div className="amount-field">
              <label htmlFor="myr-amount">You send</label>
              <div className="amount-input-wrap">
                <span className="currency-label">MYR</span>
                <input
                  id="myr-amount"
                  value={myrAmount}
                  onChange={(event) => setMyrAmount(event.target.value.replace(/[^0-9.]/g, ""))}
                  inputMode="decimal"
                  aria-label="Payment amount in Malaysian ringgit"
                />
              </div>
              <p>Display quote for this demo; payment settles as a Devnet stablecoin transfer.</p>
            </div>

            <div className="route-card">
              <div className="route-point">
                <span className="route-kicker">From</span>
                <div><strong>{walletAddress ? shortAddress(walletAddress, 6) : "Your Devnet wallet"}</strong><span>{walletAddress ? "Connected payer" : "Connect a browser wallet to pay"}</span></div>
              </div>
              <div className="route-connector"><span /><ArrowDownRight size={17} /><span /></div>
              <div className="route-point route-point-destination">
                <span className="route-kicker">To</span>
                <div><strong>{demoPayment.recipientName}</strong><span>{demoPayment.recipientCity}</span></div>
              </div>
              <div className="recipient-field">
                <label htmlFor="recipient">Recipient Solana address</label>
                <input
                  id="recipient"
                  value={recipient}
                  onChange={(event) => { setRecipient(event.target.value.trim()); setSignature(null); }}
                  spellCheck="false"
                />
                <button onClick={() => copyToClipboard(recipient, "Recipient address")} title="Copy recipient address"><Copy size={14} /></button>
              </div>
            </div>

            <div className="settlement-card">
              <div>
                <span className="route-kicker">Settlement amount</span>
                <strong>{usdcAmount.toFixed(2)} USDC</strong>
                <span className="settlement-note">SPL Token · Devnet · 6 decimals</span>
              </div>
              <ArrowUpRight className="settlement-arrow" size={31} />
              <div className="settlement-terms">
                <span>Memo onchain</span>
                <code>{memo}</code>
              </div>
            </div>

            <div className="payment-actions">
              <Button onClick={sendPayment} disabled={isPaying || parsedMyr <= 0} className="pay-button">
                {isPaying ? <LoaderCircle className="animate-spin" size={18} /> : <Send size={18} />}
                {isPaying ? "Confirming on Devnet…" : `Pay ${usdcAmount.toFixed(2)} USDC`}
              </Button>
              <Button onClick={() => setIsQrOpen(true)} variant="outline" className="qr-button"><QrCode size={17} /> Scan to pay</Button>
              <button onClick={resetRequest} className="fresh-reference">New reference <ChevronRight size={15} /></button>
            </div>

            <div className="safety-note"><Info size={16} /><span><strong>Demo boundary:</strong> NusaPay does not custody funds or offer conversion. Use Devnet tokens only; the quote is illustrative.</span></div>
          </div>

          <PaymentReceipt
            reference={reference}
            signature={signature}
            isFinding={isFinding}
            onCopy={copyToClipboard}
            onCheck={checkReference}
          />
        </section>

        <section className="how-it-works">
          <div className="how-copy">
            <span className="eyebrow">Why Solana is integral</span>
            <h2>A payment link that resolves into public proof.</h2>
            <p>NusaPay pairs a local-currency request with an SPL USDC transfer. The transfer instruction carries a unique reference, while a memo marks the invoice. Solana indexes the reference so a receipt can be found from the chain, not a private ledger.</p>
            <a href="https://docs.solanapay.com/spec" target="_blank" rel="noreferrer">Read the payment request standard <ExternalLink size={14} /></a>
          </div>
          <div className="how-art"><img src="/manus-storage/nusapay-receipt-detail_7a2370a6.png" alt="Abstract NusaPay receipt and payment threads" /></div>
          <ol className="flow-list">
            <li><span>01</span><div><strong>Create a request</strong><p>Set a MYR amount, recipient, and fresh reference key.</p></div></li>
            <li><span>02</span><div><strong>Sign one transfer</strong><p>Your wallet sends Devnet USDC and writes the reference plus memo.</p></div></li>
            <li><span>03</span><div><strong>Share the receipt</strong><p>Anyone can inspect the transaction in Solana Explorer.</p></div></li>
          </ol>
        </section>

        <footer className="footer">
          <NusaMark label={false} />
          <p>Built for DevLeague 2026 · Payment demo on Solana Devnet</p>
          <a href="https://faucet.solana.com/" target="_blank" rel="noreferrer">Get Devnet SOL <ExternalLink size={13} /></a>
          <a href="https://faucet.circle.com/" target="_blank" rel="noreferrer">Get test USDC <ExternalLink size={13} /></a>
        </footer>
      </div>

      {isQrOpen ? (
        <div className="qr-dialog-backdrop" role="presentation" onMouseDown={() => setIsQrOpen(false)}>
          <section className="qr-dialog" role="dialog" aria-modal="true" aria-labelledby="qr-dialog-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="dialog-close" onClick={() => setIsQrOpen(false)} aria-label="Close QR dialog">×</button>
            <span className="eyebrow">Solana Pay transfer request</span>
            <h2 id="qr-dialog-title">Scan from a Devnet wallet</h2>
            <p>Your wallet should show <strong>{usdcAmount.toFixed(2)} USDC</strong>, the NusaPay reference, and memo <code>{memo}</code> before you approve.</p>
            {qrImage ? <img className="qr-image" src={qrImage} alt="QR code for this NusaPay Solana Pay request" /> : <div className="qr-loading"><LoaderCircle className="animate-spin" /></div>}
            <button className="copy-link" onClick={() => copyToClipboard(payUrl, "Solana Pay link")}><Copy size={15} /> Copy payment link</button>
          </section>
        </div>
      ) : null}
    </main>
  );
}
