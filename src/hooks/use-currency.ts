
import { useCurrency as useContextCurrency } from "@/contexts/CurrencyContext";

export function useCurrency() {
  return useContextCurrency();
}
