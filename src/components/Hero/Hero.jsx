import React from 'react';
import { ArrowRight } from 'lucide-react';
import ParticleNetwork from '../ParticleNetwork/ParticleNetwork';

const Hero = ({ onNavigate }) => {
  return (
    <section className="min-h-screen flex flex-col lg:flex-row items-center justify-between relative pt-20 pb-12 gap-12">
      
      {/* Left Column: Text & Intro */}
      <div className="flex-1 w-full max-w-2xl reveal-up z-20">
        <div className="mb-6 flex items-center gap-4">
          <div className="h-[1px] w-12 bg-[#374151]"></div>
          <span className="font-display tracking-widest text-xs uppercase text-[#6b7280]">Creator: Sandipan Paul</span>
        </div>
        
        <h1 className="text-7xl md:text-8xl lg:text-[9rem] font-display font-bold leading-[0.9] tracking-tighter mb-8 colorful-gradient-text">
          My<br/>Web.
        </h1>
        
        <p className="text-lg md:text-xl text-[#6b7280] font-light leading-relaxed mb-12 border-l border-[#374151] pl-6">
          A central collection of my websites and digital projects. 
          It allows visitors to discover my different projects, understand what each website is made for, and directly visit the websites.
        </p>

        <button 
          onClick={onNavigate}
          className="flex items-center gap-3 hover:text-[#d1d5db] text-[#6b7280] transition-colors duration-500 ease-out cursor-pointer border-none bg-transparent group"
        >
          <div className="w-8 h-8 rounded-full border border-[#1f2937] flex items-center justify-center group-hover:border-[#4b5563] group-hover:bg-[#111] transition-all duration-500 ease-out">
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-500 ease-out" />
          </div>
          <span className="text-sm font-display uppercase tracking-widest premium-shine group-hover:brightness-125 transition-all duration-500">View Collection</span>
        </button>
      </div>

      {/* Right Column: Shape-shifting Node Diagram */}
      <div className="flex-1 w-full h-[50vh] lg:h-screen lg:absolute lg:right-0 lg:top-0 lg:w-1/2 reveal-up delay-200 pointer-events-none lg:pointer-events-auto hardware-accelerated">
        <ParticleNetwork />
      </div>

    </section>
  );
};

export default Hero;
