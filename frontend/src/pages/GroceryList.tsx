import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { GroceryListView } from '@/components/features/GroceryListView';
import { useAuth } from '@/contexts/AuthContext';
import { useMealPlan } from '@/contexts/MealPlanContext';
import { CalendarDays, ShoppingBag } from 'lucide-react';

const GroceryList = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  // BUG FIX: Destructure new CRUD methods from context
  const {
    groceryList,
    toggleGroceryItem,
    addGroceryItem,
    editGroceryItem,
    deleteGroceryItem,
  } = useMealPlan();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-soft">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        {groceryList.length > 0 ? (
          <>
            {/* BUG FIX: Pass add/edit/delete handlers to GroceryListView */}
            <GroceryListView
              items={groceryList}
              onToggle={toggleGroceryItem}
              onAdd={addGroceryItem}
              onEdit={editGroceryItem}
              onDelete={deleteGroceryItem}
            />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link to="/meal-plan">
                <Button variant="outline" size="lg">
                  <CalendarDays className="w-5 h-5" />
                  Back to Meal Plan
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-20 animate-fade-in">
            <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold font-serif mb-2">No Grocery List Yet</h2>
            <p className="text-muted-foreground mb-6">
              Generate a meal plan first to see your grocery list.
            </p>
            <Link to="/dashboard">
              <Button variant="hero" size="lg">
                Create Your Meal Plan
              </Button>
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default GroceryList;
