import { z } from 'zod';

export const RiskInputSchema = z.object({
  capitalRatio: z.number().min(0).max(100),
  nplRatio: z.number().min(0).max(100),
  liquidityRatio: z.number().min(0).max(100),
  profitability: z.number().min(-100).max(100),
  governance: z.number().min(0).max(100),
  countryRisk: z.number().min(0).max(100),
  externalRatingScore: z.number().min(0).max(100).optional()
});

export type RiskInput = z.infer<typeof RiskInputSchema>;

export type RiskWeights = {
  capitalRatio: number;
  nplRatio: number;
  liquidityRatio: number;
  profitability: number;
  governance: number;
  countryRisk: number;
};

export function scoreRisk(input: RiskInput, weights: RiskWeights) {
  const validated = RiskInputSchema.parse(input);
  const normalized = {
    capitalRatio: validated.capitalRatio,
    nplRatio: 100 - validated.nplRatio,
    liquidityRatio: validated.liquidityRatio,
    profitability: Math.max(0, Math.min(100, validated.profitability + 50)),
    governance: validated.governance,
    countryRisk: 100 - validated.countryRisk
  };
  const wSum = Object.values(weights).reduce((a, b) => a + b, 0) || 1;
  const proxy = (Object.keys(weights) as (keyof RiskWeights)[]).reduce(
    (acc, key) => acc + normalized[key] * weights[key],
    0
  ) / wSum;
  const score = validated.externalRatingScore ? (proxy * 0.5 + validated.externalRatingScore * 0.5) : proxy;
  const tier = score >= 85 ? 1 : score >= 70 ? 2 : score >= 55 ? 3 : score >= 40 ? 4 : 5;
  const confidence = validated.externalRatingScore ? 'High' : 'Medium';
  return {
    score: Number(score.toFixed(2)),
    tier,
    confidence,
    rationale: [
      `Capital adequacy=${validated.capitalRatio}`,
      `NPL adjusted=${normalized.nplRatio}`,
      `Country risk adjusted=${normalized.countryRisk}`
    ]
  };
}

export type PricingInput = {
  baseRate: number;
  tierPremium: number;
  countryAddon: number;
  tenorAddon: number;
  collateralAdjustment: number;
  investorSpreadRequirement: number;
  cyxMarginShare: number;
};

export function computePricing(input: PricingInput) {
  const offeredRate = input.baseRate + input.tierPremium + input.countryAddon + input.tenorAddon - input.collateralAdjustment;
  const grossSpread = offeredRate - input.investorSpreadRequirement;
  const cyxRetained = Math.max(0, grossSpread * input.cyxMarginShare);
  const investorYield = offeredRate - cyxRetained;
  return {
    offeredRate: Number(offeredRate.toFixed(4)),
    investorYield: Number(investorYield.toFixed(4)),
    cyxRetainedMargin: Number(cyxRetained.toFixed(4)),
    exception: offeredRate < 0 || input.cyxMarginShare > 1
  };
}

export type Mandate = {
  investorId: string;
  minYield: number;
  maxTenorMonths: number;
  tiers: number[];
  countryLimits: Record<string, number>;
  remainingCapacity: number;
};

export type CapitalRequest = {
  id: string;
  country: string;
  tier: number;
  tenorMonths: number;
  amount: number;
  offeredRate: number;
};

export function matchAndAllocate(request: CapitalRequest, mandates: Mandate[]) {
  const eligible = mandates.filter(
    (m) => m.tiers.includes(request.tier) && m.maxTenorMonths >= request.tenorMonths && m.minYield <= request.offeredRate && m.remainingCapacity > 0
  );
  const totalCapacity = eligible.reduce((a, m) => a + m.remainingCapacity, 0);
  if (!eligible.length || totalCapacity === 0) return [];
  return eligible.map((m) => {
    const proportional = Math.min(m.remainingCapacity, (m.remainingCapacity / totalCapacity) * request.amount);
    return { investorId: m.investorId, amount: Number(proportional.toFixed(2)) };
  });
}

export function calculateFees(amount: number, daysActive: number) {
  const placementBps = amount >= 20_000_000 ? 30 : amount >= 10_000_000 ? 45 : 60;
  const placement = (amount * placementBps) / 10_000;
  const monitoringAnnualBps = amount >= 20_000_000 ? 12 : 18;
  const monitoring = (amount * monitoringAnnualBps / 10_000) * (daysActive / 365);
  const structuring = amount * 0.0035;
  return {
    placement: Number(placement.toFixed(2)),
    monitoring: Number(monitoring.toFixed(2)),
    structuring: Number(structuring.toFixed(2)),
    total: Number((placement + monitoring + structuring).toFixed(2))
  };
}
