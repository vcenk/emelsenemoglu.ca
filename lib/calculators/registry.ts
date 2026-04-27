import type { ComponentType } from "react";
import { MortgagePaymentCalculator } from "@/components/calculator/MortgagePaymentCalculator";
import { AffordabilityCalculator } from "@/components/calculator/AffordabilityCalculator";
import { LandTransferTaxCalculator } from "@/components/calculator/LandTransferTaxCalculator";
import { RenewalCalculator } from "@/components/calculator/RenewalCalculator";
import { RefinanceCalculator } from "@/components/calculator/RefinanceCalculator";

export const calculatorRegistry: Record<string, ComponentType> = {
  "mortgage-payment": MortgagePaymentCalculator,
  affordability: AffordabilityCalculator,
  "land-transfer-tax": LandTransferTaxCalculator,
  "renewal-savings": RenewalCalculator,
  "refinance-savings": RefinanceCalculator,
};

export const calculatorOrder = [
  "mortgage-payment",
  "affordability",
  "land-transfer-tax",
  "renewal-savings",
  "refinance-savings",
];

export function hasCalculator(slug: string): boolean {
  return slug in calculatorRegistry;
}
