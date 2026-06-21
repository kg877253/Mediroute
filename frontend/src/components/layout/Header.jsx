import React from 'react';

const Header = () => {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="mark">
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h4l2 6 4-14 2 8h6"/></svg>
        </div>
        <div>
          <div className="name">Medi<span>Route</span></div>
          <div className="tagline">Right Doctor · Right Cost · Right Now</div>
        </div>
      </div>
      <div className="emergency-pill"><span className="dot"></span> Emergency Mode</div>
    </header>
  );
};

export default Header;