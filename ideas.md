# NusaPay — Design & Product Direction

## Product hypothesis

**NusaPay** is a Solana-powered payment-link and proof-of-payout tool for Malaysian freelancers, small agencies, and regional micro-businesses who need to collect or send small cross-border payments without ambiguous proof, manual invoice chasing, or unpredictable correspondent-bank fees. Its one-day MVP focuses on a concise, real Devnet flow: create a request in MYR, pay in Devnet USDC through a connected wallet, attach a reference and invoice memo to the transaction, and obtain an independently verifiable onchain receipt.

> **The critical Solana role:** the payment itself, its recipient, amount, immutable reference, and transaction signature live on Solana. The product cannot be reduced to a traditional database without losing its open, payer-to-recipient settlement rail and third-party-verifiable proof.

## Three visual approaches

| Theme Name | Very Brief Intro | Probability |
| --- | --- | --- |
| **Batik Ledger** | A warm, editorial payments interface that borrows rhythm and layered geometry from Southeast Asian textiles without turning them into decoration. It feels grounded, human, and distinctly regional. | 0.07 |
| **Tropical Terminal** | A field-operations dashboard with dark palm-green surfaces, utility labels, and vivid payment states. It treats money movement as practical infrastructure rather than speculative finance. | 0.04 |
| **Receipt Garden** | A quiet, sunlit product surface where transaction records grow into a clear visual trail. The approach is soft, approachable, and suited to first-time wallet users. | 0.09 |

## Selected approach: Batik Ledger

### Design Movement

**Contemporary Southeast Asian editorial design with utility-first financial software conventions.** The interface uses textile-inspired rhythm as a structural device, not as a superficial cultural pattern. Its visual logic is related to well-made printed receipts and merchant notebooks: strong tabular anchors, compact operational details, and one confident color signal when money has moved.

### Core Principles

1. **Proof before promise.** Every important payment state resolves into a signature, a reference, or an explicit next action.
2. **Regional but restrained.** Use warm earth and ink tones with interlocking line motifs; avoid literal flags, token imagery, or cliché skyline imagery.
3. **Humanly legible money.** Show local currency first, settlement currency second, and keep costs, destination, and status inspectable at a glance.
4. **One task in focus.** The primary payment request stays dominant while operational status occupies a compact, persistent rail.

### Color Philosophy

The base is **rice-paper cream**, which makes the app feel like a credible receipt rather than a trading terminal. **Ink black** carries dense information without the coldness of charcoal. **Tamarind brown** establishes practical warmth and frames structure. **Ketam teal** is the ownable confirmation color: saturated enough to signal a verified state but calm enough for financial trust. A very small coral accent is reserved for cautions and fee surprises.

### Layout Paradigm

The desktop experience is an **asymmetric payment desk**. A narrow left band carries identity, network state, and the payment route; the large middle field is the active payment request; a right-side proof strip reveals the live receipt sequence. On mobile, this folds into an ordered transaction story rather than a squeezed desktop grid.

### Signature Elements

1. **Ledger threads:** thin, offset rule lines and bracket-like joins that connect amounts, recipient, reference, and receipt.
2. **Tactile status stamps:** square-to-soft-square labels such as `DEVNET`, `PENDING`, and `VERIFIED`, inspired by operational receipt marks.
3. **Wave weave field:** an abstract, low-contrast woven line pattern running behind the main request panel, never competing with text.

### Interaction Philosophy

Interactions should feel like reviewing and stamping a payment slip. Amount edits are immediate and deliberate; confirmation states become more saturated; receipt details reveal inline rather than moving the user away from the payment task. Every non-production control will state its constraint instead of pretending to be a live financial service.

### Animation

Use 160–240ms transform-and-opacity transitions with a sharp ease-out. Payment status moves in a left-to-right sequence across the receipt rail; the verified state receives a single subtle stamp-settle motion. Buttons compress gently on press. Decorative threads may drift only when reduced motion is not requested; no looping wallet or coin animations.

### Typography System

**DM Serif Display** is reserved for product positioning, local-currency amounts, and verified receipt moments. **IBM Plex Sans** handles all payment fields, labels, and interface copy because it remains legible in compact numerical contexts. Payment amounts use tabular numerals. Headlines are sentence case, never all caps; operational labels may use compact uppercase with letter spacing.

### Brand Essence

**NusaPay turns a cross-border payment request into a straightforward, verifiable Solana settlement for Southeast Asian independent work.** Personality: **grounded, precise, regional**.

### Brand Voice

The voice is concise and practical, like a capable finance teammate rather than a crypto promoter. Headlines name the user’s job-to-be-done. CTAs use explicit verbs and explain the outcome.

> “Send the brief. Settle the work.”

> “Pay 250 MYR worth of USDC — receipt lands on Solana.”

### Wordmark & Logo

The mark is a **four-strand, interlocking payment knot**: two offset diagonal strokes meet two rounded counter-strokes to form a compact open square, suggesting a routed payment and a completed receipt without using a coin symbol. The wordmark uses DM Serif Display with a distinctive high-contrast capital **N** and a compact baseline.

### Signature Brand Color

**Ketam Teal — `#007E73`**. This is used for confirmed settlement, primary interactive emphasis, and the logo mark.

## Style Decisions

- The landing route opens directly on a seeded payment-request desk: MYR amount first, USDC settlement second, recipient, unique reference, Devnet state, and receipt/proof rail are visible as one composed story.
- Ledger-thread rules connect the amount, recipient, reference, and proof rail. Textile influence is structural, not decorative.
- Ketam Teal is reserved for the mark, primary payment action, and verified settlement states. Rice-paper, ink black, and tamarind brown carry the rest of the interface.

## MVP scope for DevLeague

| User | Pain point | NusaPay capability | Evidence shown in demo |
| --- | --- | --- | --- |
| Malaysian freelance designer | Needs a clear way to request a small project payment from a regional client | Creates a MYR-denominated request that quotes a USDC settlement amount | Payment request card with recipient, amount, and derived onchain reference |
| Singaporean or regional client | Needs confidence that the payment reached the intended wallet | Connects a wallet and submits an SPL USDC transfer with an invoice memo/reference | Solana wallet signature and an explorer-ready receipt |
| Agency owner | Needs a simple, portable proof of payout | Reads the receipt without relying on a NusaPay account or proprietary database | Transaction signature, payer, payee, USDC amount, and reference resolve from Devnet RPC |

### Demo journey

1. Open a seeded payment request for **Alya, a Kuala Lumpur freelance designer**.
2. Inspect the MYR amount, the USDC settlement equivalent, recipient wallet, and invoice reference.
3. Connect a Devnet-capable browser wallet containing Devnet USDC.
4. Submit a real Solana Devnet SPL-token transfer with the payment reference attached as a memo.
5. See the confirmed transaction signature and open its public Devnet explorer record.

### Explicit MVP boundaries

This hackathon build does not custody funds, provide currency conversion, conduct KYC, or integrate bank off-ramps. The exchange rate is a transparent demo quote, not a market rate. It is a **payment-request and onchain settlement proof** experience, not a remittance service.
