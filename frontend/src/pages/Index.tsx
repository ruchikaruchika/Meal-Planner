import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import heroImage from '@/assets/hero-food.jpg';
import {
  CalendarDays,
  ShoppingCart,
  Heart,
  Clock,
  Sparkles,
  Leaf,
  Users,
  ChefHat,
} from 'lucide-react';

const features = [
  {
    icon: <CalendarDays className="w-6 h-6" />,
    title: 'Weekly Meal Plans',
    description: 'Auto-generate personalized meal plans based on your dietary preferences and goals.',
  },
  {
    icon: <ShoppingCart className="w-6 h-6" />,
    title: 'Smart Grocery Lists',
    description: 'Automatically create organized shopping lists from your meal plan ingredients.',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Healthy Eating',
    description: 'Choose from vegetarian, vegan, or non-veg options with calorie tracking.',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Save Time',
    description: 'No more wondering what to cook. Plan your entire week in just minutes.',
  },
];

const stats = [
  { number: '50+', label: 'Delicious Recipes' },
  { number: '7', label: 'Days Planned' },
  { number: '100%', label: 'Customizable' },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src={heroImage}
              alt="Healthy meal planning"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
          </div>

          <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary mb-6 animate-fade-in">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Your Personal Meal Planner</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-6 animate-fade-in">
                Plan Smarter,{' '}
                <span className="gradient-text">Eat Healthier</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                SmartMeal Planner helps you create personalized weekly meal plans,
                automatically generate grocery lists, and achieve your health goals
                with ease.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <Link to="/register">
                  <Button variant="hero" size="xl">
                    <Sparkles className="w-5 h-5" />
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="xl">
                    Already have an account?
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
                Everything You Need for{' '}
                <span className="gradient-text">Healthy Eating</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our smart meal planning tools make it easy to eat well, save time, and reduce food waste.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  variant="elevated"
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="pt-6">
                    <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4 text-primary-foreground">
                      {feature.icon}
                    </div>
                    <h3 className="font-bold text-lg mb-2 font-serif">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Target Users Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6">
                  Perfect For{' '}
                  <span className="gradient-text">Busy People</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  Whether you're a student, young professional, or just someone who wants
                  to eat healthier without the hassle, SmartMeal is designed for you.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: <Users className="w-5 h-5" />, text: 'Students & young professionals' },
                    { icon: <Clock className="w-5 h-5" />, text: 'Individuals with busy schedules' },
                    { icon: <ChefHat className="w-5 h-5" />, text: 'People new to cooking' },
                    { icon: <Leaf className="w-5 h-5" />, text: 'Anyone wanting simple weekly planning' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        {item.icon}
                      </div>
                      <span className="font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 gradient-primary opacity-20 blur-3xl rounded-3xl" />
                <Card variant="elevated" className="relative">
                  <CardContent className="p-8">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🥗</div>
                      <h3 className="text-2xl font-bold font-serif mb-2">Ready to Start?</h3>
                      <p className="text-muted-foreground mb-6">
                        Join thousands of people who are eating healthier with SmartMeal Planner.
                      </p>
                      <Link to="/register">
                        <Button variant="hero" size="lg" className="w-full">
                          Create Your Free Account
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
