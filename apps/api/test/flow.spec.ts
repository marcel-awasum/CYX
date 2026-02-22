import { calculateFees, computePricing, matchAndAllocate, scoreRisk } from '@cyx/shared';

describe('integration flow onboarding to invoicing', () => {
  it('runs deterministic path', () => {
    const risk = scoreRisk(
      { capitalRatio: 16, nplRatio: 9, liquidityRatio: 48, profitability: 10, governance: 65, countryRisk: 50 },
      { capitalRatio: 25, nplRatio: 20, liquidityRatio: 15, profitability: 15, governance: 15, countryRisk: 10 }
    );
    const pricing = computePricing({ baseRate: 5, tierPremium: 2, countryAddon: 1, tenorAddon: 0.5, collateralAdjustment: 0.2, investorSpreadRequirement: 6, cyxMarginShare: 0.35 });
    const allocations = matchAndAllocate(
      { id: 'cr-1', country: 'NG', tier: risk.tier, tenorMonths: 12, amount: 2000000, offeredRate: pricing.offeredRate },
      [{ investorId: 'inv-1', minYield: 5.5, maxTenorMonths: 24, tiers: [1,2,3], countryLimits: {}, remainingCapacity: 3000000 }]
    );
    const fees = calculateFees(allocations[0].amount, 180);
    expect(risk.tier).toBeGreaterThanOrEqual(1);
    expect(allocations.length).toBe(1);
    expect(fees.total).toBeGreaterThan(0);
  });
});
