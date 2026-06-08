import { PaletteWrapper, SwatchWrapper,  } from './styled';
import { Preset } from '.';

interface PaletteProps {
  onRemoveSwatch?: (index: number) => void;
  onSelectPreset?: (index: number) => void;
  presetPalettes?: Array<Preset>;
  selectedPreset?: number;
  palette?: Array<string>;
  closable?: boolean;
  label?: string;
};

const Palette = (props: PaletteProps) => {
  const { onRemoveSwatch, onSelectPreset, presetPalettes, selectedPreset, palette, label } = props;
  const isPreset = Boolean(presetPalettes?.length);
  
  return (
    <PaletteWrapper className={isPreset ? 'preset' : ''}>
      {label && <label>{label}</label>}

      <div className="palettes">
        {isPreset && (
          presetPalettes?.map((preset, index) => (
            <div
              className={selectedPreset === index ? 'palette selected' : 'palette'}
              onClick={() => onSelectPreset?.(index)}
              key={preset.name}
            >
              <div className="metadata">
                <p className="name">{preset.name}</p>
                <p className="tag">{preset.tags}</p>
                <span className="check">✓</span>
              </div>

              <Swatches palette={preset.colors} />
            </div>
          ))
        )}

        {Boolean(palette?.length) && (
          <Swatches
            onRemoveSwatch={onRemoveSwatch}
            palette={palette}
            closable
          />
        )}
      </div>
    </PaletteWrapper>
  );
};

export const Swatches = ({ onRemoveSwatch, closable, palette }: PaletteProps) => (
  <SwatchWrapper>
    {palette?.map((color, index) => (
      <div style={{ backgroundColor: color }} className="swatch" key={`${color}-${index}`} title={color}>
        {closable && <button onClick={() => onRemoveSwatch?.(index)} aria-label="Remove color">×</button>}
      </div>
    ))}
  </SwatchWrapper>
);

export default Palette;