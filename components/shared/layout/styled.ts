'use client';

import { Content, Footer, Header } from 'antd/es/layout/layout';
import tw, { styled } from 'twin.macro';
import { Layout } from 'antd';

export const SectionLayout = styled.div`
  ${tw`relative w-full 2xl:w-8/12 px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-0 mx-auto`};
`;

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
    
    &.reviews {
      ${tw`md:-right-32 md:-top-52 md:scale-65 lg:-right-36 lg:-top-64 w-auto md:w-11/12 lg:w-auto`};
    }
    
    .ant-avatar {
      ${tw`w-auto h-auto rounded-full filter dark:brightness-75`};
    }
  }
  
  h1 {
    ${tw`relative text-5xl leading-tight sm:leading-tight font-extrabold tracking-tight dark:text-slate-200 text-gray-900 sm:text-5xl py-4 mx-auto w-full text-center`};

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
    ${tw`relative w-full grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 py-4 md:pt-16 lg:pb-16`};
  }
`;

export const ContentWrapper = styled(Content)`
	${tw`relative bg-transparent text-theme-text`};
`;

export const SectionCardWrapper = styled.div`
  ${tw`w-full`};

  .content {
    ${tw`overflow-hidden w-full px-6 pb-16 dark:bg-slate-800 bg-white dark:text-dark-mode-septenary text-gray-500 text-xl md:leading-9 rounded-xl text-center shadow dark:shadow-none md:min-h-84 lg:min-h-80`};

    .top {
      ${tw`pt-6 w-full flex justify-between`};

      span {
        ${tw`flex justify-center items-center p-2 text-md text-white bg-theme-primary w-10 h-10 rounded-full shadow-lg`};

				.anticon {
					${tw`text-3xl`};
				}
      }
      
      h3 {
        ${tw`text-lg tracking-widest italic text-theme-secondary`};
      }
    }
		
		h2 {
			${tw`text-2xl text-theme-primary font-bold mb-4 mt-8`};
		}
  }
`;

export const LayoutWrapper = styled(Layout)`
	${tw`relative w-full bg-transparent dark:bg-slate-900 w-full`};
`;

export const HeaderWrapper = styled(Header)`
	${tw`w-full h-[unset] px-0 sticky top-0 z-20 bg-white dark:bg-dark-mode-primary`};

	&.scrolled {
		${tw`scale-x-[1] scale-y-[0.7] origin-top shadow-lg`};
	}
	
	.wrapper {
		${tw`2xl:w-8/12 mx-auto px-6 md:px-12 lg:px-14 xl:px-24 2xl:px-0 py-1 flex justify-between items-center`};
	}
	
	#brand {
		${tw`flex justify-start items-center transition-all ease-in-out duration-500 lg:ml-2 xl:ml-0`};

		&.scrolled {
			${tw`origin-top-left scale-x-[0.7] scale-y-[1]`};
		}

		a {
			${tw`transform origin-left scale-65 w-64 flex justify-start items-center self-center uppercase mx-auto text-center transition-all ease-in-out duration-1000`};

			.ant-avatar {
				${tw`w-full h-full rounded-none`};

				&.dark {
					${tw`hidden dark:block`};
				}
				
				&.light {
					${tw`dark:hidden`};
				}
			}
		}
	}
	
	.menu {
		${tw`lg:hidden p-4 -mr-5 dark:text-theme-primary bg-transparent outline-none focus:outline-none border-none transform scale-y-75 transition-transform ease-in-out duration-1000`};
		
		.anticon {
			${tw`text-3xl text-gray-600`};
		}
	}
