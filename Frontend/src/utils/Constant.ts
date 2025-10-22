
export type InputFieldProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control:any;
    placeholder:string;
    name:string;
    label:string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type?:any;
    disable?:boolean;
}

export type MenuItemProps = {
    image:string;
    text:string;
    route:string;
}

export type HeaderProps = {
    title:string;
    plusClick?:() =>void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    searchInput?:any;
    value?:string;
}

export type CategoryProps = {
    _id:string;
    name:string;
    image?:string;
}

export type UserProps = {
    _id:string;
    name:string;
    email:string;
    phoneNumber:string;
    isActive:boolean;
    role:string;
}

export type CreateCategoryProps = {
    name:string;
    image:string;
}

export type ProductProps = {
    _id:string;
    name:string;
    images:string[];
    category:string;
    quantity:number;
    price:number;
    productFeature:string;
    isShippingRequired?:string;
    customerSalePrice:number;
}

export type CreateProductProps = {
    name:string;
    images:string[];
    category:string;
    quantity:number;
    price:number;
    productFeature:string;
}

export type OrderProduct = {
    _id:string;
    name:string;
    quantity:number;
    totalPrice:number;
    product:string;
    image:string;
}

export type DeliveryProps  = {
    name:string;
    phoneNumber:string;
    country:string;
}

export type OrderProps = {
    _id:string;
    email:string;
    products:OrderProduct[]
    paymentMethod?:string;
    totalPayment:number;
    paymentDate:string;
    status?:string;
    delivery?:DeliveryProps
}

export type CancelBtnProps = {
    title:string;
    cancelClick:() =>void;
}

export type SubmittedBtnProps = {
    title:string;
}

export type SelectFormFieldProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control:any;
    placeholder:string;
    name:string;
    label:string;
    categoryList?:CategoryProps[]
}

export type DashboardProps = {
    title:string;
    background:string;
    length:string | number;
}

export type OrderHistoryProps = {
    _id:string;
    image:string;
    name:string;
    quantity:number;
    price:number;
}

export type confirmDeleteProps =  {
  open: boolean;
  itemName: string;
  handleConfirmDelete: () => void;
  isPending: boolean;
  handleCancelDelete:() =>void;
}

export type PaginationProps = {
    currentPage:number;
    handlePrevPageClick:() => void;
    handleNextPageClick:()=>void;
}

export type postPaginationProps = {
    page:number;
}

export type searchProps = {
    search:string;
}

export type AdvertisingProps = {
    _id:string;
    title:string;
}

export type CreateAdvertisingProps = {
    title:string;
}