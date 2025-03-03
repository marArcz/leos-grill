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

export const DeliveryInformationSchema = z.object({
    firstname: z
        .string(),
    lastname: z
        .string(),
    email:z
        .string()
        .email(),
    street:z
        .string(),
    city:z
        .string(),
    barangay:z 
        .string(),
    phone:z
        .number()
})


export interface IUserInformation {
    firstname: string;
    lastname: string;
    photo: string;
}