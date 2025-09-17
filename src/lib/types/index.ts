export interface AppContextType extends AppState {
  setPage: (page: string) => void;
  viewProduct: (productId: string) => void;
  viewOrder: (orderId: string) => void;
  login: (email: string, password: string) => { success: boolean; message?: string };
  logout: () => void;
  signup: (name: string, email: string, password: string) => { success: boolean; message?: string };
  addToCart: (item: Omit<CartItem, 'cartItemId' | 'image'>) => void;
  updateCartQuantity: (cartItemId: string, newQuantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  saveForLater: (cartItemId: string) => void;
  moveToCart: (cartItemId: string) => void;
  removeFromSaved: (cartItemId: string) => void;
  toggleWishlist: (productId: string) => void;
  placeOrder: (orderDetails: Omit<Order, 'id' | 'date'>) => string;
  addReview: (productId: string, reviewData: ReviewPayload) => void;
  updateReviewHelpfulCount: (productId: string, reviewId: string) => void;
  showToast: (message: string) => void;
  setSearchQuery: (query: string) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setIsMenuOpen: (isOpen: boolean) => void;
  setQuickViewProductId: (id: string | null) => void;
}

export interface AppState {
  user: User | null;
  users: User[];
  cart: CartItem[];
  wishlist: Set<string>;
  orders: Order[];
  products: Product[];
  savedForLater: CartItem[];
  theme: 'light' | 'dark';
  searchQuery: string;
  isMenuOpen: boolean;
  selectedProductId: string | null;
  quickViewProductId: string | null;
  selectedOrder: Order | null;
  toast: string | null;
  isLoading: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Should not be stored in client-side state long-term
  cart: CartItem[];
  savedForLater: CartItem[];
  wishlist: string[];
  helpfulReviews?: string[];
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  discount?: number;
  stock: number;
  brand: string;
  category: string;
  images: string[];
  rating: number;
  reviewCount: number;
  reviews?: Review[];
  options?: ProductOption[];
  features?: string[];
  specifications?: Record<string, string>;
  sku?: string;
  tags?: string[];
  releaseDate?: string;
}

export interface ProductOption {
  name: string;
  type: string;
  variants: ProductVariant[];
}

export interface ProductVariant {
  name: string;
  value: string;
  priceModifier?: number;
  image?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpful: number;
  verifiedPurchase?: boolean;
}

export interface ReviewPayload extends Omit<Review, 'id' | 'date' | 'helpful'> {
  id?: string; // Optional for editing
}

export interface CartItem {
  id: string; // Product ID
  cartItemId: string; // Unique ID for this cart item instance
  title: string;
  price: number;
  quantity: number;
  image: string;
  options?: Record<string, string>;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
}

export interface Address {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}