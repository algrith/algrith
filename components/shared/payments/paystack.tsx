'use client';

import React from 'react';

import { PaystackProps } from '@/types';
import { randomId } from '@/utils';
import Button from '../button';

const Paystack = ({ onSuccess, amount, phone, name, email, ...rest }: PaystackProps) => {
  const [firstName, lastName = ''] = name?.split(' ');
  const disabled = !email || !name;

  const payWithPaystack = async () => {
    const reference = `algrith-${randomId()}-${(new Date()).getTime().toString()}`;
    const PaystackPopUp = (await import('@paystack/inline-js')).default;
    const popup = new PaystackPopUp();

    popup.newTransaction({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      amount: 100,
      // amount: amount * 100,
      channels: ['card'],
      currency: 'NGN',
      reference,
      firstName,
      lastName,
      phone,
      email,
      onSuccess: (transaction) => {
        console.log(transaction);
        onSuccess?.(transaction);
      },
      onLoad: (response) => {
        console.log('Loaded --> ', response);
      },
      onError: (error) => {
        console.log('Error --> ', error.message);
      },
      onCancel: () => {
        console.log('Transaction canceled');
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