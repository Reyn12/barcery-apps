export interface NutritionInfo {
  energiTotal: number; // dalam kkal
  energiDariLemak: number; // dalam kkal
  lemakTotal: number; // dalam gram
  kolesterol: number; // dalam mg
  lemakJenuh: number; // dalam gram
  protein: number; // dalam gram
  karbohidratTotal: number; // dalam gram
  gulaTotal: number; // dalam gram
  sukrosa: number; // dalam gram
  laktosa: number; // dalam gram
  garam: number; // dalam mg (natrium)
  
  // Persentase AKG
  karboPersenAKG: number;
  proteinPersenAKG: number;
  lemakPersenAKG: number;
  natriumPersenAKG: number;
}

export enum Affiliation {
  ISRAEL = 'israel',
  LGBT = 'lgbt',
  NONE = 'none'
}

export interface Product {
  id: string;
  name: string;
  barcode: string;
  price?: number;
  description?: string;
  imageUrl?: string;
  category?: string;
  stock?: number;
  
  // Field baru
  variation?: string;
  affiliations?: string[]; // Bisa kosong, atau berisi satu atau dua nilai (misalnya ["israel", "lgbt"])
  nutritionInfo?: NutritionInfo;
  composition?: string[]; // Array dari bahan-bahan
}