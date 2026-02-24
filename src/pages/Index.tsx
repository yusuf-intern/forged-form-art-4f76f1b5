import { useState, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { PopularProducts } from '@/components/PopularProducts';
import { ToolGroupGrid } from '@/components/ToolGroupGrid';
import { ProductGroupPage } from '@/components/ProductGroupPage';
import { ProductDetailModal } from '@/components/ProductDetailModal';
import { ContactSection } from '@/components/ContactSection';
import { StoreBreadcrumbs, BreadcrumbItem } from '@/components/StoreBreadcrumbs';
import { Footer } from '@/components/Footer';
import { findToolGroup, Type1Product, ToolGroup, CatalogProduct } from '@/data/catalogData';

type ViewState =
  | { view: 'home' }
  | { view: 'group'; groupId: string }
  | { view: 'product'; groupId: string; productId: string };

const Index = () => {
  const [viewState, setViewState] = useState<ViewState>({ view: 'home' });
  const [modalProduct, setModalProduct] = useState<Type1Product | null>(null);

  const goHome = useCallback(() => {
    setViewState({ view: 'home' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goToGroup = useCallback((groupId: string) => {
    setViewState({ view: 'group', groupId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNavigate = useCallback((section: string) => {
    if (section === 'home') {
      goHome();
    } else if (section === 'catalog') {
      setViewState({ view: 'home' });
      setTimeout(() => {
        document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (section === 'contact') {
      if (viewState.view !== 'home') setViewState({ view: 'home' });
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [viewState]);

  const handlePopularProductClick = useCallback((product: Type1Product & { groupId: string }) => {
    setModalProduct(product);
  }, []);

  // Build breadcrumbs
  const breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', onClick: goHome }];
  let currentGroup: ToolGroup | undefined;

  if (viewState.view === 'group' || viewState.view === 'product') {
    currentGroup = findToolGroup(viewState.groupId);
    if (currentGroup) {
      breadcrumbs.push({
        label: currentGroup.name,
        onClick: viewState.view === 'product' ? () => goToGroup(viewState.groupId) : undefined,
      });
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={handleNavigate} />

      {/* Breadcrumbs */}
      {viewState.view !== 'home' && (
        <div className="pt-[104px]">
          <StoreBreadcrumbs items={breadcrumbs} />
        </div>
      )}

      {/* HOME VIEW */}
      {viewState.view === 'home' && (
        <>
          <Hero onNavigate={handleNavigate} />
          <PopularProducts onProductClick={handlePopularProductClick} />
          <div id="categories">
            <ToolGroupGrid onGroupSelect={goToGroup} />
          </div>
          <ContactSection />
        </>
      )}

      {/* GROUP VIEW */}
      {viewState.view === 'group' && currentGroup && (
        <div>
          <div className="container py-12">
            <ProductGroupPage
              group={currentGroup}
              onProductSelect={() => {}}
              onType1Click={(type1) => setModalProduct(type1)}
            />
          </div>
        </div>
      )}

      <Footer />

      {/* Product Detail Modal */}
      {modalProduct && (
        <ProductDetailModal
          product={modalProduct}
          onClose={() => setModalProduct(null)}
        />
      )}
    </div>
  );
};

export default Index;
