'use client';

import { useRef } from 'react';

import TableOfContent from '../shared/table-of-content';
import { RefundPolicyWrapper } from './styled';

const tableOfContent = [
  { text: 'Policies', id: 'policies' },
  { text: 'How To Claim Your Refund', id: 'claim-refund' }
];

const RefundPolicy = () => {
  const containerRef = useRef(null);

  return (
    <RefundPolicyWrapper>
      <div className="intro">
        <h1>
          <span>Updated on 9th July, 2025</span>
          Refund Policy
        </h1>
        <p>
          In any occasion, any funds deposited will not be liable for a refund if the initial
          delivery is made and approved, or a change is asked for unless Algrith cancels or
          ends your Contract for a reason other than your breach or non-execution.
          All requests for refund will be as per the following agreement:
        </p>
      </div>

      <div className="content">
        <div ref={containerRef} className="policies">
          <div id="policies">
            <h1>Policies</h1>

            <ul className="list-decimal relaxed">
              <li>
                <span>Before Approval or Revisions</span>
                You may request a refund only before approving or requesting changes to the initial delivery or asking for additional features. Once approval or a change request is made, the refund offer becomes void.
              </li>

              <li>
                <span>Revision Phase</span>
                Once the project enters the revision phase, the refund offer becomes void. However, we are committed to 100% customer satisfaction and will continue making corrections until you are satisfied.
              </li>
              
              <li>
                <span>Valid Refund Scenarios Before Initial Delivery</span>
                A full refund (minus a 10% administrative and processing fee) will be issued if:
                <ul>
                  <li>No design requirements were submitted at the time of order.</li>
                  <li>A duplicate order was placed by mistake, and you notify Algrith within 48 hours.</li>
                </ul>
              </li>

              <li>
                <span>Refund Request Deadline</span>
                Refund requests will not be entertained after 30 days of client inactivity. All refund requests must be sent to algrithllc@gmail.com.
                Algrith reserves the right to approve or deny refund requests on a case-by-case basis.
              </li>

              <li>
                <span>Final Delivery</span>
                No refund will be issued once the final files have been delivered.
              </li>

              <li>
                <span>Website Packages</span>
                For website service packages, no refund will be granted after:
                <ul>
                  <li>The initial design mock-up has been revised, or</li>
                  <li>Inner pages have been developed and approved by the client.</li>
                </ul>
              </li>

              <li>
                <span>Partial Refunds</span>
                If your project includes both a website and an application, and you approve only the application, you may be eligible for a refund for the website portion only, provided the request is made before its initial delivery.
              </li>

              <li>
                <span>Valid Refund Criteria</span>
                Refund requests must include a valid reason and will be reviewed against the original project brief and revision feedback. A refund will only be considered if the delivered concept does not align with the agreed brief. If the concept meets the brief, refunds will not be approved — however, we will continue to offer revisions to ensure your satisfaction.
              </li>

              <li>
                <span>Non-Disparagement Clause</span>
                Both parties (Algrith and the Client) agree not to publicly attack or criticize each other or any associates, employees, or partners on public forums, blogs, or social media at any time during or after the contract period. Any breach of this clause may result in a reasonable compensation determined by the non-breaching party.
              </li>
              
              <li>
                <span>Client Cooperation</span>
                To ensure successful delivery, client feedback is essential throughout the design process. Delays or lack of input may impact delivery and eligibility for refunds.
              </li>

              <li>
                <span>Unique Design Guarantee</span>
                We guarantee 100% original design. If the final design is found to be significantly similar to an existing design, we will provide a new custom design. However, any similarity is purely coincidental. It is the client’s responsibility to trademark their artwork.
              </li>
            </ul>
          </div>

          <div id="claim-refund">
            <h2>How To Claim Your Refund</h2>

            <p>
              To ensure that your refund request is processed effectively and approved, please do the following;
            </p>

            <ul className="list-disc">
              <li>Clearly specify your concerns.</li>
              <li>Send your request via email to: algrithllc@gmail.com</li>
            </ul>
          </div>
        </div>

        <TableOfContent targetRef={containerRef} items={tableOfContent} />
      </div>
    </RefundPolicyWrapper>
  );
};

export default RefundPolicy;