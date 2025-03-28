/**
 * Formats a number as Indian Rupees
 * @param price The price to format
 * @returns Formatted price string (e.g., "₹1,499")
 */
export const formatIndianRupees = (price: number | string): string => {
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0, // No decimal places for INR
  }).format(numericPrice);
};
