/**
 * NusaPay / Batik Ledger — Solana helpers keep payment construction explicit,
 * public, and inspectable. The app never receives or stores a private key.
 */
import {
  clusterApiUrl,
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import {
  createAssociatedTokenAccountInstruction,
  createTransferCheckedInstruction,
  getAccount,
  getAssociatedTokenAddress,
} from "@solana/spl-token";

export const DEVNET_RPC = clusterApiUrl("devnet");
export const DEVNET_USDC_MINT = "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU";
export const MEMO_PROGRAM_ID = new PublicKey(
  "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr",
);

export const demoPayment = {
  id: "NUSA-DEV-260822",
  recipient: "FvJ8k8HhXp4a3zQyFMZd4FvEqcYdYE7gSZWxrEBRfBsB",
  recipientName: "Alya Rahman",
  recipientCity: "Kuala Lumpur, MY",
  myrAmount: 250,
  myrPerUsdc: 4.72,
};

export type WalletProvider = {
  isPhantom?: boolean;
  publicKey?: PublicKey;
  connect: () => Promise<{ publicKey: PublicKey }>;
  signAndSendTransaction: (transaction: Transaction) => Promise<{ signature: string }>;
};

declare global {
  interface Window {
    phantom?: { solana?: WalletProvider };
    solana?: WalletProvider;
  }
}

export function getWalletProvider(): WalletProvider | null {
  if (typeof window === "undefined") return null;
  return window.phantom?.solana ?? (window.solana?.isPhantom ? window.solana : null);
}

export function createPaymentReference(): string {
  return Keypair.generate().publicKey.toBase58();
}

export function createSolanaPayUrl({
  recipient,
  amount,
  reference,
  invoiceId,
}: {
  recipient: string;
  amount: number;
  reference: string;
  invoiceId: string;
}) {
  const params = new URLSearchParams({
    amount: amount.toFixed(2),
    "spl-token": DEVNET_USDC_MINT,
    reference,
    label: "NusaPay • Devnet",
    message: `Freelance payment ${invoiceId}`,
    memo: `NUSA:${invoiceId}`,
  });
  return `solana:${recipient}?${params.toString()}`;
}

export async function sendDevnetUsdcPayment({
  provider,
  recipient,
  amountUsdc,
  reference,
  invoiceId,
}: {
  provider: WalletProvider;
  recipient: string;
  amountUsdc: number;
  reference: string;
  invoiceId: string;
}) {
  if (!provider.publicKey) {
    throw new Error("Connect a Solana wallet before sending a payment.");
  }

  const connection = new Connection(DEVNET_RPC, "confirmed");
  const payer = provider.publicKey;
  const owner = new PublicKey(recipient);
  const mint = new PublicKey(DEVNET_USDC_MINT);
  const paymentReference = new PublicKey(reference);
  const sourceAta = await getAssociatedTokenAddress(mint, payer);
  const destinationAta = await getAssociatedTokenAddress(mint, owner);
  const sourceAccount = await getAccount(connection, sourceAta);
  const amountBaseUnits = BigInt(Math.round(amountUsdc * 1_000_000));

  if (sourceAccount.amount < amountBaseUnits) {
    throw new Error("Your connected wallet does not hold enough Devnet USDC for this request.");
  }

  const transaction = new Transaction();
  const destinationInfo = await connection.getAccountInfo(destinationAta);
  if (!destinationInfo) {
    transaction.add(
      createAssociatedTokenAccountInstruction(payer, destinationAta, owner, mint),
    );
  }

  const transfer = createTransferCheckedInstruction(
    sourceAta,
    mint,
    destinationAta,
    payer,
    amountBaseUnits,
    6,
  );
  transfer.keys.push({
    pubkey: paymentReference,
    isSigner: false,
    isWritable: false,
  });

  transaction.add(
    new TransactionInstruction({
      keys: [],
      programId: MEMO_PROGRAM_ID,
      data: new TextEncoder().encode(`NUSA:${invoiceId}`) as Buffer,
    }),
    transfer,
  );

  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash("confirmed");
  transaction.feePayer = payer;
  transaction.recentBlockhash = blockhash;

  const { signature } = await provider.signAndSendTransaction(transaction);
  const result = await connection.confirmTransaction(
    { signature, blockhash, lastValidBlockHeight },
    "confirmed",
  );

  if (result.value.err) {
    throw new Error("The Devnet transaction did not confirm successfully.");
  }

  return signature;
}

export async function findPaymentByReference(reference: string) {
  const connection = new Connection(DEVNET_RPC, "confirmed");
  const signatures = await connection.getSignaturesForAddress(new PublicKey(reference), {
    limit: 10,
  });
  return signatures.find((item) => item.err === null)?.signature ?? null;
}

export function shortAddress(address: string, visible = 5) {
  if (address.length <= visible * 2 + 3) return address;
  return `${address.slice(0, visible)}…${address.slice(-visible)}`;
}
