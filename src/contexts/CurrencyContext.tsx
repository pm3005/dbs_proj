
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Currency = {
  code: string;
  symbol: string;
};

type CurrencyContextType = {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatAmount: (amount: number) => string;
};

const defaultCurrency: Currency = { code: "USD", symbol: "$" };

const CurrencyContext = createContext<CurrencyContextType>({
  currency: defaultCurrency,
  setCurrency: () => {},
  formatAmount: () => "",
});

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<Currency>(defaultCurrency);
  
  // Load currency from localStorage on mount
  useEffect(() => {
    const storedCurrency = localStorage.getItem("userCurrency");
    if (storedCurrency) {
      try {
        const parsedCurrency = JSON.parse(storedCurrency);
        setCurrency(parsedCurrency);
      } catch (error) {
        console.error("Failed to parse currency from localStorage", error);
      }
    }
  }, []);
  
  // Update localStorage when currency changes
  const updateCurrency = (newCurrency: Currency) => {
    localStorage.setItem("userCurrency", JSON.stringify(newCurrency));
    setCurrency(newCurrency);
  };
  
  // Format amount with currency symbol
  const formatAmount = (amount: number) => {
    return `${currency.symbol}${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };
  
  return (
    <CurrencyContext.Provider value={{ 
      currency, 
      setCurrency: updateCurrency,
      formatAmount 
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};
