'use client';

import { Content, Footer, Header } from 'antd/es/layout/layout';
import tw, { css, styled } from 'twin.macro';
import { keyframes } from '@emotion/react';
import { Layout } from 'antd';

export const squareWaves = (inverse: boolean = false, height = '') => css`
	${tw`relative overflow-hidden`};

	&:before,
	&:after {
		${tw`absolute w-[110%] h-full inset-0 z-0 pointer-events-none content`};
		${height && `height: ${height}`};
	}

	/* 🌊 Teal wave */
	&:before {
		${tw`bg-[rgba(44,163,116,0.18)] blur-[80px] dark:bg-[rgba(44,163,116,0.28)] dark:blur-[60px]`};
		animation: ${waveAnimation} 8s ease-in-out infinite alternate;
		clip-path: ${inverse ? `polygon(
			0% 0%, 100% 0%,
			100% 24%, 96% 26%, 88% 22%, 80% 29%,
			72% 25%, 64% 32%, 56% 28%, 48% 35%,
			40% 31%, 32% 37%, 24% 34%, 16% 39%,
			8% 37%, 0% 40%
		)` : `polygon(
			0% 60%,
			8% 63%, 16% 61%, 24% 66%, 32% 63%, 40% 69%,
			48% 65%, 56% 72%, 64% 68%, 72% 75%,
			80% 71%, 88% 78%, 96% 74%, 100% 76%,
			100% 100%, 0% 100%
		)`};
	}

	/* 🌊 Gold wave */
	&:after {
		${tw`bg-[rgba(236,175,34,0.18)] blur-[90px] dark:bg-[rgba(236,175,34,0.22)] dark:blur-[70px]`};
		animation: ${waveAnimation} 10s ease-in-out infinite alternate-reverse;
		clip-path: ${inverse ? `polygon(
			0% 0%, 100% 0%,
			100% 15%, 96% 13%, 88% 18%, 80% 15%,
			72% 20%, 64% 17%, 56% 22%, 48% 19%,
			40% 24%, 32% 21%, 24% 26%, 16% 23%,
			8% 27%, 0% 25%
		)` : `polygon(
			0% 75%,
			8% 73%, 16% 77%, 24% 74%, 32% 79%, 40% 76%,
			48% 81%, 56% 78%, 64% 83%, 72% 80%,
			80% 85%, 88% 82%, 96% 87%, 100% 85%,
			100% 100%, 0% 100%
		)`};
	}
`;

export const SectionLayout = styled.div`
  ${tw`relative w-full 2xl:w-8/12 px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-0 mx-auto dark:bg-transparent`};
`;

export const waveAnimation = keyframes`
	0% {
		transform: translateX(0);
	}
	100% {
		transform: translateX(-9.09%);
	}
`;

