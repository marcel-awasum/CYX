# Demo Walkthrough (CYX + CYXAssets)

1. Login through `/auth/login`.
2. Create KYC case (`POST /kyc/cases`) and move through statuses.
3. Run risk score (`POST /risk/score`) and inspect output tier/confidence/rationale.
4. Compute pricing (`POST /pricing/compute`) using tier + country + tenor adjustments.
5. Submit matching payload (`POST /matching/allocate`) to produce investor allocations.
6. Generate invoice preview (`POST /billing/invoice-preview`) for placement/monitoring/structuring fees.
7. Create and publish asset deal (`POST /deals`, `POST /deals/publish`).

Seed assumptions:
- 3 banks, 5 investors, 2 deals preconfigured through `apps/api/prisma/seed.ts`.
