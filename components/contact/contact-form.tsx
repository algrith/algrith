import React, { FormEvent, useState } from 'react';
import { SendOutlined } from '@ant-design/icons';

import { Country, Input, Select, TextArea } from '@/components/shared/input';
import Button from '@/components/shared/button';
import { ContactFormWrapper } from './styled';
import useSendMail from '@/hooks/send-mail';

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

const ContactForm = () => {
  const { feedback, sendMail } = useSendMail();
  const [details, setDetails] = useState({
    subject: 'New Contact Mail',
    template: 'contact-email',
    customTopic: '',
    country: '',
    message: '',
    email: '',
    phone: '',
    topic: '',
    name: ''
  });

  const handleChange = (key: string, value: string) => {
    const newDetails = { ...details, [key]: value };
    if (key === 'topic' && value !== 'other') {
      newDetails.customTopic = '';
    }

    setDetails({ ...newDetails });
  };
  
  const handleSendMail = (e: FormEvent) => {
    e.preventDefault();
    sendMail(details);
  };

  return (
    <ContactFormWrapper>
      <form onSubmit={handleSendMail}>
        <div className="fields-wrapper">
          <div className="grid-fields">
            <Input
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="e.g. John Doe"
              showRequiredIndicator
              value={details.name}
              label="Name"
              type="text"
              id="name"
              required
            />

            <Input
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="e.g. johndoe@email.com"
              showRequiredIndicator
              value={details.email}
              label="Email"
              type="email"
              id="email"
              required
            />
            
            <Country
              onChange={(value) => handleChange('country', value)}
              defaultValue={details.country}
              showRequiredIndicator
              label="Location"
              id="country"
            />
            
            <Input
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="e.g. +88 9209 635"
              showRequiredIndicator
              value={details.phone}
              label="Phone"
              id="phone"
              type="tel"
              required
            />
          </div>

          <Select
            onChange={(value) => handleChange('topic', value)}
            label="Topic (What are you interested in?)"
            options={topicOptions}
            showRequiredIndicator
            value={details.topic}
            id="topic"
          />

          {details.topic === "other" && (
            <Input
              onChange={(e) => handleChange('customTopic', e.target.value)}
              value={details.customTopic}
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
            value={details.message}
            showRequiredIndicator
            label="Message"
            id="message"
            rows={7}
            required
          />
        </div>

        <div className="button-wrapper">
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