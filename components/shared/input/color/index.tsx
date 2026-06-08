'use client';

import { useEffect, useState } from 'react';

import { ColorPickerWrapper, Wrapper } from './styled';
import { SelectProps } from 'antd/es/select';
import { LabelWrapper } from '../styled';
import Palette from './palette';

export interface Preset {
  colors: string[];
  name: string;
  tags: string;
}

const PRESET_PALETTES: Preset[] = [
  { name: 'Midnight Studio',  tags: 'dark · minimal',   colors: ['#0d0f0e', '#6ee09a', '#fafaf7', '#9a9488', '#e8e6df'] },
  { name: 'Ocean Breeze',     tags: 'cool · calm',      colors: ['#042C53', '#185FA5', '#85B7EB', '#E6F1FB', '#ffffff'] },
  { name: 'Terracotta',       tags: 'warm · earthy',    colors: ['#4A1B0C', '#D85A30', '#F0997B', '#FAECE7', '#fffdf9'] },
  { name: 'Forest Walk',      tags: 'natural · green',  colors: ['#173404', '#3B6D11', '#97C459', '#EAF3DE', '#f8fdf2'] },
  { name: 'Berry Jam',        tags: 'bold · vibrant',   colors: ['#4B1528', '#993556', '#ED93B1', '#FBEAF0', '#fff6f9'] },
  { name: 'Golden Hour',      tags: 'warm · sunny',     colors: ['#412402', '#BA7517', '#EF9F27', '#FAEEDA', '#fffbf3'] },
  { name: 'Lavender Mist',    tags: 'soft · purple',    colors: ['#26215C', '#534AB7', '#AFA9EC', '#EEEDFE', '#faf9ff'] },
  { name: 'Slate & Chalk',    tags: 'neutral · mono',   colors: ['#2C2C2A', '#5F5E5A', '#B4B2A9', '#F1EFE8', '#ffffff'] },
];

const ColorPalettes = ({ placeholder = '#000000', onChange, label, ...props }: SelectProps) => {
  const [selectedPreset, setSelectedPreset] = useState<number>(-1);
  const [pickerValue, setPickerValue] = useState('#000000');
  const [palette, setPalette] = useState<string[]>([]);
  const [hexValue, setHexValue] = useState('#000000');
  const [error, setError] = useState(false);

  const handlePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPickerValue(e.target.value);
    setHexValue(e.target.value);
    setError(false);
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isValidHex(e.target.value)) setPickerValue(e.target.value);
    setHexValue(e.target.value);
    setError(false);
  };

  const isValidHex = (hex: string) => /^#[0-9a-fA-F]{6}$/.test(hex);

  const handleSelectPreset = (index: number) => {
    const newPresetIndex = index === selectedPreset ? -1 : index;
    const value = PRESET_PALETTES?.[newPresetIndex]?.colors || [];
    onChange?.({ target: { id: props?.id, value } });
    setSelectedPreset(newPresetIndex);
    setPalette(value);
  };

  const handleRemoveSwatch = (index: number) => {
    const value = palette.filter((_, idx) => idx !== index);
    onChange?.({ target: { id: props?.id, value } });
    setSelectedPreset(-1);
    setPalette(value);
  };

  const handleAdd = () => {
    const hex = hexValue.trim();

    if (!isValidHex(hex)) return setError(true);
    if (palette.includes(hex)) return;

    const value = [...palette, hex];
    setSelectedPreset(-1);
    setPalette(value);
    setError(false);
    onChange?.({
      target: {
        id: props?.id,
        value
      }
    });
  };

  useEffect(() => {
    setPalette(props?.defaultValue || []);
  }, [props.defaultValue]);
  
  return (
    <div>
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      {label && <LabelWrapper>{label}</LabelWrapper>}

      <Wrapper>
        <Palette
          onSelectPreset={handleSelectPreset}
          presetPalettes={PRESET_PALETTES}
          selectedPreset={selectedPreset}
          label="Preset Palettes"
        />
        
        {Boolean(palette.length) && (
          <Palette
            onRemoveSwatch={handleRemoveSwatch}
            label="Your Palette"
            palette={palette}
          />
        )}

        <ColorPickerWrapper>
          <div className="color-input-wrapper" style={{ background: pickerValue }}>
            <input onChange={handlePickerChange} value={pickerValue} type="color" />
          </div>

          <input
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder={placeholder as string}
            className={error ? 'error' : ''}
            onChange={handleHexChange}
            value={hexValue}
            maxLength={7}
            type="text"
          />
          
          <button onClick={handleAdd}>
            Add
          </button>
        </ColorPickerWrapper>
      </Wrapper>
    </div>
  );
};

export default ColorPalettes;