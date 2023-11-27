
export interface Product {
  id_product?: number ;
  name: string ;
  description: string ;
  dateCreated: string ;
  isApproved: boolean ;
  category: any;
  reviews: any;
  promotions: any;
  images?: File |null;
  owner: any;
  productItems: any
}
