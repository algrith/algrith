'use client';

import { useRef } from 'react';

import TableOfContent from '../shared/table-of-content';
import { PrivacyPolicyWrapper } from './styled';

const tableOfContent = [
  { text: 'Information We Collect', id: 'information-collection' },
  { text: 'How And Why We Use Information', id: 'information-use' },
  { text: 'Sharing Information', id: 'information-sharing' },
  { text: 'How Long We Keep Information', id: 'information-persistence' },
  { text: 'Security', id: 'security' },
  { text: 'Choices', id: 'choices' },
  { text: 'Your Rights', id: 'rights' },
  { text: 'Controllers and Responsible Companies', id: 'responsibilities' },
  { text: 'How to Reach Us', id: 'contact-methods' },
  { text: 'Privacy Policy Changes', id: 'changes' }
];

const PrivacyPolicy = () => {
  const containerRef = useRef(null);

  return (
    <PrivacyPolicyWrapper>
      <div className="intro">
        <h1>
          <span>Updated on 9th July, 2025</span>
          Privacy Policy
        </h1>
        <p>
          This Privacy Policy applies to information that we collect about you when you use our website https://algrith.com.
          <br />
          Throughout this Privacy Policy we’ll refer to our website as “Services.” Below we
          explain how we collect, use, and share information about you, along with the choices
          that you have with respect to that information.
        </p>
      </div>

      <div className="content">
        <div ref={containerRef} className="policies">
          <div id="information-collection">
            <h1>Information We Collect</h1>
            <p>
              We only collect information about you if we have a reason to do so — for example, to
              provide our Services, to communicate with you, or to make our Services better. We
              collect information in three ways: if and when you provide information to us,
              automatically through operating our Services, and from outside sources. Let’s go over
              the information that we collect.
            </p>

            <div className="sub-policy">
              <h2>Information You Provide to Us</h2>
              <p>
                It’s probably no surprise that we collect information that you provide to us. The amount
                and type of information depends on the context and how we use the information. Here
                are some examples:
              </p>
              <ul>
                <li>
                  <span>Basic Account Information: </span>
                  We ask for basic information from you in order to set
                  up your account. For example, we require individuals who sign up for an account
                  to provide email address. You may provide us with more information–like your
                  name–but we don’t require that information to create an Algrith.com account.
                </li>
                <li>
                  <span>Payment Information: </span>
                  If you use our paid Services you will have to create an
                  Algrith.com account or connect an existing account. You may also provide us with
                  information about your financial account to set up a payments integration, such
                  as the email address for your payment invoice.
                </li>
                <li>
                  <span>Communications With Us: </span>
                  You may also provide us information when you
                  respond to surveys, communicate with our Customer Service about a support
                  question.
                </li>
              </ul>
            </div>

            <div className="sub-policy">
              <h2>
                Information We Collect Automatically
              </h2>
              <p>
                We also collect some information automatically:
              </p>
              <ul>
                <li>
                  <span>Log Information: </span>
                  Like most online service providers, we collect information that
                  web browsers, mobile devices, and servers typically make available, such as the
                  browser type, IP address, unique device identifiers, language preference,
                  referring site, the date and time of access, operating system, and mobile network
                  information.
                </li>
                <li>
                  <span>Usage Information: </span>
                  We collect information about your usage of our Services. For
                  example, we collect information about the actions that site administrators and
                  users perform on a site using our Service–in other words, who did what, when
                  and to what thing on a site. We use this information to, for example, provide our
                  Services to you, as well as get insights on how people use our Services, so we can
                  make our Services better.
                </li>
                <li>
                  <span>Location Information: </span>
                  We may determine the approximate location of your
                  device from your IP address. We collect and use this information to, for example,
                  calculate how many people visit our Services from certain geographic regions. We
                  may also collect information about your precise location via our mobile apps
                  (when, for example, you post a photograph with location information) if you
                  allow us to do so through your mobile device operating system’s permissions.
                </li>
                <li>
                  <span>Information from Cookies & Other Technologies: </span>
                  A cookie is a string of
                  information that a website stores on a visitor’s computer, and that the visitor’s
                  browser provides to the website each time the visitor returns. Pixel tags (also
                  called web beacons) are small blocks of code placed on websites and emails.
                  Algrith.com uses cookies and other technologies like pixel tags to help us identify
                  and track visitors, usage, and access preferences for our Services, as well as track
                  and understand email campaign effectiveness and to deliver targeted ads.
                </li>
              </ul>
            </div>
          </div>

          <div id="information-use">
            <h1>How And Why We Use Information</h1>

            <div className="sub-policy">
              <h2>Purposes for Using Information</h2>
              <p>
                We use information about you as mentioned above and for the purposes listed below:
              </p>
              <ul className="list-disc">
                <li>
                  To provide our Services–for example, to set up and maintain your account, host
                  your website, backup and restore your website, or charge you for any of our paid
                  Services;
                </li>
                <li>
                  To further develop and improve our Services – for example by adding new
                  features that we think our users will enjoy or will help them to create and manage
                  their websites more efficiently;
                </li>
                <li>
                  To monitor and analyze trends and better understand how users interact with
                  our Services, which helps us improve our Services and make them easier to use;
                </li>
                <li>
                  To measure, gauge, and improve the effectiveness of our advertising, and better
                  understand user retention and attrition — for example, we may analyze how many
                  individuals purchased a plan after receiving a marketing message or the features
                  used by those who continue to use our Services after a certain length of time;
                </li>
                <li>
                  To monitor and prevent any problems with our Services, protect the security of
                  our Services, detect and prevent fraudulent transactions and other illegal
                  activities, fight spam, and protect the rights and property of Algrith.com and
                  others, which may result in us declining a transaction or the use of our Services;
                </li>
                <li>
                  To communicate with you, for example through an email, about offers and
                  promotions offered by Algrith.com and others we think will be of interest to you,
                  solicit your feedback, or keep you up to date on Algrith.com and our products; and
                </li>
                <li>
                  To personalize your experience using our Services, provide content
                  recommendations, target our marketing messages to groups of our users (for
                  example, those who have a particular plan with us or have been our user for a
                  certain length of time), and serve relevant advertisements.
                </li>
              </ul>
            </div>
          </div>

          <div id="information-sharing">
            <h1>Sharing Information</h1>

            <div className="sub-policy">
              <h2>How We Share Information</h2>
              <p>
                We do not sell our users’ private personal information. We share information about you
                in the limited circumstances spelled out below and with appropriate safeguards on your
                privacy:
              </p>
              <ul>
                <li>
                  <span>Subsidiaries, Employees, and Independent Contractors: </span>
                  We may disclose
                  information about you to our subsidiaries, our employees, and individuals who
                  are our independent contractors that need to know the information in order to
                  help us provide our Services or to process the information on our behalf. We
                  require our subsidiaries, employees, and independent contractors to follow this
                  Privacy Policy for personal information that we share with them.
                </li>
                <li>
                  <span>Third Party Vendors: </span>
                  We may share information about you with third party
                  vendors who need to know information about you in order to provide their
                  services to us, or to provide their services to you or your site. This group includes
                  vendors that help us provide our Services to you (like payment providers that
                  process your credit and debit card information, fraud prevention services that
                  allow us to analyze fraudulent payment transactions, postal and email delivery
                  services that help us stay in touch with you, customer chat and email support
                  services that help us communicate with you, registrars, registries, and data
                  escrow services that allow us to provide domain registration services), those that
                  assist us with our marketing efforts (e.g. by providing tools for identifying a
                  specific marketing target group or improving our marketing campaigns), those
                  that help us understand and enhance our Services (like analytics providers), who
                  may need information about you in order to, for example, provide technical or
                  other support services to you. We require vendors to agree to privacy
                  commitments in order to share information with them.
                </li>
                <li>
                  <span>Legal Requests: </span>
                  We may disclose information about you in response to a
                  subpoena, court order, or other governmental request.
                </li>
                <li>
                  <span>To Protect Rights, Property, and Others: </span>
                  We may disclose information about you
                  when we believe in good faith that disclosure is reasonably necessary to protect
                  the property or rights of Algrith.com, third parties, or the public at large. For
                  example, if we have a good faith belief that there is an imminent danger of death
                  or serious physical injury, we may disclose information related to the emergency
                  without delay.
                </li>
                <li>
                  <span>Business Transfers: </span>
                  In connection with any merger, sale of company assets, or
                  acquisition of all or a portion of our business by another company, or in the
                  unlikely event that Algrith.com goes out of business or enters bankruptcy, user
                  information would likely be one of the assets that is transferred or acquired by a
                  third party. If any of these events were to happen, this Privacy Policy would
                  continue to apply to your information and the party receiving your information
                  may continue to use your information, but only consistent with this Privacy
                  Policy.
                </li>
                <li>
                  <span>With Your Consent: </span>
                  We may share and disclose information with your consent or
                  at your direction. For example, we may share your information with third parties
                  with which you authorize us to do so, such as the social media services that you
                  connect to your site through our Publicize feature.
                </li>
                <li>
                  <span>Aggregated or De-Identified Information: </span>
                  We may share information that has
                  been aggregated or reasonably de-identified, so that the information could not
                  reasonably be used to identify you. For instance, we may publish aggregate
                  statistics about the use of our Services and we may share a hashed version of
                  your email address to facilitate customized ad campaigns on other platforms.
                </li>
                <li>
                  <span>Published Support Requests: </span>
                  And if you send us a request (for example, via a
                  support email or one of our feedback mechanisms), we reserve the right to
                  publish that request in order to help us clarify or respond to your request or to
                  help us support other users.
                </li>
              </ul>
            </div>
          </div>

          <div id="information-persistence">
            <h1>How Long We Keep Information</h1>
            <p>
              We generally discard information about you when we no longer need the information
              for the purposes for which we collect and use it — which are described in the section
              above on How and Why We Use Information — and we are not legally required to
              continue to keep it. For example, we keep the web server logs that record information
              about a visitor to out website, such as the visitor’s IP address, browser type, and
              operating system, for approximately 30 days. We retain the logs for this period of time in
              order to, among other things, analyze traffic to our website and investigate issues if
              something goes wrong on one of our websites. After the thirty days are up, the deleted
              content may remain on our backups and caches until purged.
            </p>
          </div>

          <div id="security">
            <h1>Security</h1>
            <p>
              While no online service is 100% secure, we work very hard to protect information about
              you against unauthorized access, use, alteration, or destruction, and take reasonable
              measures to do so, such as monitoring our Services for potential vulnerabilities and
              attacks.
            </p>
          </div>

          <div id="choices">
            <h1>Choices</h1>
            <p>
              You have several choices available when it comes to information about you:
            </p>

            <div className="sub-policy">
              <ul>
                <li>
                  <span>Limit the Information that You Provide: </span>
                  If you have an account with us, you can
                  choose not to provide the optional account information, profile information, and
                  transaction and billing information. Please keep in mind that if you do not
                  provide this information, certain features of our Services may not be accessible.
                </li>
                <li>
                  <span>Opt-Out of Electronic Communications: </span>
                  You may opt out of receiving
                  promotional messages from us. Just follow the instructions in those messages. If
                  you opt out of promotional messages, we may still send you other messages, like
                  those about your account and legal notices.
                </li>
                <li>
                  <span>Set Your Browser to Reject Cookies: </span>
                  At this time, Algrith.com does not respond to
                  “do not track” signals in our Services. However, you can usually choose to set
                  your browser to remove or reject browser cookies before using Algrith.com
                  website, with the drawback that certain features of Algrith.com websites may not
                  function properly without the aid of cookies.
                </li>
                <li>
                  <span>Close Your Account: </span>
                  While we’d be very sad to see you go, if you no longer want
                  to use our Services you can close your Algrith.com account. Please keep in mind
                  that we may continue to retain your information after closing your account, as
                  described in How Long We Keep Information above — for example, when that
                  information is reasonably needed to comply with (or demonstrate our
                  compliance with) legal obligations such as law enforcement requests, or
                  reasonably needed for our legitimate business interests.
                </li>
              </ul>
            </div>
          </div>

          <div id="rights">
            <h1>Your Rights</h1>
            <p>
              If you are located in certain countries, including those that fall under the scope of the
              European General Data Protection Regulation (AKA the “GDPR”), data protection laws
              give you rights with respect to your personal data, subject to any exemptions provided
              by the law, including the rights to:
            </p>

            <div className="sub-policy">
              <ul>
                <li>
                  Request access to your personal data;
                </li>
                <li>
                  Request correction or deletion of your personal data;
                </li>
                <li>
                  Object to our use and processing of your personal data;
                </li>
                <li>
                  Request that we limit our use and processing of your personal data; and
                </li>
                <li>
                  Request portability of your personal data.
                </li>
              </ul>

              <p>
                You can usually access, correct, or delete your personal data using your account settings
                and tools that we offer, but if you aren’t able to do that, or you would like to contact us
                about one of the other rights, scroll down to How to Reach Us to, well, find out how to
                reach us. EU individuals also have the right to make a complaint to a government
                supervisory authority.
              </p>
            </div>
          </div>

          <div id="responsibilities">
            <h1>Controllers and Responsible Companies</h1>
            <p>
              Algrith.com has been created by Algrith LLC. Company that entered into the contract with
              you under the Terms of Service for the the product or service you use. Algrith LLC is
              controller of the personal information, which means that it is the company responsible
              for processing that information.
            </p>
          </div>

          <div id="contact-methods">
            <h1>How to Reach Us</h1>
            <p>
              If you have a question about this Privacy Policy, or you would like to contact us about
              any of the rights mentioned in the Your Rights section above, please contact us:
              algrithllc@gmail.com
            </p>
          </div>

          <div id="changes">
            <h1>Privacy Policy Changes</h1>
            <p>
              Although most changes are likely to be minor, Algrith.com may change its Privacy Policy
              from time to time. Algrith.com encourages visitors to frequently check this page for any
              changes to its Privacy Policy. If we make changes, we will notify you by revising the
              change log below, and, in some cases, we may provide additional notice or sending you a notification through email or your dashboard. Your further use of the Services after a
              change to our Privacy Policy will be subject to the updated policy.
              That’s it! Thanks for reading
            </p>
          </div>
        </div>
        
        <TableOfContent targetRef={containerRef} items={tableOfContent} />
      </div>
    </PrivacyPolicyWrapper>
  );
};

export default PrivacyPolicy;