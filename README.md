# CYX + CYXAssets Monorepo

Production-oriented full-stack scaffold for institutional capital routing and asset structuring for African/emerging-market banks.

## Apps
- `apps/web`: Next.js admin/ops/investor/bank console
- `apps/api`: NestJS API with RBAC, KYC, risk, pricing, matching, billing, deals modules
- `apps/worker`: BullMQ async worker (monitoring/reporting jobs)
- `packages/shared`: deterministic domain engines + schemas

## One-command local startup
```bash
docker compose -f docker/docker-compose.yml up --build
```

## Local dev
```bash
npm install
npm test
npm run build
```

## Demo walkthrough
See `docs/demo-walkthrough.md`.
