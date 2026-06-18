import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { WeeklyPlanView } from '@/components/features/WeeklyPlanView';
import { useAuth } from '@/contexts/AuthContext';
import { useMealPlan } from '@/contexts/MealPlanContext';
import { ShoppingCart, RefreshCw, CalendarX } from 'lucide-react';

const MealPlan = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { currentPlan, clearPlan } = useMealPlan();
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
        {currentPlan ? (
          <>
            <WeeklyPlanView days={currentPlan.days} />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link to="/grocery-list">
                <Button variant="hero" size="lg">
                  <ShoppingCart className="w-5 h-5" />
                  View Grocery List
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" size="lg">
                  <RefreshCw className="w-5 h-5" />
                  Generate New Plan
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-20 animate-fade-in">
            <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-6">
              <CalendarX className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold font-serif mb-2">No Meal Plan Yet</h2>
            <p className="text-muted-foreground mb-6">
              Create your personalized meal plan to get started.
            </p>
            <Link to="/dashboard">
              <Button variant="hero" size="lg">
                Create Your Plan
              </Button>
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MealPlan;
