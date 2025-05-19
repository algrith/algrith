import { IconComponentProps } from '@ant-design/icons/lib/components/Icon';
import { TextAreaProps as AntTextAreaProps } from 'antd/es/input/TextArea';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { PasswordProps } from 'antd/es/input/Password';
import { ButtonType } from 'antd/es/button';
import React, { ReactNode } from 'react';
import { Colors } from '.';
import {
	PopconfirmProps,
	CollapseProps,
	CheckboxProps,
	SelectProps,
	ButtonProps,
	AvatarProps,
	InputProps,
	ModalProps,
	SpinProps
} from 'antd';

declare module 'antd' {
	interface TextAreaProps extends AntTextAreaProps, CustomInputProps {}
	interface PasswordProps extends PasswordProps, CustomInputProps {}
	interface InputProps extends InputProps, CustomInputProps {}

	interface SelectProps extends SelectProps, CustomInputProps {
		onFloatLabelChange?: (status: boolean) => void;
		type?: ButtonType | keyof Colors['theme'];
		prefixIcon?: ReactNode;
	}
	
	interface CustomInputProps extends InputLabelProps {
		description?: ReactNode;
		actionText?: ReactNode;
		helpText?: ReactNode;
		className?: string;
	}

	interface SpinnerProps extends IconComponentProps {
		type?: keyof Colors['theme'];
		animationDuration?: string;
		size?: SizeType;
	}

	interface CheckboxProps extends CheckboxProps {
		label?: string;
	}

	interface ButtonProps extends ButtonProps {
		type?: ButtonType | keyof Colors['theme'];
		prependedIcon?: ReactNode;
		appendedIcon?: ReactNode;
		noLoaderMargin?: boolean;
		rounded?: boolean;
	}

	interface SpinProps extends SpinProps {
		animationDuration?: string;
	}

	interface AntDesignThemeProviderProps {
		children: ReactNode;
		type?: 'app';
	}
	
	interface InputLabelProps {
		label?: ReactNode | string;
		size?: InputProps['type'];
		floatLabel?: boolean;
		required?: boolean;
		id?: string;
	}
};