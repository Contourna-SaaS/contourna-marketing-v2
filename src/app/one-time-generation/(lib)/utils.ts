import { CompanySize, Industry } from './enums'

export function getIndustryDisplayValue(industry: Industry | string): string {
  // If it's already the display value (contains spaces), return it
  if (typeof industry === 'string' && industry.includes(' ')) {
    return industry
  }

  // If it's an enum value, return its associated string value
  if (Object.values(Industry).includes(industry as Industry)) {
    return industry
  }

  // If it's an enum key, get its value
  const industryKey = industry as keyof typeof Industry
  return Industry[industryKey] || industry
}

export function getCompanySizeDisplayValue(size: CompanySize | string): string {
  // If it's already the display value (contains numbers), return it
  if (typeof size === 'string' && size.includes('employees')) {
    return size
  }

  // If it's an enum value, return its associated string value
  if (Object.values(CompanySize).includes(size as CompanySize)) {
    return size
  }

  // If it's an enum key, get its value
  const sizeKey = size as keyof typeof CompanySize
  return CompanySize[sizeKey] || size
}

// Example usage:
// getIndustryDisplayValue(Industry.BEVERAGE_AND_TOBACCO_PRODUCT_MANUFACTURING)
// Returns: "Beverage & Tobacco Manufacturing"
//
// getCompanySizeDisplayValue(CompanySize.MEDIUM)
// Returns: "51-200 employees"
