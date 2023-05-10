"use strict";
/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Amplify Params - DO NOT EDIT
    API_APPCHENGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT
    API_APPCHENGRAPHQL_GRAPHQLAPIIDOUTPUT
    ENV
    REGION
Amplify Params - DO NOT EDIT */
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var middleware_1 = __importDefault(require("aws-serverless-express/middleware"));
// declare a new express app
var app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(middleware_1.default.eventContext());
// Creates a group permissions middleware
var groupPermissions = function (allowedGroups) {
    return function (req, res, next) {
        var userGroups = req.apiGateway.event.requestContext.authorizer.claims['cognito:groups'].split(',');
        if (userGroups && userGroups.some(function (group) { return allowedGroups.includes(group); })) {
            next();
        }
        else {
            res.status(403).send('Forbidden');
        }
    };
};
// Enable CORS for all methods
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});
/**********************
 * Example get method *
 **********************/
app.get('/', groupPermissions(['admin']), function (req, res) {
    console.log(req);
    console.log(req.apiGateway.event.requestContext.authorizer.claims['cognito:groups']);
    // Add your code here
    res.json({ success: 'get call succeed!', url: req.url });
});
app.get('/route/test', function (req, res) {
    console.log(req);
    // Add your code here
    res.json({ success: 'get call on route test succeed!', url: req.url });
});
app.get('//*', function (req, res) {
    // Add your code here
    res.json({ success: 'get call succeed!', url: req.url });
});
/****************************
* Example post method *
****************************/
app.post('/', function (req, res) {
    // Add your code here
    res.json({ success: 'post call succeed!', url: req.url, body: req.body });
});
app.post('//*', function (req, res) {
    // Add your code here
    res.json({ success: 'post call succeed!', url: req.url, body: req.body });
});
/****************************
* Example put method *
****************************/
app.put('/', function (req, res) {
    // Add your code here
    res.json({ success: 'put call succeed!', url: req.url, body: req.body });
});
app.put('//*', function (req, res) {
    // Add your code here
    res.json({ success: 'put call succeed!', url: req.url, body: req.body });
});
/****************************
* Example delete method *
****************************/
app.delete('/', function (req, res) {
    // Add your code here
    res.json({ success: 'delete call succeed!', url: req.url });
});
app.delete('//*', function (req, res) {
    // Add your code here
    res.json({ success: 'delete call succeed!', url: req.url });
});
// Error middleware must be defined last
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode)
        err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
    res.status(err.statusCode).json({ message: err.message }).end();
});
app.listen(3000, function () {
    console.log("App started");
});
// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
exports.default = app;
