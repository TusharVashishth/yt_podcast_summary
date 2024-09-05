import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getCoinsFromAmount = (amount: number): number => {
  switch (amount) {
    case 100:
      return 100;
    case 500:
      return 510;
    case 1000:
      return 1020;
    default:
      return 0;
  }
};