'use client';

import { useRouter } from 'next/navigation';
import { Avatar, Divider } from 'antd';
import { useEffect } from 'react';

import { showFeedback } from '@/components/shared/feedback/reducer';
import { OAuthButtonWrapper } from '@/components/auth/styled';
import { OAuthProvider, OAuthProviderIcons } from '@/types';
import { useAppDispatch } from '@/store/hooks';
import { getMessage } from '@/libs/messages';
import { assets } from '@/libs/assets';
import useRoute from '@/hooks/route';
import { signIn } from './slices';

const oauthProviderIcons: OAuthProviderIcons = {
	google: assets.googleIcon
};

const OAuthButton = ({ isLoading, authType, name, id }: OAuthProvider) => {
  const { searchParams, pathname } = useRoute();
	const dividerStyles = { margin: 0 };
	const dispatch = useAppDispatch();
	const router = useRouter();

	const handleSocialAuth = () => dispatch(signIn(id));

	useEffect(() => {
		const error = searchParams.get('error');
		const code = searchParams.get('code');

		// Handle errors from Google sign in
		if (error || code) {
			const params = new URLSearchParams(searchParams.toString());
			params.delete('error');
			params.delete('code');

			if (error || code) {
				dispatch(showFeedback({
					message: getMessage(code || ''),
					feedbackType: 'alert',
					type: 'error',
				}));
			}
			
			// Clear error parameters for next reload.
			router.push(`${pathname}?${params.toString()}`);
		}
	}, [searchParams]);
	
	return (
		<>
			<Divider style={dividerStyles}>
				OR
			</Divider>

			<OAuthButtonWrapper
				onClick={handleSocialAuth}
				disabled={isLoading}
				loading={isLoading}
				size="large"
				block
			>
				<Avatar src={oauthProviderIcons[id]} alt="oauth_provider_icon" />
				{!isLoading && `Sign ${authType === 'signIn' ? 'in' : 'up'} with ${name}`}
			</OAuthButtonWrapper>
		</>
	);
};

export default OAuthButton;