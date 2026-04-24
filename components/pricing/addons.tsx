'use client';

import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';

import { Addon, AddonsProps } from '@/types';
import { formatCurrency } from '@/utils';
import { AddonsWrapper } from './styled';
import { addons } from '@/libs/plans';
import Button from '../shared/button';

const Addons = ({ proceedToPayment, inPaymentModal }: AddonsProps) => {
  const [selectedAddons, setSelectedAddons] = useState<Array<Addon>>([]);

  const handleConfirmation = (type: 'skip' | 'proceed') => () => {
    proceedToPayment?.(type === 'proceed' ? selectedAddons : []);
  };
  
  const handleAddon = (addon: Addon) => () => {
    if (!inPaymentModal) return;
    
    const addonIndex = selectedAddons.findIndex(({ id }) => id === addon.id);
    const newAddons = [...selectedAddons];

    if (addonIndex < 0) newAddons.push(addon);
    else newAddons.splice(addonIndex, 1);
    setSelectedAddons(newAddons);
  };

  const isSelected = (addon: Addon) => {
    return selectedAddons.some(({ id }) => id === addon.id);
  };

  return (
    <AddonsWrapper className={inPaymentModal ? 'in-modal' : ''}>
      <h1>Add-ons (Optional)</h1>
      
      <ul>
        <li>
          <span>Service</span>
          <span>Price</span>
        </li>

        {addons.map((addon) => (
          <li key={addon.id} onClick={handleAddon(addon)}>
            <span>{addon.text}</span>

            <span className={isSelected(addon) ? 'selected' : ''}>
              {isSelected(addon) ? <MinusOutlined /> : <PlusOutlined />}
              {formatCurrency(addon.price)}
              {addon.billing_cycle === 'monthly' ? '/month' : ''}
            </span>
          </li>
        ))}
      </ul>

      {inPaymentModal && (
        <div className="actions">
          <Button type="secondary" onClick={handleConfirmation('skip')}>
            Skip
          </Button>
          
          {Boolean(selectedAddons.length) && (
            <Button type="primary" onClick={handleConfirmation('proceed')}>
              Proceed
            </Button>
          )}
        </div>
      )}
    </AddonsWrapper>
  );
};

export default Addons;