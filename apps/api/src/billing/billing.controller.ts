import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { calculateFees } from '@cyx/shared';
import { Roles, RbacGuard } from '../auth/rbac';

@Controller('billing')
@UseGuards(RbacGuard)
export class BillingController {
  @Post('invoice-preview')
  @Roles('OpsAdmin', 'RelationshipManager')
  preview(@Body() body: { amount: number; daysActive: number; currency: string }) {
    const fees = calculateFees(body.amount, body.daysActive);
    return {
      currency: body.currency,
      lineItems: [
        { type: 'Placement', amount: fees.placement },
        { type: 'Monitoring', amount: fees.monitoring },
        { type: 'Structuring', amount: fees.structuring }
      ],
      total: fees.total
    };
  }
}
