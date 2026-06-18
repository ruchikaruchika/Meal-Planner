import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { WeeklyPlan, DayPlan, Meal, GroceryItem, UserPreferences } from '@/types/types';
import { filterMeals } from '@/constants/meals-data';

interface MealPlanContextType {
  currentPlan: WeeklyPlan | null;
  groceryList: GroceryItem[];
  generatePlan: (preferences: UserPreferences) => void;
  toggleGroceryItem: (name: string) => void;
  addGroceryItem: (item: GroceryItem) => void;
  editGroceryItem: (oldName: string, updatedItem: GroceryItem) => void;
  deleteGroceryItem: (name: string) => void;
  clearPlan: () => void;
  /** Reset all in-memory state (call on logout) */
  resetState: () => void;
}

const MealPlanContext = createContext<MealPlanContextType | undefined>(undefined);

const PLAN_STORAGE_KEY = 'smartmeal_plan';
const GROCERY_STORAGE_KEY = 'smartmeal_grocery';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function getRandomMeal(meals: Meal[]): Meal | null {
  if (meals.length === 0) return null;
  return meals[Math.floor(Math.random() * meals.length)];
}

function generateGroceryList(plan: WeeklyPlan): GroceryItem[] {
  const ingredientMap = new Map<string, GroceryItem>();

  for (const day of plan.days) {
    for (const meal of day.meals) {
      for (const ingredient of meal.ingredients) {
        const key = `${ingredient.name}-${ingredient.unit}`;
        const existing = ingredientMap.get(key);
        
        if (existing) {
          existing.quantity += ingredient.quantity;
        } else {
          ingredientMap.set(key, {
            name: ingredient.name,
            quantity: ingredient.quantity,
            unit: ingredient.unit,
            category: ingredient.category,
            checked: false,
          });
        }
      }
    }
  }

  // Sort by category
  const categoryOrder = ['produce', 'protein', 'dairy', 'grains', 'pantry', 'spices'];
  return Array.from(ingredientMap.values()).sort((a, b) => {
    return categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
  });
}

export function MealPlanProvider({ children }: { children: ReactNode }) {
  const [currentPlan, setCurrentPlan] = useState<WeeklyPlan | null>(() => {
    const stored = localStorage.getItem(PLAN_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const [groceryList, setGroceryList] = useState<GroceryItem[]>(() => {
    // First check for stored grocery list (for demo account or previously saved)
    const storedGrocery = localStorage.getItem(GROCERY_STORAGE_KEY);
    if (storedGrocery) {
      return JSON.parse(storedGrocery);
    }
    // Otherwise generate from plan
    if (currentPlan) {
      return generateGroceryList(currentPlan);
    }
    return [];
  });

  // BUG FIX: Persist grocery list to localStorage whenever it changes.
  // Previously the grocery list was only ever stored by the demo-login flow,
  // so toggling items or generating a new plan never saved.
  useEffect(() => {
    localStorage.setItem(GROCERY_STORAGE_KEY, JSON.stringify(groceryList));
  }, [groceryList]);

  const generatePlan = (preferences: UserPreferences) => {
    const { dietType, calorieGoal, mealsPerDay, allergies } = preferences;
    
    // Calculate approximate calories per meal
    const caloriesPerMeal = Math.floor(calorieGoal / mealsPerDay);
    
    const days: DayPlan[] = DAYS.map(day => {
      const meals: Meal[] = [];
      
      // Always add breakfast
      const breakfastOptions = filterMeals('breakfast', dietType, caloriesPerMeal + 100, allergies);
      const breakfast = getRandomMeal(breakfastOptions);
      if (breakfast) meals.push(breakfast);
      
      // Always add lunch
      const lunchOptions = filterMeals('lunch', dietType, caloriesPerMeal + 150, allergies);
      const lunch = getRandomMeal(lunchOptions);
      if (lunch) meals.push(lunch);
      
      // Always add dinner
      const dinnerOptions = filterMeals('dinner', dietType, caloriesPerMeal + 150, allergies);
      const dinner = getRandomMeal(dinnerOptions);
      if (dinner) meals.push(dinner);
      
      // Add snacks if mealsPerDay > 3
      if (mealsPerDay >= 4) {
        const snackOptions = filterMeals('snack', dietType, 250, allergies);
        const snack = getRandomMeal(snackOptions);
        if (snack) meals.push(snack);
      }
      
      if (mealsPerDay >= 5) {
        const snackOptions = filterMeals('snack', dietType, 250, allergies);
        const snack = getRandomMeal(snackOptions);
        if (snack) meals.push(snack);
      }
      
      return { day, meals };
    });

    const newPlan: WeeklyPlan = {
      id: crypto.randomUUID(),
      userId: '',
      weekStart: new Date().toISOString(),
      days,
      createdAt: new Date().toISOString(),
    };

    setCurrentPlan(newPlan);
    localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(newPlan));
    
    // BUG FIX: Generate AND persist grocery list together.
    const newGroceryList = generateGroceryList(newPlan);
    setGroceryList(newGroceryList);
    // useEffect above will persist to localStorage automatically
  };

  const toggleGroceryItem = (name: string) => {
    setGroceryList(prev => prev.map(item => 
      item.name === name ? { ...item, checked: !item.checked } : item
    ));
    // useEffect persists automatically
  };

  // NEW: Add a custom grocery item
  const addGroceryItem = (item: GroceryItem) => {
    setGroceryList(prev => [...prev, item]);
  };

  // NEW: Edit an existing grocery item by its old name
  const editGroceryItem = (oldName: string, updatedItem: GroceryItem) => {
    setGroceryList(prev => prev.map(item =>
      item.name === oldName ? updatedItem : item
    ));
  };

  // NEW: Delete a grocery item by name
  const deleteGroceryItem = (name: string) => {
    setGroceryList(prev => prev.filter(item => item.name !== name));
  };

  const clearPlan = () => {
    setCurrentPlan(null);
    setGroceryList([]);
    localStorage.removeItem(PLAN_STORAGE_KEY);
    // BUG FIX: Also remove grocery list from localStorage
    localStorage.removeItem(GROCERY_STORAGE_KEY);
  };

  // NEW: Reset all in-memory state without touching localStorage
  // (clearPlan already handles localStorage). Call on logout.
  const resetState = () => {
    setCurrentPlan(null);
    setGroceryList([]);
    localStorage.removeItem(PLAN_STORAGE_KEY);
    localStorage.removeItem(GROCERY_STORAGE_KEY);
  };

  const value = useMemo(() => ({
    currentPlan,
    groceryList,
    generatePlan,
    toggleGroceryItem,
    addGroceryItem,
    editGroceryItem,
    deleteGroceryItem,
    clearPlan,
    resetState,
  }), [currentPlan, groceryList]);

  return (
    <MealPlanContext.Provider value={value}>
      {children}
    </MealPlanContext.Provider>
  );
}

export function useMealPlan() {
  const context = useContext(MealPlanContext);
  if (context === undefined) {
    throw new Error('useMealPlan must be used within a MealPlanProvider');
  }
  return context;
}
