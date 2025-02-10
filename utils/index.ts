import { FilterObjectProps } from '@/types';
import { nanoid } from '@reduxjs/toolkit';

export const inProduction = process.env.NODE_ENV === 'production';

export const filterObject = ({ target, filters, include = false }: FilterObjectProps) => {
	return Object.fromEntries(
		Object.entries(target).filter(([key, _]) => (
			include ? filters.includes(key) : !filters.includes(key)
		))
	);
};

export const kebabToCamelCase = (str: string) => {
  return str.replace(/-(\w)/g, (match, letter) => letter.toUpperCase());
};

export const toSnakeCase = (str: string) => {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2')
  .replace(/\s+/g, '_')
  .replace(/[^\w_]+/g, '')
  .toLowerCase();
};

export const randomId = () => nanoid();