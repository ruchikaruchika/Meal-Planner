export interface User {
  id: string;
  email: string;
  name: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  dietType: 'vegetarian' | 'non-vegetarian' | 'vegan';
  calorieGoal: number;
  mealsPerDay: number;
  allergies: string[];
}

export interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  ingredients: Ingredient[];
  dietType: 'vegetarian' | 'non-vegetarian' | 'vegan';
  prepTime: number;
  image?: string;
  description: string;
}

export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
  category: 'produce' | 'dairy' | 'protein' | 'grains' | 'pantry' | 'spices';
}

export interface DayPlan {
  day: string;
  meals: Meal[];
}

export interface WeeklyPlan {
  id: string;
  userId: string;
  weekStart: string;
  days: DayPlan[];
  createdAt: string;
}

export interface GroceryItem {
  name: string;
  quantity: number;
  unit: string;
  category: Ingredient['category'];
  checked: boolean;
}

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};
