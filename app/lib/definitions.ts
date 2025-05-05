import { z } from "zod";
import { Tables } from "./supabase";

export interface ICategory {
    id: string,
    category_name: string;
    category_description: string;
}

export interface IProduct {
    id: string
    name: string;
    description: string;
    price: number;
    category: string;
}

export interface IAddProduct {
    name: string,
    description: string,
    price: number,
    categoryId: number
}

export interface IAddToCart {
    product_id: number;
    quantity: number;
    user_id: string;
}
export interface ICartItem {
    id: number;
    productId: number;
    quantity: number;
    user_id: number;
    created_at: string;
}

export type CartItemWithProduct = Tables<'cart_items'> & {
    product: Tables<'products'> | null
};
export type ProductWithCategory = Tables<'products'> & {
    category: Tables<'categories'> | null
};
export type OrderWithOrderItems = Tables<'orders'> & {
    order_items: Tables<'order_items'>[] | null
};

export const SignupFormSchema = z.object({
    firstname: z
        .string()
        .min(2, { message: "Firstname should at least be 2 characters long." })
        .trim(),
    lastname: z
        .string()
        .min(2, { message: "Lastname should at least be 2 characters long." })
        .trim(),
    email: z
        .string()
        .email({ message: "Please enter a valid email address." }),
    phone: z
        .string()
        .regex(/^(\+63|0)9\d{9}$/, { message: 'Please enter a valid phone number' }),
    password: z
        .string()
        .min(8, { message: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
        })
        .trim(),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ['confirmPassword']
})

export const SigninFormSchema = z.object({
    email: z
        .string()
        .email({ message: "Please enter a valid email address." }),
    password: z
        .string(),
    role: z.
        string()
})
export const AddProductFormSchema = z.object({
    product_name: z.string(),
    price: z.string().transform((val) => Number(val)),
    image: z.string(),
    category_id: z.string().transform((val) => Number(val)),
    product_description: z.string(),
})

export const UpdateProductFormSchema = z.object({
    id:z.number(),
    product_name: z.string(),
    price: z.number(),
    image: z.string(),
    category_id: z.number(),
    product_description: z.string(),
})

export const DeliveryInformationSchema = z.object({
    firstname: z
        .string(),
    middlename: z
        .string(),
    lastname: z
        .string(),
    email: z
        .string()
        .email(),
    street: z
        .string(),
    city: z
        .string(),
    barangay: z
        .string(),
    phone: z
        .string(),
    user_id: z
        .string()
})

export interface IOrder {
    order_number: string,
    user_id: string,
    status: string,
    is_cancelled: boolean,
    total: number,
    payment_method: string,
    ordered_at: string,
    delivery_information_id: number
}
export interface IUserInformation {
    firstname: string;
    lastname: string;
    photo: string;
}


export interface IAddOrderItem {
    order_id: number,
    product: number,
    product_name: string,
    product_price: number,
    product_image: string,
    quantity: number
}

export interface IFilePath {
    id: string;
    path: string;
    fullPath: string;
}