export const darkBgGradient = {
	twoLayers: css`
		${tw`dark:bg-[
			linear-gradient(135deg, #050D1F 0%, #071a14 40%, #0e1a08 70%, #0a1206 100%),
			radial-gradient(ellipse at 60% 90%, rgba(44, 163, 116, 0.14) 0%, transparent 45%)
		]`};
	`,
	fourLayers: css`
		${tw`dark:bg-[
			radial-gradient(ellipse at 15% 50%, rgba(44, 163, 116, 0.22) 0%, transparent 55%),
			radial-gradient(ellipse at 85% 20%, rgba(236, 175, 34, 0.18) 0%, transparent 50%),
			radial-gradient(ellipse at 60% 90%, rgba(44, 163, 116, 0.14) 0%, transparent 45%),
			linear-gradient(135deg, #050D1F 0%, #071a14 40%, #0e1a08 70%, #0a1206 100%)
		]`};
	`
};

export const SectionWrapper = styled(SectionLayout)`
  ${tw`pt-16 pb-4`};
  
  .illustration {
    ${tw`transition-all duration-1000 ease-in-out mb-8 lg:mb-0 mx-auto md:absolute items-center w-11/12 md:w-2/4 lg:w-auto justify-center relative flex shadow-xl rounded-full overflow-hidden p-6 md:p-8 transform`};
		
		&.why-choose-us {
      ${tw`md:-left-20 md:-top-32 md:scale-65 lg:-left-32 lg:-top-52`};
    }
    
    &.what-we-do {
      ${tw`md:-left-20 md:-top-32 md:scale-65 lg:-left-52 lg:-top-72 lg:scale-45`};
    }
    
    .ant-avatar {
      ${tw`w-auto h-auto rounded-full filter dark:brightness-75`};
    }
  }
  
  h1 {
    ${tw`relative text-5xl sm:text-5xl capitalize leading-tight font-extrabold tracking-widest text-gray-600 dark:text-gray-300 py-4 mx-auto w-full text-center`};

    &.center {
      ${tw`text-center`};
    }
    
    &.right {
      ${tw`text-right`};
    }
		
    &.left {
      ${tw`text-left`};
    }
  }
  
  .items {
    ${tw`relative w-full grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 justify-center py-4 md:pt-16 lg:pb-16`};
  }
`;

export const ContentWrapper = styled(Content)`
	${tw`relative bg-transparent text-theme-text`};
`;

export const SectionCardWrapper = styled.div`
  ${tw`w-full`};

  .content {
    ${tw`overflow-hidden w-full px-6 pb-16 backdrop-blur-sm dark:text-dark-mode-septenary border shadow dark:border-[#404524] bg-white dark:bg-transparent text-xl md:leading-9 rounded-xl text-center shadow dark:shadow-none md:min-h-84 lg:min-h-80 transition-all ease-in-out hover:scale-[105%]`};
		${squareWaves()};
		
    .top {
      ${tw`pt-6 w-full flex justify-between`};

      .icon {
        ${tw`flex shadow-2xl justify-center items-center p-2 text-md text-theme-primary w-10 h-10 rounded-full shadow-lg`};

				.anticon {
					${tw`text-2xl font-extrabold`};
				}
      }
      
      .ant-tag {
        ${tw`border-none flex items-center h-8 px-3 py-0 text-sm m-0 tracking-widest text-white font-semibold rounded-full rounded-tl-[0]`};
      }
    }
		
		h2 {
			${tw`text-2xl text-gray-700 dark:text-white font-bold mb-4 mt-8`};
		}
  }
`;

export const LayoutWrapper = styled(Layout)`
	${tw`relative w-full w-full bg-gray-50`};
	${darkBgGradient.fourLayers};
  ${squareWaves(true, '1400px')};
`;

export const HeaderWrapper = styled(Header)`
	${tw`w-full h-[4.4rem] px-0 fixed top-0 z-20 bg-transparent`};

	&.scrolled {
		${tw`scale-x-[1] scale-y-[0.7] origin-top shadow-lg backdrop-blur-lg`};
	}
	
	.wrapper {
		${tw`2xl:w-8/12 mx-auto px-6 md:px-12 lg:px-14 xl:px-24 2xl:px-0 flex justify-between items-center`};
	}
	
	#brand {
		${tw`flex justify-start items-center transition-all ease-in-out duration-500 lg:ml-2 xl:ml-0`};

		&.scrolled {
			${tw`origin-top-left scale-x-[0.7] scale-y-[1]`};
		}

		a {
			${tw`transform origin-left scale-65 w-64 flex justify-start items-center self-center uppercase mx-auto text-center transition-all ease-in-out duration-1000`};

			.ant-avatar {
				${tw`w-full h-full rounded-none rounded-none p-0`};
				
				&.light {
					${tw`dark:hidden block`};
				}
				
				&.dark {
					${tw`dark:block hidden`};
				}

				img {
					${tw`object-contain`};
				}
			}
		}
	}
	
	.menu {
		${tw`lg:hidden shadow-none dark:text-theme-primary bg-transparent px-1 outline-none focus:outline-none border-none transform scale-y-75 transition-transform ease-in-out duration-1000`};
		
		.anticon {
			${tw`text-3xl text-gray-600 dark:text-white`};
		}
	}
`;

export const FooterWrapper = styled(Footer)`
	${tw`flex flex-col gap-12 relative bg-transparent px-0 pb-0 dark:pt-4 pt-8`};
    ${squareWaves()};

	details {
		${tw`my-4 rounded-xl bg-white dark:bg-transparent shadow-lg border-gray-200 cursor-pointer backdrop-blur-lg`};

		summary {
			${tw`relative flex justify-between gap-4 items-center p-4 dark:text-gray-400 text-black focus:outline-none hover:outline-none outline-none transition-all ease-in-out duration-700`};

			span:nth-of-type(1) {
				${tw`absolute left-14`};
			}
			
			.anticon {
				${tw`text-xl text-theme-primary`};
			}
		}
		
		.description {
			${tw`pl-14 pr-10 pt-2 pb-6 dark:text-gray-500 text-gray-600 transition-all ease-in-out duration-700`};

			a {
				${tw`text-theme-secondary hover:text-theme-secondary/80 transition-all ease-in-out duration-500`};
			}
		}
	}

	.top {
		${tw`grid grid-cols-1 lg:grid-cols-3 lg:gap-10 justify-between px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-0 2xl:w-8/12 2xl:mx-auto`};

		.left {
			${tw`w-full pt-8 lg:pr-16`};

			.section {
				${tw`relative text-lg pt-0.5`};
			}
		}

		.right {
			${tw`flex flex-wrap justify-between lg:col-span-2 md:pt-4`};

			.section {
				${tw`text-center lg:text-left pt-8 md:pt-4 flex-grow`};

				&.contact {
					${tw`w-full pt-16 md:pt-4 md:w-auto`};

					h1 {
						${tw`hidden md:block`};
					}
				}

				.wrapper {
					${tw`relative text-lg`};

					.contacts {
						${tw`md:block flex items-center justify-between relative pt-0.5`};

						.socials {
							${tw`order-2 text-theme-primary lg:mt-3 lg:mb-4 flex justify-center lg:justify-start items-center`};

							a {
								${tw`flex text-theme-primary justify-center mx-1 items-center rounded-xl text-xl h-8 w-8 dark:bg-dark-mode-tertiary bg-white shadow-lg hover:text-theme-secondary transition-all ease-in-out duration-500`};

								&:first-of-type {
									${tw`ml-0`};
								}
								
								.anticon svg {
									${tw`rounded-lg`};
								}
							}
						}
						
						.email {
							${tw`order-1 md:mt-4`};

							a {
								${tw`text-gray-500 dark:text-gray-400 hover:text-theme-secondary transition-all ease-in-out duration-500`};
							}
						}
					}

					ul {
						${tw`pl-0`};

						li {
							${tw`py-2`};

							a {
								${tw`text-gray-500 dark:text-gray-400 hover:text-theme-secondary transition-all ease-in-out duration-500`};

								span.careers {
									${tw`text-[12px] italic text-gray-700 font-medium bg-theme-secondary/60 px-2 py-1 rounded-full`};
								}
							}
						}
					}
				}
			}
		}
	}

	h1 {
		${tw`text-gray-500 dark:text-gray-300 font-bold text-xl mb-4`};

		svg {
			${tw`inline mr-4 text-theme-primary h-6 w-6`};
		}
	}

	a.copyright {
		${tw`flex justify-center items-center mx-0 py-8 text-lg dark:text-white`};

		span {
			${tw`ml-1 text-theme-primary`};
		}
	}
`;

export const NavbarWrapper = styled.nav`
	${tw`transition-all z-50 ease-in-out duration-500 shadow lg:shadow-none bg-white lg:bg-transparent dark:bg-transparent fixed top-0 -right-full lg:right-24 xl:right-32 2xl:right-166 lg:mr-3 flex flex-col lg:flex-row justify-between lg:justify-end lg:items-center w-10/12 md:w-5/12 lg:w-auto h-[100dvh] lg:h-16 text-gray-600 lg:p-4`};

	@media (min-width: 1024px) {
		background-image: none !important;
	}

	&.scrolled {
		${tw`-top-[0.5rem]`};
	}
	
	&.closed {
		${tw`-right-full lg:right-24 xl:right-32 2xl:right-166`};
	}
	
	&.open {
		${tw`right-0 lg:right-24 xl:right-32 2xl:right-166 backdrop-blur-lg`};
	}
	
	&:not(.scrolled):not(.open) {
		${tw`top-[0.2rem]`};
	}

	.top {
		${tw`lg:hidden flex flex-grow-0 flex-shrink items-center justify-between content-center mb-2 text-left w-full text-2xl px-5 lg:px-8 py-1`};

		h1 {
			${tw`w-64 flex justify-start items-center transform scale-65 origin-left transition-all ease-in-out duration-1000`};
		}
		
		.ant-avatar {
			${tw`w-full rounded-none`};
			
			&.light {
				${tw`dark:hidden`};
			}

			&.dark {
				${tw`hidden dark:block`};
			}
			
			img {
				${tw`object-contain`};
			}
		}

		.menu {
			${tw`bg-transparent focus:bg-transparent hover:bg-transparent border-none outline-none dark:text-dark-mode-octonary text-black`};

			.anticon {
				${tw`text-3xl`}
			}
		}
	}
	
	#navbar-links {
		${tw`flex flex-col lg:flex-row flex-grow flex-shrink-0 w-11/12 lg:w-full p-2 rounded-xl my-4 lg:my-0 mx-auto`};

		a {
			${tw`relative my-2 mx-auto lg:mx-4 px-0 text-left lg:text-center w-full lg:w-auto text-lg dark:text-gray-300 dark:lg:text-dark-mode-octonary text-gray-600 font-semibold`};

			&:after {
				${tw`absolute content rounded-full left-0 -bottom-1 h-1 w-full bg-transparent transition-all ease-in-out duration-500`};
			}
			
			&:hover:after, &.active:after {
				${tw`lg:bg-theme-primary`};
			}
		}
	}

	.bottom {
		${tw`lg:hidden flex justify-between items-center flex-grow-0 flex-shrink relative p-4 w-full bg-gray-200 mt-2`};
		${darkBgGradient.twoLayers};

		.copyright {
			${tw`inline-flex items-center dark:text-gray-400 h-full`};

			span {
				${tw`mx-1 text-theme-primary`};
			}
		}
		
		.socials {
			${tw`flex justify-center items-center h-full`};
			
			span {
				${tw`flex justify-center mx-1 items-center rounded-xl dark:text-dark-mode-septenary text-gray-600 text-xl h-8 w-8 dark:bg-slate-600 bg-gray-300`};
			}
		}
	}
