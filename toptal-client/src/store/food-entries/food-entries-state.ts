export interface FoodEntry {
  id: number;
  userId: string;
  price: number;
  calories: number;
  foodName: string;
  date: string;
}

export interface FoodEntriesState {
  data: FoodEntry[];
  loading: boolean;
  created: boolean;
  edited: boolean;
  deleted: boolean;
  error: any;
}
