import Link from 'next/link';
import React from 'react';

const Footer = () => {
	return (
    <footer className="relative dark:bg-dark-mode-secondary bg-gray-100">
			<div className="flex flex-wrap justify-between px-4 md:px-8 lg:px-16 xl:px-24 pb-12 2xl:w-8/12 2xl:mx-auto">
				<div className="w-full md:w-2/5 lg:w-4/12 pt-8">
					<h1 className="p-4 dark:text-dark-mode-senary text-navyblue text-xl font-bold">
						<svg xmlns="http://www.w3.org/2000/svg" className="inline mr-4 text-theme-primary h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
						</svg>
						Featured
					</h1>
					<div className="relative px-4 text-lg">
						<details className="my-4 rounded-xl dark:bg-dark-mode-tertiary bg-white shadow-lg border-gray-200 cursor-pointer">
							<summary className="flex justify-between items-center p-4 dark:text-dark-mode-septenary text-black focus:outline-none hover:outline-none outline-none transition-all ease-in-out duration-700">
								<span className="ml-4">Data for scientists</span>
								<i className="fa fa-bug mr-4"></i>
							</summary>
							<p className="px-8 pt-2 pb-6 dark:text-slate-200 text-gray-600 transition-all ease-in-out duration-700">
								More Content for data scientists
							</p>
						</details>
						<details className="my-4 rounded-xl dark:bg-dark-mode-tertiary bg-white shadow-lg border-gray-200 cursor-pointer">
							<summary className="flex justify-between items-center p-4 dark:text-dark-mode-septenary text-black focus:outline-none hover:outline-none outline-none transition-all ease-in-out duration-700">
								<span className="ml-4">Data for Web</span>
								<i className="fa fa-desktop mr-4"></i>
							</summary>
							<p className="px-8 pt-2 pb-6 dark:text-slate-200 text-gray-600 transition-all ease-in-out duration-700">
								More Content for data web
							</p>
						</details>
						<details className="my-4 rounded-xl dark:bg-dark-mode-tertiary bg-white shadow-lg border-gray-200 cursor-pointer">
							<summary className="flex justify-between items-center p-4 dark:text-dark-mode-septenary text-black focus:outline-none hover:outline-none outline-none transition-all ease-in-out duration-700">
								<span className="ml-4">Data for UI/UX</span>
								<i className="fab fa-uikit mr-4"></i>
							</summary>
							<p className="px-8 pt-2 pb-6 dark:text-slate-200 text-gray-600 transition-all ease-in-out duration-700">
								More Content for data UI/UX
							</p>
						</details>
						<details className="my-4 rounded-xl dark:bg-dark-mode-tertiary bg-white shadow-lg border-gray-200 cursor-pointer">
							<summary className="flex justify-between items-center p-4 dark:text-dark-mode-septenary text-black focus:outline-none hover:outline-none outline-none transition-all ease-in-out duration-700">
								<span className="ml-4">Data for Interns</span>
								<i className="fa fa-satellite-dish mr-4"></i>
							</summary>
							<p className="px-8 pt-2 pb-6 dark:text-slate-200 text-gray-600 transition-all ease-in-out duration-700">
								More Content for data Interns
							</p>
						</details>
					</div>
				</div>
				<div className="flex flex-wrap justify-between w-full md:w-3/5 lg:w-8/12 pt-4 md:pl-4">
					<div className="w-1/2 lg:w-1/4 pt-4">
						<h1 className="p-4 dark:text-dark-mode-senary text-navyblue font-bold text-xl">
							<svg xmlns="http://www.w3.org/2000/svg" className="inline mr-4 text-theme-primary h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
							</svg>
							Company
						</h1>
						<div className="relative text-lg">
							<ul className="pl-0">
								<li className="px-4 py-2">
									<Link href="/how-it-works" className="text-gray-500">
										How it Works
									</Link>
								</li>
								<li className="px-4 py-2">
									<Link href="/contact-us" className="text-gray-500">
										Contact Us
									</Link>
								</li>
								<li className="px-4 py-2">
									<Link href="/about" className="text-gray-500">
										About Us
									</Link>
								</li>
								<li className="px-4 py-2">
									<Link href="/" className="text-gray-500">
										Careers <span className="text-sm italic text-gray-600 bg-theme-secondary/60 px-2 py-1 rounded-full">Not hiring</span>
									</Link>
								</li>
								<li className="px-4 py-2">
									<Link href="/" className="text-gray-500">
										Blog
									</Link>
								</li>
								<li className="px-4 py-2">
									<Link href="/" className="text-gray-500">
										FAQ
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="w-1/2 lg:w-1/4 pt-4">
						<h1 className="p-4 dark:text-dark-mode-senary text-navyblue font-bold text-xl">						
							<svg xmlns="http://www.w3.org/2000/svg" className="inline mr-4 text-theme-primary h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
							</svg>
							Legal
						</h1>
						<div className="relative text-lg">
							<ul className="pl-0">
								<li className="px-4 py-2">
									<Link href="/terms-of-service" className="text-gray-500">
										Terms of Service
									</Link>
								</li>
								<li className="px-4 py-2">
									<Link href="/privacy-policy" className="text-gray-500">
										Privacy Policy
									</Link>
								</li>
								<li className="px-4 py-2">
									<Link href="/refund-policy" className="text-gray-500">
										Refund Policy
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="w-full lg:w-1/4 pt-4">
						<h1 className="p-4 dark:text-dark-mode-senary text-navyblue font-bold text-xl">
							<svg xmlns="http://www.w3.org/2000/svg" className="inline mr-4 text-theme-primary h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
							</svg>
							Contact
						</h1>
						<div className="relative text-lg">
							<div className="lg:block flex items-center justify-between relative">
								<div className="lg-order-2 text-theme-primary lg:mt-3 lg:mb-4 px-2 flex justify-start items-center">
									<a href="#" className="flex justify-center mx-1 items-center rounded-xl text-xl h-8 w-8 dark:bg-dark-mode-tertiary bg-white shadow-lg">
										<i className="fab fa-facebook"></i>
									</a>
									<a href="#" className="flex justify-center mx-1 items-center rounded-xl text-xl h-8 w-8 dark:bg-dark-mode-tertiary bg-white shadow-lg">
										<i className="fab fa-twitter"></i>
									</a>
									<a href="#" className="flex justify-center mx-1 items-center rounded-xl text-xl h-8 w-8 dark:bg-dark-mode-tertiary bg-white shadow-lg">
										<i className="fab fa-linkedin"></i>
									</a>
								</div>
								<div className="lg:order-1 px-4">
									<aside className="lg:mt-4">
										<a className="text-gray-500" href="mailto:algrithllc@gmail.com">algrithllc@gmail.com</a>
									</aside>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Link
			  className="flex justify-center items-center mx-0 py-8 text-lg dark:bg-transparent bg-gray-800 text-white"
				href="/">
        © Copyright<span className="ml-1 text-theme-primary"> Algrith {new Date().getFullYear()} </span>
			</Link>
		</footer>
    );
};

export default Footer;