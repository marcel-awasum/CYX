# CYX Agent Guide

## Goals
- Build and maintain CYX + CYXAssets as a production-grade institutional capital routing and asset structuring platform.
- Keep architecture modular: `apps/web`, `apps/api`, `apps/worker`, `packages/shared`, `infra`, `docs`.
- Prioritize deterministic calculations, auditability, and compliance-grade traceability.

## Coding standards
- TypeScript strict mode everywhere.
- Validate inputs with Zod/DTOs.
- Keep business logic in testable pure functions (`packages/shared`).
- Every state transition must create an audit event.
- Never expose secrets client-side; only server-side env access.

## Commands
- Install: `npm install`
- Dev stack: `docker compose -f docker/docker-compose.yml up --build`
- Lint: `npm run lint`
- Test: `npm test`
- Build: `npm run build`

## Do NOT
- Do not hardcode credentials/API keys.
- Do not bypass RBAC checks in controllers/routes.
- Do not merge schema changes without migration files.
- Do not add non-deterministic pricing/scoring behavior.
