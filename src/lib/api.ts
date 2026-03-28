const API_BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/v1`
  : "/api/v1";

function getToken(): string | null {
  return localStorage.getItem("alamdar_token");
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers ?? {}),
  };

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (res.status === 401) {
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail ?? "Request failed");
  }

  return res.json() as Promise<T>;
}

// ── Auth ─────────────────────────────────────────────────────────────────────

const MOCK_ADMIN = { id: 1, email: "admin@alamdar.com", is_admin: true };
const MOCK_PASSWORD = "password";
const MOCK_TOKEN = "mock-jwt-token-alamdar";

export const authApi = {
  login: async (email: string, password: string) => {
    try {
      return await request<{ access_token: string; token_type: string }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
    } catch {
      // Fallback to mock auth when no backend is running
      if (email === MOCK_ADMIN.email && password === MOCK_PASSWORD) {
        return { access_token: MOCK_TOKEN, token_type: "bearer" };
      }
      throw new Error("Invalid email or password");
    }
  },
  me: async () => {
    try {
      return await request<{ id: number; email: string; is_admin: boolean }>("/auth/me");
    } catch {
      const token = localStorage.getItem("alamdar_token");
      if (token === MOCK_TOKEN) return MOCK_ADMIN;
      throw new Error("Unauthorized");
    }
  },
};

// ── Products ─────────────────────────────────────────────────────────────────

export interface Product {
  id: number;
  sku: string;
  name: string;
  category: string;
  sub_type: string;
  head_type?: string;
  material: string;
  finish: string;
  size: string;
  length?: string;
  thread_pitch?: string;
  price: number;
  price_unit: string;
  stock: number;
  description: string;
  specifications: Record<string, string>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductListResponse {
  items: Product[];
  total: number;
  page: number;
  page_size: number;
}

export const productsApi = {
  list: (params?: { page?: number; page_size?: number; category?: string; search?: string }) => {
    const qs = new URLSearchParams();
    if (params?.page) qs.set("page", String(params.page));
    if (params?.page_size) qs.set("page_size", String(params.page_size));
    if (params?.category) qs.set("category", params.category);
    if (params?.search) qs.set("search", params.search);
    return request<ProductListResponse>(`/products?${qs}`);
  },
  get: (id: number) => request<Product>(`/products/${id}`),
  update: (id: number, data: Partial<Product>) =>
    request<Product>(`/products/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  delete: (id: number) =>
    request<{ ok: boolean }>(`/products/${id}`, { method: "DELETE" }),
};

// ── Orders ────────────────────────────────────────────────────────────────────

export interface Customer {
  id: number;
  name: string;
  email: string;
}

export interface OrderItem {
  id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
}

export interface Order {
  id: number;
  order_number: string;
  customer: Customer;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  payment_method: string;
  total: number;
  items: OrderItem[];
  created_at: string;
}

export interface OrderListResponse {
  items: Order[];
  total: number;
  page: number;
  page_size: number;
}

export const ordersApi = {
  list: (params?: { page?: number; page_size?: number; status?: string }) => {
    const qs = new URLSearchParams();
    if (params?.page) qs.set("page", String(params.page));
    if (params?.page_size) qs.set("page_size", String(params.page_size));
    if (params?.status) qs.set("status", params.status);
    return request<OrderListResponse>(`/orders?${qs}`);
  },
  updateStatus: (id: number, status: Order["status"]) =>
    request<Order>(`/orders/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
};

// ── Payments ──────────────────────────────────────────────────────────────────

export interface Payment {
  id: number;
  payment_number: string;
  order_id: number;
  amount: number;
  status: "completed" | "pending" | "failed" | "refunded";
  method: string;
  created_at: string;
  customer?: Customer;
}

export interface PaymentListResponse {
  items: Payment[];
  total: number;
  page: number;
  page_size: number;
}

export const paymentsApi = {
  list: (params?: { page?: number; page_size?: number; status?: string }) => {
    const qs = new URLSearchParams();
    if (params?.page) qs.set("page", String(params.page));
    if (params?.page_size) qs.set("page_size", String(params.page_size));
    if (params?.status) qs.set("status", params.status);
    return request<PaymentListResponse>(`/payments?${qs}`);
  },
};

// ── Analytics ─────────────────────────────────────────────────────────────────

export interface AnalyticsResponse {
  stats: {
    total_revenue: number;
    revenue_change: number;
    total_orders: number;
    orders_change: number;
    total_products: number;
    products_change: number;
    avg_order_value: number;
    avg_order_change: number;
  };
  revenue: { month: string; amount: number }[];
  orders: { month: string; count: number }[];
  categories: { name: string; value: number }[];
  top_products: { name: string; sales: number; revenue: number }[];
}

export const analyticsApi = {
  get: () => request<AnalyticsResponse>("/analytics"),
};