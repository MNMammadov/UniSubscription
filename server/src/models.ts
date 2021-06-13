
export interface Isubscr_GET {
    _id?: string;
    product_name: string;
    expiration_date: string;
    product_link: string;
    price: Number;
}

export interface Isubscr_POST {
    _id?: string;
    product_name: string;
    time_interval: Number;
    product_link: string;
    price: Number;
}