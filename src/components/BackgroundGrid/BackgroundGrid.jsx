import React from 'react';

const BackgroundGrid = () => {
  return (
    <div className="bg-grid">
      <div className="bg-grid-line"></div>
      <div className="bg-grid-line hidden md:block"></div>
      <div className="bg-grid-line"></div>
      <div className="bg-grid-line hidden md:block"></div>
      <div className="bg-grid-line"></div>
    </div>
  );
};

export default BackgroundGrid;
