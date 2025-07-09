import { NotificationArgsProps, ButtonProps, ThemeConfig } from 'antd';
import { OAuthProviderType, Provider } from 'next-auth/providers';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { LinkProps as NextLinkProps } from 'next/link';
import { TypeOpen } from 'antd/es/message/interface';
import { AnchorHTMLAttributes, HTMLAttributes, ReactNode, RefObject } from 'react';

export type InlineFeedbackWrapperProps = Omit<InlineFeedbackProps, 'target'> & Pick<FeedbackState, 'type'>;
export type OAuthProviderIcons = Partial<Record<OAuthProviderType, string>>;
export type TextCase = 'capitalize' | 'uppercase' | 'lowercase';
export type AsyncActionTargets = keyof AsyncActionsState;
export type AuthTypes = 'signIn' | 'signUp' | 'profile';
export type TextAlignment = 'center' | 'right' | 'left';
export type BaseStringObject = Record<string, string>;
export type ThemeModes = 'system' | 'light' | 'dark';
export type UseClassName = Array<string> | string;
export type BaseObject = Record<string, any>;

export interface InlineFeedbackProps extends HTMLAttributes<HTMLDivElement> {
	withBlockMargin?: boolean;
	icon?: ReactNode;
	target: string;
};

export interface IntroProps extends HTMLAttributes<HTMLDivElement> {
	titleAlignment?: TextAlignment;
  accomodate?: boolean;
	titleCase?: TextCase;
  subtitle?: string;
  title: string;
  description: {
    alignment?: TextAlignment;
    case?: TextCase;
    text: string;
  };
  action: {
		scrollTo?: string;
    icon?: ReactNode;
    text?: string;
  };
};

export type Messages = Partial<Record<AsyncActionTargets, {
  [key: string]: string;
}>>;

export interface LinkProps extends NextLinkProps {
	target?: HTMLAnchorElement['target'];
	rel?: HTMLAnchorElement['rel'];
	type?: ButtonProps['type'];
	children: ReactNode;
	asButton?: boolean;
	className?: string;
	rounded?: boolean;
	size?: SizeType;
	id?: string;
};

export interface Assets extends BaseObject {
	brand: {
		logos: {
			white: string;
			black: string;
		};
		icons: {
			white: string;
			blue: string;
		};
	};
	icons: {
		chrome512: string;
		chrome384: string;
		chrome192: string;
		favicon32: string;
		favicon16: string;
		favicon: string;
		safari: string;
		apple: string;
	};
};

export interface CustomNotificationProps {
	message: string;
	type: string;
};

export interface AuthFormWrapperProps {
	isSignUpSuccessful?: boolean;
	authType: AuthTypes;
	children: ReactNode;
};

export interface HowItWorksStepProps {
  isFirst: boolean;
  isLast: boolean;
  isLeft: boolean;
  content: string;
  color: string;
  title: string;
  icon: string;
  step: number;
};

export interface TableOfContentProps {
	targetRef?: RefObject<HTMLDivElement>;
	items: Array<{
		text: string;
		id: string;
	}>;
};

export interface AlertFeedbackAPIs {
	warning: TypeOpen;
	success: TypeOpen;
	error: TypeOpen;
	info: TypeOpen
};

export type FooterResource = Array<{
	icon: ReactNode;
	title: string;
	items: Array<{
		icon?: ReactNode;
		text?: string;
		href: string;
		subItem?: {
			text?: string;
			href: string;
		};
	}>
}>;

export interface FilterObjectProps {
  filters: Array<string>;
  target: BaseObject;
  include?: boolean;
};

export interface AsyncActionsState {
  signIn: AsyncAction;
  signUp: AsyncAction;
};

export interface SectionItemProps {
	subtitle: string;
	icon: ReactNode;
	content: string;
	title: string;
};

export interface GetMessageProps {
  resourceType: keyof Messages;
  responseCode: string;
};

export interface FeedbackPayload {
  feedbackType?: FeedbackState['feedbackType'];
  placement?: FeedbackState['placement'];
  duration?: FeedbackState['duration'];
  message?: FeedbackState['message'];
  target? :FeedbackState['target'];
  type?: FeedbackState['type'];
  show?: FeedbackState['show']
};

export interface AppThemeState {
  mode: ThemeModes;
};

export interface OAuthProvider {
	name: Provider['name'];
	id: OAuthProviderType;
	authType: AuthTypes;
};

export interface FeedbackState {
  feedbackType: 'notification' | 'alert' | 'inline';
  placement: NotificationArgsProps['placement'];
  type: keyof Colors['theme'];
  duration: number;
  message: string;
  target?: string;
  show?: boolean;
};

export interface ResponseData {
  success: boolean;
  message: string;
  data: {};
};

export interface ContactModel {
	customTopic?: string;
	template?: string;
	country?: string;
	subject: string;
	message: string;
	topic?: string;
	email: string;
	phone: string;
	name: string;
};

export interface UserProfile {
	auth_provider: 'google' | 'email';
	date_modified: string;
	company_name: string;
	date_created: string;
	full_name: string;
	location: string;
	user_id: string;
	email: string;
	photo: string;
};

export interface AsyncAction {
  pending: boolean;
  success: boolean;
  message: string;
};

export type SectionProps = {
	items: Array<SectionItemProps>;
	illustration: string;
	id: string;
	title: {
		alignment: 'left' | 'right' | 'center';
		text: string;
	} | string;
};

export interface AppTheme {
	tokenConfigs: Record<string, ThemeConfig>;
};

export type Colors = {
	dark: {
		quaternary: string;
		secondary: string;
		septenary: string;
		tertiary: string;
		octonary: string;
		primary: string;
		quinary: string;
		senary: string;
	};
	theme: {
		secondary: string;
		tertiary: string;
		primary: string;
		success: string;
		error: string;
		text: string;
		link: string;
	};
};

declare global {
	interface Window {
		typingTimeout: NodeJS.Timeout;
	}
};