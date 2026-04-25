'use client';

import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Addon, AddonsProps } from '@/types';
import { formatCurrency } from '@/utils';
import { AddonsWrapper } from './styled';
import { addons } from '@/libs/plans';

const Addons = ({ inPaymentModal, onSelect, selected }: AddonsProps) => {
  const isSelected = (addon: Addon) => selected?.some(({ id }) => id === addon.id);
  
  const handleSelection = (addon: Addon) => () => {
    if (!inPaymentModal || !selected) return;
    
    const addonIndex = selected.findIndex(({ id }) => id === addon.id);
    const newAddons = [...selected];

    if (addonIndex < 0) newAddons.push(addon);
    else newAddons.splice(addonIndex, 1);
    onSelect?.(newAddons);
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
          <li key={addon.id} onClick={handleSelection(addon)}>
            <span>{addon.text}</span>

            <span className={isSelected(addon) ? 'selected' : ''}>
              {isSelected(addon) ? <MinusOutlined /> : <PlusOutlined />}
              {formatCurrency(addon.price)}
              {addon.billing_cycle === 'monthly' ? '/month' : ''}
            </span>
          </li>
        ))}
      </ul>
    </AddonsWrapper>
  );
};

export default Addons;