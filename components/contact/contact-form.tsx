import React, { FormEvent, useState } from 'react';
import { SendOutlined } from '@ant-design/icons';

import { Country, Input, Select, TextArea } from '@/components/shared/input';
import Button from '@/components/shared/button';
import { ContactFormWrapper } from './styled';
import useSendMail from '@/hooks/mailer';

const topicOptions = [
  {
    value: 'Web Application Development',
    text: 'Web Application Development'
  },
  {
    text: `Artificial Intelligence - Want to know how to integrate AI into your business?`,
    value: 'Artificial Intelligence'
  },
  {
    text: `Website Revamp (redesign)`,
    value: 'Website Revamp'
  },
  {
    value: 'Business Optimization',
    text: 'Business Optimization'
  },
  {
    text: 'Other (your topic)',
    value: 'other'
  }
];

const initialModel = {
  subject: 'New Contact Mail',
  customTopic: '',
  country: '',
  message: '',
  email: '',
  phone: '',
  topic: '',
  token: '',
  name: ''
};

const ContactForm = () => {
  const [model, updateModel] = useState(initialModel);
  const { feedback, sendMail } = useSendMail();
  
  const handleChange = (key: string, value: string) => {
    const newModel = { ...model, [key]: value };
    if (key === 'topic' && value !== 'other') {
      newModel.customTopic = '';
    }

    updateModel({ ...newModel });
  };
  
  const handleSendMail = async (e: FormEvent) => {
    e.preventDefault();
    
    const { success } = await sendMail(model);
    if (success) updateModel(initialModel);
  };

  return (
    <ContactFormWrapper>
      <form onSubmit={handleSendMail}>
        <div className="fields-wrapper">
          <div className="grid-fields">
            <Input
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="e.g. John Doe"
              value={model.name}
              label="Name"
              type="text"
              id="name"
              required
            />

            <Input
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="e.g. johndoe@email.com"
              value={model.email}
              label="Email"
              type="email"
              id="email"
              required
            />
            
            <Country
              onChange={(value) => handleChange('country', value)}
              placeholder="Select your country"
              defaultValue={model.country}
              label="Location"
              id="country"
              required
            />
            
            <Input
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="e.g. +88 9209 635"
              value={model.phone}
              label="Phone"
              id="phone"
              type="tel"
              required
            />
          </div>

          <Select
            onChange={(value) => handleChange('topic', value)}
            label="Topic (What are you interested in?)"
            placeholder="Select an interest"
            defaultValue={model.topic}
            options={topicOptions}
            id="topic"
            required
          />

          {model.topic === "other" && (
            <Input
              onChange={(e) => handleChange('customTopic', e.target.value)}
              value={model.customTopic}
              placeholder="e.g. Custom topic"
              label="Specify your topic"
              id="customTopic"
              type="text"
            />
          )}

          <TextArea
            helpText="Include other usefull information that will help us work better."
            description="(Briefly describe your business, and include links if any.)"
            onChange={(e) => handleChange('message', e.target.value)}
            placeholder="I need a corporate website for my business"
            value={model.message}
            label="Message"
            id="message"
            rows={7}
            required
          />
        </div>

        <div className="footer">
          {feedback.message && (
            <p className={`feedback ${feedback.success ? 'success' : 'error'}`}>
              {feedback.message}
            </p>
          )}
            
          <Button
            prependedIcon={<SendOutlined />}
            disabled={feedback.loading}
            loading={feedback.loading}
            htmlType="submit"
            type="secondary">
            Send
          </Button>
        </div>
      </form>
    </ContactFormWrapper>
  );
};

export default ContactForm;