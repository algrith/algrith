'use client';

import { CaretDownOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import React, { FocusEvent, forwardRef, Ref, useState } from 'react';
import AntPassword, { PasswordProps } from 'antd/es/input/Password';
import AntTextArea from 'antd/es/input/TextArea';
import {
  Select as AntSelect,
  Input as AntInput,
  InputLabelProps,
  RadioGroupProps,
  CheckboxProps,
  TextAreaProps,
  SelectProps,
  InputProps,
  Flex
} from 'antd';

import { SelectWrapper, InputWrapper, LabelWrapper, RadioGroupWrapper, CheckboxWrapper } from './styled';
import useFloatingLabel from '@/hooks/floating-label';
import useClassName from '@/hooks/class-name';
import { filterObject } from '@/utils';
import colors from '@/libs/colors';
import { Colors } from '@/types';

const genericCustomProps = [
  'description',
  'floatLabel',
  'actionText',
  'className',
  'helpText',
  'label'
];

const customProps = {
  checkbox: genericCustomProps,
  input: genericCustomProps,
  select: [
    ...genericCustomProps,
    'onFloatLabelChange',
    'prefixIcon',
    'required',
    'type'
  ]
};

const countries = [
  { text: `Afghanistan`, value: `Afghanistan` },
  { text: `Åland Islands`, value: `Åland Islands` },
  { text: `Albania`, value: `Albania` },
  { text: `Algeria`, value: `Algeria` },
  { text: `American Samoa`, value: `American Samoa` },
  { text: `Andorra`, value: `Andorra` },
  { text: `Angola`, value: `Angola` },
  { text: `Anguilla`, value: `Anguilla` },
  { text: `Antarctica`, value: `Antarctica` },
  { text: `Antigua and Barbuda`, value: `Antigua and Barbuda` },
  { text: `Argentina`, value: `Argentina` },
  { text: `Armenia`, value: `Armenia` },
  { text: `Aruba`, value: `Aruba` },
  { text: `Australia`, value: `Australia` },
  { text: `Austria`, value: `Austria` },
  { text: `Azerbaijan`, value: `Azerbaijan` },
  { text: `Bahamas`, value: `Bahamas` },
  { text: `Bahrain`, value: `Bahrain` },
  { text: `Bangladesh`, value: `Bangladesh` },
  { text: `Barbados`, value: `Barbados` },
  { text: `Belarus`, value: `Belarus` },
  { text: `Belgium`, value: `Belgium` },
  { text: `Belize`, value: `Belize` },
  { text: `Benin`, value: `Benin` },
  { text: `Bermuda`, value: `Bermuda` },
  { text: `Bhutan`, value: `Bhutan` },
  { text: `Bolivia`, value: `Bolivia` },
  { text: `Bosnia and Herzegovina`, value: `Bosnia and Herzegovina` },
  { text: `Botswana`, value: `Botswana` },
  { text: `Bouvet Island`, value: `Bouvet Island` },
  { text: `Brazil`, value: `Brazil` },
  { text: `British Indian Ocean Territory`, value: `British Indian Ocean Territory` },
  { text: `Brunei Darussalam`, value: `Brunei Darussalam` },
  { text: `Bulgaria`, value: `Bulgaria` },
  { text: `Burkina Faso`, value: `Burkina Faso` },
  { text: `Burundi`, value: `Burundi` },
  { text: `Cambodia`, value: `Cambodia` },
  { text: `Cameroon`, value: `Cameroon` },
  { text: `Canada`, value: `Canada` },
  { text: `Cape Verde`, value: `Cape Verde` },
  { text: `Cayman Islands`, value: `Cayman Islands` },
  { text: `Central African Republic`, value: `Central African Republic` },
  { text: `Chad`, value: `Chad` },
  { text: `Chile`, value: `Chile` },
  { text: `China`, value: `China` },
  { text: `Christmas Island`, value: `Christmas Island` },
  { text: `Cocos (Keeling) Islands`, value: `Cocos (Keeling) Islands` },
  { text: `Colombia`, value: `Colombia` },
  { text: `Comoros`, value: `Comoros` },
  { text: `Congo`, value: `Congo` },
  { text: `Congo, The Democratic Republic of The`, value: `Congo, The Democratic Republic of The` },
  { text: `Cook Islands`, value: `Cook Islands` },
  { text: `Costa Rica`, value: `Costa Rica` },
  { text: `Cote D'ivoire`, value: `Cote D'ivoire` },
  { text: `Croatia`, value: `Croatia` },
  { text: `Cuba`, value: `Cuba` },
  { text: `Cyprus`, value: `Cyprus` },
  { text: `Czech Republic`, value: `Czech Republic` },
  { text: `Denmark`, value: `Denmark` },
  { text: `Djibouti`, value: `Djibouti` },
  { text: `Dominica`, value: `Dominica` },
  { text: `Dominican Republic`, value: `Dominican Republic` },
  { text: `Ecuador`, value: `Ecuador` },
  { text: `Egypt`, value: `Egypt` },
  { text: `El Salvador`, value: `El Salvador` },
  { text: `Equatorial Guinea`, value: `Equatorial Guinea` },
  { text: `Eritrea`, value: `Eritrea` },
  { text: `Estonia`, value: `Estonia` },
  { text: `Ethiopia`, value: `Ethiopia` },
  { text: `Falkland Islands (Malvinas)`, value: `Falkland Islands (Malvinas)` },
  { text: `Faroe Islands`, value: `Faroe Islands` },
  { text: `Fiji`, value: `Fiji` },
  { text: `Finland`, value: `Finland` },
  { text: `France`, value: `France` },
  { text: `French Guiana`, value: `French Guiana` },
  { text: `French Polynesia`, value: `French Polynesia` },
  { text: `French Southern Territories`, value: `French Southern Territories` },
  { text: `Gabon`, value: `Gabon` },
  { text: `Gambia`, value: `Gambia` },
  { text: `Georgia`, value: `Georgia` },
  { text: `Germany`, value: `Germany` },
  { text: `Ghana`, value: `Ghana` },
  { text: `Gibraltar`, value: `Gibraltar` },
  { text: `Greece`, value: `Greece` },
  { text: `Greenland`, value: `Greenland` },
  { text: `Grenada`, value: `Grenada` },
  { text: `Guadeloupe`, value: `Guadeloupe` },
  { text: `Guam`, value: `Guam` },
  { text: `Guatemala`, value: `Guatemala` },
  { text: `Guernsey`, value: `Guernsey` },
  { text: `Guinea`, value: `Guinea` },
  { text: `Guinea-bissau`, value: `Guinea-bissau` },
  { text: `Guyana`, value: `Guyana` },
  { text: `Haiti`, value: `Haiti` },
  { text: `Heard Island and Mcdonald Islands`, value: `Heard Island and Mcdonald Islands` },
  { text: `Holy See (Vatican City State)`, value: `Holy See (Vatican City State)` },
  { text: `Honduras`, value: `Honduras` },
  { text: `Hong Kong`, value: `Hong Kong` },
  { text: `Hungary`, value: `Hungary` },
  { text: `Iceland`, value: `Iceland` },
  { text: `India`, value: `India` },
  { text: `Indonesia`, value: `Indonesia` },
  { text: `Iran, Islamic Republic of`, value: `Iran, Islamic Republic of` },
  { text: `Iraq`, value: `Iraq` },
  { text: `Ireland`, value: `Ireland` },
  { text: `Isle of Man`, value: `Isle of Man` },
  { text: `Israel`, value: `Israel` },
  { text: `Italy`, value: `Italy` },
  { text: `Jamaica`, value: `Jamaica` },
  { text: `Japan`, value: `Japan` },
  { text: `Jersey`, value: `Jersey` },
  { text: `Jordan`, value: `Jordan` },
  { text: `Kazakhstan`, value: `Kazakhstan` },
  { text: `Kenya`, value: `Kenya` },
  { text: `Kiribati`, value: `Kiribati` },
  { text: `Korea, Democratic People's Republic of`, value: `Korea, Democratic People's Republic of` },
  { text: `Korea, Republic of`, value: `Korea, Republic of` },
  { text: `Kuwait`, value: `Kuwait` },
  { text: `Kyrgyzstan`, value: `Kyrgyzstan` },
  { text: `Lao People's Democratic Republic`, value: `Lao People's Democratic Republic` },
  { text: `Latvia`, value: `Latvia` },
  { text: `Lebanon`, value: `Lebanon` },
  { text: `Lesotho`, value: `Lesotho` },
  { text: `Liberia`, value: `Liberia` },
  { text: `Libyan Arab Jamahiriya`, value: `Libyan Arab Jamahiriya` },
  { text: `Liechtenstein`, value: `Liechtenstein` },
  { text: `Lithuania`, value: `Lithuania` },
  { text: `Luxembourg`, value: `Luxembourg` },
  { text: `Macao`, value: `Macao` },
  { text: `Macedonia, The Former Yugoslav Republic of`, value: `Macedonia, The Former Yugoslav Republic of` },
  { text: `Madagascar`, value: `Madagascar` },
  { text: `Malawi`, value: `Malawi` },
  { text: `Malaysia`, value: `Malaysia` },
  { text: `Maldives`, value: `Maldives` },
  { text: `Mali`, value: `Mali` },
  { text: `Malta`, value: `Malta` },
  { text: `Marshall Islands`, value: `Marshall Islands` },
  { text: `Martinique`, value: `Martinique` },
  { text: `Mauritania`, value: `Mauritania` },
  { text: `Mauritius`, value: `Mauritius` },
  { text: `Mayotte`, value: `Mayotte` },
  { text: `Mexico`, value: `Mexico` },
  { text: `Micronesia, Federated States of`, value: `Micronesia, Federated States of` },
  { text: `Moldova, Republic of`, value: `Moldova, Republic of` },
  { text: `Monaco`, value: `Monaco` },
  { text: `Mongolia`, value: `Mongolia` },
  { text: `Montenegro`, value: `Montenegro` },
  { text: `Montserrat`, value: `Montserrat` },
  { text: `Morocco`, value: `Morocco` },
  { text: `Mozambique`, value: `Mozambique` },
  { text: `Myanmar`, value: `Myanmar` },
  { text: `Namibia`, value: `Namibia` },
  { text: `Nauru`, value: `Nauru` },
  { text: `Nepal`, value: `Nepal` },
  { text: `Netherlands`, value: `Netherlands` },
  { text: `Netherlands Antilles`, value: `Netherlands Antilles` },
  { text: `New Caledonia`, value: `New Caledonia` },
  { text: `New Zealand`, value: `New Zealand` },
  { text: `Nicaragua`, value: `Nicaragua` },
  { text: `Niger`, value: `Niger` },
  { text: `Nigeria`, value: `Nigeria` },
  { text: `Niue`, value: `Niue` },
  { text: `Norfolk Island`, value: `Norfolk Island` },
  { text: `Northern Mariana Islands`, value: `Northern Mariana Islands` },
  { text: `Norway`, value: `Norway` },
  { text: `Oman`, value: `Oman` },
  { text: `Pakistan`, value: `Pakistan` },
  { text: `Palau`, value: `Palau` },
  { text: `Palestinian Territory, Occupied`, value: `Palestinian Territory, Occupied` },
  { text: `Panama`, value: `Panama` },
  { text: `Papua New Guinea`, value: `Papua New Guinea` },
  { text: `Paraguay`, value: `Paraguay` },
  { text: `Peru`, value: `Peru` },
  { text: `Philippines`, value: `Philippines` },
  { text: `Pitcairn`, value: `Pitcairn` },
  { text: `Poland`, value: `Poland` },
  { text: `Portugal`, value: `Portugal` },
  { text: `Puerto Rico`, value: `Puerto Rico` },
  { text: `Qatar`, value: `Qatar` },
  { text: `Reunion`, value: `Reunion` },
  { text: `Romania`, value: `Romania` },
  { text: `Russian Federation`, value: `Russian Federation` },
  { text: `Rwanda`, value: `Rwanda` },
  { text: `Saint Helena`, value: `Saint Helena` },
  { text: `Saint Kitts and Nevis`, value: `Saint Kitts and Nevis` },
  { text: `Saint Lucia`, value: `Saint Lucia` },
  { text: `Saint Pierre and Miquelon`, value: `Saint Pierre and Miquelon` },
  { text: `Saint Vincent and The Grenadines`, value: `Saint Vincent and The Grenadines` },
  { text: `Samoa`, value: `Samoa` },
  { text: `San Marino`, value: `San Marino` },
  { text: `Sao Tome and Principe`, value: `Sao Tome and Principe` },
  { text: `Saudi Arabia`, value: `Saudi Arabia` },
  { text: `Senegal`, value: `Senegal` },
  { text: `Serbia`, value: `Serbia` },
  { text: `Seychelles`, value: `Seychelles` },
  { text: `Sierra Leone`, value: `Sierra Leone` },
  { text: `Singapore`, value: `Singapore` },
  { text: `Slovakia`, value: `Slovakia` },
  { text: `Slovenia`, value: `Slovenia` },
  { text: `Solomon Islands`, value: `Solomon Islands` },
  { text: `Somalia`, value: `Somalia` },
  { text: `South Africa`, value: `South Africa` },
  { text: `South Georgia and The South Sandwich Islands`, value: `South Georgia and The South Sandwich Islands` },
  { text: `Spain`, value: `Spain` },
  { text: `Sri Lanka`, value: `Sri Lanka` },
  { text: `Sudan`, value: `Sudan` },
  { text: `Suriname`, value: `Suriname` },
  { text: `Svalbard and Jan Mayen`, value: `Svalbard and Jan Mayen` },
  { text: `Swaziland`, value: `Swaziland` },
  { text: `Sweden`, value: `Sweden` },
  { text: `Switzerland`, value: `Switzerland` },
  { text: `Syrian Arab Republic`, value: `Syrian Arab Republic` },
  { text: `Taiwan`, value: `Taiwan` },
  { text: `Tajikistan`, value: `Tajikistan` },
  { text: `Tanzania, United Republic of`, value: `Tanzania, United Republic of` },
  { text: `Thailand`, value: `Thailand` },
  { text: `Timor-leste`, value: `Timor-leste` },
  { text: `Togo`, value: `Togo` },
  { text: `Tokelau`, value: `Tokelau` },
  { text: `Tonga`, value: `Tonga` },
  { text: `Trinidad and Tobago`, value: `Trinidad and Tobago` },
  { text: `Tunisia`, value: `Tunisia` },
  { text: `Turkey`, value: `Turkey` },
  { text: `Turkmenistan`, value: `Turkmenistan` },
  { text: `Turks and Caicos Islands`, value: `Turks and Caicos Islands` },
  { text: `Tuvalu`, value: `Tuvalu` },
  { text: `Uganda`, value: `Uganda` },
  { text: `Ukraine`, value: `Ukraine` },
  { text: `United Arab Emirates`, value: `United Arab Emirates` },
  { text: `United Kingdom`, value: `United Kingdom` },
  { text: `United States`, value: `United States` },
  { text: `United States Minor Outlying Islands`, value: `United States Minor Outlying Islands` },
  { text: `Uruguay`, value: `Uruguay` },
  { text: `Uzbekistan`, value: `Uzbekistan` },
  { text: `Vanuatu`, value: `Vanuatu` },
  { text: `Venezuela`, value: `Venezuela` },
  { text: `Viet Nam`, value: `Viet Nam` },
  { text: `Virgin Islands, British`, value: `Virgin Islands, British` },
  { text: `Virgin Islands, U.S.`, value: `Virgin Islands, U.S.` },
  { text: `Wallis and Futuna`, value: `Wallis and Futuna` },
  { text: `Western Sahara`, value: `Western Sahara` },
  { text: `Yemen`, value: `Yemen` },
  { text: `Zambia`, value: `Zambia` },
  { text: `Zimbabwe`, value: `Zimbabwe` }
];

export const TextArea = forwardRef((props: TextAreaProps, ref: Ref<HTMLTextAreaElement>) => {
  const className = useClassName(props.className);

  const textAreaProps = filterObject({
    // Using the default empty placeholder value to control floating label.
    target: { ...props, placeholder: props.placeholder ?? ' '},
    filters: customProps.input
  });

  const {
    description,
    floatLabel,
    actionText,
    helpText,
    required,
		label,
    id
  } = props;

  const { handleFocus, handleBlur, isFloating } = useFloatingLabel(floatLabel);

  return (
    <InputWrapper className={className}>
      {label && (
        <Label
          floatLabel={isFloating}
          required={required}
          label={label}
          id={id}
        />
      )}

      {description && (description)}

      <AntTextArea
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...textAreaProps}
        ref={ref}
      />
      
      {helpText && (helpText)}
      {actionText && (actionText)}
    </InputWrapper>
  );
});

