import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { KycController } from './kyc/kyc.controller';
import { RiskController } from './risk/risk.controller';
import { PricingController } from './pricing/pricing.controller';
import { MatchingController } from './matching/matching.controller';
import { BillingController } from './billing/billing.controller';
import { DealsController } from './deals/deals.controller';

@Module({
  controllers: [AuthController, KycController, RiskController, PricingController, MatchingController, BillingController, DealsController]
})
export class AppModule {}
