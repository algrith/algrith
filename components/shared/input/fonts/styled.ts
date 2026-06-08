import tw, { styled } from 'twin.macro';
import { borderCss } from '../../layout/styled';

export const FontPreviewWrapper = styled.div`
  ${tw`flex flex-col gap-2`};

  > label {
    ${tw`text-xs uppercase tracking-widest text-orange-300`};
  }

  .preview {
    ${tw`rounded-xl border p-4`};
    ${borderCss};

    .heading {
      ${tw`text-2xl font-semibold m-0 mb-1 leading-tight text-orange-300`};
    }

    .body {
      ${tw`text-sm m-0 leading-relaxed text-gray-400`};
    }
    
    .labels {
      ${tw`flex gap-4 mt-3 pt-3 border-t border-orange-50`};

      .label {
        ${tw`flex flex-col gap-0.5`};

        .role {
          ${tw`text-xs uppercase tracking-widest text-orange-300 dark:text-orange-100`};
        }

        .name {
          ${tw`text-xs font-medium text-gray-500 dark:text-gray-300`};
        }
      }
    }
  }
`;

export const PairingsWrapper = styled.div`
  ${tw`flex flex-col gap-2`};

  > label {
    ${tw`text-xs uppercase tracking-widest text-orange-300`};
  }

  .pairings {
    ${tw`flex gap-2 overflow-x-auto pb-1`};
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .pairing {
    ${tw`w-48 relative flex-shrink-0 flex flex-col rounded-xl border p-3 cursor-pointer transition-all hover:bg-black/5 hover:dark:bg-black/20`};
    ${borderCss};

    &.selected {
      ${tw`bg-black/50`};

      .heading-preview {
        ${tw`text-gray-100 font-semibold`};
      }
      
      .body-preview {
        ${tw`text-orange-100`};
      }
      
      .description {
        ${tw`text-orange-100`};
      }
      
      .name {
        ${tw`text-orange-300`};
      }
      
      .check {
        ${tw`opacity-100`};
      }
    }
  }

  .heading-preview {
    ${tw`text-base font-semibold m-0 mb-0.5 leading-tight dark:text-gray-300`};
  }

  .body-preview {
    ${tw`text-xs m-0 mb-3 leading-snug flex-1 text-[#9a9488]`};
  }

  .name {
    ${tw`text-xs font-semibold uppercase tracking-wider m-0 text-orange-300`};
  }

  .description {
    ${tw`text-xs m-0 dark:text-orange-200`};
  }
  
  .check {
    ${tw`absolute top-2 right-2 text-xs opacity-0 text-[#6ee09a]`};
  }
`;

export const FontListWrapper = styled.div`
  ${tw`flex flex-col gap-2 w-full`};

  > label {
    ${tw`text-xs uppercase tracking-widest text-orange-300`};
  }
  
  .role-tabs {
    ${tw`flex gap-1 p-1 rounded-xl`};
    ${borderCss};

    .tab {
      ${tw`flex-1 font-semibold flex items-center justify-center gap-1.5 text-xs py-2 rounded-lg transition-all text-gray-600 dark:text-orange-100 hover:text-gray-500 hover:dark:text-orange-200`};
      
      .selected {
        ${tw`text-xs text-gray-400 truncate max-w-[80px]`};
      }
      
      &.active {
        ${tw`bg-black/50 text-orange-300`};

        .selected {
          ${tw`text-gray-300 dark:text-gray-400`};
        }
      }
    }
  }
  
  .categories {
    ${tw`flex gap-1 flex-wrap`};

    .category {
      ${tw`text-xs px-3 py-1.5 rounded-lg capitalize transition-all dark:text-orange-100 hover:text-orange-400 hover:dark:text-orange-200`};
      border: 0.5px solid transparent;

      &.active {
        ${tw`bg-black/50 text-orange-200 dark:text-orange-300`};
      }
    }
  }

  .font-list {
    ${tw`flex flex-col gap-1.5 overflow-y-auto min-h-32 pr-1`};
    scrollbar-width: thin;
  }

  .font-row {
    ${tw`flex items-center justify-between px-3 py-2.5 rounded-xl border cursor-pointer transition-all hover:bg-black/5 hover:dark:bg-black/10`};
    ${borderCss};
    
    .preview {
      ${tw`text-base dark:text-gray-300`};
    }
    
    .meta {
      ${tw`text-right`};
    }

    .name {
      ${tw`text-xs font-medium m-0 text-orange-400 dark:text-orange-100`};
    }

    .tags {
      ${tw`text-xs m-0 text-gray-500 dark:text-gray-400`};
    }
    
    &.selected {
      ${tw`bg-black/50`};

      .preview {
        ${tw`font-semibold text-gray-100`};
      }
      
      .name {
        ${tw`font-semibold text-orange-300`};
      }
      
      .tags {
        ${tw`text-gray-200 dark:text-gray-400`};
      }
    }
  }
`;

export const Wrapper = styled.div`
  ${tw`flex flex-col gap-4 rounded-2xl border p-5`};
  font-family: 'Instrument Sans', sans-serif;
  ${borderCss};
`;