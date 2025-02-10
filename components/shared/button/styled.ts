'use client';

import { Button, ButtonProps } from 'antd';
import tw, { styled } from 'twin.macro';
import NextLink from 'next/link';

import colors from '@/libs/colors';
import { Colors } from '@/types';

export const LinkWrapper = styled(NextLink)`
	&.button {
		${tw`relative font-semibold tracking-wide inline-flex items-center gap-4 text-center rounded-md py-4 px-10 text-xl`};
		line-height: 23px;

		&.secondary {
			${tw`bg-sky-700 hover:bg-sky-600 dark:bg-teal-700 dark:hover:bg-teal-600 border-none text-white`};
		}
		
		&.tertiary {
			${tw`bg-indigo-600 dark:bg-indigo-700 hover:bg-indigo-500 dark:hover:bg-indigo-600 border-none text-white`};
		}
		
		&.primary {
			${tw`bg-theme-primary hover:bg-theme-primary/80 border-none text-white`};
		}

		&.default {
			${tw`border-gray-300 hover:border-gray-200 dark:text-dark-mode-septenary text-gray-800`};
		}
		
		&.rounded {
			${tw`rounded-full`};
		}
		
		&.small {
			${tw`px-6 py-2`};
		}
	}
`;

export const ButtonWrapper = styled(Button)`
	${tw`font-nunito-sans font-extrabold text-xm leading-[21.82px]`};
	
	&:not(:disabled):not(:hover) {
		${({ color, type }: ButtonProps) => {
			const colorKey = type as keyof Colors['theme'];

			return type && `
				background-color: ${colors.theme[colorKey]};
				border-color: ${colors.theme[colorKey]};
				${color && `color: ${color};`}
			`
		}}
	}

	&:disabled {
		${({ color, type }: ButtonProps) => {
			const colorKey = type as keyof Colors['theme'];

			return type && `
				background-color: ${colors.theme[colorKey]}!important;
				border-color: ${colors.theme[colorKey]}!important;
				opacity: 0.5;
			`
		}}
	}
`;