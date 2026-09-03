export interface MutualFund {
  id: string;
  name: string;
  fundHouse: string;
  schemeName: string;
  schemeCode: string;
  expectedReturnRate: number;
  projectedMfValue?: number;
  estimatedMfGain?: number;
}

export interface EMIPlan {
  id: string;
  tenureMonths: number;
  interestRate: number;
  monthlyAmount: number;
  cashback: number;
  totalEmiPaid: number;
  totalInterestPaid: number;
  netEffectiveCost: number;
  mutualFund: MutualFund;
}

export interface Variant {
  id: string;
  storage: string;
  color: string;
  mrp: number;
  price: number;
  imageUrl: string;
  discountPercentage?: number;
  emiPlans?: EMIPlan[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  description: string | null;
  minPrice?: number;
  maxPrice?: number;
  variantCount?: number;
  availableStorage?: string[];
  availableColors?: string[];
  thumbnailUrl?: string;
  variants: Variant[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface GrowthCalculationResult {
  monthlyAmount: number;
  tenureMonths: number;
  totalInvested: number;
  expectedReturnRate: number;
  interestRate: number;
  cashback: number;
  projectedWealth: number;
  estimatedReturns: number;
  netEffectiveCost: number;
}
