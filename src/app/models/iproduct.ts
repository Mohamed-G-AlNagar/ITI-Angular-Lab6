export interface IProduct {
  id: number;
  name: string;
  quantity: number;
  price: number;
  img: string;
  categoryID: number;
  quantityInCart?: number;
}
