export function parseSalaryRange(salaryRange: string): {
  min: number | undefined;
  max: number | undefined;
  currency: string;
} {
  // Example: "$66k - $105k"
  const parts = salaryRange.split('-').map((s) => s.trim());
  if (parts.length !== 2) {
    return { min: undefined, max: undefined, currency: 'USD' };
  }
  const minPart = parts[0].replace('$', '').replace('k', '');
  const maxPart = parts[1].replace('$', '').replace('k', '');
  const min = parseFloat(minPart) * 1000;
  const max = parseFloat(maxPart) * 1000;
  return { min, max, currency: 'USD' };
}
