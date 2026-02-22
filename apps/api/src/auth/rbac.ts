import { CanActivate, ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';

export type Role = 'SuperAdmin' | 'OpsAdmin' | 'RiskOfficer' | 'ComplianceOfficer' | 'RelationshipManager' | 'InvestorAnalyst' | 'BankUser' | 'Auditor';
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);

@Injectable()
export class RbacGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const needed = Reflect.getMetadata('roles', context.getHandler()) as Role[] | undefined;
    if (!needed || needed.length === 0) return true;
    const role = (req.headers['x-role'] ?? 'Auditor') as Role;
    return needed.includes(role);
  }
}
