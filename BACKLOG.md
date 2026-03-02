# NeoCard SaaS Platform: Engineering Backlog & Architecture Specification

**Document Type:** Master Implementation Backlog & Architecture Spec
**Target State:** Multi-tenant SaaS platform for embeddable, AI-powered digital business cards.

---

## 1. Architecture Overview

The system transitions from a static single-page application to a scalable, serverless micro-services architecture.

### Technology Stack

* **Frontend/Dashboard:** Next.js 15 (App Router), React 18, TailwindCSS, TypeScript
* **Embed Component:** Native Web Components (Shadow DOM isolated)
* **Backend/API:** Next.js Route Handlers (Serverless/Edge)
* **Database:** PostgreSQL (Neon) with Prisma ORM
* **Authentication:** Clerk (B2B SaaS Auth)
* **AI Engine:** Google Gemini 2.5 Pro/Flash via Edge proxy
* **Caching/Rate Limiting:** Upstash Redis
* **Blob Storage:** Cloudflare R2 (Avatars, Logos, vCards)
* **Wallet Passes:** Node PassKit (Apple) / Google Wallet API
* **Email Delivery:** Resend

---

## 2. Engineering Epics & User Stories

### Epic 1: Platform Foundation & Multi-Tenant Data Model

_Establishing the core infrastructure, database schema, and authentication layer._

* **[STORY 1.1] Database Schema Migration**
  * **Description:** Implement Prisma schema for Users, Cards, Leads, and Events.
  * **Tasks:**
    * Provision Neon Serverless Postgres.
    * Define Prisma models with relational constraints.
    * Implement database connection pooling for serverless environments.
* **[STORY 1.2] Authentication & Workspace Provisioning**
  * **Description:** Integrate Clerk for passwordless login and session management.
  * **Tasks:**
    * Setup Clerk React provider and middleware.
    * Create custom login/signup flows.
    * Sync Clerk Webhooks to local database `Users` table.
* **[STORY 1.3] User Dashboard Shell**
  * **Description:** Build the authenticated portal where users manage their cards.
  * **Tasks:**
    * Implement protected App Router layout.
    * Build sidebar navigation (Cards, Analytics, Leads, Settings).

### Epic 2: Client Delivery & Embeddable Web Component

_Designing the delivery mechanism allowing cards to be embedded anywhere on the web via a single line of code._

* **[STORY 2.1] Universal Embed Script**
  * **Description:** Create a lightweight Vanilla JS script that injects the card via iFrame or Web Component.
  * **Tasks:**
    * Bundle `embed.js` using Vite library mode (target: < 5kb).
    * Implement Shadow DOM encapsulation to prevent CSS leakage.
    * Handle cross-origin postMessage communication for dynamic resizing.
* **[STORY 2.2] SSR Public Card Pages**
  * **Description:** Generate dynamic public routes for cards (e.g., `neocard.io/c/ramon`).
  * **Tasks:**
    * Implement Dynamic Segments `[slug]/page.tsx`.
    * Fetch card data server-side via Prisma.
    * Implement `generateMetadata` for dynamic OpenGraph images and SEO tags.
    * Implement `schema.org/Person` JSON-LD injection.

### Epic 3: AI Conversational Engine (Secure Proxy)

_Migrating the Gemini AI logic from the client browser to a secure, rate-limited edge environment._

* **[STORY 3.1] AI Edge Proxy API**
  * **Description:** Build the `/api/chat` route handler serving as a secure gateway to Gemini.
  * **Tasks:**
    * Implement Edge runtime function.
    * Integrate Gemini SDK using secure environment variables.
    * Construct dynamic system prompts injected with the specific card owner's data.
* **[STORY 3.2] Session Management & Memory**
  * **Description:** Enable multi-turn conversations while protecting against abuse.
  * **Tasks:**
    * Implement Redis-backed session storage (Upstash) with 30-minute TTL.
    * Implement Token Bucket rate limiting (IP & Session ID heuristics).
    * Add strict input sanitization and prompt-injection safeguards.

### Epic 4: Lead Capture & CRM Pipeline

_Converting card visitors into actionable business relationships._

* **[STORY 4.1] Secure Lead Ingestion API**
  * **Description:** Endpoint to securely receive contact form submissions from the client widget.
  * **Tasks:**
    * Implement `/api/leads` POST handler.
    * Integrate Cloudflare Turnstile for silent bot protection.
    * Write lead data to `Leads` table with associated `card_id`.
