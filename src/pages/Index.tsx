import { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { CategoryGrid } from '@/components/CategoryGrid';
import { ProductCatalog } from '@/components/ProductCatalog';
import { Footer } from '@/components/Footer';

const Index = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();

  const handleNavigate = (section: string) => {
    if (section === 'home') {
      setActiveSection('home');
      setSelectedCategory(undefined);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'catalog' || section === 'all') {
      setActiveSection('catalog');
      setSelectedCategory(undefined);
      document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // It's a category
      setActiveSection('catalog');
      setSelectedCategory(section);
      document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={handleNavigate} />
      
      {activeSection === 'home' && (
        <>
          <Hero onNavigate={handleNavigate} />
          <CategoryGrid onCategorySelect={handleNavigate} />
        </>
      )}
      
      <ProductCatalog initialCategory={selectedCategory} />
      
      <Footer />
    </div>
  );
};

export default Index;
