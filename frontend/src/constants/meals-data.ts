import { Meal } from './types';

export const mealsDatabase: Meal[] = [
  // BREAKFAST OPTIONS
  {
    id: 'b1',
    name: 'Avocado Toast with Eggs',
    type: 'breakfast',
    calories: 380,
    dietType: 'vegetarian',
    prepTime: 15,
    description: 'Creamy avocado on toasted sourdough with perfectly poached eggs',
    ingredients: [
      { name: 'Avocado', quantity: 1, unit: 'whole', category: 'produce' },
      { name: 'Sourdough Bread', quantity: 2, unit: 'slices', category: 'grains' },
      { name: 'Eggs', quantity: 2, unit: 'whole', category: 'protein' },
      { name: 'Cherry Tomatoes', quantity: 0.5, unit: 'cup', category: 'produce' },
      { name: 'Salt', quantity: 1, unit: 'pinch', category: 'spices' },
    ],
  },
  {
    id: 'b2',
    name: 'Greek Yogurt Parfait',
    type: 'breakfast',
    calories: 320,
    dietType: 'vegetarian',
    prepTime: 5,
    description: 'Layered Greek yogurt with fresh berries, honey, and granola',
    ingredients: [
      { name: 'Greek Yogurt', quantity: 1, unit: 'cup', category: 'dairy' },
      { name: 'Mixed Berries', quantity: 0.5, unit: 'cup', category: 'produce' },
      { name: 'Granola', quantity: 0.25, unit: 'cup', category: 'grains' },
      { name: 'Honey', quantity: 1, unit: 'tbsp', category: 'pantry' },
    ],
  },
  {
    id: 'b3',
    name: 'Spinach Mushroom Omelette',
    type: 'breakfast',
    calories: 350,
    dietType: 'vegetarian',
    prepTime: 12,
    description: 'Fluffy omelette filled with sautéed spinach and mushrooms',
    ingredients: [
      { name: 'Eggs', quantity: 3, unit: 'whole', category: 'protein' },
      { name: 'Spinach', quantity: 1, unit: 'cup', category: 'produce' },
      { name: 'Mushrooms', quantity: 0.5, unit: 'cup', category: 'produce' },
      { name: 'Cheese', quantity: 0.25, unit: 'cup', category: 'dairy' },
      { name: 'Butter', quantity: 1, unit: 'tbsp', category: 'dairy' },
    ],
  },
  {
    id: 'b4',
    name: 'Overnight Oats',
    type: 'breakfast',
    calories: 290,
    dietType: 'vegan',
    prepTime: 5,
    description: 'Creamy overnight oats with chia seeds and fresh fruits',
    ingredients: [
      { name: 'Rolled Oats', quantity: 0.5, unit: 'cup', category: 'grains' },
      { name: 'Almond Milk', quantity: 1, unit: 'cup', category: 'dairy' },
      { name: 'Chia Seeds', quantity: 1, unit: 'tbsp', category: 'pantry' },
      { name: 'Banana', quantity: 1, unit: 'whole', category: 'produce' },
      { name: 'Maple Syrup', quantity: 1, unit: 'tbsp', category: 'pantry' },
    ],
  },
  {
    id: 'b5',
    name: 'Chicken Sausage Scramble',
    type: 'breakfast',
    calories: 420,
    dietType: 'non-vegetarian',
    prepTime: 15,
    description: 'Scrambled eggs with chicken sausage and bell peppers',
    ingredients: [
      { name: 'Eggs', quantity: 3, unit: 'whole', category: 'protein' },
      { name: 'Chicken Sausage', quantity: 2, unit: 'links', category: 'protein' },
      { name: 'Bell Pepper', quantity: 0.5, unit: 'whole', category: 'produce' },
      { name: 'Onion', quantity: 0.25, unit: 'whole', category: 'produce' },
      { name: 'Olive Oil', quantity: 1, unit: 'tbsp', category: 'pantry' },
    ],
  },

  // LUNCH OPTIONS
  {
    id: 'l1',
    name: 'Quinoa Buddha Bowl',
    type: 'lunch',
    calories: 450,
    dietType: 'vegan',
    prepTime: 25,
    description: 'Nourishing bowl with quinoa, roasted veggies, and tahini dressing',
    ingredients: [
      { name: 'Quinoa', quantity: 0.75, unit: 'cup', category: 'grains' },
      { name: 'Sweet Potato', quantity: 1, unit: 'whole', category: 'produce' },
      { name: 'Chickpeas', quantity: 0.5, unit: 'cup', category: 'protein' },
      { name: 'Kale', quantity: 2, unit: 'cups', category: 'produce' },
      { name: 'Tahini', quantity: 2, unit: 'tbsp', category: 'pantry' },
      { name: 'Lemon', quantity: 0.5, unit: 'whole', category: 'produce' },
    ],
  },
  {
    id: 'l2',
    name: 'Grilled Chicken Salad',
    type: 'lunch',
    calories: 380,
    dietType: 'non-vegetarian',
    prepTime: 20,
    description: 'Fresh mixed greens topped with grilled chicken and balsamic vinaigrette',
    ingredients: [
      { name: 'Chicken Breast', quantity: 6, unit: 'oz', category: 'protein' },
      { name: 'Mixed Greens', quantity: 3, unit: 'cups', category: 'produce' },
      { name: 'Cherry Tomatoes', quantity: 0.5, unit: 'cup', category: 'produce' },
      { name: 'Cucumber', quantity: 0.5, unit: 'whole', category: 'produce' },
      { name: 'Feta Cheese', quantity: 0.25, unit: 'cup', category: 'dairy' },
      { name: 'Balsamic Vinegar', quantity: 2, unit: 'tbsp', category: 'pantry' },
    ],
  },
  {
    id: 'l3',
    name: 'Caprese Panini',
    type: 'lunch',
    calories: 420,
    dietType: 'vegetarian',
    prepTime: 15,
    description: 'Warm panini with fresh mozzarella, tomatoes, and basil pesto',
    ingredients: [
      { name: 'Ciabatta Bread', quantity: 1, unit: 'roll', category: 'grains' },
      { name: 'Fresh Mozzarella', quantity: 4, unit: 'oz', category: 'dairy' },
      { name: 'Tomato', quantity: 1, unit: 'whole', category: 'produce' },
      { name: 'Fresh Basil', quantity: 6, unit: 'leaves', category: 'produce' },
      { name: 'Pesto', quantity: 2, unit: 'tbsp', category: 'pantry' },
    ],
  },
  {
    id: 'l4',
    name: 'Salmon Poke Bowl',
    type: 'lunch',
    calories: 520,
    dietType: 'non-vegetarian',
    prepTime: 20,
    description: 'Fresh salmon over rice with edamame, avocado, and sesame dressing',
    ingredients: [
      { name: 'Salmon', quantity: 5, unit: 'oz', category: 'protein' },
      { name: 'Sushi Rice', quantity: 1, unit: 'cup', category: 'grains' },
      { name: 'Avocado', quantity: 0.5, unit: 'whole', category: 'produce' },
      { name: 'Edamame', quantity: 0.25, unit: 'cup', category: 'protein' },
      { name: 'Cucumber', quantity: 0.5, unit: 'whole', category: 'produce' },
      { name: 'Soy Sauce', quantity: 2, unit: 'tbsp', category: 'pantry' },
      { name: 'Sesame Seeds', quantity: 1, unit: 'tsp', category: 'spices' },
    ],
  },
  {
    id: 'l5',
    name: 'Mediterranean Wrap',
    type: 'lunch',
    calories: 440,
    dietType: 'vegetarian',
    prepTime: 10,
    description: 'Whole wheat wrap filled with hummus, falafel, and fresh vegetables',
    ingredients: [
      { name: 'Whole Wheat Wrap', quantity: 1, unit: 'whole', category: 'grains' },
      { name: 'Hummus', quantity: 3, unit: 'tbsp', category: 'pantry' },
      { name: 'Falafel', quantity: 4, unit: 'pieces', category: 'protein' },
      { name: 'Lettuce', quantity: 1, unit: 'cup', category: 'produce' },
      { name: 'Tomato', quantity: 0.5, unit: 'whole', category: 'produce' },
      { name: 'Red Onion', quantity: 0.25, unit: 'whole', category: 'produce' },
    ],
  },

  // DINNER OPTIONS
  {
    id: 'd1',
    name: 'Herb Roasted Chicken',
    type: 'dinner',
    calories: 520,
    dietType: 'non-vegetarian',
    prepTime: 45,
    description: 'Juicy roasted chicken with rosemary and roasted vegetables',
    ingredients: [
      { name: 'Chicken Thighs', quantity: 8, unit: 'oz', category: 'protein' },
      { name: 'Rosemary', quantity: 2, unit: 'sprigs', category: 'produce' },
      { name: 'Garlic', quantity: 4, unit: 'cloves', category: 'produce' },
      { name: 'Potatoes', quantity: 2, unit: 'whole', category: 'produce' },
      { name: 'Carrots', quantity: 2, unit: 'whole', category: 'produce' },
      { name: 'Olive Oil', quantity: 2, unit: 'tbsp', category: 'pantry' },
    ],
  },
  {
    id: 'd2',
    name: 'Vegetable Stir Fry',
    type: 'dinner',
    calories: 380,
    dietType: 'vegan',
    prepTime: 20,
    description: 'Colorful stir-fried vegetables with tofu in ginger soy sauce',
    ingredients: [
      { name: 'Tofu', quantity: 8, unit: 'oz', category: 'protein' },
      { name: 'Broccoli', quantity: 2, unit: 'cups', category: 'produce' },
      { name: 'Bell Pepper', quantity: 1, unit: 'whole', category: 'produce' },
      { name: 'Snap Peas', quantity: 1, unit: 'cup', category: 'produce' },
      { name: 'Ginger', quantity: 1, unit: 'inch', category: 'produce' },
      { name: 'Soy Sauce', quantity: 3, unit: 'tbsp', category: 'pantry' },
      { name: 'Brown Rice', quantity: 1, unit: 'cup', category: 'grains' },
    ],
  },
  {
    id: 'd3',
    name: 'Pasta Primavera',
    type: 'dinner',
    calories: 480,
    dietType: 'vegetarian',
    prepTime: 25,
    description: 'Penne pasta with seasonal vegetables in a light garlic sauce',
    ingredients: [
      { name: 'Penne Pasta', quantity: 8, unit: 'oz', category: 'grains' },
      { name: 'Zucchini', quantity: 1, unit: 'whole', category: 'produce' },
      { name: 'Cherry Tomatoes', quantity: 1, unit: 'cup', category: 'produce' },
      { name: 'Asparagus', quantity: 1, unit: 'bunch', category: 'produce' },
      { name: 'Parmesan', quantity: 0.25, unit: 'cup', category: 'dairy' },
      { name: 'Garlic', quantity: 3, unit: 'cloves', category: 'produce' },
      { name: 'Olive Oil', quantity: 3, unit: 'tbsp', category: 'pantry' },
    ],
  },
  {
    id: 'd4',
    name: 'Grilled Salmon',
    type: 'dinner',
    calories: 480,
    dietType: 'non-vegetarian',
    prepTime: 25,
    description: 'Perfectly grilled salmon with lemon dill sauce and quinoa',
    ingredients: [
      { name: 'Salmon Fillet', quantity: 6, unit: 'oz', category: 'protein' },
      { name: 'Lemon', quantity: 1, unit: 'whole', category: 'produce' },
      { name: 'Fresh Dill', quantity: 2, unit: 'tbsp', category: 'produce' },
      { name: 'Quinoa', quantity: 0.75, unit: 'cup', category: 'grains' },
      { name: 'Asparagus', quantity: 8, unit: 'spears', category: 'produce' },
      { name: 'Butter', quantity: 1, unit: 'tbsp', category: 'dairy' },
    ],
  },
  {
    id: 'd5',
    name: 'Black Bean Tacos',
    type: 'dinner',
    calories: 420,
    dietType: 'vegan',
    prepTime: 20,
    description: 'Spiced black bean tacos with fresh salsa and guacamole',
    ingredients: [
      { name: 'Black Beans', quantity: 1, unit: 'can', category: 'protein' },
      { name: 'Corn Tortillas', quantity: 4, unit: 'whole', category: 'grains' },
      { name: 'Avocado', quantity: 1, unit: 'whole', category: 'produce' },
      { name: 'Tomato', quantity: 1, unit: 'whole', category: 'produce' },
      { name: 'Onion', quantity: 0.5, unit: 'whole', category: 'produce' },
      { name: 'Cilantro', quantity: 0.25, unit: 'cup', category: 'produce' },
      { name: 'Lime', quantity: 1, unit: 'whole', category: 'produce' },
      { name: 'Cumin', quantity: 1, unit: 'tsp', category: 'spices' },
    ],
  },

  // SNACK OPTIONS
  {
    id: 's1',
    name: 'Apple with Almond Butter',
    type: 'snack',
    calories: 180,
    dietType: 'vegan',
    prepTime: 2,
    description: 'Crisp apple slices with creamy almond butter',
    ingredients: [
      { name: 'Apple', quantity: 1, unit: 'whole', category: 'produce' },
      { name: 'Almond Butter', quantity: 2, unit: 'tbsp', category: 'pantry' },
    ],
  },
  {
    id: 's2',
    name: 'Hummus & Veggies',
    type: 'snack',
    calories: 150,
    dietType: 'vegan',
    prepTime: 5,
    description: 'Creamy hummus with fresh vegetable sticks',
    ingredients: [
      { name: 'Hummus', quantity: 0.25, unit: 'cup', category: 'pantry' },
      { name: 'Carrots', quantity: 2, unit: 'whole', category: 'produce' },
      { name: 'Celery', quantity: 2, unit: 'stalks', category: 'produce' },
      { name: 'Cucumber', quantity: 0.5, unit: 'whole', category: 'produce' },
    ],
  },
  {
    id: 's3',
    name: 'Trail Mix',
    type: 'snack',
    calories: 200,
    dietType: 'vegan',
    prepTime: 1,
    description: 'Energy-boosting mix of nuts, seeds, and dried fruits',
    ingredients: [
      { name: 'Mixed Nuts', quantity: 0.25, unit: 'cup', category: 'pantry' },
      { name: 'Dried Cranberries', quantity: 2, unit: 'tbsp', category: 'pantry' },
      { name: 'Pumpkin Seeds', quantity: 1, unit: 'tbsp', category: 'pantry' },
    ],
  },
  {
    id: 's4',
    name: 'Cheese & Crackers',
    type: 'snack',
    calories: 220,
    dietType: 'vegetarian',
    prepTime: 3,
    description: 'Assorted cheese with whole grain crackers',
    ingredients: [
      { name: 'Cheddar Cheese', quantity: 2, unit: 'oz', category: 'dairy' },
      { name: 'Whole Grain Crackers', quantity: 8, unit: 'crackers', category: 'grains' },
    ],
  },
  {
    id: 's5',
    name: 'Protein Energy Balls',
    type: 'snack',
    calories: 160,
    dietType: 'vegetarian',
    prepTime: 15,
    description: 'No-bake energy balls with oats, honey, and chocolate chips',
    ingredients: [
      { name: 'Rolled Oats', quantity: 0.5, unit: 'cup', category: 'grains' },
      { name: 'Peanut Butter', quantity: 2, unit: 'tbsp', category: 'pantry' },
      { name: 'Honey', quantity: 1, unit: 'tbsp', category: 'pantry' },
      { name: 'Chocolate Chips', quantity: 2, unit: 'tbsp', category: 'pantry' },
    ],
  },
];

