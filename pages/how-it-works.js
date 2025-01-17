import tw, { styled } from 'twin.macro';
import Link from 'next/link';
import Head from 'next/head';
import React from 'react';

import Layout from '../components/Layout';

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

const StepIconWrapper = styled.div`
  ${({ isLeft }) => isLeft ? tw`border-l-4 rounded-tl-3xl left-5.5 md:left-15` : tw`border-r-4 rounded-tr-3xl right-5.5 md:right-15`};
  ${tw`absolute top-14 border-t-4 pointer-events-none w-32`};
  ${({ isLast }) => isLast ? tw`h-12 md:h-20` : tw`h-full`};

  .ping-wrapper {
    ${({ isLeft }) => isLeft ? 'left: -1.125rem' : 'right: -1.125rem'};
    ${tw`h-8 w-8 absolute z-50 rounded-full pointer-events-none`} ;
    ${({ isFirst }) => isFirst ? tw`-top-14` : tw`bottom-10`};
    
    .ping {
      ${tw`h-full w-full animate-ping border rounded-full`};
    }

    .ping.first {
      ${({ isLeft }) => isLeft ? 'left: 0.225rem' : 'right: 0.225rem'};
      ${tw`h-6 w-6 absolute top-1 bg-white rounded-full`};
    }
  }

  .line.first {
    ${tw`h-20 w-1 -top-14 absolute bg-red-500 pointer-events-none`};
    ${({ isLeft }) => isLeft ? tw`-left-1` : tw`-right-1`};
  }
`;

const SvgWrapper = styled.div`
  ${tw`flex items-center justify-center text-white relative z-10 mt-20 w-12 md:w-28 h-12 md:h-28 rounded-full`};
  
  svg {
    ${tw`h-8 w-8 md:h-20 md:w-20`};
  }
`;

const IconWrapper = styled.div`
  ${tw`w-2/12 lg:w-1/12 h-full flex flex-col justify-between absolute`};
  ${({ isLeft }) => isLeft ? tw`left-0` : tw`right-0 items-end`};
`;

const ContentWrapper = styled.div`
  ${({ isLeft }) => isLeft ? tw`pl-4 md:pl-6 lg:pl-14` : tw`pr-4 md:pr-6 lg:pr-14`}
  ${tw`w-10/12 lg:w-11/12 z-10`};

  .inner {
    ${tw`dark:bg-opacity-10 shadow-sm p-8 rounded-3xl`} ;
    
    h2 {
      &.step {
        ${tw`font-bold text-2xl mb-2 tracking-wider`};
      }
      
      &.title {
        ${tw`font-bold text-xl mb-4 tracking-wider text-left`};
      }
    }

    p {
      ${tw`leading-relaxed text-lg md:text-xl dark:text-slate-300 md:leading-relaxed md:text-justify`};
    }
  }
`;


const Step = ({content, color, title, icon, step, isFirst, isLast, isLeft}) => {
  const Icon = () => (
    <StepIconWrapper isFirst={isFirst} isLeft={isLeft} isLast={isLast} className={`border-${color}-500`}>
      {!isLast && (
        <div className={`ping-wrapper bg-${color}-500`}>
          <div className={`ping border-${color}-500`} />
          {isFirst && (<div className={`ping first`} />)}
        </div>
      )}

      {isFirst && (<div className="line first" />)}
    </StepIconWrapper>
  );

  const Svg = () => (
    <SvgWrapper className={`bg-${color}-500`}>
      <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} fill="none">
        <path strokeLinejoin="round" strokeLinecap="round" d={icon} />
      </svg>
    </SvgWrapper>
  );
  
  return (
    <div className={`flex ${isLeft ? 'justify-end' : 'justify-between'} relative pb-16`}>
      <ContentWrapper isLeft={isLeft}>
        <div className={`inner dark:bg-${color}-900 bg-${color}-50`}>
          <h2 className={`step title-font text-gray-900 dark:text-${color}-100`}>
            Step {step}
          </h2>
          
          <h2 className={`title title-font text-${color}-500`}>
            {title}
          </h2>
          
          <p>{content}</p>
        </div>
      </ContentWrapper>
      
      <IconWrapper isLeft={isLeft}>
        <Svg />
        <Icon />
      </IconWrapper>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1" />
        <title> How It Works | Algrith </title>
      </Head>

      <main>
        <section className="text-gray-500 2xl:w-8/12 2xl:mx-auto">
          <div className="px-8 md:px-16 lg:px-28 pt-12 pb-24 mx-auto">
            <div className="text-center py-2">
              <h1 className="mb-8 text-3xl md:text-5xl dark:text-slate-200 font-heading font-bold">
                How it Works
              </h1>
              <p className="leading-relaxed dark:text-slate-300 text-lg md:text-xl md:leading-relaxed mb-12">
                Howdy! You are at the right place. <br/>
                In order to have a comprehensive overview of how we get things done, please follow
                the steps outlined below to know better.
              </p>
            </div>
            <div className="flex flex-wrap w-full">
              <div className="xl:w-3/5 text-xl xl:pr-10 md:py-6">
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

                <div className="pt-6 mb-6">
                  <h2 className="mb-4 dark:text-dark-mode-senary text-lg md:text-xl font-heading font-bold">
                    Congratulations! You can now get started
                  </h2>
                  <p className="leading-relaxed dark:text-dark-mode-senary text-lg md:text-xl md:leading-relaxed mb-12">
                    Please note that while this represents an idealized workflow, adjustments may be made based on the unique industry and services involved, such as the integration technologies like Artificial Intelligence.
                  </p>
                  <Link
                    className="rounded-xl px-6 py-4 text-white text-lg bg-theme-primary hover:bg-green-500 font-semibold"
                    href={'/contact-us'}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
              
              <div className="xl:w-2/5 md:mt-0 mt-12 xl:pl-8 dark:text-dark-mode-senary">
                <div className="pt-6">
                  <h2 className="mb-4 text-2xl dark:text-theme-primary font-heading font-bold">
                    Our Aim
                  </h2>
                  <p className="leading-relaxed text-lg md:text-xl md:leading-relaxed mb-8">
                    No matter what your ideas are, no matter the imaginations and desires you hold inside,
                    once you initiate this process with us, we will ensure to polish your ideas into
                    satisfactory output that will project your brand steps ahead of the competition.
                  </p>
                  <img className="filter dark:brightness-75 object-cover object-center rounded-lg md:mt-0 mt-12" src="/images/illustrations/web-development-process.gif" alt="steps_illustration" />
                </div>
                <div className="pt-12">
                  <h2 className="mb-4 text-2xl dark:text-theme-primary font-heading font-bold">
                    Excellent Pricing
                  </h2>
                  <p className="leading-relaxed text-lg md:text-xl md:leading-relaxed mb-8">
                    We believe that quality and satisfactory product delivery which meets the needs
                    of our client could be possible even with the cheapest of budget.
                    Our plans are easy to afford and our delivery is more than commensurate.
                  </p>
                  <img className="filter dark:brightness-75 object-cover object-center rounded-lg md:mt-0 mt-12" src="/images/illustrations/payment-terminal.gif" alt="pricing_illustration" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default HowItWorks