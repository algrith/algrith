'use client';

import { closePaymentModal, useFlutterwave } from 'flutterwave-react-v3';
import { FlutterwaveConfig } from 'flutterwave-react-v3/dist/types';
import { PaystackProps } from '@/types';
import Button from '../button';

const FlutterWave = ({ onSuccess, description, title, amount, phone, name, email, ...rest }: PaystackProps) => {
  const disabled = !email || !name;
  
  const config: FlutterwaveConfig = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY,
    payment_options: 'card,mobilemoney,ussd',
    tx_ref: Date.now().toString(),
    amount: 1,
    currency: 'USD',
    customizations: {
      logo: 'https://algrith.com/images/logo/algrith-logo.png',
      title: 'Algrith Payment',
      description
    },
    customer: {
      phone_number: phone as string,
      email,
      name
    }
  };

  const initializePayment = useFlutterwave(config);

  const handlePayment = () => {
    initializePayment({
      callback: (response) => {
        console.log(response);
        onSuccess?.(response);
        closePaymentModal();
      },
      onClose: () => {
        console.log('Payment modal closed');
      },
    });
  };

  return (
    <Button
      {...rest}
      style={{ backgroundColor: '#ff9b00' }}
      type={rest.type ?? 'primary'}
      block={rest.block ?? true}
      onClick={handlePayment}
      disabled={disabled}
    >
      {rest.children ?? 'Pay with Flutterwave'}
    </Button>
  );
};

export default FlutterWave;