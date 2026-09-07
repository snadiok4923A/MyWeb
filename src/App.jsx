import React, { useState, useEffect } from 'react';
import BackgroundGrid from './components/BackgroundGrid/BackgroundGrid';
import DetailsModal from './components/DetailsModal/DetailsModal';
import Hero from './components/Hero/Hero';
import Collection from './components/Collection/Collection';

export default function App() {
  const [selectedSite, setSelectedSite] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle escape key for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedSite) {
        setSelectedSite(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedSite]);

  // Handle ultra-smooth page transitions
  const navigateTo = (page) => {
    if (page === currentPage) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsTransitioning(false);
    }, 400); // Wait for fade out before swapping content
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#9ca3af] font-sans selection:bg-[#374151] selection:text-[#d1d5db] overflow-hidden">
      
      <BackgroundGrid />

      <main className={`relative z-10 container mx-auto px-6 md:px-12 lg:px-24 transition-opacity duration-500 ${isTransitioning ? 'page-fade-exit' : 'page-fade-enter'}`}>
        
        {currentPage === 'home' ? (
          <Hero onNavigate={() => navigateTo('collection')} />
        ) : (
          <Collection 
            onNavigate={() => navigateTo('home')} 
            onSelectProject={setSelectedSite} 
          />
        )}

      </main>

      <DetailsModal 
        site={selectedSite} 
        onClose={() => setSelectedSite(null)} 
      />

    </div>
  );
}