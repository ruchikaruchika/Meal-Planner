import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { UserPreferences } from '@/types/types';
import { Leaf, Drumstick, Sprout, X, Sparkles } from 'lucide-react';

interface PreferencesFormProps {
  onSubmit: (preferences: UserPreferences) => void;
  initialPreferences?: UserPreferences;
  isLoading?: boolean;
}

const COMMON_ALLERGIES = ['Dairy', 'Eggs', 'Nuts', 'Gluten', 'Soy', 'Shellfish'];

export function PreferencesForm({ onSubmit, initialPreferences, isLoading }: PreferencesFormProps) {
  const [dietType, setDietType] = useState<UserPreferences['dietType']>(
    initialPreferences?.dietType || 'vegetarian'
  );
  const [calorieGoal, setCalorieGoal] = useState(
    initialPreferences?.calorieGoal?.toString() || '2000'
  );
  const [mealsPerDay, setMealsPerDay] = useState(
    initialPreferences?.mealsPerDay?.toString() || '3'
  );
  const [allergies, setAllergies] = useState<string[]>(
    initialPreferences?.allergies || []
  );
  const [customAllergy, setCustomAllergy] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      dietType,
      calorieGoal: parseInt(calorieGoal) || 2000,
      mealsPerDay: parseInt(mealsPerDay) || 3,
      allergies,
    });
  };

  const toggleAllergy = (allergy: string) => {
    if (allergies.includes(allergy)) {
      setAllergies(allergies.filter(a => a !== allergy));
    } else {
      setAllergies([...allergies, allergy]);
    }
  };

  const addCustomAllergy = () => {
    if (customAllergy.trim() && !allergies.includes(customAllergy.trim())) {
      setAllergies([...allergies, customAllergy.trim()]);
      setCustomAllergy('');
    }
  };

  return (
    <Card variant="elevated" className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl gradient-text">Your Dietary Preferences</CardTitle>
        <CardDescription>
          Tell us about your eating habits and we'll create the perfect meal plan for you
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Diet Type */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Diet Type</Label>
            <RadioGroup
              value={dietType}
              onValueChange={(value) => setDietType(value as UserPreferences['dietType'])}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              <label
                htmlFor="vegan"
                className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  dietType === 'vegan'
                    ? 'border-primary bg-primary/5'
                    : 'border-input hover:border-primary/50'
                }`}
              >
                <RadioGroupItem value="vegan" id="vegan" className="sr-only" />
                <Sprout className={`w-8 h-8 ${dietType === 'vegan' ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className="font-medium">Vegan</span>
                <span className="text-xs text-muted-foreground text-center">Plant-based only</span>
              </label>
              
              <label
                htmlFor="vegetarian"
                className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  dietType === 'vegetarian'
                    ? 'border-primary bg-primary/5'
                    : 'border-input hover:border-primary/50'
                }`}
              >
                <RadioGroupItem value="vegetarian" id="vegetarian" className="sr-only" />
                <Leaf className={`w-8 h-8 ${dietType === 'vegetarian' ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className="font-medium">Vegetarian</span>
                <span className="text-xs text-muted-foreground text-center">No meat or fish</span>
              </label>
              
              <label
                htmlFor="non-vegetarian"
                className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  dietType === 'non-vegetarian'
                    ? 'border-primary bg-primary/5'
                    : 'border-input hover:border-primary/50'
                }`}
              >
                <RadioGroupItem value="non-vegetarian" id="non-vegetarian" className="sr-only" />
                <Drumstick className={`w-8 h-8 ${dietType === 'non-vegetarian' ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className="font-medium">Non-Veg</span>
                <span className="text-xs text-muted-foreground text-center">Includes all foods</span>
              </label>
            </RadioGroup>
          </div>

          {/* Calorie Goal & Meals Per Day */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="calorieGoal" className="text-base font-semibold">
                Daily Calorie Goal
              </Label>
              <Input
                id="calorieGoal"
                type="number"
                min="1200"
                max="4000"
                value={calorieGoal}
                onChange={(e) => setCalorieGoal(e.target.value)}
                placeholder="e.g., 2000"
              />
              <p className="text-xs text-muted-foreground">Recommended: 1500-2500 calories</p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="mealsPerDay" className="text-base font-semibold">
                Meals Per Day
              </Label>
              <RadioGroup
                value={mealsPerDay}
                onValueChange={setMealsPerDay}
                className="flex gap-2"
              >
                {['3', '4', '5'].map((num) => (
                  <label
                    key={num}
                    htmlFor={`meals-${num}`}
                    className={`flex-1 text-center py-2 px-4 rounded-lg border-2 cursor-pointer transition-all ${
                      mealsPerDay === num
                        ? 'border-primary bg-primary/5'
                        : 'border-input hover:border-primary/50'
                    }`}
                  >
                    <RadioGroupItem value={num} id={`meals-${num}`} className="sr-only" />
                    <span className="font-medium">{num}</span>
                  </label>
                ))}
              </RadioGroup>
              <p className="text-xs text-muted-foreground">Includes snacks if 4+</p>
            </div>
          </div>

          {/* Allergies */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Food Allergies / Restrictions</Label>
            <div className="flex flex-wrap gap-2">
              {COMMON_ALLERGIES.map((allergy) => (
                <Badge
                  key={allergy}
                  variant={allergies.includes(allergy) ? 'default' : 'outline'}
                  className={`cursor-pointer transition-all ${
                    allergies.includes(allergy)
                      ? 'bg-destructive hover:bg-destructive/80'
                      : 'hover:bg-secondary'
                  }`}
                  onClick={() => toggleAllergy(allergy)}
                >
                  {allergy}
                  {allergies.includes(allergy) && <X className="w-3 h-3 ml-1" />}
                </Badge>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                placeholder="Add custom allergy..."
                value={customAllergy}
                onChange={(e) => setCustomAllergy(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomAllergy())}
              />
              <Button type="button" variant="outline" onClick={addCustomAllergy}>
                Add
              </Button>
            </div>
            
            {allergies.length > 0 && (
              <p className="text-sm text-muted-foreground">
                Selected: {allergies.join(', ')}
              </p>
            )}
          </div>

          <Button type="submit" variant="hero" size="xl" className="w-full" disabled={isLoading}>
            <Sparkles className="w-5 h-5 mr-2" />
            {isLoading ? 'Generating Your Plan...' : 'Generate My Meal Plan'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
