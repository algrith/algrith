'use client';

import { forwardRef, Ref } from 'react';
import { ButtonProps } from 'antd';

import { ButtonWrapper } from '@/components/shared/button/styled';
import { Spinner } from '@/components/shared/icon/spinner';
import { filterObject } from '@/utils';

const customButtonProps = [
	'prependedIcon',
	'appendedIcon',
	'loading',
	'icon'
];

const Button = forwardRef((props: ButtonProps, ref: Ref<HTMLButtonElement>) => {
	const buttonProps = filterObject({ target: props, filters: customButtonProps });
	const { prependedIcon, appendedIcon, children, loading, size, icon } = props;

	return (
		<ButtonWrapper ref={ref} {...buttonProps} size={size ?? 'middle'}>
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