`;

export const FooterWrapper = styled(Footer)`
	${tw`relative dark:bg-dark-mode-secondary bg-gray-100 px-0 py-0`};

	details {
		${tw`my-4 rounded-xl dark:bg-dark-mode-tertiary bg-white shadow-lg border-gray-200 cursor-pointer`};

		summary {
			${tw`relative flex justify-between gap-4 items-center p-4 dark:text-dark-mode-septenary text-black focus:outline-none hover:outline-none outline-none transition-all ease-in-out duration-700`};

			span:nth-of-type(1) {
				${tw`absolute left-10`};
			}
		}
		
		p {
			${tw`px-10 pt-2 pb-6 dark:text-slate-200 text-gray-600 transition-all ease-in-out duration-700`};
		}
	}

	.top {
		${tw`grid lg:grid-cols-3 lg:gap-10 px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-0 pb-12 2xl:w-8/12 2xl:mx-auto`};

		.left {
			${tw`w-full pt-8`};

			.section {
				${tw`relative text-lg pt-0.5`};
			}
		}

		.right {
			${tw`flex flex-wrap justify-between lg:col-span-2 md:pt-4`};

			.section {
				${tw`pt-8 md:pt-4 flex-grow`};

				.wrapper {
					${tw`relative text-lg`};

					.contacts {
						${tw`md:block flex items-center justify-between relative pt-0.5`};

						.socials {
							${tw`order-2 text-theme-primary lg:mt-3 lg:mb-4 flex justify-start items-center`};

							a {
								${tw`flex text-theme-primary justify-center mx-1 items-center rounded-xl text-xl h-8 w-8 dark:bg-dark-mode-tertiary bg-white shadow-lg`};

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
								${tw`text-gray-500`};
							}
						}
					}

					ul {
						${tw`pl-0`};

						li {
							${tw`py-2`};

							a {
								${tw`text-gray-500`};

								span.careers {
									${tw`text-sm italic text-gray-600 bg-theme-secondary/60 px-2 py-1 rounded-full`};
								}
							}
						}
					}
				}
			}
		}
	}

	h1 {
		${tw`dark:text-dark-mode-senary text-navyblue font-bold text-xl mb-4`};

		svg {
			${tw`inline mr-4 text-theme-primary h-6 w-6`};
		}
	}

	a.copyright {
		${tw`flex justify-center items-center mx-0 py-8 text-lg dark:bg-transparent bg-gray-800 text-white`};

		span {
			${tw`ml-1 text-theme-primary`};
		}
	}
`;

export const NavbarWrapper = styled.nav`
	${tw`transition-all z-50 ease-in-out duration-500 shadow lg:shadow-none lg:bg-transparent bg-white dark:lg:bg-transparent dark:bg-dark-mode-primary fixed top-0 -right-full lg:right-24 xl:right-32 2xl:right-166 lg:mr-3 flex flex-col lg:flex-row justify-between lg:justify-end lg:items-center w-10/12 md:w-5/12 lg:w-auto h-screen lg:h-16 text-gray-600 lg:p-4`};

	&.scrolled {
		${tw`-top-[0.5rem]`}
	}
	
	&.closed {
		${tw`-right-full lg:right-24 xl:right-32 2xl:right-166`};
	}
	
	&.open {
		${tw`right-0 lg:right-24 xl:right-32 2xl:right-166`};
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
			${tw`w-full h-full rounded-none`};

			&.dark {
				${tw`hidden dark:block`};
			}
			
			&.light {
				${tw`dark:hidden`};
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
			${tw`transition-all ease-in-out duration-500 my-2 mx-auto lg:mx-4 px-0 lg:pt-2 hover:border-opacity-100 border-theme-primary border-b-4 border-opacity-0 dark:border-opacity-0 text-left lg:text-center w-full lg:w-auto text-lg dark:text-dark-mode-octonary text-gray-600`};
		}
	}

	.bottom {
		${tw`lg:hidden flex justify-between items-center flex-grow-0 flex-shrink relative p-4 w-full dark:bg-dark-mode-secondary bg-gray-200 mt-2`};

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
  ${tw`relative w-full bg-left-top bg-cover bg-scroll lg:bg-fixed bg-no-repeat`};

	&#intro-about {
		${tw`bg-intro-about`};
	}
  
  .inner {
    ${tw`w-full h-full mx-auto bg-gradient-to-b from-white dark:from-dark-mode-primary dark:bg-dark-mode-primary/90 pt-0 lg:pt-12 pb-12 lg:pb-20 px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-144 py-16`};

    .content {
      ${tw`2xl:w-8/12 mx-auto relative`};

			.description {
				${tw`w-full text-center md:whitespace-pre dark:text-dark-mode-senary text-gray-700 leading-relaxed text-xl lg:leading-relaxed lg:text-2xl`};

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
				${tw`relative text-3xl md:text-4xl lg:text-7xl dark:text-gray-300 text-theme-primary py-8 m-0 w-full text-center font-bold`};

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
  }
`;

export const Overlay = styled.div`
	${tw`fixed hidden top-0 left-0 z-[21] bg-black opacity-50 h-screen w-screen`};

	&.closed {
		${tw`hidden`};
	}
	
	&.open {
		${tw`block`};
	}
`;