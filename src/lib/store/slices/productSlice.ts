import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, Review, ReviewPayload } from '@/lib/types';
import { initialProducts } from '@/lib/constants';

interface ProductsState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: initialProducts,
  isLoading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Loading state management
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError: (state) => {
      state.error = null;
    },

    // Product operations
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    // Review operations
    addReview: (state, action: PayloadAction<{ productId: string; reviewData: ReviewPayload }>) => {
      const { productId, reviewData } = action.payload;
      const product = state.products.find((p) => p.id === productId);
      
      if (!product) {
        state.error = `Product with ID ${productId} not found`;
        return;
      }

      const existingReviews = product.reviews || [];
      let newReviews: Review[];

      if (reviewData.id) {
        // Update existing review
        newReviews = existingReviews.map(r => 
          r.id === reviewData.id ? { ...r, ...reviewData } as Review : r
        );
      } else {
        // Add new review
        const newReview: Review = {
          id: Date.now().toString(),
          author: reviewData.author,
          rating: reviewData.rating,
          title: reviewData.title,
          comment: reviewData.comment,
          date: new Date().toISOString(),
          helpful: 0,
        };
        newReviews = [newReview, ...existingReviews];
      }

      // Recalculate product rating
      const totalRating = newReviews.reduce((sum, r) => sum + r.rating, 0);
      product.reviews = newReviews;
      product.reviewCount = newReviews.length;
      product.rating = newReviews.length > 0 
        ? parseFloat((totalRating / newReviews.length).toFixed(1)) 
        : 0;
      
      state.error = null;
    },

    deleteReview: (state, action: PayloadAction<{ productId: string; reviewId: string }>) => {
      const { productId, reviewId } = action.payload;
      const product = state.products.find((p) => p.id === productId);
      
      if (!product) {
        state.error = `Product with ID ${productId} not found`;
        return;
      }

      if (!product.reviews) {
        state.error = 'No reviews found for this product';
        return;
      }

      product.reviews = product.reviews.filter((r) => r.id !== reviewId);
      
      // Recalculate rating
      if (product.reviews.length > 0) {
        const totalRating = product.reviews.reduce((sum, r) => sum + r.rating, 0);
        product.rating = parseFloat((totalRating / product.reviews.length).toFixed(1));
        product.reviewCount = product.reviews.length;
      } else {
        product.rating = 0;
        product.reviewCount = 0;
      }
      
      state.error = null;
    },

    updateReviewHelpfulCount: (state, action: PayloadAction<{ 
      productId: string; 
      reviewId: string; 
      direction: 'increment' | 'decrement' 
    }>) => {
      const { productId, reviewId, direction } = action.payload;
      const product = state.products.find((p) => p.id === productId);
      
      if (!product || !product.reviews) {
        state.error = 'Product or reviews not found';
        return;
      }

      const review = product.reviews.find((r) => r.id === reviewId);
      
      if (!review) {
        state.error = `Review with ID ${reviewId} not found`;
        return;
      }

      if (direction === 'increment') {
        review.helpful = (review.helpful || 0) + 1;
      } else {
        review.helpful = Math.max(0, (review.helpful || 0) - 1); // Prevent negative values
      }
      
      state.error = null;
    },

    updateStock: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const product = state.products.find((p) => p.id === productId);
      
      if (!product) {
        state.error = `Product with ID ${productId} not found`;
        return;
      }

      if (product.stock < quantity) {
        state.error = 'Insufficient stock available';
        return;
      }

      product.stock -= quantity;
      state.error = null;
    },

    // Reset state
    resetProductsState: (state) => {
      state.products = initialProducts;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { 
  setLoading,
  setError,
  clearError,
  setProducts,
  addReview, 
  deleteReview, 
  updateReviewHelpfulCount, 
  updateStock,
  resetProductsState,
} = productsSlice.actions;

export default productsSlice.reducer;