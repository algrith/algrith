'use client';

import { PasswordProps, TextAreaProps } from 'antd/es/input';
import { Checkbox, InputProps } from 'antd';
import tw, { styled } from 'twin.macro';
import { Group } from 'antd/es/radio';
import colors from '@/libs/colors';

export const InputWrapper = styled.div<InputProps | TextAreaProps | PasswordProps>`
  ${tw`w-full flex flex-col gap-1 relative`};

  .ant-input-affix-wrapper, input {
    ${tw`h-[46px] text-[#252525] font-normal leading-[20.8px]`};
    
    &.ant-input-lg {
      ${tw`h-[50px]`};
    }

    &.ant-input-sm {
      ${tw`h-[35px]`};
    }
  }
  
  textarea:-webkit-autofill,
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset !important;
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: #252525;
    color-scheme: light dark;
  }
  
  &.dark-theme-mode {
    textarea:-webkit-autofill,
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 1000px ${colors.dark.tertiary} inset !important;
      transition: background-color 5000s ease-in-out 0s;
      -webkit-text-fill-color: #e2e8f0;
      color-scheme: light dark;
    }
  }
  
  .ant-input-affix-wrapper input {
    ${tw`h-full`};
  }
  
  textarea, .ant-input {
    ${tw`text-lg dark:bg-dark-mode-tertiary dark:text-dark-mode-octonary dark:border-dark-mode-quaternary dark:hover:border-theme-primary hover:border-theme-primary focus:ring-transparent border-gray-300`};
    border-radius: 8px;
  }
`;

export const CheckboxWrapper = styled(Checkbox)`
  &:not(.ant-checkbox-wrapper-disabled):hover .ant-checkbox-checked:not(.ant-checkbox-disabled) .ant-checkbox-inner {
    ${tw`bg-[#f7efe0] border-[#82693b]`};
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    ${tw`bg-[#f7efe0] border-[#82693b]`};
    
    &:after {
      ${tw`border-[ #82693b]`};
    }
  }
  
  &:not(.ant-checkbox-wrapper-disabled):hover .ant-checkbox-inner {
    ${tw`border-[ #82693b] bg-[#f7efe0]`};
  }
  
  .ant-checkbox-inner {
    ${tw`border-[ #9e9e9e]`};
  }
  
  .ant-checkbox {
    ${tw`self-start mt-1 w-4`};
  }
`;

export const RadioGroupWrapper = styled(Group)`
  ${tw`flex flex-wrap gap-4 md:gap-0`};

  .ant-radio-checked .ant-radio-inner {
    ${tw`bg-[#f7efe0] border-[#82693b]`};
  }
  
  .ant-radio-wrapper {
    .ant-radio {
      ${tw`self-start pt-0.5`};
    }

    &:hover .ant-radio-inner {
      ${tw`border-[ #82693b] bg-[#f7efe0]`};
    }
    
    .ant-radio-inner:after {
      ${tw`bg-[#41341d]`};
    }
  }
`;

export const LabelWrapper = styled.label`
  ${tw`text-xl text-[#252525] dark:text-dark-mode-octonary w-fit`};

  .required {
    ${tw`pl-1 text-md text-red-500 text-xl`};
  }
`;

export const SelectWrapper = styled.div`
	${tw`flex flex-col gap-1 relative`};

  .ant-select {
    ${tw`h-[46px] text-xm text-[#252525] font-normal leading-[20.8px]`};
    
    .ant-select-selector {
      ${tw`dark:bg-dark-mode-tertiary dark:border-dark-mode-quaternary dark:text-dark-mode-octonary focus:ring-transparent focus:border-gray-300 dark:focus:border-dark-mode-quaternary border-gray-300`};
    }
    
    &.ant-select-lg {
      ${tw`h-[50px]`};
    }

    &.ant-select-sm {
      ${tw`h-[35px]`};
    }
  }

  .icon-wrapper {
    ${tw`border hover:border-[#82693b] items-center`};
    padding-left: 11px;
    border-radius: 8px;

    .ant-select {
      ${tw`flex-grow`};
        
      .ant-select-selector {
        background-color: transparent;
        box-shadow: none !important;
        border: none;
      }
    }
  }

  .ant-select-multiple .ant-select-selection-item {
    background-color: #f7fafc !important;
    padding-right: 15px !important;
    padding-left: 15px !important;
    ${tw`gap-2`};

    .ant-select-selection-item-content, .ant-select-selection-item-remove {
      font-weight: 500;
      font-size: 12px;
      color: #718096;
    }
  }

  .ant-select-arrow {
    ${tw`z-[2]`};

    .ant-avatar {
      ${tw`w-full h-full rounded-none`};
    }
  }
`;