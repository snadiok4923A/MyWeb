import React from 'react';
import { ArrowLeft } from 'lucide-react';
import ProjectCard from '../ProjectCard/ProjectCard';
import websitesData from '../../data/websiteData';

const Collection = ({ onNavigate, onSelectProject }) => {
  return (
    <section className="py-24 min-h-screen relative z-20">
      
      {/* Back to Home Button */}
      <button 
        onClick={onNavigate}
        className="mb-16 flex items-center gap-3 hover:text-[#d1d5db] text-[#6b7280] transition-colors duration-500 ease-out cursor-pointer border-none bg-transparent group reveal-up"
      >
        <div className="w-8 h-8 rounded-full border border-[#1f2937] flex items-center justify-center group-hover:border-[#4b5563] group-hover:bg-[#111] transition-all duration-500 ease-out">
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform duration-500 ease-out" />
        </div>
        <span className="text-sm font-display uppercase tracking-widest">Home</span>
      </button>

      <div className="mb-16 reveal-up delay-100">
        <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-4 flex items-baseline gap-4 text-[#d1d5db]">
          Collection <span className="text-[#374151] text-2xl font-light">{String(websitesData.length).padStart(2, '0')}</span>
        </h2>
        <div className="h-[1px] w-full bg-[#1f2937]"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {websitesData.map((site, index) => (
          <ProjectCard 
            key={site.id} 
            site={site} 
            index={index} 
            onClick={onSelectProject} 
          />
        ))}
      </div>
    </section>
  );
};

export default Collection;
