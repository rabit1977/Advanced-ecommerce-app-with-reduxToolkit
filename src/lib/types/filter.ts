export interface FilterSidebarProps {
  categories: string[];
  brands: string[];
  currentCategory: string;
  currentBrands: string;
  currentMinPrice?: number;
  currentMaxPrice?: number;
  onCategoryChange: (category: string) => void;
  onBrandsChange: (brands: string[]) => void;
  onPriceChange: (priceRange: [number, number]) => void;
  className?: string;
  showFilterCount?: boolean;
}

export interface CategoryFilterProps {
  categories: string[];
  currentCategory: string;
  onCategoryChange: (category: string) => void;
  isPending: boolean;
  showFilterCount: boolean;
}

export interface BrandFilterProps {
  brands: string[];
  selectedBrands: Set<string>;
  onBrandToggle: (brand: string, checked: boolean) => void;
  isPending: boolean;
  showFilterCount: boolean;
}

export interface PriceFilterProps {
  localPriceRange: [number, number];
  onValueChange: (value: number[]) => void;
  onValueCommit: (value: number[]) => void;
  isPending: boolean;
  showFilterCount: boolean;
  isActive: boolean;
}