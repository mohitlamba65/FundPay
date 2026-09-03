export interface MutualFund {
  id: string;
  name: string;
  fundHouse: string;
  schemeName: string;
  schemeCode: string;
  expectedReturnRate: number | string;
}

export interface EMIPlan {
  id: string;
  variantId: string;
  mutualFundId: string;
  tenureMonths: number;
  cashback: number | string | null;
  interestRate: number | string;
  monthlyAmount: number | string;
  isActive: boolean;
  mutualFund: MutualFund;
}

export interface Variant {
  id: string;
  productId: string;
  storage: string;
  color: string;
  mrp: number | string;
  price: number | string;
  imageUrl: string;
  isActive: boolean;
  emiPlans?: EMIPlan[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  description: string | null;
  isActive: boolean;
  variants: Variant[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
