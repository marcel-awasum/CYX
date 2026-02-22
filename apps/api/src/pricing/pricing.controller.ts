import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { computePricing } from '@cyx/shared';
import { Roles, RbacGuard } from '../auth/rbac';

@Controller('pricing')
@UseGuards(RbacGuard)
export class PricingController {
  @Post('compute')
  @Roles('RiskOfficer', 'OpsAdmin', 'RelationshipManager')
  compute(@Body() body: any) {
    return computePricing(body);
  }
}
