import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { PreferencesForm } from '@/components/features/PreferencesForm';
import { useAuth } from '@/contexts/AuthContext';
import { useMealPlan } from '@/contexts/MealPlanContext';
import { UserPreferences } from '@/types/types';
import {
  CalendarDays,
  ShoppingCart,
  Settings,
  Sparkles,
  ChefHat,
  Flame,
} from 'lucide-react';

const Dashboard = () => {
  const { isAuthenticated, isLoading: authLoading, user, updatePreferences } = useAuth();
  const { currentPlan, groceryList, generatePlan } = useMealPlan();
  const navigate = useNavigate();
  const [showPreferences, setShowPreferences] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 animate-pulse-soft">
            <ChefHat className="w-8 h-8 text-primary-foreground" />
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const handleGeneratePlan = (preferences: UserPreferences) => {
    setIsGenerating(true);
    updatePreferences(preferences);
    
    // Simulate loading for better UX
    setTimeout(() => {
      generatePlan(preferences);
      setIsGenerating(false);
      setShowPreferences(false);
    }, 1500);
  };

  const totalCalories = currentPlan?.days.reduce(
    (sum, day) => sum + day.meals.reduce((daySum, meal) => daySum + meal.calories, 0),
    0
  ) || 0;

  const totalMeals = currentPlan?.days.reduce(
    (sum, day) => sum + day.meals.length,
    0
  ) || 0;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold font-serif mb-2">
            Hello, <span className="gradient-text">{user?.name}</span>! 👋
          </h1>
          <p className="text-muted-foreground">
            {currentPlan
              ? 'Your meal plan is ready! Check out your weekly meals below.'
              : 'Let\'s create your personalized meal plan.'}
          </p>
        </div>

        {/* Show preferences form if no plan or user wants to update */}
        {(showPreferences || !currentPlan) && (
          <div className="mb-8 animate-fade-in">
            <PreferencesForm
              onSubmit={handleGeneratePlan}
              initialPreferences={user?.preferences}
              isLoading={isGenerating}
            />
            {currentPlan && (
              <div className="text-center mt-4">
                <Button variant="ghost" onClick={() => setShowPreferences(false)}>
                  Cancel
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Dashboard Cards */}
        {currentPlan && !showPreferences && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card variant="elevated" className="animate-fade-in">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                    <CalendarDays className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-2xl font-bold">{currentPlan.days.length}</p>
                  <p className="text-sm text-muted-foreground">Days Planned</p>
                </CardContent>
              </Card>

              <Card variant="elevated" className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mx-auto mb-2">
                    <ChefHat className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <p className="text-2xl font-bold">{totalMeals}</p>
                  <p className="text-sm text-muted-foreground">Total Meals</p>
                </CardContent>
              </Card>

              <Card variant="elevated" className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-2">
                    <Flame className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <p className="text-2xl font-bold">{Math.round(totalCalories / 7)}</p>
                  <p className="text-sm text-muted-foreground">Avg Cal/Day</p>
                </CardContent>
              </Card>

              <Card variant="elevated" className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center mx-auto mb-2">
                    <ShoppingCart className="w-6 h-6 text-success-foreground" />
                  </div>
                  <p className="text-2xl font-bold">{groceryList.length}</p>
                  <p className="text-sm text-muted-foreground">Grocery Items</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Link to="/meal-plan" className="block">
                <Card variant="meal" className="h-full">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-2">
                      <CalendarDays className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <CardTitle>View Meal Plan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      See your complete weekly meal plan with all recipes and nutritional info.
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/grocery-list" className="block">
                <Card variant="meal" className="h-full">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-xl bg-success/20 flex items-center justify-center mb-2">
                      <ShoppingCart className="w-7 h-7 text-success-foreground" />
                    </div>
                    <CardTitle>Grocery List</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      View your organized shopping list with all ingredients you'll need.
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Card
                variant="meal"
                className="h-full cursor-pointer"
                onClick={() => setShowPreferences(true)}
              >
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-2">
                    <Settings className="w-7 h-7 text-secondary-foreground" />
                  </div>
                  <CardTitle>Update Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Change your dietary preferences and generate a new meal plan.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Generate New Plan Button */}
            <div className="text-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowPreferences(true)}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Generate New Plan
              </Button>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
