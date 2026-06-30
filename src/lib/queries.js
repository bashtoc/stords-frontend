import { useQuery } from '@tanstack/react-query';
import { fetchProductBySlug, fetchProductReviews, fetchProducts, fetchPostBySlug, fetchPosts, } from '@/lib/api';
// Hooks
export function useProducts() {
    return useQuery({
        queryKey: ['products'],
        queryFn: () => fetchProducts(),
    });
}
export function useProduct(slug) {
    return useQuery({
        queryKey: ['product', slug],
        queryFn: () => fetchProductBySlug(slug),
        enabled: !!slug,
    });
}
export function usePosts() {
    return useQuery({
        queryKey: ['posts'],
        queryFn: () => fetchPosts(),
    });
}
export function usePost(slug) {
    return useQuery({
        queryKey: ['post', slug],
        queryFn: () => fetchPostBySlug(slug),
        enabled: !!slug,
    });
}
export function useProductReviews(slug) {
    return useQuery({
        queryKey: ['product-reviews', slug],
        queryFn: () => fetchProductReviews(slug),
        enabled: !!slug,
    });
}
