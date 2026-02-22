# Security and Compliance

- RBAC enforced via guard and role metadata.
- Tenant isolation via organization-scoped entities.
- Secrets only through server env variables.
- Audit model includes hash chaining fields (`previousHash`, `hash`) for tamper evidence.
- Document access intended to be tenant + role scoped, with S3 backing in production.