`;

export const IntroWrapper = styled.div`
  ${tw`relative flex justify-center items-center w-screen h-[69vh] md:h-[80vh] z-1`};

  .inner {
    ${tw`relative flex flex-col justify-center items-center w-full 2xl:w-8/12 h-full px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-144`};

		.description {
			${tw`w-full md:w-3/5 text-center dark:text-dark-mode-senary text-gray-700 text-2xl`};

			&.capitalize {
				${tw`capitalize`};
			}
			
			&.uppercase {
				${tw`uppercase`};
			}
			
			&.right {
				${tw`text-right`};
			}
			
			&.left {
				${tw`text-left`};
			}
		}
		
		.subtitle {
			${tw`mt-4 md:mt-8 font-nunito-sans dark:text-theme-secondary text-navyblue text-lg font-bold lg:text-2xl text-center`};

			&.capitalize {
				${tw`capitalize`};
			}
			
			&.uppercase {
				${tw`uppercase`};
			}
			
			&.accomodate {
				${tw`mb-16`};
			}
			
			&.right {
				${tw`text-right`};
			}
			
			&.left {
				${tw`text-left`};
			}
		}
		
		.title {
			${tw`relative text-5xl lg:text-7xl dark:text-gray-200 text-gray-700 py-8 m-0 w-full text-center font-extrabold tracking-widest`};

			&.capitalize {
				${tw`capitalize`};
			}
			
			&.uppercase {
				${tw`uppercase`};
			}
			
			&.right {
				${tw`text-right`};
			}
			
			&.left {
				${tw`text-left`};
			}
		}
  }
	
	.action {
		${tw`p-0 absolute right-8 md:right-12 lg:right-16 xl:right-24 2xl:right-144 -bottom-8 rounded-full w-16 h-16 z-10`};

		&.accomodate {
			${tw`hidden lg:flex`};
		}
		
		svg {
			${tw`w-12 h-12 pointer-events-none`};
		}
	}
`;

export const WavesWrapper = styled.div`
	${tw`absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0`};
	clip-path: inset(0);

	&.inverse {
		${tw`rotate-180`};

		.bottom-wave {
			animation: ${waveAnimation} 8s ease-in-out infinite alternate;
		}

		.top-wave {
			animation: ${waveAnimation} 10s ease-in-out infinite alternate-reverse;
		}
	}

	.bottom-wave {
		animation: ${waveAnimation} 10s ease-in-out infinite alternate-reverse;
		${tw`absolute bottom-0 left-0 w-[110%]`};

		path {
			${tw`dark:fill-[rgba(236,175,34,0.16)] fill-[rgba(236,175,34,0.18)]`};
		}
	}

	.top-wave {
		animation: ${waveAnimation} 8s ease-in-out infinite alternate;
		${tw`absolute bottom-0 left-0 w-[110%]`};

		path {
			${tw`dark:fill-[rgba(44,163,116,0.22)] fill-[rgba(44,163,116,0.20)]`};
		}
	}
`;

export const Overlay = styled.div`
	${tw`fixed hidden inset-0 z-[21] bg-black/60 h-screen w-screen`};
	
	&.closed {
		${tw`hidden`};
	}
	
	&.open {
		${tw`block`};
	}
`;