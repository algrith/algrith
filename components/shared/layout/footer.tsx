'use client';

import {
	DeploymentUnitOutlined,
	AntDesignOutlined,
	TwitterOutlined,
	DesktopOutlined,
	LinkedinFilled,
	FacebookFilled,
	BugOutlined
} from '@ant-design/icons';

import { FooterWrapper } from './styled';
import { FooterResource } from '@/types';
import Link from '../button/link';

const resources: FooterResource = [
	{
		title: 'Company',
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
				<path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
			</svg>
		),
		items: [
			{
				href: '/how-it-works',
				text: 'How it Works'
			},
			{
				href: '/contact-us',
				text: 'Contact Us'
			},
			{
				href: '/about-us',
				text: 'About Us'
			},
			{
				text: 'Careers',
				href: '/',
				subItem: {
					text: 'Not hiring',
					href: '/'
				}
			},
			{
				text: 'Blog',
				href: '/',
				subItem: {
					text: 'Coming soon',
					href: '/'
				}
			},
			// {
			// 	text: 'FAQ',
			// 	href: '/'
			// }					
		]
	},
	{
		title: 'Legal',
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
				<path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
			</svg>
		),
		items: [
			{
				href: '/terms-of-service',
				text: 'Terms of Service'
			},
			{
				href: '/privacy-policy',
				text: 'Privacy Policy'
			},
			{
				text: 'Refund Policy',
				href: '/refund-policy',
			}			
		]
	},
	{
		title: 'Contact',
		items: [],
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
				<path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
			</svg>
		)
	}
];

const features = [
	{
		text: 'Access structured datasets tailored for scientific research, supporting advanced analytics, machine learning models, and reproducible experiments.',
		title: 'Data for scientists',
		icon: <BugOutlined />
	},
	{
		text: `Enhance your web applications with datasets optimized for both frontend and backend development, improving functionality and user engagement.`,
		icon: <DesktopOutlined />,
		title: 'Data for Web'
	},
	{
		text: `Utilize datasets focused on user behavior and interaction patterns to design intuitive, user-centric interfaces across platforms.`,
		icon: <AntDesignOutlined />,
		title: 'Data for UI/UX'
	},
	{
		text: `Begin your data journey with beginner-friendly datasets and tutorials, building a solid foundation in data analysis for real-world applications.`,
		icon: <DeploymentUnitOutlined />,
		title: 'Data for Interns'
	}
];

const socials = [
	{
		href: '/',
		icon: <FacebookFilled />
	},
	{
		href: '/',
		icon: <TwitterOutlined />
	},
	{
		href: '/',
		icon: <LinkedinFilled />,
	}
];

const email = {
	href: 'mailto:algrithllc@gmail.com',
	text: 'algrithllc@gmail.com'
};

const Footer = () => {
	return (
    <FooterWrapper>
			<div className="top">
				<div className="left">
					<h1>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
						</svg>
						Featured
					</h1>
					<div className="section">
						{features.map(({ title, text, icon }) => (
							<details key={title}>
								<summary>
									<span>{title}</span>
									{icon}
								</summary>

								<p>{text}</p>
							</details>
						))}
					</div>
				</div>
				<div className="right">
					{resources.map(({ icon, ...resource }) => (
						<div key={resource.title} className={`section ${resource.title === 'Contact' ? 'full-on-mobile' : ''}`}>
							<h1>
								{icon}
								{resource.title}
							</h1>
							<div className="wrapper">
								{resource.title !== 'Contact' ? (
									resource.items.map((item) => (
										<ul key={item.text}>
											<li>
												<Link href={item.href}>
													{item.text}
													{' '}
													{item.subItem && <span className="careers">{item.subItem.text}</span>}
												</Link>
											</li>
										</ul>
									))
								) : (
									<div className="contacts">
										<div className="socials">
											{socials.map((social, index) => (
												<a key={index} href={social.href}>
													{social.icon}
												</a>
											))}
										</div>
										
										<div className="email">
											<a href={email.href}>
												{email.text}
											</a>
										</div>
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			</div>

			<Link className="copyright" href="/">
        © Copyright<span> Algrith {new Date().getFullYear()} </span>
			</Link>
		</FooterWrapper>
    );
};

export default Footer;