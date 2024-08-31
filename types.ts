import Stripe from "stripe";
export interface Song {
    id : string;
    author : string;
    user_id : string;
    title : string;
    song_path : string;
    image_path : string;
}
export interface UserDetails {
    id: string;
    first_name: string;
    last_name: string;
    full_name?: string;
    avatar_url?: string;
    billing_address?: Stripe.Address;
    payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
}
export interface Product {
    id: string;
    name?: string;
    image?: string;
    description?: string;
    active?: boolean;
    metadata?: Stripe.Metadata;
}
export interface Price {
    id: string;
    product_id: string;
    unit_amount?: number;
    description?: string;
    active?: boolean;
    currency?: string;
    type?: Stripe.Price.Type;
    interval?: Stripe.Price.Recurring.Interval;
    interval_count?: number;
    trial_period_days?: number | null;
    metadata? : Stripe.Metadata; 
    products?: Product;
}
export interface Subscription {
    id: string;
    user_id: string;
    metadata?: Stripe.Metadata;
    price_id?: string;
    status?: Stripe.Subscription.Status;
    quantity?: number;
    created: string;
    cancel_at_period_end?: boolean;
    current_period_start: string;
    current_period_end: string;
    ended_at?: string;
    cancel_at?: string;
    canceled_at?: string;
    trial_start?: string;
    trial_end?: string;
    prices?: Price;
}