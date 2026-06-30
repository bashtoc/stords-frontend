import { create } from "zustand";
import { persist } from "zustand/middleware";
export const PRODUCTS = [
    {
        id: "hydragrow-hair-oil",
        name: "STORDS HydraGrow Hair Oil",
        tagline: "Flagship Batana Oil Blend",
        price: 48.00,
        rating: 4.9,
        reviewsCount: 142,
        image: "/heroimage.png",
        category: "Oils",
        size: "50ml",
        description: "A premium blend of Batana Oil and nutrient-rich botanical oils formulated to deeply hydrate dry hair, reduce breakage, improve softness, enhance shine, and support healthier-looking, stronger hair.",
        benefits: [
            "Intense scalp and hair shaft moisture",
            "Noticeable softness and improved texture",
            "Rich natural shine without heavy residue",
            "Reduces hair breakage and supports length retention",
            "Nourishes hair follicles and calms dry scalps"
        ],
        ingredients: [
            "Batana Oil (Rich in essential fatty acids)",
            "Argan Oil (Moisturizes & shines)",
            "Jojoba Oil (Scalp balancing)",
            "Rosemary Extract (Circulation booster)",
            "Vitamin E (Antioxidant barrier)",
            "Castor Oil (Moisture sealer)",
            "Sweet Almond Oil (Elasticity enhancer)"
        ],
        howToUse: "Apply a few drops directly to the scalp and hair, massaging gently with your fingertips. Use 2-3 times a week or as a deep conditioning pre-wash treatment."
    },
    {
        id: "wooden-comb",
        name: "Neem Wood Scalp Massaging Comb",
        tagline: "Hand-Carved Healthy Scalp Essential",
        price: 18.00,
        rating: 4.8,
        reviewsCount: 64,
        image: "/neem-wood-scalp-comb.png",
        category: "Accessories",
        description: "Hand-crafted from 100% natural neem wood, this wide-tooth comb massage-stimulates the scalp to increase blood flow while evenly distributing natural oils and reducing static.",
        benefits: [
            "Stimulates hair follicles via scalp massage",
            "Reduces static and hair breakage",
            "Evenly distributes sebum and hair oils",
            "Natural antibacterial neem wood properties"
        ],
        ingredients: ["100% Organic Neem Wood"],
        howToUse: "Gently comb from scalp to tips, spending 2-3 minutes massaging the scalp in circular motions before bedtime."
    },
    {
        id: "satin-bonnet",
        name: "Mulberry Satin Sleep Bonnet",
        tagline: "Zero-Friction Protection for Curls",
        price: 24.00,
        rating: 4.7,
        reviewsCount: 98,
        image: "/satin-bonnet.png",
        category: "Accessories",
        description: "A premium, double-lined mulberry satin bonnet designed to protect your curls from friction, retain essential moisture overnight, and prevent frizz and breakage while you sleep.",
        benefits: [
            "Prevents overnight moisture loss and dryness",
            "Reduces friction, frizz, and split ends",
            "Preserves curls, braids, and protective styles",
            "Soft elastic band with zero tension"
        ],
        ingredients: ["Double-lined Mulberry Satin"],
        howToUse: "Tuck your curls gently inside the bonnet before sleeping. For best results, apply a few drops of HydraGrow Hair Oil prior to wrapping."
    },
    {
        id: "hydrating-mist",
        name: "Rose & Aloe Scalp Hydration Mist",
        tagline: "Refreshing Daily Moisture Infusion",
        price: 32.00,
        rating: 4.8,
        reviewsCount: 77,
        image: "/hydrating-mist.png",
        category: "Mists",
        size: "100ml",
        description: "A refreshing, lightweight botanical spray containing rosewater and organic aloe vera to quench dry hair strands, refresh curls, and soothe itchy or irritated scalps.",
        benefits: [
            "Instantly rehydrates dry, thirsty curls",
            "Soothes itchy scalp and dry patches",
            "Lightweight formula that won't weigh hair down",
            "Infused with organic rosewater scent"
        ],
        ingredients: [
            "Organic Rosewater (Hydration & scent)",
            "Aloe Vera Juice (Scalp soothing)",
            "Glycerin (Moisture binding)",
            "Provitamin B5 (Strengthening)"
        ],
        howToUse: "Shake well and spray evenly onto damp or dry hair and scalp. Style as usual. Follow up with HydraGrow Hair Oil to lock in the hydration."
    }
];
export const useCartStore = create()(persist((set, get) => ({
    items: [],
    wishlist: [],
    discountCode: null,
    discountPercentage: 0,
    addToCart: (product, quantity = 1) => {
        const items = get().items;
        const existingIndex = items.findIndex((item) => item.product.id === product.id);
        if (existingIndex > -1) {
            const updatedItems = [...items];
            updatedItems[existingIndex].quantity += quantity;
            set({ items: updatedItems });
        }
        else {
            set({ items: [...items, { product, quantity }] });
        }
    },
    removeFromCart: (productId) => {
        set({
            items: get().items.filter((item) => item.product.id !== productId),
        });
    },
    updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
            get().removeFromCart(productId);
            return;
        }
        const updatedItems = get().items.map((item) => item.product.id === productId ? { ...item, quantity } : item);
        set({ items: updatedItems });
    },
    clearCart: () => {
        set({ items: [], discountCode: null, discountPercentage: 0 });
    },
    toggleWishlist: (product) => {
        const wishlist = get().wishlist;
        const exists = wishlist.some((item) => item.id === product.id);
        if (exists) {
            set({ wishlist: wishlist.filter((item) => item.id !== product.id) });
        }
        else {
            set({ wishlist: [...wishlist, product] });
        }
    },
    isInWishlist: (productId) => {
        return get().wishlist.some((item) => item.id === productId);
    },
    applyDiscount: (code) => {
        const normalizedCode = code.toUpperCase().trim();
        return {
            success: false,
            message: `${normalizedCode || "Coupon"} must be validated by the checkout service.`,
        };
    },
    setDiscount: (code, discountPercentage) => {
        set({ discountCode: code.toUpperCase().trim(), discountPercentage });
    },
    removeDiscount: () => {
        set({ discountCode: null, discountPercentage: 0 });
    },
}), {
    name: "stords-cart-storage",
}));