const passwordVisibilityToggle = (visible: boolean) => (
  visible ? (
    <EyeInvisibleOutlined style={{ fontSize: '110%' }} />
  ) : (
    <EyeOutlined style={{ fontSize: '110%' }} />
  )
);

export const RadioGroup = (props: RadioGroupProps) => {
  return (
    <RadioGroupWrapper {...props} />
  );
};

export const Checkbox = (props: CheckboxProps) => {
  const checkboxProps = filterObject({
    filters: customProps.checkbox,
    target: props
  });

  return (
    <CheckboxWrapper {...checkboxProps}>
      {props.label}
    </CheckboxWrapper>
  );
};

export const Password = (props: PasswordProps) => {
  const className = useClassName(props.className);

  const passwordProps = filterObject({
    // Using the default empty placeholder value to control floating label.
    target: { ...props, placeholder: props.placeholder ?? ' '},
    filters: customProps.input
  });

  const {
    description,
    floatLabel,
    actionText,
    helpText,
    required,
		label,
    size,
    id
  } = props;

  const { handleFocus, handleBlur, isFloating } = useFloatingLabel(floatLabel);

  return (
    <InputWrapper className={className}>
      {label && (
        <Label
          floatLabel={isFloating}
          required={required}
          label={label}
          size={size}
          id={id}
        />
      )}

      {description && (description)}

      <AntPassword
        iconRender={passwordVisibilityToggle}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...passwordProps}
      />

      {helpText && (helpText)}
      {actionText && (actionText)}
    </InputWrapper>
  );
};

