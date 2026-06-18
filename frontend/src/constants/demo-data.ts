import { User, WeeklyPlan, GroceryItem, UserPreferences } from './types';
import { mealsDatabase } from './meals-data';

export const DEMO_EMAIL = 'demo@smartmeal.com';
export const DEMO_PASSWORD = 'demo123';

export const demoPreferences: UserPreferences = {
  dietType: 'non-vegetarian',
  calorieGoal: 2000,
  mealsPerDay: 4,
  allergies: [],
};

export const demoUser: User = {
  id: 'demo-user-001',
  email: DEMO_EMAIL,
  name: 'Sarah Demo',
  preferences: demoPreferences,
};

// Get specific meals for demo plan
const getBreakfast = (index: number) => mealsDatabase.filter(m => m.type === 'breakfast')[index % 4];
const getLunch = (index: number) => mealsDatabase.filter(m => m.type === 'lunch')[index % 4];
const getDinner = (index: number) => mealsDatabase.filter(m => m.type === 'dinner')[index % 4];
const getSnack = (index: number) => mealsDatabase.filter(m => m.type === 'snack')[index % 4];

export const demoPlan: WeeklyPlan = {
  id: 'demo-plan-001',
  userId: 'demo-user-001',
  weekStart: new Date().toISOString(),
  days: [
    {
      day: 'Monday',
      meals: [getBreakfast(0), getLunch(0), getDinner(0), getSnack(0)],
    },
    {
      day: 'Tuesday',
      meals: [getBreakfast(1), getLunch(1), getDinner(1), getSnack(1)],
    },
    {
      day: 'Wednesday',
      meals: [getBreakfast(2), getLunch(2), getDinner(2), getSnack(2)],
    },
    {
      day: 'Thursday',
      meals: [getBreakfast(3), getLunch(3), getDinner(3), getSnack(3)],
    },
    {
      day: 'Friday',
      meals: [getBreakfast(0), getLunch(1), getDinner(2), getSnack(3)],
    },
    {
      day: 'Saturday',
      meals: [getBreakfast(1), getLunch(2), getDinner(3), getSnack(0)],
    },
    {
      day: 'Sunday',
      meals: [getBreakfast(2), getLunch(3), getDinner(0), getSnack(1)],
    },
  ],
  createdAt: new Date().toISOString(),
};

export const demoGroceryList: GroceryItem[] = [
  // Produce
  { name: 'Bananas', quantity: 7, unit: 'pcs', category: 'produce', checked: true },
  { name: 'Blueberries', quantity: 3, unit: 'cups', category: 'produce', checked: false },
  { name: 'Mixed Greens', quantity: 4, unit: 'cups', category: 'produce', checked: true },
  { name: 'Cherry Tomatoes', quantity: 3, unit: 'cups', category: 'produce', checked: false },
  { name: 'Cucumber', quantity: 2, unit: 'pcs', category: 'produce', checked: false },
  { name: 'Avocado', quantity: 4, unit: 'pcs', category: 'produce', checked: true },
  { name: 'Broccoli', quantity: 4, unit: 'cups', category: 'produce', checked: false },
  { name: 'Bell Peppers', quantity: 3, unit: 'pcs', category: 'produce', checked: false },
  { name: 'Spinach', quantity: 3, unit: 'cups', category: 'produce', checked: true },
  { name: 'Apples', quantity: 5, unit: 'pcs', category: 'produce', checked: false },
  
  // Protein
  { name: 'Chicken Breast', quantity: 1200, unit: 'g', category: 'protein', checked: false },
  { name: 'Salmon Fillet', quantity: 800, unit: 'g', category: 'protein', checked: true },
  { name: 'Eggs', quantity: 12, unit: 'pcs', category: 'protein', checked: true },
  { name: 'Tofu', quantity: 400, unit: 'g', category: 'protein', checked: false },
  { name: 'Ground Turkey', quantity: 500, unit: 'g', category: 'protein', checked: false },
  
  // Dairy
  { name: 'Greek Yogurt', quantity: 4, unit: 'cups', category: 'dairy', checked: true },
  { name: 'Milk', quantity: 2, unit: 'liters', category: 'dairy', checked: false },
  { name: 'Cheese', quantity: 200, unit: 'g', category: 'dairy', checked: false },
  { name: 'Butter', quantity: 100, unit: 'g', category: 'dairy', checked: true },
  
  // Grains
  { name: 'Oats', quantity: 3, unit: 'cups', category: 'grains', checked: true },
  { name: 'Brown Rice', quantity: 3, unit: 'cups', category: 'grains', checked: false },
  { name: 'Quinoa', quantity: 2, unit: 'cups', category: 'grains', checked: false },
  { name: 'Whole Wheat Bread', quantity: 1, unit: 'loaf', category: 'grains', checked: true },
  { name: 'Pasta', quantity: 500, unit: 'g', category: 'grains', checked: false },
  
  // Pantry
  { name: 'Olive Oil', quantity: 1, unit: 'bottle', category: 'pantry', checked: true },
  { name: 'Honey', quantity: 1, unit: 'jar', category: 'pantry', checked: false },
  { name: 'Almonds', quantity: 1, unit: 'cup', category: 'pantry', checked: true },
  { name: 'Peanut Butter', quantity: 1, unit: 'jar', category: 'pantry', checked: false },
  { name: 'Hummus', quantity: 2, unit: 'containers', category: 'pantry', checked: false },
  
  // Spices
  { name: 'Salt', quantity: 1, unit: 'tbsp', category: 'spices', checked: true },
  { name: 'Black Pepper', quantity: 1, unit: 'tbsp', category: 'spices', checked: true },
  { name: 'Garlic Powder', quantity: 1, unit: 'tbsp', category: 'spices', checked: false },
  { name: 'Cumin', quantity: 1, unit: 'tsp', category: 'spices', checked: false },
  { name: 'Paprika', quantity: 1, unit: 'tsp', category: 'spices', checked: true },
];
