/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
	API_APPCHENGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT
	API_APPCHENGRAPHQL_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import express from 'express';
import bodyParser from 'body-parser';
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';

import { createCourse, joinUserToCourse, deleteCourse, leaveCourse, createInviteLink, joinCourseWithToken } from './course-actions';

const GRAPHQL_ENDPOINT = process.env.API_APPCHENGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || 'us-east-1';

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

type Groups = 'admin' | 'superAdmin' | 'default'

// Creates a group permissions middleware
const groupPermissions = (allowedGroups: [Groups]) => {
  return (req, res, next) => {
    const userGroups = req.apiGateway.event.requestContext.authorizer.claims['cognito:groups'].split(',')
    if (userGroups && userGroups.some(group => allowedGroups.includes(group))) {
      next()
    } else {
      res.status(403).send('Forbidden')
    }
  }
}

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

/**********************
 * Example get method *
 **********************/

app.get('/', groupPermissions(['admin']), function(req, res) {
  console.log(req)
  console.log(req.apiGateway.event.requestContext.authorizer.claims['cognito:groups'])  
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});


app.post('/course/create', groupPermissions(['admin']), async  (req, res, next) => {  
  const courseLevel = req.body.level
  const courseName = req.body.name
  const userId = req.apiGateway.event.requestContext.authorizer.claims.sub
  const startDate = req.body.startDate
  const endDate = req.body.endDate
  const userName = req.apiGateway.event.requestContext.authorizer.claims.name

  console.log(`EVENT: ${JSON.stringify(req.body)}`);
  console.log("Endpoint:", GRAPHQL_ENDPOINT)

  try {
    const body = await createCourse(courseName, courseLevel, userName, userId, startDate, endDate)
    res.json({success: 'Create Course', url: req.url, body: body.data.createCourse})     
  } catch (err) {
    console.log(`Error in Promise: ${err}`)
    next(err)
  }
});

app.post('/course/leave', async  (req, res, next) => {  
  const userId = req.apiGateway.event.requestContext.authorizer.claims.sub
  const courseId = req.body.courseId

  console.log("User Id:", userId)
  console.log("Course Id:", courseId)

  try {
    await leaveCourse(userId, courseId)
    res.json({success: 'User left course', url: req.url, body: req.body})     
  } catch (err) {
    console.log(`Error in Promise: ${err}`)
    next(err)
  }
});

// TODO: Implement invite link join. At the moment only admins can join users to courses
app.post('/course/join', groupPermissions(['admin']), async  (req, res, next) => {  
  const userId = req.body.userId
  const courseId = req.body.courseId

  console.log(`EVENT: ${JSON.stringify(req.body)}`);
  console.log("Endpoint:", GRAPHQL_ENDPOINT)

  console.log("User Id:", userId)
  console.log("Course Id:", courseId)

  try {
    await joinUserToCourse(userId, courseId)
    res.json({success: 'User joined course', url: req.url, body: req.body})     
  } catch (err) {
    console.log(`Error in Promise: ${err}`)
    next(err)
  }
});

app.post('/course/join-link', async  (req, res, next) => {  
  const userId = req.apiGateway.event.requestContext.authorizer.claims.sub
  const token = req.body.token
  const courseId = req.body.courseId

  console.log("User Id:", userId)

  try {
    await joinCourseWithToken(userId, courseId, token)
    res.json({success: 'User joined course', url: req.url, body: req.body})     
  } catch (err) {
    console.log(`Error in Promise: ${err}`)
    next(err)
  }
});

app.post('/course/create-and-join', groupPermissions(['admin']), async  (req, res, next) => {    
  const courseLevel = req.body.level
  const courseName = req.body.name
  const userId = req.apiGateway.event.requestContext.authorizer.claims.sub
  const startDate = req.body.startDate
  const endDate = req.body.endDate
  const userName = req.apiGateway.event.requestContext.authorizer.claims.name

  console.log("Start Date:", startDate)
  console.log("End Date:", endDate)
  
  console.log(`EVENT: ${JSON.stringify(req.body)}`);
  console.log("Endpoint:", GRAPHQL_ENDPOINT)

  console.log("Create and Join Course")

  let body
  try {
    body = await createCourse(courseName, courseLevel, userName, userId, startDate, endDate)        
  } catch (err) {
    console.log(`Error in Promise Create Course: ${err}`)
    next(err)
    return
  }
  
  try {
    const courseId = body.data.createCourse.id
    await joinUserToCourse(userId, courseId)
    res.json({success: 'Course Created and User Joined', url: req.url, body: { createCourse: body.data.createCourse, joinedCourseId: courseId }})     
  } catch (err) {
    console.log(`Error in Promise Join Group: ${err}`)
    next(err)
    return
  }
});

app.post('/course/createInviteLink', groupPermissions(['admin']), async  (req, res, next) => {    
  const courseId = req.body.courseId
  const userId = req.apiGateway.event.requestContext.authorizer.claims.sub
  

  const token = await createInviteLink(courseId)
  res.json({success: `Course Id: ${userId}`, url: req.url, body: { token }})
});

app.delete('/course/:courseId', groupPermissions(['admin']), async (req, res, next) => {
  // Add your code here
  const userId = req.apiGateway.event.requestContext.authorizer.claims.sub
  const courseId = req.params.courseId

  console.log("Delete Course - Route")

  console.log("Course Id:", courseId)

  console.log(`EVENT: ${JSON.stringify(req.body)}`);

  try {
    await deleteCourse(courseId, userId)
    res.json({success: 'Course Created and User Joined', url: req.url, body: { courseId: courseId }})     
  } catch (err) {
    console.log(`Error in Promise: ${err}`)
    next(err)
  }
});

app.post('/course/:courseId', function(req, res) {
  // Add your code here
  res.json({success: `Course Id: ${req.params.courseId}`, url: req.url, body: req.body})
});

// Error middleware must be defined last
app.use((err, req, res, next) => {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  console.log("Response:", res)
  console.log(err.statusCode)
  console.log(err.message)
  res.status(err.statusCode).json({ message: err.message }).end();
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
export default app;
