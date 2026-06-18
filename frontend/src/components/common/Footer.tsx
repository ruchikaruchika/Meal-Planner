import { Salad, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t bg-card/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Salad className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold font-serif">SmartMeal Planner</span>
          </Link>
          
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-destructive fill-current" /> for healthy eating
          </p>
          
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SmartMeal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
