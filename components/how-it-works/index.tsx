'use client';

import { HowItWorksWrapper } from './styled';
import Link from '../shared/button/link';
import Step from './step';

const howItWorks = [
  {
    content: `Initiate contact with us by providing a concise overview of your business, including relevant links and pages. Expect a prompt response within 2-3 business days from our team.`,
    icon: 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122',
    title: 'Initial Consultation',
    direction: 'left',
    color: 'red',
    step: 1
  },
  {
    content: `A meeting would be scheduled with our experts to delve into the intricacies of your business. By the meeting's conclusion, we aim to have identified your specific requirements, challenges, and objectives. We will discuss any pre-existing systems, technologies, or processes that may require modification or enhancement. Additionally, budget and timeline considerations will be addressed. Should further clarification be needed, a follow-up meeting will be scheduled.`,
    icon: 'M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z',
    title: 'Business Discovery Meeting',
    direction: 'right',
    color: 'yellow',
    step: 2
  },
  {
    content: `Following our understanding of your needs, we will present a comprehensive contract outlining the project proposal. This document will detail the scope, timeline, cost estimates, deliverables, and acceptance criteria. Subsequently, we will organize a follow-up meeting to negotiate terms and finalize the contractual agreement.`,
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
    title: 'Contract Proposal and Acceptance',
    direction: 'left',
    color: 'green',
    step: 3
  },
  {
    content: `Leveraging our expertise, we will commence development, ensuring code quality and strict adherence to coding standards. Our testing phase will encompass unit testing to verify individual component functionality, integration testing to ensure seamless module interaction, and system testing to validate compliance with specified requirements.`,
    icon: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    title: 'Development and Testing',
    direction: 'right',
    color: 'blue',
    step: 4
  },
  {
    content: `Our dedicated QA team will meticulously identify and rectify any bugs or issues discovered during testing. Rigorous QA procedures will be undertaken to guarantee that the software attains the highest quality standards.`,
    icon: 'M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0 1 12 12.75Zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 0 1-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 0 0 2.248-2.354M12 12.75a2.25 2.25 0 0 1-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 0 0-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 0 1 .4-2.253M12 8.25a2.25 2.25 0 0 0-2.248 2.146M12 8.25a2.25 2.25 0 0 1 2.248 2.146M8.683 5a6.032 6.032 0 0 1-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0 1 15.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 0 0-.575-1.752M4.921 6a24.048 24.048 0 0 0-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 0 1-5.223 1.082',
    title: 'Quality Assurance (QA) and Issue Resolution',
    direction: 'left',
    color: 'pink',
    step: 5
  },
  {
    content: `We will prepare the software for seamless deployment in your environment, accompanied by comprehensive documentation to facilitate a smooth transition.`,
    icon: 'M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z',
    title: 'Deployment Preparation',
    direction: 'right',
    color: 'teal',
    step: 6
  },
  {
    content: `Our commitment extends beyond deployment, as we may conduct thorough training sessions for your team on software usage and maintenance if needed. Throughout the agreed-upon support period, we will remain accessible to address any queries or issues that may arise.`,
    icon: 'M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z',
    title: 'Training and Support(on-demand)',
    direction: 'left',
    color: 'rose',
    step: 7
  }
];

const HowItWorks = () => {
  return (
    <HowItWorksWrapper>
      <div className="title">
        <h1>How it Works</h1>
        <p>
          Howdy! You are at the right place. <br/>
          In order to have a comprehensive overview of how we get things done, please follow
          the steps outlined below to know better.
        </p>
      </div>
      <div className="content">
        <div className="steps">
          {howItWorks.map(({direction, content, color, title, icon, step}) => (
            <Step
              isLast={step === howItWorks.length}
              isLeft={direction === 'left'}
              isFirst={step === 1}
              content={content}
              color={color}
              title={title}
              step={step}
              icon={icon}
              key={step}
            />
          ))}

          <div className="get-started">
            <h2>Congratulations! You can now get started</h2>
            <p>
              Please note that while this represents an idealized workflow, adjustments may be made based on the unique industry and services involved, such as the integration technologies like Artificial Intelligence.
            </p>
            <Link type="primary" asButton href="/contact-us">
              Get Started
            </Link>
          </div>
        </div>
        
        <div className="aims">
          <div className="item">
            <h2>Our Aim</h2>
            <p>
              No matter what your ideas are, no matter the imaginations and desires you hold inside,
              once you initiate this process with us, we will ensure to polish your ideas into
              satisfactory output that will project your brand steps ahead of the competition.
            </p>
            <img src="/images/illustrations/web-development-process.gif" alt="steps_illustration" />
          </div>
          <div className="item">
            <h2>Excellent Pricing</h2>
            <p>
              We believe that quality and satisfactory product delivery which meets the needs
              of our client could be possible even with the cheapest of budget.
              Our plans are easy to afford and our delivery is more than commensurate.
            </p>
            <img src="/images/illustrations/payment-terminal.gif" alt="pricing_illustration" />
          </div>
        </div>
      </div>
    </HowItWorksWrapper>
  );
};

export default HowItWorks