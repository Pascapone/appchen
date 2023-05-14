"use strict";
/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var course_actions_1 = require("./course-actions");
var GRAPHQL_ENDPOINT = process.env.API_APPCHENGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT;
var AWS_REGION = process.env.AWS_REGION || 'us-east-1';
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
app.post('/course/create', groupPermissions(['admin']), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var level, name, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                level = req.body.level;
                name = req.body.name;
                console.log("EVENT: ".concat(JSON.stringify(req.body)));
                console.log("Endpoint:", GRAPHQL_ENDPOINT);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, course_actions_1.createCourse)(name, level)];
            case 2:
                _a.sent();
                res.json({ success: 'Create Course', url: req.url, body: req.body });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.log("Error in Promise: ".concat(err_1));
                next(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/course/join', groupPermissions(['admin']), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, courseId, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.body.userId;
                courseId = req.body.courseId;
                console.log("EVENT: ".concat(JSON.stringify(req.body)));
                console.log("Endpoint:", GRAPHQL_ENDPOINT);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, course_actions_1.joinUserToGroup)(userId, courseId)];
            case 2:
                _a.sent();
                res.json({ success: 'User joined course', url: req.url, body: req.body });
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                console.log("Error in Promise: ".concat(err_2));
                next(err_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.delete('/course/delete', groupPermissions(['admin']), function (req, res) {
    // Add your code here
    res.json({ success: "Delete Course: ".concat(req.body.courseId), url: req.url, body: req.body });
});
app.post('/course/:courseId', function (req, res) {
    // Add your code here
    res.json({ success: "Course Id: ".concat(req.params.courseId), url: req.url, body: req.body });
});
// Error middleware must be defined last
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode)
        err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
    console.log("Response:", res);
    console.log(err.statusCode);
    console.log(err.message);
    res.status(err.statusCode).json({ message: err.message }).end();
});
app.listen(3000, function () {
    console.log("App started");
});
// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
exports.default = app;
