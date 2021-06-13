export interface Isubscr_POST {
    _id?: string;
    product_name: string;
    time_interval: number;
    product_link: string;
    price: number;
    expiration_date: string;
}

export interface Isubscr_GET {
    _id?: string;
    product_name: string;
    expiration_date: string;
    product_link: string;
    price: number;
}
export interface Isubscr_EDIT {
    _id?: string;
    product_name: string;
    expiration_date: string;
    product_link: string;
    price: number;
}
export interface IPropsModal {
    isOpen: boolean;
    onClose: () => void;
}