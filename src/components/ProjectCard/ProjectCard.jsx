import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const ProjectCard = ({ site, index, onClick }) => {
  return (
    <div 
      className={`group cursor-pointer border border-[#1f2937] rounded-2xl p-8 bg-[#0a0a0a]/50 hover:bg-[#111827] backdrop-blur-sm h-full flex flex-col justify-between transition-all duration-500 hover:-translate-y-1`}
      style={{ animationDelay: `${(index % 2) * 100}ms` }}
      onClick={() => onClick(site)}
    >
      <div>
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-3xl font-display font-bold text-[#d1d5db] group-hover:text-[#f3f4f6] transition-colors">{site.name}</h3>
          <div className="w-10 h-10 rounded-full border border-[#374151] flex items-center justify-center group-hover:border-[#6b7280] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
            <ArrowUpRight size={18} className="text-[#6b7280] group-hover:text-[#9ca3af]" />
          </div>
        </div>
        <p className="text-[#6b7280] font-light leading-relaxed">{site.shortDesc}</p>
      </div>
      
      {site.features && (
        <div className="mt-8 flex flex-wrap gap-2">
          {site.features.map(f => (
            <span key={f} className="text-[10px] font-display uppercase tracking-wider px-2 py-1 rounded border border-[#374151] bg-[#111827] text-[#6b7280]">
              {f}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
