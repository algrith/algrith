import ContactUs from '@/components/contact/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
};

const Page = () => (
  <ContactUs />
);

export default Page;