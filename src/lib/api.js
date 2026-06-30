// Fetch utility for the STORDS Express Backend.
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5052";
async function request(path, options = {}) {
    const res = await fetch(`${BACKEND_URL}${path}`, {
        cache: "no-store",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
        ...options,
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
        const message = data?.message || data?.error || `Request failed with status ${res.status}`;
        throw new Error(message);
    }
    return data;
}
function jsonBody(body) {
    return JSON.stringify(body);
}
export async function fetchProducts() {
    return request("/api/products");
}
export async function fetchProductBySlug(slug) {
    return request(`/api/products/${encodeURIComponent(slug)}`);
}
export async function fetchProductReviews(slug) {
    return request(`/api/products/${encodeURIComponent(slug)}/reviews`);
}
export async function createProductReview(slug, body) {
    return request(`/api/products/${encodeURIComponent(slug)}/reviews`, {
        method: "POST",
        body: jsonBody(body),
    });
}
export async function fetchPosts() {
    return request("/api/posts");
}
export async function fetchPostBySlug(slug) {
    return request(`/api/posts/${encodeURIComponent(slug)}`);
}
export async function validateCoupon(code) {
    return request("/api/coupons/validate", {
        method: "POST",
        body: jsonBody({ code }),
    });
}
export async function validateCart(body) {
    return request("/api/cart/validate", {
        method: "POST",
        body: jsonBody(body),
    });
}
export async function createOrder(body) {
    return request("/api/orders", {
        method: "POST",
        body: jsonBody(body),
    });
}
export async function subscribeToNewsletter(email) {
    return request("/api/newsletter/subscribe", {
        method: "POST",
        body: jsonBody({ email }),
    });
}
export async function registerCustomer(body) {
    return request("/api/auth/register", {
        method: "POST",
        body: jsonBody(body),
    });
}
export async function loginCustomer(body) {
    return request("/api/auth/login", {
        method: "POST",
        body: jsonBody(body),
    });
}
export async function verifyOtpCustomer(body) {
    return request("/api/auth/verify-otp", {
        method: "POST",
        body: jsonBody(body),
    });
}
export async function logoutCustomer() {
    return request("/api/auth/logout", {
        method: "POST",
        body: jsonBody({}),
    });
}
export async function fetchCurrentCustomer() {
    return request("/api/auth/me");
}
export async function updateCustomerProfile(body) {
    return request("/api/me/profile", {
        method: "PATCH",
        body: jsonBody(body),
    });
}
export async function fetchMyOrders() {
    return request("/api/me/orders");
}
