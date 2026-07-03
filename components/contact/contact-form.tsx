import React, { FormEvent, useState } from 'react';
import { SendOutlined } from '@ant-design/icons';

import { Country, Input, Select, TextArea } from '@/components/shared/input';
import Button from '@/components/shared/button';
import { ContactFormWrapper } from './styled';
import useRecaptcha from '@/hooks/recaptcha';
import { isValidEmail } from '@/utils';
import { Fetch } from '@/utils/api';

const feedbackMessages = {
  reCaptchaError: 'An error occurred! Please reload the page and try again.',
  error: 'An error occurred while sending your message!',
  invalidEmail: 'Your email address in invalid',
  sent: 'Your message was sent successfully!'
};

const initialFeedback = {
  loading: false,
  success: false,
  message: ''
};

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
  customTopic: undefined,
  country: undefined,
  topic: undefined,
  message: '',
  email: '',
  phone: '',
  name: ''
};

const ContactForm = () => {
  const [feedback, setFeedback] = useState(initialFeedback);
  const [model, updateModel] = useState(initialModel);
  const { verifyReCaptchaToken } = useRecaptcha();
  
  const handleChange = (key: string, value: string) => {
    const newModel = { ...model, [key]: value };
    if (key === 'topic' && value !== 'other') {
      newModel.customTopic = undefined;
    }

    updateModel({ ...newModel });
  };
  
  const handleSendMail = async (e: FormEvent) => {
    e.preventDefault();
    
    setFeedback({ ...initialFeedback, loading: true });
    const isTokenValid = await verifyReCaptchaToken('contact');
    const feedback = { ...initialFeedback };

    if (!isValidEmail(model.email)) {
      feedback.message = feedbackMessages.invalidEmail;
    }
    
    if (!isTokenValid) {
      console.error('Google reCaptcha could not be initialized!');
      feedback.message = feedbackMessages.reCaptchaError;
    }

    if (!feedback.message) {
      const { success } = await Fetch({
        path: '/contacts',
        method: 'POST',
        body: model
      });

      feedback.message = feedbackMessages[success ? 'sent' : 'error'];
      feedback.success = success;
    }

    setFeedback(feedback);

    if (feedback.success) {
      updateModel(initialModel);
    }
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