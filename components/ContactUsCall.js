import Link from 'next/link';
import React from 'react';

const ContactUsCall = () => {
  return (
    <div className="relative bg-white pt-10 md:pt-16 lg:pt-24 py-24 px-2 md:px-4 lg:px-16 xl:px-28 w-full dark:bg-dark-mode-secondary">
      <div className="relative overflow-hidden 2xl:w-8/12 2xl:mx-auto">
        <div className="md:flex justify-between relative mx-auto px-4 sm:px-6 lg:px-0 sm:static">
          <div className="lg:pr-28 xl:pr-32 px-2 md:px-auto">
            <h1 className="text-2xl font-semibold leading-tight sm:leading-tight">
              Looking for ways to optimize your business using technology while saving time and money?
              Not sure how technology can enhance your business?
              Looking for excellence at an affordable rate?
            </h1>
            <p className="mt-4 leading-relaxed text-xl md:leading-relaxed dark:text-dark-mode-septenary text-gray-600">
              Our team of skilled developers is dedicated to creating software that aligns seamlessly with your business goals.
            </p>
            <Link
              className="mt-6 md:mt-8 lg:mt-10 inline-flex items-center gap-4 text-center bg-theme-primary border border-transparent rounded-md py-4 px-12 text-xl text-white hover:bg-theme-primary/80"
              href="/contact-us">
              Book a Session
              <i className="bi bi-easel-fill text-xl"></i>
            </Link>
          </div>

          <div className="sm:max-w-lg mt-12 md:mt-0 px-2 md:px-auto">
            <div className="rounded-lg overflow-hidden">
              <img src="./images/illustrations/session-2.gif" alt="" className="filter dark:brightness-75 w-full h-full object-center object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsCall;