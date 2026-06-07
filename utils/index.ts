import { FilterObjectProps } from '@/types';
import { nanoid } from '@reduxjs/toolkit';

export const inProduction = process.env.NODE_ENV === 'production';

export const months = {
  long: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
};

export const filterObject = ({ target, filters, include = false }: FilterObjectProps) => {
	return Object.fromEntries(
		Object.entries(target).filter(([key, _]) => (
			include ? filters.includes(key) : !filters.includes(key)
		))
	);
};

export const formatCurrency = (value?: number | string, currency = 'USD') => {
	if (typeof value === 'string') return value;
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
	}).format(value || 0);
};

export const getFileFormData = async (fileObject: File, dirName: string) => {
  let file: File | Blob = fileObject;
  
  if (!('uid' in fileObject)) {
    const url = URL.createObjectURL(fileObject);
    file = await getBlobFromUrl(url);
    URL.revokeObjectURL(url);
  }

  const formData = new FormData();
  formData.append('fileName', fileObject.name);
  formData.append('dirName', dirName);
  formData.append('file', file);
  return formData;
};

export const getBlobFromUrl = async (blobUrl: string) => {
  const response = await fetch(blobUrl);
  return await response.blob();
};

export const isValidEmail = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

export const getDateFormat = (dateString?: string) => {
  const date = dateString ? new Date(dateString) : new Date();
  const month = date.getMonth();
  const day = date.getDate();

  const hour = String(date.getHours() % 12 || 12).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  const paddedMonth = String(month + 1).padStart(2, '0');
  const amPm = date.getHours() >= 12 ? 'pm' : 'am';
  const AMPM = date.getHours() >= 12 ? 'PM' : 'AM';
  const paddedDay = String(day).padStart(2, '0');
  const fullYear = date.getFullYear();

  const getDayWithSuffix = (day: number): string => {
    if (day >= 11 && day <= 13) return `${day}th`;
    switch (day % 10) {
      case 1: return `${day}st`;
      case 2: return `${day}nd`;
      case 3: return `${day}rd`;
      default: return `${day}th`;
    }
  };

  const formats = {
    suffixedDayShortMonthFullYear: `${getDayWithSuffix(day)} ${months.short[month]}, ${fullYear}`,
    full: `${getDayWithSuffix(day)} ${months.long[month]}, ${fullYear} ${hour}:${minute}${amPm}`,
    iso: `${fullYear}-${paddedMonth}-${paddedDay}, ${hour}:${minute} ${AMPM}`,
    shortMonthDayFullYear: `${months.short[month]} ${paddedDay} ${fullYear}`,
    time: `${hour}:${minute} ${amPm}`
  };

  return formats;
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