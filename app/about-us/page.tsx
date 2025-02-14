import AboutUs from '@/components/about';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
};

const Page = () => (
  <AboutUs />
);

export default Page;