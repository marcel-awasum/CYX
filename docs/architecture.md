# Architecture

- Multi-tenant control plane using organization-scoped data.
- API modules: auth/RBAC, KYC, risk tiering, pricing, matching/allocation, monitoring hooks, billing, CYXAssets deals.
- Worker: monitoring checks, periodic reporting, notifications.
- Data tier: PostgreSQL (+ Prisma schema includes required platform tables), Redis for queues/cache.
- Infra: Docker Compose for local, Terraform + Kubernetes templates for production.
