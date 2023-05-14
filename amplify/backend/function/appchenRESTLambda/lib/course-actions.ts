import { Sha256 } from '@aws-crypto/sha256-js';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { SignatureV4 } from '@aws-sdk/signature-v4';
import { HttpRequest } from '@aws-sdk/protocol-http';
import fetch from 'node-fetch';
import { Request } from 'node-fetch';

import { createCourse as createCourseQuery } from './graphql/mutations';
import { createCoursesUsers as createCoursesUsersQuery } from './graphql/mutations';

const GRAPHQL_ENDPOINT = process.env.API_APPCHENGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || 'us-east-1';

export const createCourse = async (name, level) => {
  const endpoint = new URL(GRAPHQL_ENDPOINT);
	
	// We create a signer, that we will use to sign our request
  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: 'appsync',
    sha256: Sha256
  });

	// These are the input parameters for creating our user model
  console.log("ENUM:", level)
  const variables = {
    input: {
      name: name,
      level: level
    }
  };

  const query = createCourseQuery;

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

  let body;
  let response;

	// post our request and fetch the respone
  try {
    response = await fetch(request);
    body = await response.json();
    if(body.errors) {
      throw new Error(body.errors[0].message)
    }
  } catch (error) {
    console.log("App Error:", error)   
    throw error
  }
}

export const joinUserToGroup = async (userId, courseId) => {
  const endpoint = new URL(GRAPHQL_ENDPOINT);
	
	// We create a signer, that we will use to sign our request
  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: 'appsync',
    sha256: Sha256
  });

  console.log("Join user", userId, "to group", courseId)
  const variables = {
    input: {
      userId,
      courseId
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
    body: JSON.stringify({ query: createCoursesUsersQuery, variables }),
    path: endpoint.pathname
  });

	// sign the request with the created signer
  const signed = await signer.sign(requestToBeSigned);
  const request = new Request(endpoint, signed);

  let body;
  let response;

	// post our request and fetch the respone
  try {
    response = await fetch(request);
    body = await response.json();
    if(body.errors) {
      throw new Error(body.errors[0].message)
    }
  } catch (error) {
    console.log("App Error:", error)   
    throw error
  }
}