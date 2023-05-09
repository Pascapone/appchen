import { PostConfirmationTriggerEvent, Context } from 'aws-lambda';
import { Sha256 } from '@aws-crypto/sha256-js';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { SignatureV4 } from '@aws-sdk/signature-v4';
import { HttpRequest } from '@aws-sdk/protocol-http';
import fetch from 'node-fetch';
import { Request } from 'node-fetch';

// You can check the environment variable name for the graphql endpoint in your cloud formation file of the post confirmation fucntion
const GRAPHQL_ENDPOINT = process.env.API_APPCHENGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || 'us-east-1';

const query = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      name
      email
      userType
      courses {
        items {
          id
          userId
          courseId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;

// The enum for our user type
enum UserType {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER"
}

const createUserModel = async (event: PostConfirmationTriggerEvent, context: Context) => {
  console.log("createUserModel")

  console.log(`EVENT: ${JSON.stringify(event)}`);
  console.log("Endpoint:", GRAPHQL_ENDPOINT)

  const endpoint = new URL(GRAPHQL_ENDPOINT);
	
	// We create a signer, that we will use to sign our request
  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: 'appsync',
    sha256: Sha256
  });

	// These are the input parameters for creating our user model
  console.log("ENUM:", UserType.STUDENT.toString())
  const variables = {
    input: {
      id: event.userName,
      name: event.request.userAttributes.name,
      email: event.request.userAttributes.email,
      userType: UserType.STUDENT.toString()
    }
  };

	// create our request
  const requestToBeSigned = new HttpRequest({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      host: endpoint.host
    },
    hostname: endpoint.host,
    body: JSON.stringify({ query, variables }),
    path: endpoint.pathname
  });

	// sign the request with the created signer
  const signed = await signer.sign(requestToBeSigned);
  const request = new Request(endpoint, signed);

  let statusCode = 200;
  let body;
  let response;

	// post our request and fetch the respone
  try {
    response = await fetch(request);
    body = await response.json();
    console.log(response)
    console.log(body)
    if (body.errors) statusCode = 400;
  } catch (error) {
    console.log(error)
    statusCode = 500;
    body = {
      errors: [
        {
          message: error.message
        }
      ]
    };
  }


  return event;
}

export default createUserModel;