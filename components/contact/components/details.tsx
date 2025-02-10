import Link from '@/components/shared/button/link';
import { ContactDetailsWrapper } from './styled';

const ContactDetails = () => {
  return (
    <ContactDetailsWrapper>
      <div className="top">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#ffffff" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
          </svg>
        </span>
        <Link href="#">
          <i className="fab fa-facebook"></i>
        </Link>
        <Link href="#">
          <i className="fab fa-twitter"></i>
        </Link>
        <Link href="#">
          <i className="fab fa-linkedin"></i>
        </Link>
      </div>

      <div className="bottom">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#ffffff" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </span>
        <p>support@algrith.com</p>
      </div>
    </ContactDetailsWrapper>
  );
};

export default ContactDetails;