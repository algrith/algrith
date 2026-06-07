'use client';

import { useEffect, useState } from 'react';

import { FontListWrapper, FontPreviewWrapper, PairingsWrapper, Wrapper } from './styled';
import { SelectProps } from 'antd/es/select';
import { LabelWrapper } from '../styled';

type FontRole = 'heading' | 'body';

export interface FontPairing {
  description: string;
  heading: FontOption;
  body: FontOption;
  name: string;
}

export interface FontOption {
  googleFont: string;
  category: string;
  family: string;
  name: string;
  tags: string;
}

const FONTS: FontOption[] = [
  { name: 'Playfair Display',  family: "'Playfair Display', serif",     category: 'serif',      tags: 'editorial · luxury',     googleFont: 'Playfair+Display:wght@400;600;700' },
  { name: 'DM Serif Display',  family: "'DM Serif Display', serif",     category: 'serif',      tags: 'refined · classic',      googleFont: 'DM+Serif+Display' },
  { name: 'Cormorant',         family: "'Cormorant', serif",            category: 'serif',      tags: 'elegant · high-fashion', googleFont: 'Cormorant:wght@400;500;600' },
  { name: 'Lora',              family: "'Lora', serif",                 category: 'serif',      tags: 'readable · warm',        googleFont: 'Lora:wght@400;500;600' },
  { name: 'Libre Baskerville', family: "'Libre Baskerville', serif",    category: 'serif',      tags: 'traditional · book',     googleFont: 'Libre+Baskerville:wght@400;700' },
  { name: 'Instrument Sans',   family: "'Instrument Sans', sans-serif", category: 'sans-serif', tags: 'clean · modern',         googleFont: 'Instrument+Sans:wght@400;500;600' },
  { name: 'DM Sans',           family: "'DM Sans', sans-serif",         category: 'sans-serif', tags: 'friendly · geometric',   googleFont: 'DM+Sans:wght@400;500;600' },
  { name: 'Syne',              family: "'Syne', sans-serif",            category: 'sans-serif', tags: 'bold · graphic',         googleFont: 'Syne:wght@400;600;700;800' },
  { name: 'Outfit',            family: "'Outfit', sans-serif",          category: 'sans-serif', tags: 'neutral · versatile',    googleFont: 'Outfit:wght@300;400;500;600' },
  { name: 'Plus Jakarta Sans', family: "'Plus Jakarta Sans', sans-serif",category:'sans-serif', tags: 'sharp · contemporary',   googleFont: 'Plus+Jakarta+Sans:wght@400;500;600' },
  { name: 'Fraunces',          family: "'Fraunces', serif",             category: 'display',    tags: 'quirky · expressive',    googleFont: 'Fraunces:wght@400;600;700' },
  { name: 'Bebas Neue',        family: "'Bebas Neue', sans-serif",      category: 'display',    tags: 'condensed · impactful',  googleFont: 'Bebas+Neue' },
  { name: 'JetBrains Mono',    family: "'JetBrains Mono', monospace",   category: 'monospace',  tags: 'code · technical',       googleFont: 'JetBrains+Mono:wght@400;500;600' },
  { name: 'Fira Code',         family: "'Fira Code', monospace",        category: 'monospace',  tags: 'code · ligatures',       googleFont: 'Fira+Code:wght@400;500;600' },
];

const PAIRINGS: FontPairing[] = [
  { name: 'Classic Editorial', description: 'Timeless luxury feel',     heading: FONTS[0],  body: FONTS[6]  },
  { name: 'Modern Agency',     description: 'Clean and confident',      heading: FONTS[7],  body: FONTS[5]  },
  { name: 'High Fashion',      description: 'Elegant and refined',      heading: FONTS[2],  body: FONTS[8]  },
  { name: 'Bold Studio',       description: 'Graphic and expressive',   heading: FONTS[10], body: FONTS[9]  },
  { name: 'Tech Forward',      description: 'Sharp and minimal',        heading: FONTS[1],  body: FONTS[12] },
  { name: 'Warm Editorial',    description: 'Approachable and readable', heading: FONTS[3], body: FONTS[6]  },
];

const CATEGORIES = ['all', 'serif', 'sans-serif', 'display', 'monospace'];

