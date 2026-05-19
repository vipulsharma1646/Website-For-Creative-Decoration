/**
 * TypeScript types and interfaces for Party Propz
 */

// Product types
export interface ProductData {
  id: string
  title: string
  description: string
  basePrice: number
  imageUrl: string
  categories: string[]
  sizes: string[]
  colors: string[]
  createdAt?: Date
  updatedAt?: Date
}

export interface ProductFormData {
  title: string
  description: string
  basePrice: number
  imageUrl: string
  categories: string[]
  sizes: string[]
  colors: string[]
}

// Customer/Order types
export interface CustomerData {
  id: string
  name: string
  email: string
  phone: string
  address: string
  pincode: string
  productName: string
  amountPaid: number
  paymentId: string
  createdAt?: Date
}

export interface OrderData {
  id: string
  customerId: string
  productId: string
  quantity: number
  size: string
  color: string
  totalPrice: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  createdAt?: Date
  updatedAt?: Date
}

// Cart types
export interface CartItem {
  productId: string
  quantity: number
  size: string
  color: string
  price: number
}

export interface Cart {
  items: CartItem[]
  total: number
  itemCount: number
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  message?: string
  error?: string
  data?: T
  count?: number
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  count: number
  page: number
  pageSize: number
  totalPages: number
}

// Form submission types
export interface FormSubmitResult {
  success: boolean
  message: string
  error?: string
}

// UI Component Props
export interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger'
}

export interface InputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
  required?: boolean
  className?: string
  error?: string
}

// Payment types
export interface PaymentData {
  orderId: string
  amount: number
  currency: string
  description: string
  customerEmail: string
  customerPhone: string
  customerName: string
}

export interface WebhookPayload {
  name: string
  email: string
  phone: string
  address: string
  pincode: string
  productName: string
  amountPaid: number
  paymentId: string
}
