'''
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ProductGrid, SortKey } from './product-grid';
import { Product } from '@/lib/types';
import '@testing-library/jest-dom';

// --- MOCKS ---

// Mock Next.js navigation hooks
const mockPush = jest.fn();
const mockPathname = '/products';
let mockSearchParams = new URLSearchParams();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => mockPathname,
  useSearchParams: () => mockSearchParams,
}));

// Mock Sheet component for reliable open/close testing
jest.mock('@/components/ui/sheet', () => ({
  Sheet: ({ open, onOpenChange, children }) => (
    <div data-testid="sheet-mock" data-open={open}>
      {open && <div onClick={() => onOpenChange(false)}>{children}</div>}
    </div>
  ),
  SheetContent: ({ children, ...props }) => <div {...props}>{children}</div>,
  SheetHeader: ({ children, ...props }) => <div {...props}>{children}</div>,
  SheetTitle: ({ children, ...props }) => <div {...props}>{children}</div>,
  SheetDescription: ({ children, ...props }) => <div {...props}>{children}</div>,
}));

// Mock child components
jest.mock('./ProductGridControls', () => ({
  ProductGridControls: ({ onSortChange, onFilterToggle }) => (
    <div>
      <button onClick={() => onSortChange('price-asc')}>Sort by Price</button>
      <button onClick={onFilterToggle}>Toggle Filters</button>
    </div>
  ),
}));
jest.mock('./ProductList', () => ({
  ProductList: ({ products }) => (
    <div data-testid="product-list">
      {products.map((p) => (
        <div key={p.id}>{p.title}</div>
      ))}
    </div>
  ),
}));

// Mock FilterSidebar and capture its onPriceChange prop for the debounce test
let capturedOnPriceChange;
jest.mock('./filter-sidebar', () => ({
  FilterSidebar: ({ onPriceChange }) => {
    capturedOnPriceChange = onPriceChange;
    return <div data-testid="filter-sidebar"></div>;
  },
}));

jest.mock('@/lib/hooks/usePagination', () => ({
  ProductGridPagination: ({ onPageChange }) => (
    <button onClick={() => onPageChange(2)}>Next Page</button>
  ),
}));

jest.mock('lucide-react', () => ({
  ...jest.requireActual('lucide-react'),
  FilterX: () => <div data-testid="filter-x-icon" />,
}));

// --- TEST SETUP ---

const mockProducts: Product[] = Array.from({ length: 8 }, (_, i) => ({
  id: `prod-${i + 1}`,
  title: `Product ${i + 1}`,
  price: (i + 1) * 10,
  description: `Description for product ${i + 1}`,
  category: 'laptops',
  rating: 4.5,
  image: `/image${i + 1}.jpg`,
  createdAt: new Date().toISOString(),
}));

const defaultProps = {
  products: mockProducts,
  totalCount: 20,
  currentPage: 1,
  currentCategory: 'all',
  currentBrands: '',
  currentMinPrice: 0,
  currentMaxPrice: 1000,
  currentSort: 'featured' as SortKey,
  pageSize: 8,
};

// --- TEST SUITE ---

describe('ProductGrid', () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockSearchParams = new URLSearchParams();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    capturedOnPriceChange = undefined;
  });

  it('renders the title, subtitle, and products', () => {
    render(<ProductGrid {...defaultProps} />);
    expect(screen.getByText('All Products')).toBeInTheDocument();
    expect(screen.getByText('Find the perfect tech for you')).toBeInTheDocument();
    expect(screen.getByTestId('product-list').children.length).toBe(8);
  });

  it('displays a "No products found" message when there are no products', () => {
    render(<ProductGrid {...defaultProps} products={[]} />);
    expect(screen.getByText('No products found')).toBeInTheDocument();
  });

  it('displays the search query in the title when a search param is present', () => {
    mockSearchParams.set('search', 'Laptop');
    render(<ProductGrid {...defaultProps} />);
    expect(screen.getByText('Results for "Laptop"')).toBeInTheDocument();
    expect(screen.getByText('20 products found')).toBeInTheDocument();
  });

  it('calculates and displays the active filter count', () => {
    render(
      <ProductGrid
        {...defaultProps}
        currentCategory="laptops"
        currentBrands="Apple,Samsung"
        currentMinPrice={100}
      />
    );
    expect(screen.getByText('Active Filters:')).toBeInTheDocument();
    const badge = screen.getByText('4');
    expect(badge).toBeInTheDocument();
  });

  it('calls router.push with correct params when "Clear All" is clicked', () => {
    render(<ProductGrid {...defaultProps} currentCategory="laptops" />);
    fireEvent.click(screen.getByRole('button', { name: /Clear All/i }));
    act(() => jest.runAllTimers());
    expect(mockPush).toHaveBeenCalledWith('/products?page=1', { scroll: false });
  });

  it('calls router.push when sort is changed', () => {
    render(<ProductGrid {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /Sort by Price/i }));
    act(() => jest.runAllTimers());
    expect(mockPush).toHaveBeenCalledWith('/products?sort=price-asc&page=1', {
      scroll: false,
    });
  });

  it('calls router.push when page is changed', () => {
    render(<ProductGrid {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /Next Page/i }));
    act(() => jest.runAllTimers());
    expect(mockPush).toHaveBeenCalledWith('/products?page=2', { scroll: false });
  });

  it('debounces price changes before calling router.push', () => {
    render(<ProductGrid {...defaultProps} />);
    expect(capturedOnPriceChange).toBeInstanceOf(Function);

    act(() => {
      capturedOnPriceChange([100, 500]);
    });

    expect(mockPush).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(mockPush).toHaveBeenCalledWith(
      '/products?minPrice=100&maxPrice=500&page=1',
      { scroll: false }
    );
  });

  it('opens and closes the mobile filter sheet', () => {
    render(<ProductGrid {...defaultProps} />);
    const sheet = screen.getByTestId('sheet-mock');
    expect(sheet).toHaveAttribute('data-open', 'false');

    const filterToggleButton = screen.getByRole('button', { name: /Toggle Filters/i });
    fireEvent.click(filterToggleButton);

    expect(sheet).toHaveAttribute('data-open', 'true');

    const applyButton = screen.getByRole('button', { name: /Apply Filters/i });
    fireEvent.click(applyButton);

    expect(sheet).toHaveAttribute('data-open', 'false');
  });
});
'''