* **[STORY 4.2] Event-Driven CRM Webhooks**
  * **Description:** Allow card owners to forward leads to HubSpot, Zapier, or Make.com.
  * **Tasks:**
    * Store user-defined webhook URLs in the database.
    * Implement asynchronous background job (Inngest/Trigger.dev) to fire HTTP POST on new lead.
    * Implement automatic email notification via Resend with lead details.

### Epic 5: Telemetry & Analytics Dashboard

_Providing actionable insights on card performance without compromising visitor privacy._

* **[STORY 5.1] Privacy-First Event Tracking**
  * **Description:** Lightweight tracking system for views, scans, and clicks.
  * **Tasks:**
    * Implement `/api/track` beacon endpoint.
    * Log events (view, chat, download_vcard, social_click).
    * Implement IP hashing with daily salt for unique visitor counts (GDPR compliant).
* **[STORY 5.2] Dashboard Visualizations**
  * **Description:** UI components displaying time-series metrics.
  * **Tasks:**
    * Write optimized SQL aggregations for daily/weekly rollups.
    * Integrate charting library (Recharts or Tremor).
    * Display funnel conversion rates (Views -> Chats -> Leads).

### Epic 6: Dynamic Theming & Asset Pipeline

_Allowing fully customized brand expressions and secure file storage._

* **[STORY 6.1] Cloudflare R2 Integration**
  * **Description:** Secure infrastructure for user uploads (profile photos, brand logos).
  * **Tasks:**
    * Implement pre-signed URL generation for direct client-to-bucket uploads.
    * Configure CDN caching rules for `/assets/*` path.
* **[STORY 6.2] Theme Configuration Engine**
  * **Description:** UI and database support for custom brand colors and seasonal overrides.
  * **Tasks:**
    * Expand `Theme` database model to include arbitrary HEX JSON structures.
    * Build interactive theme builder UI in the dashboard.
    * Implement CSS Variable generation on the server prior to client hydration.

### Epic 7: Mobile Integration (Wallet & vCard)

_Delivering native contact experiences across iOS and Android ecosystems._

* **[STORY 7.1] Dynamic vCard Generator**
  * **Description:** Server-side generation of VCF files ensuring cross-platform compatibility.
  * **Tasks:**
    * Implement `/api/vcard/[id]` endpoint.
    * Format UTF-8 VCF strings correctly embedding base64 profile image.
    * Set correct `Content-Disposition` attachment headers.
* **[STORY 7.2] Apple Wallet PassKit Pipeline**
  * **Description:** Generate `.pkpass` files allowing cards to be saved in Apple Wallet.
  * **Tasks:**
    * Setup Apple Developer Certificates securely in CI pipeline.
    * Implement `passkit-generator` logic generating signed ZIP archives.
    * Implement APNs hook for auto-updating passes when profile changes.

### Epic 8: Deployment & CI/CD Infrastructure

_Automating the release cycle and maintaining zero-downtime deployments._

* **[STORY 8.1] Production Environment Parity**
  * **Description:** Ensure staging and production environments are isolated but identical.
  * **Tasks:**
    * Map specific GitHub branches to Vercel/Cloudflare preview environments.
    * Manage separated database connection pooling configurations.
* **[STORY 8.2] Continuous Security Auditing**
  * **Description:** Automated checks against dependency vulnerabilities and secrets leakage.
  * **Tasks:**
    * Integrate Dependabot for automated version bumps.
    * Configure ESLint, Prettier, and Vitest pipelines as strict PR blockages.

---

## 3. Database Schema Overview (Prisma Spec)

```prisma
model User {
  id        String   @id @default(uuid())
  clerkId   String   @unique
  email     String   @unique
  createdAt DateTime @default(now())
  cards     Card[]
}

model Card {
  id            String   @id @default(uuid())
  userId        String
  slug          String   @unique
  name          String
  title         String
  company       String?
  bio           String?
  avatarUrl     String?
  themeConfig   Json?
  metrics       Event[]
  leads         Lead[]
  user          User     @relation(fields: [userId], references: [id])
}

model Lead {
  id          String   @id @default(uuid())
  cardId      String
  email       String
  name        String?
  message     String?
  status      String   @default("NEW")
  createdAt   DateTime @default(now())
  card        Card     @relation(fields: [cardId], references: [id])
}

model Event {
  id        String   @id @default(uuid())
  cardId    String
  eventType String
  metadata  Json?
  createdAt DateTime @default(now())
  card      Card     @relation(fields: [cardId], references: [id])
}
```
