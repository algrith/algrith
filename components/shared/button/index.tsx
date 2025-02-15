'use client';

import { CSSProperties, forwardRef, Ref } from 'react';
import { ButtonProps } from 'antd';

import { ButtonWrapper } from '@/components/shared/button/styled';
import { Spinner } from '@/components/shared/icon/spinner';
import useClassName from '@/hooks/class-name';
import { filterObject } from '@/utils';
import colors from '@/libs/colors';
import { Colors } from '@/types';

const customButtonProps = [
	'prependedIcon',
	'appendedIcon',
	'loading',
	'rounded',
	'icon'
];

const Button = forwardRef((props: ButtonProps, ref: Ref<HTMLButtonElement>) => {
	const buttonProps = filterObject({ target: props, filters: customButtonProps });
	const { prependedIcon, appendedIcon, children, loading, size, icon } = props;
	
	const style = {
		'--color': colors.theme[props.type as keyof Colors['theme']],
		...props.style
	} as CSSProperties;

	const className = useClassName([
		props.rounded ? 'rounded' : '',
		props?.className ?? ''
	]);

	return (
		<ButtonWrapper
			{...buttonProps}
			size={size ?? 'middle'}
			className={className}
			style={style}
			ref={ref}
		>
			{((prependedIcon || icon) && !loading) && (
				<span className="ant-btn-icon">
					{prependedIcon || icon}
				</span>
			)}

			{loading && (
				<span className="ant-btn-icon ant-btn-loading-icon">
					<Spinner />
				</span>
			)}

			{children}

			{(appendedIcon && !loading) && (
				<span className="ant-btn-icon" style={{ marginInlineStart: '8px' }}>
					{appendedIcon}
				</span>
			)}
		</ButtonWrapper>
	);
});

Button.displayName = 'Button';
export default Button;
