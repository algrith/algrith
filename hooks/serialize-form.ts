import { BaseObject } from '@/types';
import React from 'react';

const useSerializeForm = () => {
  const serializeForm = ({ form }: { form: BaseObject }) => {
    const serialized: BaseObject = {};
    const formData: Array<{
      value: string;
      name: string;
    }> = [];

    Array.prototype.slice.call(form.elements).forEach((field) => {
      if (!field.name || field.disabled || ['file', 'reset', 'submit', 'button'].includes(field.type)) {
        return;
      }

      if (field.type === 'select-multiple') {
        Array.prototype.slice.call(field.options).forEach((option) => {
          if (!option.selected) return;

          formData.push({
            value: field.value,
            name: field.name
          });
        });

        return;
      }

      if (['checkbox', 'radio'].includes(field.type) && !field.checked) return;
      
      formData.push({
        value: field.value,
        name: field.name
      });
    });

    Object.entries(formData).forEach(([key, { value, name }]) => {
      serialized[name] = value;
    });

    return serialized;
  };

  return { serializeForm };
};

export default useSerializeForm;