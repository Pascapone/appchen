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

import { createCourse, joinUserToCourse, deleteCourse, leaveCourse, createInviteLink, joinCourseWithToken, invalidateInviteLink } from './course-actions';
import { createTextAssignment, createTextAssignmentCourse, createTextAssignmentUser, deleteTextAssignment, updateTextAssignment, deleteTextAssignmentCourse, startTextAssignmentUser, submitTextAssignmentUser } from './assignment-actions';
import { Level } from './graphql/GraphQL';

const GRAPHQL_ENDPOINT = process.env.API_APPCHENGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || 'us-east-1';

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

type Groups = 'admin' | 'superAdmin' | 'default'

// Creates a group permissions middleware
const groupPermissions = (allowedGroups: Array<Groups>) => {
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

// Log all events
app.use(function(err, req, res, next) {
  console.log(`EVENT: ${JSON.stringify(req.body)}`); 
  next()
});

/**********************
 * Example get method *
 **********************/

app.get('/', groupPermissions(['admin']), function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});


app.post('/course/create', groupPermissions(['admin', 'superAdmin']), async  (req, res, next) => {  
  const courseLevel = req.body.level
  const courseName = req.body.name
  const userId = req.apiGateway.event.requestContext.authorizer.claims.sub
  const startDate = req.body.startDate
  const endDate = req.body.endDate
  const userName = req.apiGateway.event.requestContext.authorizer.claims.name

  try {
    const body = await createCourse(courseName, courseLevel, userName, userId, startDate, endDate)
    res.json({success: 'Create Course', url: req.url, body: body.data.createCourse})     
  } catch (err) {
    next(err)
  }
});

app.post('/course/leave', async  (req, res, next) => {  
  const userId = req.apiGateway.event.requestContext.authorizer.claims.sub
  const courseId = req.body.courseId

  try {
    await leaveCourse(userId, courseId)
    res.json({success: 'User left course', url: req.url, body: req.body})     
  } catch (err) {
    next(err)
  }
});

// TODO: Implement invite link join. At the moment only admins can join users to courses
app.post('/course/join', groupPermissions(['admin', 'superAdmin']), async  (req, res, next) => {    
  const userId = req.body.userId
  const courseId = req.body.courseId

  try {
    await joinUserToCourse(userId, courseId)
    res.json({success: 'User joined course', url: req.url, body: req.body})     
  } catch (err) {
    next(err)
  }
});

app.post('/course/join-link', async  (req, res, next) => {  
  const userId = req.apiGateway.event.requestContext.authorizer.claims.sub
  const token = req.body.token
  const courseId = req.body.courseId

  try {
    await joinCourseWithToken(userId, courseId, token)
    res.json({success: 'User joined course', url: req.url, body: req.body})     
  } catch (err) {
    next(err)
  }
});

app.post('/course/create-and-join', groupPermissions(['admin', 'superAdmin']), async  (req, res, next) => {    
  const courseLevel = req.body.level
  const courseName = req.body.name
  const userId = req.apiGateway.event.requestContext.authorizer.claims.sub
  const startDate = req.body.startDate
  const endDate = req.body.endDate
  const userName = req.apiGateway.event.requestContext.authorizer.claims.name

  let body
  try {
    body = await createCourse(courseName, courseLevel, userName, userId, startDate, endDate)        
  } catch (err) {
    next(err)
    return
  }
  
  try {
    const courseId = body.data.createCourse.id
    await joinUserToCourse(userId, courseId)
    res.json({success: 'Course Created and User Joined', url: req.url, body: { createCourse: body.data.createCourse, joinedCourseId: courseId }})     
  } catch (err) {
    next(err)
    return
  }
});

app.post('/course/createInviteLink', groupPermissions(['admin', 'superAdmin']), async  (req, res, next) => {    
  const courseId = req.body.courseId
  const userId = req.apiGateway.event.requestContext.authorizer.claims.sub  

  try{
    const token = await createInviteLink(courseId, userId)
    res.json({success: `Course Id: ${userId}`, url: req.url, body: { token }})
  } catch (err) {
    next(err)
  }  
});

app.post('/course/invalidate-invite-link', groupPermissions(['admin', 'superAdmin']), async  (req, res, next) => {    
  const courseId = req.body.courseId
  const userId = req.apiGateway.event.requestContext.authorizer.claims.sub

  try{
    const token = await invalidateInviteLink(courseId, userId)
    res.json({success: `Ivalidate Link for Course Id: ${userId}`, url: req.url, body: { token }})
  } catch (err) {
    next(err)
  }
});

app.delete('/course/:courseId', groupPermissions(['admin', 'superAdmin']), async (req, res, next) => {
  // Add your code here
  const userId = req.apiGateway.event.requestContext.authorizer.claims.sub
  const courseId = req.params.courseId

  try {
    await deleteCourse(courseId, userId)
    res.json({success: 'Course Created and User Joined', url: req.url, body: { courseId: courseId }})     
  } catch (err) {
    next(err)
  }
});

