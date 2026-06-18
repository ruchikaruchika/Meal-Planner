import { DayPlan } from '@/types/types';
import { MealCard } from './MealCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, Flame } from 'lucide-react';

interface WeeklyPlanViewProps {
  days: DayPlan[];
}

const dayColors = [
  'border-l-4 border-l-breakfast',
  'border-l-4 border-l-lunch',
  'border-l-4 border-l-dinner',
  'border-l-4 border-l-snack',
  'border-l-4 border-l-primary',
  'border-l-4 border-l-secondary',
  'border-l-4 border-l-accent',
];

export function WeeklyPlanView({ days }: WeeklyPlanViewProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
          <CalendarDays className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-2xl font-bold font-serif">Your Weekly Meal Plan</h2>
          <p className="text-muted-foreground">7 days of delicious, healthy meals</p>
        </div>
      </div>

      <div className="grid gap-4">
        {days.map((day, index) => {
          const totalCalories = day.meals.reduce((sum, meal) => sum + meal.calories, 0);
          
          return (
            <Card
              key={day.day}
              variant="elevated"
              className={`overflow-hidden animate-fade-in ${dayColors[index % dayColors.length]}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{day.day}</CardTitle>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Flame className="w-4 h-4 text-accent-foreground" />
                    <span className="font-semibold">{totalCalories}</span> calories
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {day.meals.map((meal, mealIndex) => (
                    <MealCard key={`${meal.id}-${mealIndex}`} meal={meal} compact />
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
