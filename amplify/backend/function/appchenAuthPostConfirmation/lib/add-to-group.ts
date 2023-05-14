import { CognitoIdentityServiceProvider } from 'aws-sdk';

const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider({
  apiVersion: '2016-04-18',
});

export default async (event, context) => {
  const groupParams = {
    GroupName: process.env.GROUP,
    UserPoolId: event.userPoolId,
  };
  const addUserParams = {
    GroupName: process.env.GROUP,
    UserPoolId: event.userPoolId,
    Username: event.userName,
  };
 
  try {
    await cognitoIdentityServiceProvider.getGroup(groupParams).promise();
  } catch (e) {
    await cognitoIdentityServiceProvider.createGroup(groupParams).promise();
  }

  await cognitoIdentityServiceProvider.adminAddUserToGroup(addUserParams).promise();

  return event;
};