export const Country = (props: SelectProps) => (
  <Select {...props} options={countries} />
);

export const Select = (props: SelectProps) => {
  const className = useClassName(props.className);

  const {
    floatLabel = true,
    description,
    actionText,
		prefixIcon,
		helpText,
    required,
    label,
    type,
    size,
		id
  } = props;

  const style = {
    backgroundColor: type ? colors.theme[type as keyof Colors['theme']] : 'transparent'
  };

  const [isFloatingLabel, setFloatLabel] = useState(floatLabel);

  return (
    <SelectWrapper className={className}>
      {label && (
        <Label
          floatLabel={isFloatingLabel}
          required={required}
          label={label}
          size={size}
          id={id}
        />
      )}

      {description && (description)}
			
      {prefixIcon ? (
				<Flex gap={8} className="icon-wrapper" style={style}>
					{prefixIcon}
					<SelectInput {...props} onFloatLabelChange={setFloatLabel} />
				</Flex>
			) : (
				<SelectInput {...props} onFloatLabelChange={setFloatLabel} />
			)}

      {helpText && (helpText)}
      {actionText && (actionText)}
    </SelectWrapper>
  );
};

const SelectInput = (props: SelectProps) => {
  const { onFloatLabelChange = () => {}, floatLabel } = props;
  const { handleFocus, handleBlur, isFloating } = useFloatingLabel(floatLabel);

  const handleFloatLabel = (e: FocusEvent) => {
    if (e.type === 'focus') handleFocus();
    if (e.type === 'blur') handleBlur();
    onFloatLabelChange(!isFloating);
  };

  const selectProps = filterObject({
    filters: customProps.select,
    target: {
      ...props,
      placeholder: props.placeholder ?? ' ', //  For floating label control.
      suffixIcon: props.suffixIcon ?? <CaretDownOutlined />,
    }
  });

  return (
    <AntSelect
      onFocus={handleFloatLabel}
      onBlur={handleFloatLabel}
      {...selectProps}
    />
  );
};