export function getMealsByType(type: 'breakfast' | 'lunch' | 'dinner' | 'snack') {
  return mealsDatabase.filter(meal => meal.type === type);
}

export function getMealsByDiet(dietType: 'vegetarian' | 'non-vegetarian' | 'vegan') {
  return mealsDatabase.filter(meal => {
    if (dietType === 'non-vegetarian') return true;
    if (dietType === 'vegetarian') return meal.dietType !== 'non-vegetarian';
    return meal.dietType === 'vegan';
  });
}

export function filterMeals(
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack',
  dietType: 'vegetarian' | 'non-vegetarian' | 'vegan',
  maxCalories?: number,
  allergies?: string[]
) {
  return mealsDatabase.filter(meal => {
    if (meal.type !== type) return false;
    
    // Diet type check
    if (dietType === 'vegetarian' && meal.dietType === 'non-vegetarian') return false;
    if (dietType === 'vegan' && meal.dietType !== 'vegan') return false;
    
    // Calorie check
    if (maxCalories && meal.calories > maxCalories) return false;
    
    // Allergy check (simple check for ingredient names)
    if (allergies && allergies.length > 0) {
      const ingredientNames = meal.ingredients.map(i => i.name.toLowerCase());
      for (const allergy of allergies) {
        if (ingredientNames.some(name => name.includes(allergy.toLowerCase()))) {
          return false;
        }
      }
    }
    
    return true;
  });
}
