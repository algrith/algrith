import { ErrorBoundaryPropsWithComponent, FallbackProps } from 'react-error-boundary';
import { Component, ReactNode } from 'react';

declare module 'react-error-boundary' {
	interface ErrorBoundaryProps extends Partial<ErrorBoundaryPropsWithComponent>, Partial<FallbackComponentProps> {};

	interface FallbackComponentProps extends FallbackProps {
    fallbackMessage?: ReactNode;
    retryButtonText?: string;
    isRetryEnabled: boolean;
    onRetry?: () => void;
    isPage?: boolean;
  };
};