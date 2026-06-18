import { Meal } from '@/types/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Flame, Utensils } from 'lucide-react';

interface MealCardProps {
  meal: Meal;
  compact?: boolean;
}

const mealTypeColors = {
  breakfast: 'meal-breakfast',
  lunch: 'meal-lunch',
  dinner: 'meal-dinner',
  snack: 'meal-snack',
};

const mealTypeIcons = {
  breakfast: '🌅',
  lunch: '☀️',
  dinner: '🌙',
  snack: '🍎',
};

export function MealCard({ meal, compact = false }: MealCardProps) {
  if (compact) {
    return (
      <div className={`p-3 rounded-lg ${mealTypeColors[meal.type]} transition-all hover:scale-[1.02]`}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">{mealTypeIcons[meal.type]}</span>
          <span className="text-xs font-medium uppercase tracking-wide opacity-70">
            {meal.type}
          </span>
        </div>
        <h4 className="font-semibold text-sm leading-tight">{meal.name}</h4>
        <div className="flex items-center gap-3 mt-2 text-xs opacity-70">
          <span className="flex items-center gap-1">
            <Flame className="w-3 h-3" />
            {meal.calories} cal
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {meal.prepTime}m
          </span>
        </div>
      </div>
    );
  }

  return (
    <Card variant="meal" className="overflow-hidden">
      <div className={`h-2 ${mealTypeColors[meal.type]}`} />
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{mealTypeIcons[meal.type]}</span>
            <Badge variant="secondary" className="text-xs capitalize">
              {meal.type}
            </Badge>
          </div>
          <Badge variant="outline" className="text-xs">
            {meal.dietType}
          </Badge>
        </div>
        
        <h3 className="font-bold text-lg font-serif mb-1">{meal.name}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {meal.description}
        </p>
        
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Flame className="w-4 h-4 text-accent-foreground" />
            <span className="font-medium">{meal.calories}</span> cal
          </span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="w-4 h-4 text-primary" />
            <span className="font-medium">{meal.prepTime}</span> min
          </span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Utensils className="w-4 h-4 text-success" />
            <span className="font-medium">{meal.ingredients.length}</span> items
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
