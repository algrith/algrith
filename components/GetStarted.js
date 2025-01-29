import Link from 'next/link';
import React from 'react';

const GetStarted = () => {
  return (
    <div className="relative pb-10 md:pb-24 px-8 md:px-12 lg:px-20 xl:px-32 w-full 2xl:w-8/12 2xl:mx-auto">
      <div className="w-full mx-auto rounded-3xl shadow-lg relative dark:bg-dark-mode-primary bg-white overflow-hidden">
        <div className="pt-8 pb-10 sm:pt-24 sm:pb-40 md:pt-16 md:pb-16 lg:pt-24 lg:pb-24 xl:pt-12 xl:pb-12">
          
          <div className="md:flex justify-between relative mx-auto px-4 sm:px-6 lg:px-8 sm:static">
            
            <div className="sm:max-w-2xl px-2 md:px-auto">
              <h1 className="leading-tight text-4xl font-extrabold tracking-wide dark:text-theme-primary text-gray-900 sm:leading-tight sm:text-6xl">
                Responsive designs for your web app.
              </h1>
              <p className="mt-4 text-xl leading-relaxed md:leading-relaxed dark:text-dark-mode-septenary text-gray-500">
                🎉 Our designs are sleek and responsive, ensuring a seamless experience across all devices. 
                Whether you're on a desktop, tablet, or mobile, enjoy a visually stunning and user-friendly interface. 
                <span className="hidden lg:inline">
                  {' '}Explore effortlessly and stay connected with our latest updates.
                </span>
              </p>

              <Link
                className="mt-6 md:mt-8 lg:mt-10 md:ml-auto inline-flex items-center gap-4 text-center bg-indigo-600 dark:bg-indigo-700 border border-transparent rounded-md py-4 px-12 text-xl text-white hover:bg-indigo-500 dark:hover:bg-indigo-600"
                href="/contact-us">
                Get Started
                <svg xmlns="http://www.w3.org/2000/svg" className="inline h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                </svg>
              </Link>
            </div>

            <div className="sm:max-w-2xl mt-8 md:mt-0 px-2 md:px-auto">
              <div className="rounded-lg overflow-hidden">
                <img src="./images/illustrations/responsive.gif" alt="responsive_design_illustration" className="filter dark:brightness-75 w-full h-full object-center object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;