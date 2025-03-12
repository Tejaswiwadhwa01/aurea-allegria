
/**
 * Formats a number as Indian Rupees
 * @param price The price to format
 * @returns Formatted price string (e.g., "₹1,499")
 */
export const formatIndianRupees = (price: number | string): string => {
  const numericPrice = typeof price === 'string' ? parseInt(price, 10) : price;
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericPrice);
};