export const Input = (props: InputProps) => {
  const className = useClassName(props.className);

  const inputProps = filterObject({
    // Using default empty value placeholder for floating label control.
    target: { ...props, placeholder: props.placeholder ?? ' ' },
    filters: customProps.input,
  });

  const {
    description,
    floatLabel,
    actionText,
    helpText,
    required,
		label,
    size,
    id
  } = props;

  const { handleFocus, handleBlur, isFloating } = useFloatingLabel(floatLabel);

  return (
    <InputWrapper className={className}>
      {label && (
        <Label
          floatLabel={isFloating}
          required={required}
          label={label}
          size={size}
          id={id}
        />
      )}

      {description && (description)}
      
      <AntInput
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...inputProps}
      />

      {helpText && (helpText)}
      {actionText && (actionText)}
    </InputWrapper>
  );
};

const Label = (props: InputLabelProps) => {
  const { required = false, floatLabel, label, size, id } = props;
  const className = [floatLabel ? 'floating' : '', size ?? ''].join(' ').trim();

  return (
    <LabelWrapper
      title={typeof label === 'string' ? label : ''}
      className={className}
      htmlFor={id}
    >
      {label}
      {required && <span className="required">*</span>}
    </LabelWrapper>
  );
};

TextArea.displayName = 'TextArea';