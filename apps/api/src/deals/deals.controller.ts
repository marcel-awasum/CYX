import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Roles, RbacGuard } from '../auth/rbac';

const deals: any[] = [];
@Controller('deals')
@UseGuards(RbacGuard)
export class DealsController {
  @Post()
  @Roles('OpsAdmin', 'RelationshipManager')
  create(@Body() body: any) {
    const deal = { id: `deal-${deals.length + 1}`, status: 'Intake', ...body, history: [{ status: 'Intake', at: new Date().toISOString() }] };
    deals.push(deal);
    return deal;
  }

  @Post('publish')
  @Roles('OpsAdmin', 'InvestorAnalyst')
  publish(@Body() body: { dealId: string }) {
    const deal = deals.find((d) => d.id === body.dealId);
    if (!deal) return { error: 'Not found' };
    deal.status = 'Published';
    deal.history.push({ status: 'Published', at: new Date().toISOString() });
    return deal;
  }

  @Get()
  @Roles('OpsAdmin', 'InvestorAnalyst', 'Auditor')
  list() {
    return deals;
  }
}
