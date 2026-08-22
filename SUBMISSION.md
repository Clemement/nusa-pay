# NusaPay — DevLeague 2026 Submission Kit

## Short submission description

**NusaPay turns a Malaysian-ringgit payment request into a verifiable Solana settlement receipt for Southeast Asian independent work.** A freelancer or small agency creates a MYR-denominated request; a client pays its transparent USDC equivalent from a Devnet browser wallet. NusaPay attaches a unique Solana reference and an invoice memo to the SPL-token transfer, then resolves the confirmed transaction into a public Explorer receipt. It is built for freelancers, boutique agencies, and micro-businesses that need a lightweight, portable proof of small cross-border project payments.

Solana is integral rather than decorative: it executes the USDC transfer, carries the public memo, indexes the unique reference account, and exposes the independent settlement receipt. A private database cannot provide the same permissionless payer-to-recipient settlement and third-party-verifiable evidence. The implementation follows Solana Pay's transfer-request structure, in which SPL token payments identify a mint, derive the recipient's associated token account, include optional reference keys on the transfer instruction, and place a public memo immediately before the transfer. [1] [2]

## Suggested form fields

| Field | Suggested response |
| --- | --- |
| **Project name** | NusaPay |
| **Theme / Lab** | Payments for Southeast Asia; Customer Experience on Solana |
| **What did you build?** | A Solana Devnet USDC payment-request desk that gives Malaysian freelancers a MYR-first payment request, a Solana Pay QR/link, and a public settlement receipt. |
| **Who is it for?** | Malaysian freelancers, small agencies, and regional clients working across Southeast Asia. |
| **How is Solana integral?** | The signed SPL USDC transfer, immutable `NUSA:<invoice-id>` memo, unique reference, and publicly verifiable transaction receipt all reside on Solana Devnet. |
| **Network** | Solana Devnet using the Circle Devnet USDC mint `4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU`. [3] |
| **Live demo URL** | Paste the published NusaPay URL here after publishing from the project workspace. |
| **Source repository** | Paste the public GitHub repository URL here after exporting the project source. |

## Three-minute demo narrative

Open NusaPay and begin with the seeded request for Alya, a Kuala Lumpur independent designer. Point out that the user sees **MYR first**, then a clear USDC settlement amount, a named recipient, a Devnet status, and a transparent demo quote. The product is intentionally a payment request, not a speculative trading screen.

Next, show the unique reference in the proof rail and explain that it is an account key included in the token transfer instruction. The app can search Devnet transactions mentioning that reference, which links the receipt to a payment request without inventing a proprietary payment-status database. Open the QR sheet to show that the same request is encoded as a Solana Pay transfer URL, including the recipient, token mint, amount, label, reference, and memo. [1]

Then connect a Phantom-compatible browser wallet set to Devnet. Confirm the transfer. NusaPay derives the payer and recipient associated token accounts, creates the recipient's account when it is absent, writes the invoice memo immediately before the SPL `TransferChecked` instruction, and confirms the transaction through Devnet RPC. Finish by opening the public Devnet Explorer receipt. The recipient, amount, signature, memo, and reference can all be checked without signing in to NusaPay.

## Pre-demo setup

| Step | Owner | Action |
| --- | --- | --- |
| 1 | Demo presenter | Install a Phantom-compatible browser wallet and switch it to **Solana Devnet**. |
| 2 | Demo presenter | Obtain test SOL for transaction fees from the [Solana faucet](https://faucet.solana.com/). |
| 3 | Demo presenter | Obtain test USDC from the [Circle faucet](https://faucet.circle.com/) where available. |
| 4 | Demo presenter | Change the editable recipient address in NusaPay to a Devnet wallet controlled by the team, so the completed transfer can be checked. |
| 5 | Demo presenter | Use a small USDC amount and retain the Explorer receipt URL for the judges. |
| 6 | Demo presenter | State clearly that this is a **Devnet-only proof of concept**: NusaPay does not custody funds, convert fiat, or operate an off-ramp. |

## Public repository and live-demo handoff

Create a final project checkpoint, then use the project workspace's **GitHub** section to export the source to a new **public** repository. Copy the resulting URL into the submission form. The repository already contains the product README, the implementation, and this submission kit. Do not publish a mainnet version for this competition MVP.

Use the workspace's **Publish** control only after the final checkpoint is created. The published URL is the live demo link. Before sending the form, open the URL in a fresh browser window, confirm the seeded request loads, open the QR dialog, and test the wallet connection with a Devnet wallet.

## X content-award draft

**Post 1**

> Meet NusaPay: a Solana Devnet payment request for Southeast Asian independent work. A MYR-first request becomes a USDC transfer with a public, verifiable receipt — no payment-status spreadsheet required. Built for DevLeague 2026 with [@SuperteamMY](https://x.com/SuperteamMY) and [@talentlabsinc](https://x.com/talentlabsinc).

**Post 2**

> The useful bit is not “wallet connect.” NusaPay makes Solana do the work: the SPL USDC transfer settles onchain, an invoice memo is recorded publicly, and a unique reference lets anyone find the receipt from Devnet.

**Post 3**

> Demo flow: request in MYR → transparent USDC quote → sign in a Devnet wallet → open the Explorer receipt. The goal is a small but real payment-proof primitive for freelancers and agencies across Southeast Asia.

## References

[1] [Solana Pay Specification](https://docs.solanapay.com/spec)

[2] [Solana: Transfer Requests](https://solana.com/docs/tools/solana-pay/quickstart/transfer-requests)

[3] [Circle: USDC Contract Addresses](https://developers.circle.com/stablecoins/usdc-contract-addresses)
