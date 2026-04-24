'use client';

import React from 'react';

import { PaystackProps } from '@/types';
import Button from '../button';

const Paystack = ({ onSuccess, amount, phone, name, email, ...rest }: PaystackProps) => {
  const [firstName, lastName = ''] = name.split(' ');
  const disabled = !email || !name;

  const payWithPaystack = async () => {
    const PaystackPopUp = (await import('@paystack/inline-js')).default;
    const popup = new PaystackPopUp();

    popup.newTransaction({
      // channels: ['card', 'apple_pay', 'bank_transfer', 'ussd', 'mobile_money'],
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      reference: (new Date()).getTime().toString(),
      amount: amount * 1390 * 100,
      // currency: 'USD',
      // metadata: {
      //   custom_fields: [
      //     {
      //       value: 'Payment for subscription',
      //       variable_name: 'description',
      //       display_name: 'Description'
      //     }
      //   ]
      // },
      firstName,
      lastName,
      phone,
      email,
      onSuccess: (transaction) => {
        console.log(transaction);
        onSuccess?.(transaction);
      },
      onCancel: () => {
        console.log('Transaction canceled');
      },
      onError: (error) => {
        console.log('Error --> ', error.message);
      },
      onLoad: (response) => {
        console.log('Loaded --> ', response);
      }
    });
  };

  return (
    <Button
      {...rest}
      style={{ backgroundColor: '#011b33' }}
      type={rest.type ?? 'primary'}
      block={rest.block ?? true}
      onClick={payWithPaystack}
      disabled={disabled}
    >
      {rest.children ?? 'Pay with Paystack'}
    </Button>
  );
};

export default Paystack;