import ContactInquiryCard from './inquiry-card';
import { ContactWrapper } from './styled';
import ContactForm from './contact-form';
import ContactDetails from './details';

const Contact = () => {
  return (
    <ContactWrapper id="contact">
      <div className="left">
        <ContactForm />
        <ContactDetails />
        <ContactInquiryCard />
      </div>

      <div className="right">
        <p>
          If you need any support or assistance, do not hesitate to send us a message.
        </p>
      </div>
    </ContactWrapper>
  );
};

export default Contact;