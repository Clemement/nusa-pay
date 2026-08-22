# NusaPay

NusaPay is a hackathon MVP for **Solana-powered payment requests and onchain settlement proof** for Southeast Asian independent work. It makes a MYR-denominated request payable as Devnet USDC, attaches a unique Solana payment reference plus invoice memo, and links the confirmed payment to a public Devnet receipt.

## What it demonstrates

The app creates a Solana Pay-compatible transfer request for the **Circle Devnet USDC mint**. A browser wallet can submit a real SPL token transfer to the named recipient. The transfer instruction includes a unique reference public key and the transaction contains an `NUSA:<invoice-id>` memo. The app can then use the reference key to retrieve a matching Devnet transaction signature.

Solana is the settlement layer and public evidence layer: a private application database cannot substitute for a permissionless transfer that another person can independently verify from the reference and signature.

## Who it is for

The initial workflow is for Malaysian freelancers and small agencies collecting a project payment from a client elsewhere in Southeast Asia. The user value is a more transparent, portable proof of payment for small cross-border work.

## Run locally

```bash
pnpm install
pnpm dev
```

Open the displayed local URL, use a Phantom-compatible browser wallet switched to **Solana Devnet**, and fund it with Devnet SOL plus Devnet USDC. The recipient field is editable so the demo can use a wallet controlled by the team.

## Demo script

1. Open NusaPay and point out the MYR request, USDC settlement amount, recipient, memo, and unique reference.
2. Connect a Devnet browser wallet.
3. Confirm the payment. The app derives the relevant associated token accounts, creates the recipient ATA if necessary, adds the memo immediately before the SPL `TransferChecked` instruction, and adds the reference as a read-only transfer account.
4. After confirmation, open the public Devnet Explorer receipt or click **Check Devnet receipt**.
5. Explain that the recipient, amount, reference, memo, and signature are observable beyond the app.

## Devnet prerequisites

| Item | Use |
| --- | --- |
| Devnet SOL | Transaction fees and possible recipient associated-token-account creation |
| Devnet USDC | The payment asset |
| Browser wallet in Devnet mode | Signs the transaction locally |

Use the [Solana faucet](https://faucet.solana.com/) for Devnet SOL and the [Circle faucet](https://faucet.circle.com/) for test USDC where available. **Never use mainnet assets in this MVP.**

## Boundaries

NusaPay is not a remittance provider and does not custody funds, convert currencies, operate an off-ramp, or perform KYC. The MYR quote is illustrative; the demo settles only in Devnet USDC.

## DevLeague submission

See [`SUBMISSION.md`](./SUBMISSION.md) for form-ready project copy, a three-minute demo script, Devnet setup, public repository handoff, and an X thread draft for the content award.

## References

1. [Solana Pay specification](https://docs.solanapay.com/spec)
2. [Solana transfer-request documentation](https://solana.com/docs/tools/solana-pay/quickstart/transfer-requests)
3. [Circle USDC contract addresses](https://developers.circle.com/stablecoins/usdc-contract-addresses)
