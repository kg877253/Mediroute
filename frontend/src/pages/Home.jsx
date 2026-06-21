import React, { useState } from 'react';

const Home = () => {
  const [symptoms, setSymptoms] = useState('');
  const [activeChips, setActiveChips] = useState([]);

  const handleChipClick = (label) => {
    const newActiveChips = activeChips.includes(label)
      ? activeChips.filter((chip) => chip !== label)
      : [...activeChips, label];

    setActiveChips(newActiveChips);

    const symptomsFromChips = newActiveChips.join(', ');
    // A simple logic to combine chip text with existing text
    // You might want a more sophisticated logic here
    if (symptoms && !activeChips.some(chip => symptoms.includes(chip))) {
        setSymptoms(symptoms + ', ' + symptomsFromChips);
    } else {
        setSymptoms(symptomsFromChips);
    }
  };

  return (
    <div className="shell">
      {/* LEFT: narrative + route */}
      <div>
        <div className="eyebrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
          Powered by Gemini 2.5 Flash
        </div>

        <h1 className="hero">
          Find the right<br/>
          specialist <span className="accent">in under 60 seconds
            <svg viewBox="0 0 200 14" preserveAspectRatio="none"><path d="M2 10 Q50 2 100 9 T198 6" stroke="#6FD6C4" strokeWidth="4" fill="none" strokeLinecap="round"/></svg>
          </span>.
        </h1>

        <p className="lede">
          MediRoute turns plain-language symptoms into a verified care route — the right clinical specialty,
          an urgency rating, and doctors near you, in three steps.
        </p>

        <div className="stats">
          <div className="stat">
            <div className="num">8</div>
            <div className="lbl">Specialties</div>
          </div>
          <div className="stat">
            <div className="num">5</div>
            <div className="lbl">Cities</div>
          </div>
          <div className="stat">
            <div className="num live">24/7</div>
            <div className="lbl">Emergency</div>
          </div>
        </div>

        <div className="route-track">
          <h3 className="kicker">Your Care Route</h3>
          <div className="route-line"><div className="fill"></div></div>

          <div className="route-step">
            <div className="node">1</div>
            <div className="body">
              <strong>Describe symptoms</strong>
              <span>Plain language — no medical jargon needed.</span>
            </div>
          </div>
          <div className="route-step">
            <div className="node">2</div>
            <div className="body">
              <strong>AI triage selection</strong>
              <span>Matched against whitelisted specialties.</span>
            </div>
          </div>
          <div className="route-step">
            <div className="node">3</div>
            <div className="body">
              <strong>Verified recommendations</strong>
              <span>Doctors with transparent, upfront pricing.</span>
            </div>
          </div>
        </div>

        <div className="disclaimer">
          <svg viewBox="0 0 24 24" fill="none" stroke="#8A6D1A" strokeWidth="2"><path d="M12 9v4"/><path d="M12 17h.01"/><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>
          <span><strong>Navigation support only.</strong> MediRoute never provides definitive clinical diagnoses or treats emergency conditions. In a medical emergency, call your local emergency number immediately.</span>
        </div>
      </div>

      {/* RIGHT: form card */}
      <div>
        <div className="recent-strip">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
          Recent: <b>cough</b><span className="sep">·</span>Delhi<span className="sep">·</span>General Physician
        </div>

        <div className="card">
          <div className="card-head">
            <div className="step-eyebrow">Start a Care Route</div>
            <h2>Describe your symptoms</h2>
            <p>Our AI matches what you're feeling to the right specialist.</p>
          </div>

          <div className="card-body">

            <div className="field">
              <div className="field-label-row">
                <label className="field-label">What symptoms are you experiencing?</label>
                <button className="mic-btn" type="button">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><path d="M12 19v4"/></svg>
                  Speak symptoms
                </button>
              </div>
              <textarea 
                placeholder="e.g. 'I have a dry cough, mild fever, and shortness of breath starting yesterday'…"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
              ></textarea>
            </div>

            <div className="field">
              <label className="field-label" style={{display:'block', marginBottom:'10px'}}>Select city</label>
              <select className="city-select">
                <option>Delhi</option>
                <option>Mumbai</option>
                <option>Bengaluru</option>
                <option>Hyderabad</option>
                <option>Chennai</option>
              </select>
            </div>

            <div className="field" style={{marginBottom:'28px'}}>
              <label className="field-label" style={{display:'block', marginBottom:'10px'}}>Quick symptoms</label>
              <div className="chip-row">
                {['Chest pain', 'Skin rash', 'Tooth pain', 'Child fever', 'Ear pain', 'Severe headache'].map(label => (
                  <button 
                    key={label}
                    className={`chip ${activeChips.includes(label) ? 'active' : ''}`} 
                    type="button"
                    onClick={() => handleChipClick(label)}
                  >
                    <span className="dot"></span>{label}
                  </button>
                ))}
              </div>
            </div>

            <button className="submit-btn" type="button">
              Find My Doctor
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M13 5l7 7-7 7"/></svg>
            </button>
            <div className="footnote">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Navigation only · Not a substitute for professional medical advice
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;