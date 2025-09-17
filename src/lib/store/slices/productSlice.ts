import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, Review, ReviewPayload } from '@/lib/types';
import { initialProducts } from '@/lib/constants';

interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: initialProducts,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addReview: (state, action: PayloadAction<{ productId: string; reviewData: ReviewPayload }>) => {
      const { productId, reviewData } = action.payload;
      const product = state.products.find((p) => p.id === productId);
      if (!product) return;

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

      const totalRating = newReviews.reduce((sum, r) => sum + r.rating, 0);
      product.reviews = newReviews;
      product.reviewCount = newReviews.length;
      product.rating = newReviews.length > 0 ? parseFloat((totalRating / newReviews.length).toFixed(1)) : 0;
    },
    deleteReview: (state, action: PayloadAction<{ productId: string; reviewId: string }>) => {
      const { productId, reviewId } = action.payload;
      const product = state.products.find((p) => p.id === productId);
      if (product && product.reviews) {
        product.reviews = product.reviews.filter((r) => r.id !== reviewId);
        if (product.reviews.length > 0) {
            const totalRating = product.reviews.reduce((sum, r) => sum + r.rating, 0);
            product.rating = parseFloat((totalRating / product.reviews.length).toFixed(1));
            product.reviewCount = product.reviews.length;
        } else {
            product.rating = 0;
            product.reviewCount = 0;
        }
      }
    },
    updateReviewHelpfulCount: (state, action: PayloadAction<{ productId: string; reviewId: string; direction: 'increment' | 'decrement' }>) => {
      const { productId, reviewId, direction } = action.payload;
      const product = state.products.find((p) => p.id === productId);
      if (product && product.reviews) {
        const review = product.reviews.find((r) => r.id === reviewId);
        if (review) {
          if (direction === 'increment') {
            review.helpful = (review.helpful || 0) + 1;
          } else {
            review.helpful = (review.helpful || 0) - 1;
          }
        }
      }
    },
    updateStock: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
        const { productId, quantity } = action.payload;
        const product = state.products.find((p) => p.id === productId);
        if (product) {
            product.stock -= quantity;
        }
    }
  },
});

export const { addReview, deleteReview, updateReviewHelpfulCount, updateStock } = productsSlice.actions;
export default productsSlice.reducer;