app.post('/course/:courseId', function(req, res) {
  // Add your code here
  res.json({success: `Course Id: ${req.params.courseId}`, url: req.url, body: req.body})
});

app.post('/assignment/text-assignment', groupPermissions(['admin', 'superAdmin']), async (req, res, next) => {
  const userId = req.apiGateway.event.requestContext.authorizer.claims.sub
  const assignmentName = req.body.name
  const courseLevel = req.body.level as Level
  const description = req.body.description
  const link = req.body.link
  const timeLimit = req.body.timeLimit

  try {
    const body = await createTextAssignment(assignmentName, courseLevel, description, link, timeLimit, userId)    
    res.json({success: `Assignment ID: ${body.data.createTextAssignment.id}`, createTextAssignment: body.data.createTextAssignment})  
  } catch (err) {
    next(err)
  }  
});

app.delete('/assignment/text-assignment', groupPermissions(['admin', 'superAdmin']), async (req, res, next) => {
  const userId = req.apiGateway.event.requestContext.authorizer.claims.sub
  const assignmentId = req.body.assignmentId

  try {
    const body = await deleteTextAssignment(assignmentId, userId)
    res.json({success: `Deleted Assignment ID: ${assignmentId}`, deleteTextAssignment: body})  
  } catch (err) {
    next(err)
  }  
});

app.put('/assignment/text-assignment', groupPermissions(['admin', 'superAdmin']), async (req, res, next) => {
  const userId = req.apiGateway.event.requestContext.authorizer.claims.sub
  const assignmentId = req.body.assignmentId
  const assignmentName = req.body.name
  const courseLevel = req.body.level as Level
  const description = req.body.description
  const link = req.body.link
  const timeLimit = req.body.timeLimit

  try {
    const body = await updateTextAssignment(assignmentId, assignmentName, courseLevel, description, link, timeLimit, userId)
    res.json({success: `Update Assignment ID: ${assignmentId}`, deleteTextAssignment: body})  
  } catch (err) {
    next(err)
  }  
});

app.post('/assignment/text-assignment-course', groupPermissions(['admin', 'superAdmin']), async (req, res, next) => {
  const courseId = req.body.courseId
  const textAssignmentId = req.body.textAssignmentId
  const dueDate = req.body.dueDate
  const timeLimit = req.body.timeLimit

  try {
    const body = await createTextAssignmentCourse(courseId, textAssignmentId, timeLimit, dueDate)    
    res.json({success: `Course Assignment ID: ${body.data.createTextAssignmentCourse.id}`, createTextAssignmentCourse: body.data.createTextAssignmentCourse})  
  } catch (err) {
    next(err)
  }  
});

app.delete('/assignment/text-assignment-course', groupPermissions(['admin', 'superAdmin']), async (req, res, next) => {
  const assignmentId = req.body.assignmentId

  try {
    const body = await deleteTextAssignmentCourse(assignmentId)    
    res.json({success: `Delete Course Assignment ID: ${assignmentId}`, deleteTextAssignmentCourse: body})  
  } catch (err) {
    next(err)
  }  
});

app.post('/assignment/text-assignment-user', groupPermissions(['admin', 'superAdmin']), async (req, res, next) => {
  const userId = req.apiGateway.event.requestContext.authorizer.claims.sub
  const textAssignmentCourseId = req.body.textAssignmentCourseId
  const textAssignmentId = req.body.textAssignmentId

  console.log("User Id:", userId)

  try {
    const body = await createTextAssignmentUser(userId, textAssignmentCourseId, textAssignmentId)
    res.json({success: `User Assignment ID: ${body.data.createTextAssignmentUser.id}`, createTextAssignmentUser: body.data.createTextAssignmentUser})  
  } catch (err) {
    next(err)
  }  
});

app.put('/assignment/start-assignment', groupPermissions(['default', 'admin', 'superAdmin']), async (req, res, next) => {
  const userId = req.apiGateway.event.requestContext.authorizer.claims.sub
  const userAssignmentId = req.body.userAssignmentId  

  try {
    const body = await startTextAssignmentUser(userAssignmentId, userId)
    res.json({success: `Started User Assignment ID: ${userAssignmentId}`, body})  
  } catch (err) {
    next(err)
  }  
});

app.put('/assignment/submit', groupPermissions(['default', 'admin', 'superAdmin']), async (req, res, next) => {
  const userId = req.apiGateway.event.requestContext.authorizer.claims.sub
  const userAssignmentId = req.body.userAssignmentId  
  const submission = req.body.submission  

  try {
    const body = await submitTextAssignmentUser(userAssignmentId, userId, submission)
    res.json({success: `Submitted User Assignment ID: ${userAssignmentId}`, body})  
  } catch (err) {
    next(err)
  }  
});

// Error middleware must be defined last
app.use((err, req, res, next) => {
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  console.error(`--- Express Error Handler ---\n`, `Error Message: ${err.message}`, `Error Status Code: ${err.statusCode}`);
  res.status(err.statusCode).json({ message: err.message }).end();
});

app.listen(3000, function() {
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
export default app;
