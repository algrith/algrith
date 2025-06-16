import { NextRequest } from 'next/server';

import { ResponseData } from '@/types';

const NextResponse = (data: ResponseData, status: number) => Response.json(data, { status });

// const {RecaptchaEnterpriseServiceClient} = require('@google-cloud/recaptcha-enterprise');

// const GET = async (props) => {
//   const { projectID = "algrith", recaptchaKey = "6LdNeospAAAAAK2I3YwYdh-O5ExvWLeqkgQrdZXC", token = "action-token", recaptchaAction = "action-name" } = props;
  
//   const client = new RecaptchaEnterpriseServiceClient();
//   const projectPath = client.projectPath(projectID);

//   // Build the assessment request.
//   const request = ({
//     assessment: {
//       event: {
//         token: token,
//         siteKey: recaptchaKey,
//       },
//     },
//     parent: projectPath,
//   });

//   const [ response ] = await client.createAssessment(request);

//   // Check if the token is valid.
//   if (!response.tokenProperties.valid) {
//     console.log(`The CreateAssessment call failed because the token was: ${response.tokenProperties.invalidReason}`);
//     return null;
//   }

//   // Check if the expected action was executed.
//   // The `action` property is set by user client in the grecaptcha.enterprise.execute() method.
//   if (response.tokenProperties.action === recaptchaAction) {
//     // Get the risk score and the reason(s).
//     // For more information on interpreting the assessment, see:
//     // https://cloud.google.com/recaptcha-enterprise/docs/interpret-assessment
//     console.log(`The reCAPTCHA score is: ${response.riskAnalysis.score}`);
//     response.riskAnalysis.reasons.forEach((reason) => {
//       console.log(reason);
//     });

//     return response.riskAnalysis.score;
//   } else {
//     console.log("The action attribute in your reCAPTCHA tag does not match the action you are expecting to score");
//     return null;
//   }
// };

const POST = async (req: NextRequest) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const data = await req.json();
  const { token } = data;
  
  if (!token) return NextResponse({
    message: 'Token Not Found',
    success: false,
    data
  }, 405);

  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`, {
      method: 'POST'
    });
    
    const data = await response.json();
    const success = data.score > 0.7;

    if (!data.success) return NextResponse({
      message: 'Token Verification Failed',
      success: false,
      data
    }, 405);
    
    const message = success ? 'Token Verified' : 'Verification Failed';
    const code = success ? 200 : 405;

    return NextResponse({
      message,
      success,
      data
    }, code);
  } catch (error) {
    console.error('Server Error', error);

    return NextResponse({
      message: 'Internal Server Error',
      success: false,
      data
    }, 500);
  }
};

export { POST };