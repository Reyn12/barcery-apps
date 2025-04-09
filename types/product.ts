export interface Product {
  id: string;
  name: string;
  barcode: string;
  price?: number;
  description?: string;
  imageUrl?: string;
  category?: string;
  stock?: number;
}

// Data dummy untuk testing fitur scan barang
export const dummyProducts: Product[] = [
  {
    id: '1',
    name: 'Bisquit Hatari 250 gr',
    barcode: '073935942400', // debug tambah atau kurangi 0 (073935942400)
    price: 15000,
    description: 'Biskuit Hatari kemasan ekonomis',
    category: 'Makanan',
    stock: 50
  },
  {
    id: '2',
    name: 'Aqua Botol Sanqua 1.5L',
    barcode: '89942873160340',
    price: 5000,
    description: 'Air mineral dalam kemasan botol',
    category: 'Minuman',
    stock: 100
  }
];

// Fungsi untuk mencari produk berdasarkan barcode
export const findProductByBarcode = (barcode: string): Product | undefined => {
  return dummyProducts.find(product => product.barcode === barcode);
};