const FontSelector = ({ onChange, label, ...props }: SelectProps) => {
  const [loadedFonts, setLoadedFonts] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPairing, setSelectedPairing] = useState<number>(-1);
  const [activeRole, setActiveRole] = useState<FontRole>('heading');
  const [heading, setHeading] = useState<FontOption | null>(null);
  const [body, setBody] = useState<FontOption | null>(null);

  const currentSelected = activeRole === 'heading' ? heading : body;

  const filteredFonts = FONTS.filter((font) => (
    activeCategory === 'all' ? true : font.category === activeCategory
  ));

  const handleSelectPairing = (index: number) => {
    const newIndex = index === selectedPairing ? -1 : index;
    const pairing = PAIRINGS?.[newIndex];

    if (!pairing) {
      setSelectedPairing(-1);
      setHeading(null);
      setBody(null);
      onChange?.({ target: { id: props?.id, value: { heading: null, body: null } } });
      return;
    }

    loadFont(pairing.heading);
    loadFont(pairing.body);

    setSelectedPairing(newIndex);
    setHeading(pairing.heading);
    setBody(pairing.body);
    onChange?.({ target: { id: props?.id, value: { heading: pairing.heading, body: pairing.body } } });
  };

  const handleSelectFont = (font: FontOption) => {
    loadFont(font);
    setSelectedPairing(-1);

    if (activeRole === 'heading') {
      setHeading(font);
      onChange?.({ target: { id: props?.id, value: { heading: font, body } } });
    } else {
      setBody(font);
      onChange?.({ target: { id: props?.id, value: { heading, body: font } } });
    }
  };

  const loadFont = (font: FontOption) => {
    if (loadedFonts.has(font.name)) return;
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${font.googleFont}&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    setLoadedFonts(prev => new Set([...prev, font.name]));
  };
  
  useEffect(() => {
    if (props?.defaultValue) {
      const { heading: h, body: b } = props.defaultValue;
      if (h) { setHeading(h); loadFont(h); }
      if (b) { setBody(b); loadFont(b); }
    }
  }, [props.defaultValue]);

  return (
    <div>
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      {label && <LabelWrapper>{label}</LabelWrapper>}

      <Wrapper>
        <PairingsWrapper>
          <label>Recommended Pairings</label>

          <div className="pairings">
            {PAIRINGS.map((pairing, index) => (
              <div
                className={selectedPairing === index ? 'pairing selected' : 'pairing'}
                onClick={() => handleSelectPairing(index)}
                key={pairing.name}
              >
                <p className="heading-preview" style={{ fontFamily: pairing.heading.family }}>
                  Heading
                </p>
                <p className="body-preview" style={{ fontFamily: pairing.body.family }}>
                  Body text
                </p>
                <p className="name">{pairing.name}</p>
                <p className="description">{pairing.description}</p>
                <span className="check">✓</span>
              </div>
            ))}
          </div>
        </PairingsWrapper>
        
        <FontListWrapper>
          <label>Custom Selection</label>

          <div className="role-tabs">
            {(['heading', 'body'] as FontRole[]).map(role => (
              <button
                className={activeRole === role ? 'tab active' : 'tab'}
                onClick={() => setActiveRole(role)}
                type="button"
                key={role}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
                {role === 'heading' && heading && <span className="selected">{heading.name}</span>}
                {role === 'body' && body && <span className="selected">{body.name}</span>}
              </button>
            ))}
          </div>
          
          <div className="categories">
            {CATEGORIES.map(cat => (
              <button
                className={activeCategory === cat ? 'category active' : 'category'}
                onClick={() => setActiveCategory(cat)}
                type="button"
                key={cat}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="font-list">
            {filteredFonts.map((font) => (
              <div
                className={currentSelected?.name === font.name ? 'font-row selected' : 'font-row'}
                onClick={() => handleSelectFont(font)}
                key={font.name}
              >
                <span className="preview" style={{ fontFamily: font.family }}>{font.name}</span>
                <div className="meta">
                  <p className="name">{font.name}</p>
                  <p className="tags">{font.tags}</p>
                </div>
              </div>
            ))}
          </div>
        </FontListWrapper>
        
        {(heading || body) && (
          <FontPreviewWrapper>
            <label>Live Preview</label>

            <div className="preview">
              {heading && (
                <p className="heading" style={{ fontFamily: heading.family }}>
                  The quick brown fox
                </p>
              )}
              {body && (
                <p className="body" style={{ fontFamily: body.family }}>
                  jumps over the lazy dog. Good typography elevates every design — it sets the tone, guides the eye, and speaks before a single word is read.
                </p>
              )}

              <div className="labels">
                {heading && (
                  <div className="label">
                    <span className="role">Heading</span>
                    <span className="name">{heading.name}</span>
                  </div>
                )}
                {body && (
                  <div className="label">
                    <span className="role">Body</span>
                    <span className="name">{body.name}</span>
                  </div>
                )}
              </div>
            </div>
          </FontPreviewWrapper>
        )}
      </Wrapper>
    </div>
  );
};

export default FontSelector;