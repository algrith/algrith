import tw, { styled } from 'twin.macro';

import { borderCss } from '@/components/shared/layout/styled';

export const PresetPalettesWrapper = styled.div`
  ${tw`flex flex-col gap-3`};

  .palettes {
    ${tw`grid md:grid-cols-2 gap-2`};

    .palette {
      ${tw`flex flex-col gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all hover:bg-black/20`};
      ${borderCss};

      .swatch-wrapper {
        ${tw`flex gap-1.5 flex-shrink-0`};

        .swatch {
          ${tw`h-7 w-7 rounded-lg flex-shrink-0 cursor-pointer transition-transform hover:scale-110`};
          ${borderCss};
        }
      }

      &.selected {
        ${tw`bg-black/50`};

        .metadata .check {
          ${tw`block`};
        }
        
        .name {
          ${tw`text-white`};
        }
        
        .tag {
          ${tw`text-[#ffffff]`};
        }
      }

      .name {
        ${tw`text-sm font-medium m-0 text-gray-600 dark:text-gray-300`};
      }
      
      .tag {
        ${tw`text-xs m-0 text-[#9a9488]`};
      }
    }
    
    .metadata {
      ${tw`relative flex-1 min-w-0`};
      
      .check {
        ${tw`absolute top-0 right-0 hidden text-xs ml-auto text-green-600`};
      }
    }
  }
`;

export const ColorPickerWrapper = styled.div`
  ${tw`flex items-center gap-2`};

  .color-input-wrapper {
    ${tw`h-10 w-10 relative overflow-hidden bg-none rounded-xl flex-shrink-0`};
    ${borderCss};

    input[type="color"] {
      ${tw`absolute -inset-2 h-14 w-14 cursor-pointer`};
    }
  }
  
  input[type="text"] {
    ${tw`bg-white h-10 flex-1 text-xs text-gray-600 px-3 rounded-xl focus:border-[#0d0f0e] outline-none transition-colors`};
    font-family: monospace;
    ${borderCss};

    &.error {
      ${tw`border-red-500`};
    }
  }
  
  button {
    ${tw`h-10 bg-black/50 hover:bg-black/20 text-theme-primary text-xm px-4 rounded-xl font-medium transition-colors flex-shrink-0`};
  }
`;

export const PaletteWrapper = styled.div`
  ${tw`flex flex-col gap-3 border-t dark:border-t-dark-mode-quaternary border-t-gray-300 pt-8`};

  .palette {
    ${tw`flex flex-wrap gap-2`};

    .swatch {
      ${tw`h-7 w-7 flex-shrink rounded-lg relative cursor-pointer`};
      background-color: var(--bg-color);
      ${borderCss}

      &:hover button {
        ${tw`opacity-100`};
      }

      button {
        ${tw`absolute -top-1.5 -right-1.5 w-4 h-4 bg-black/50 text-gray-300 rounded-full flex items-center justify-center text-xm cursor-pointer opacity-0 transition-opacity`};
        ${borderCss};
      }
    }
  }
`;

export const Wrapper = styled.div`
  ${tw`flex flex-col gap-8 rounded-2xl p-5 shadow`};
  font-family: 'Instrument Sans', sans-serif;
  ${borderCss};

  label {
    ${tw`text-[13px] text-gray-600 dark:text-dark-mode-octonary w-fit font-bold`};
  }
`;