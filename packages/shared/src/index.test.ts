import { describe, expect, it } from 'vitest';
import { calculateFees, computePricing, matchAndAllocate, scoreRisk } from './index';

describe('risk scoring', () => {
  it('scores unrated bank deterministically', () => {
    const result = scoreRisk(
      { capitalRatio: 18, nplRatio: 7, liquidityRatio: 52, profitability: 12, governance: 68, countryRisk: 55 },
      { capitalRatio: 25, nplRatio: 20, liquidityRatio: 15, profitability: 15, governance: 15, countryRisk: 10 }
    );
    expect(result.score).toBeGreaterThan(0);
    expect(result.tier).toBeGreaterThanOrEqual(1);
  });
});

describe('pricing', () => {
  it('computes offered rate and margins', () => {
    const p = computePricing({ baseRate: 5.2, tierPremium: 2.4, countryAddon: 1.1, tenorAddon: 0.8, collateralAdjustment: 0.4, investorSpreadRequirement: 6.2, cyxMarginShare: 0.4 });
    expect(p.offeredRate).toBe(9.1);
    expect(p.cyxRetainedMargin).toBeGreaterThan(0);
  });
});

describe('matching', () => {
  it('allocates by pro-rata capacity', () => {
    const allocations = matchAndAllocate(
      { id: 'cr1', country: 'KE', tier: 2, tenorMonths: 12, amount: 1000000, offeredRate: 8 },
      [
        { investorId: 'i1', minYield: 6, maxTenorMonths: 24, tiers: [1, 2], countryLimits: {}, remainingCapacity: 500000 },
        { investorId: 'i2', minYield: 7, maxTenorMonths: 18, tiers: [2, 3], countryLimits: {}, remainingCapacity: 1500000 }
      ]
    );
    expect(allocations).toHaveLength(2);
    expect(allocations[0].amount + allocations[1].amount).toBeCloseTo(1000000, 0);
  });
});

describe('fees', () => {
  it('calculates fee proposal', () => {
    const f = calculateFees(12000000, 180);
    expect(f.total).toBeGreaterThan(0);
  });
});
