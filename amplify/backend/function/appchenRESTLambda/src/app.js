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
var assignment_actions_1 = require("./assignment-actions");
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
// Log all events
app.use(function (err, req, res, next) {
    console.log("EVENT: ".concat(JSON.stringify(req.body)));
    next();
});
/**********************
 * Example get method *
 **********************/
app.get('/', groupPermissions(['admin']), function (req, res) {
    // Add your code here
    res.json({ success: 'get call succeed!', url: req.url });
});
app.post('/course/create', groupPermissions(['admin', 'superAdmin']), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var courseLevel, courseName, userId, startDate, endDate, userName, body, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                courseLevel = req.body.level;
                courseName = req.body.name;
                userId = req.apiGateway.event.requestContext.authorizer.claims.sub;
                startDate = req.body.startDate;
                endDate = req.body.endDate;
                userName = req.apiGateway.event.requestContext.authorizer.claims.name;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, course_actions_1.createCourse)(courseName, courseLevel, userName, userId, startDate, endDate)];
            case 2:
                body = _a.sent();
                res.json({ success: 'Create Course', url: req.url, body: body.data.createCourse });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                next(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/course/leave', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, courseId, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.apiGateway.event.requestContext.authorizer.claims.sub;
                courseId = req.body.courseId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, course_actions_1.leaveCourse)(userId, courseId)];
            case 2:
                _a.sent();
                res.json({ success: 'User left course', url: req.url, body: req.body });
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                next(err_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// TODO: Implement invite link join. At the moment only admins can join users to courses
app.post('/course/join', groupPermissions(['admin', 'superAdmin']), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, courseId, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.body.userId;
                courseId = req.body.courseId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, course_actions_1.joinUserToCourse)(userId, courseId)];
            case 2:
                _a.sent();
                res.json({ success: 'User joined course', url: req.url, body: req.body });
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                next(err_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/course/join-link', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, token, courseId, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.apiGateway.event.requestContext.authorizer.claims.sub;
                token = req.body.token;
                courseId = req.body.courseId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, course_actions_1.joinCourseWithToken)(userId, courseId, token)];
            case 2:
                _a.sent();
                res.json({ success: 'User joined course', url: req.url, body: req.body });
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                next(err_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/course/create-and-join', groupPermissions(['admin', 'superAdmin']), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var courseLevel, courseName, userId, startDate, endDate, userName, body, err_5, courseId, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                courseLevel = req.body.level;
                courseName = req.body.name;
                userId = req.apiGateway.event.requestContext.authorizer.claims.sub;
                startDate = req.body.startDate;
                endDate = req.body.endDate;
                userName = req.apiGateway.event.requestContext.authorizer.claims.name;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, course_actions_1.createCourse)(courseName, courseLevel, userName, userId, startDate, endDate)];
            case 2:
                body = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_5 = _a.sent();
                next(err_5);
                return [2 /*return*/];
            case 4:
                _a.trys.push([4, 6, , 7]);
                courseId = body.data.createCourse.id;
                return [4 /*yield*/, (0, course_actions_1.joinUserToCourse)(userId, courseId)];
            case 5:
                _a.sent();
                res.json({ success: 'Course Created and User Joined', url: req.url, body: { createCourse: body.data.createCourse, joinedCourseId: courseId } });
                return [3 /*break*/, 7];
            case 6:
                err_6 = _a.sent();
                next(err_6);
                return [2 /*return*/];
            case 7: return [2 /*return*/];
        }
    });
}); });
app.post('/course/createInviteLink', groupPermissions(['admin', 'superAdmin']), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var courseId, userId, token, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                courseId = req.body.courseId;
                userId = req.apiGateway.event.requestContext.authorizer.claims.sub;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, course_actions_1.createInviteLink)(courseId, userId)];
            case 2:
                token = _a.sent();
                res.json({ success: "Course Id: ".concat(userId), url: req.url, body: { token: token } });
                return [3 /*break*/, 4];
            case 3:
                err_7 = _a.sent();
                next(err_7);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/course/invalidate-invite-link', groupPermissions(['admin', 'superAdmin']), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var courseId, userId, token, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                courseId = req.body.courseId;
                userId = req.apiGateway.event.requestContext.authorizer.claims.sub;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, course_actions_1.invalidateInviteLink)(courseId, userId)];
            case 2:
                token = _a.sent();
                res.json({ success: "Ivalidate Link for Course Id: ".concat(userId), url: req.url, body: { token: token } });
                return [3 /*break*/, 4];
            case 3:
                err_8 = _a.sent();
                next(err_8);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.delete('/course/:courseId', groupPermissions(['admin', 'superAdmin']), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, courseId, err_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.apiGateway.event.requestContext.authorizer.claims.sub;
                courseId = req.params.courseId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, course_actions_1.deleteCourse)(courseId, userId)];
            case 2:
                _a.sent();
                res.json({ success: 'Course Created and User Joined', url: req.url, body: { courseId: courseId } });
                return [3 /*break*/, 4];
            case 3:
                err_9 = _a.sent();
                next(err_9);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/course/:courseId', function (req, res) {
    // Add your code here
    res.json({ success: "Course Id: ".concat(req.params.courseId), url: req.url, body: req.body });
});
app.post('/assignment/text-assignment', groupPermissions(['admin', 'superAdmin']), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, assignmentName, courseLevel, description, link, timeLimit, body, err_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.apiGateway.event.requestContext.authorizer.claims.sub;
                assignmentName = req.body.name;
                courseLevel = req.body.level;
                description = req.body.description;
                link = req.body.link;
                timeLimit = req.body.timeLimit;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, assignment_actions_1.createTextAssignment)(assignmentName, courseLevel, description, link, timeLimit, userId)];
            case 2:
                body = _a.sent();
                res.json({ success: "Assignment ID: ".concat(body.data.createTextAssignment.id), createTextAssignment: body.data.createTextAssignment });
                return [3 /*break*/, 4];
            case 3:
                err_10 = _a.sent();
                next(err_10);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.delete('/assignment/text-assignment', groupPermissions(['admin', 'superAdmin']), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, assignmentId, body, err_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.apiGateway.event.requestContext.authorizer.claims.sub;
                assignmentId = req.body.assignmentId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, assignment_actions_1.deleteTextAssignment)(assignmentId, userId)];
            case 2:
                body = _a.sent();
                res.json({ success: "Deleted Assignment ID: ".concat(assignmentId), deleteTextAssignment: body });
                return [3 /*break*/, 4];
            case 3:
                err_11 = _a.sent();
                next(err_11);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.put('/assignment/text-assignment', groupPermissions(['admin', 'superAdmin']), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, assignmentId, assignmentName, courseLevel, description, link, timeLimit, body, err_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.apiGateway.event.requestContext.authorizer.claims.sub;
                assignmentId = req.body.assignmentId;
                assignmentName = req.body.name;
                courseLevel = req.body.level;
                description = req.body.description;
                link = req.body.link;
                timeLimit = req.body.timeLimit;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, assignment_actions_1.updateTextAssignment)(assignmentId, assignmentName, courseLevel, description, link, timeLimit, userId)];
            case 2:
                body = _a.sent();
                res.json({ success: "Update Assignment ID: ".concat(assignmentId), deleteTextAssignment: body });
                return [3 /*break*/, 4];
            case 3:
                err_12 = _a.sent();
                next(err_12);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/assignment/text-assignment-course', groupPermissions(['admin', 'superAdmin']), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var courseId, textAssignmentId, dueDate, timeLimit, body, err_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                courseId = req.body.courseId;
                textAssignmentId = req.body.textAssignmentId;
                dueDate = req.body.dueDate;
                timeLimit = req.body.timeLimit;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, assignment_actions_1.createTextAssignmentCourse)(courseId, textAssignmentId, timeLimit, dueDate)];
            case 2:
                body = _a.sent();
                res.json({ success: "Course Assignment ID: ".concat(body.data.createTextAssignmentCourse.id), createTextAssignmentCourse: body.data.createTextAssignmentCourse });
                return [3 /*break*/, 4];
            case 3:
                err_13 = _a.sent();
                next(err_13);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.delete('/assignment/text-assignment-course', groupPermissions(['admin', 'superAdmin']), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var assignmentId, body, err_14;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                assignmentId = req.body.assignmentId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, assignment_actions_1.deleteTextAssignmentCourse)(assignmentId)];
            case 2:
                body = _a.sent();
                res.json({ success: "Delete Course Assignment ID: ".concat(assignmentId), deleteTextAssignmentCourse: body });
                return [3 /*break*/, 4];
            case 3:
                err_14 = _a.sent();
                next(err_14);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/assignment/text-assignment-user', groupPermissions(['admin', 'superAdmin']), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, textAssignmentCourseId, textAssignmentId, body, err_15;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.apiGateway.event.requestContext.authorizer.claims.sub;
                textAssignmentCourseId = req.body.textAssignmentCourseId;
                textAssignmentId = req.body.textAssignmentId;
                console.log("User Id:", userId);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, assignment_actions_1.createTextAssignmentUser)(userId, textAssignmentCourseId, textAssignmentId)];
            case 2:
                body = _a.sent();
                res.json({ success: "User Assignment ID: ".concat(body.data.createTextAssignmentUser.id), createTextAssignmentUser: body.data.createTextAssignmentUser });
                return [3 /*break*/, 4];
            case 3:
                err_15 = _a.sent();
                next(err_15);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.put('/assignment/start-assignment', groupPermissions(['default', 'admin', 'superAdmin']), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, userAssignmentId, body, err_16;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.apiGateway.event.requestContext.authorizer.claims.sub;
                userAssignmentId = req.body.userAssignmentId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, assignment_actions_1.startTextAssignmentUser)(userAssignmentId, userId)];
            case 2:
                body = _a.sent();
                res.json({ success: "Started User Assignment ID: ".concat(userAssignmentId), body: body });
                return [3 /*break*/, 4];
            case 3:
                err_16 = _a.sent();
                next(err_16);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.put('/assignment/submit', groupPermissions(['default', 'admin', 'superAdmin']), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, userAssignmentId, submission, body, err_17;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.apiGateway.event.requestContext.authorizer.claims.sub;
                userAssignmentId = req.body.userAssignmentId;
                submission = req.body.submission;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, assignment_actions_1.submitTextAssignmentUser)(userAssignmentId, userId, submission)];
            case 2:
                body = _a.sent();
                res.json({ success: "Submitted User Assignment ID: ".concat(userAssignmentId), body: body });
                return [3 /*break*/, 4];
            case 3:
                err_17 = _a.sent();
                next(err_17);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Error middleware must be defined last
app.use(function (err, req, res, next) {
    if (!err.statusCode)
        err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
    console.error("--- Express Error Handler ---\n", "Error Message: ".concat(err.message), "Error Status Code: ".concat(err.statusCode));
    res.status(err.statusCode).json({ message: err.message }).end();
});
app.listen(3000, function () {
});
// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
exports.default = app;
