
import { useCurrency } from "@/hooks/use-currency";

interface CurrencyDisplayProps {
  amount: number;
  className?: string;
}

export function CurrencyDisplay({ amount, className }: CurrencyDisplayProps) {
  const { formatAmount } = useCurrency();
  return <span className={className}>{formatAmount(amount)}</span>;
}
