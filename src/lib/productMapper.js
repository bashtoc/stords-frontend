export function toCartProduct(product) {
    return {
        id: product.slug,
        name: product.name,
        tagline: product.tagline || "Premium Botanical Oil",
        price: product.pricing.USD,
        rating: product.rating ?? 4.9,
        reviewsCount: product.reviewsCount ?? 0,
        image: product.image,
        category: product.category || "Oils",
        description: product.description,
        size: product.size,
        benefits: product.benefits || [],
        ingredients: product.ingredients || [],
        howToUse: product.howToUse || "Apply a few drops directly to the scalp and hair.",
    };
}
export function toOrderItems(items) {
    return items.map((item) => ({
        productSlug: item.product.id,
        quantity: item.quantity,
    }));
}
