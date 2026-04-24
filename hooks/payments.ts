// import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
// import { useCallback, useEffect, useState } from 'react';

// import { createPaymentIntentAction } from '@/components/shared/async-actions/selectors';
// import { startAsyncAction } from '@/components/shared/async-actions/reducer';
// import { finishAsyncAction } from '@/components/shared/async-actions/slice';
// import { useAppDispatch, useAppSelector } from '@/store/hooks';
// import { TrackedEvents, UseStripePaymentProps } from '@/types';
// import { trackMixPanelEvent } from '@/utils/analytics/client';
// import { getMessage } from '@/libs/messages';
// import { megaFetch } from '@/utils/api';

// const defaultErrorMessage = 'An error occurred! Payment could not be initialized.';
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
// const initialOptions: StripeElementsOptions = {
//   appearance: {
//     theme: 'stripe'
//   }
// };

// export const useStripePayment = ({ item }: UseStripePaymentProps) => {
//   const { message = defaultErrorMessage, pending } = useAppSelector(createPaymentIntentAction);
//   const [options, setOptions] = useState(initialOptions);
//   const dispatch = useAppDispatch();

//   const fetchClientSecret = useCallback(async () => {
//     dispatch(startAsyncAction('createPaymentIntent'));
    
//     const { success, data } = await megaFetch({
//       path: '/payment/intent',
//       method: 'POST',
//       body: item
//     });

//     const responseMessage = getMessage({
//       resourceType: 'createPaymentIntent',
//       responseCode: data?.response_code
//     });

//     dispatch(finishAsyncAction({
//       target: 'createPaymentIntent',
//       message: responseMessage,
//       success
//     }));

//     if (success) setOptions((prev) => ({
//       ...prev,
//       dpmCheckerLink: data.dpm_checker_link,
//       clientSecret: data.client_secret
//     }));

//     trackMixPanelEvent(TrackedEvents.CREATE_PAYMENT_INTENT, {
//       timestamp: new Date().toISOString(),
//       questId: item.quest_id,
//       success
//     });
//   }, []);
  
//   useEffect(() => {
//     if (Object.keys(item).length) {
//       fetchClientSecret();
//     }
//   }, [item]);
  
//   return {
//     isLoading: pending,
//     stripePromise,
//     options,
//     message
//   };
// };
