"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTextAssignmentUser = exports.deleteTextAssignmentCourse = exports.createTextAssignmentCourse = exports.deleteTextAssignment = exports.updateTextAssignment = exports.createTextAssignment = void 0;
var mutations_1 = require("./graphql/mutations");
var mutations_2 = require("./graphql/mutations");
var mutations_3 = require("./graphql/mutations");
var mutations_4 = require("./graphql/mutations");
var mutations_5 = require("./graphql/mutations");
var mutations_6 = require("./graphql/mutations");
var utils_1 = require("./utils");
var course_actions_1 = require("./course-actions");
var createTextAssignment = function (name, courseLevel, description, link, timeLimit, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var input, variables, body;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Time Limit:", timeLimit);
                console.log(timeLimit.length);
                if (timeLimit.length !== 12)
                    throw new Error("Time limit must be in format HH:mm:ss.SSS");
                input = {
                    ownerId: userId,
                    name: name,
                    level: courseLevel,
                    description: description,
                    link: link,
                    timeLimit: timeLimit,
                };
                variables = { input: input };
                return [4 /*yield*/, (0, utils_1.graphQlRequest)(mutations_1.createTextAssignment, variables).catch(function (error) {
                        throw error;
                    })];
            case 1:
                body = _a.sent();
                return [2 /*return*/, body];
        }
    });
}); };
exports.createTextAssignment = createTextAssignment;
var updateTextAssignment = function (assignmentId, name, courseLevel, description, link, timeLimit, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var input, condition, variables, body;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (timeLimit.length !== 12)
                    throw new Error("Time limit must be in format HH:mm:ss.SSS");
                input = {
                    id: assignmentId,
                    name: name,
                    level: courseLevel,
                    description: description,
                    link: link,
                    timeLimit: timeLimit,
                };
                condition = {
                    ownerId: {
                        eq: userId
                    }
                };
                variables = { input: input, condition: condition };
                return [4 /*yield*/, (0, utils_1.graphQlRequest)(mutations_6.updateTextAssignment, variables).catch(function (error) {
                        throw error;
                    })];
            case 1:
                body = _a.sent();
                return [2 /*return*/, body];
        }
    });
}); };
exports.updateTextAssignment = updateTextAssignment;
var deleteTextAssignment = function (assignmentId, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var input, condition, variables, body;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                input = {
                    id: assignmentId,
                };
                condition = {
                    ownerId: {
                        eq: userId
                    }
                };
                variables = { input: input, condition: condition };
                return [4 /*yield*/, (0, utils_1.graphQlRequest)(mutations_4.deleteTextAssignment, variables).catch(function (error) {
                        throw error;
                    })];
            case 1:
                body = _a.sent();
                return [2 /*return*/, body];
        }
    });
}); };
exports.deleteTextAssignment = deleteTextAssignment;
var createTextAssignmentCourse = function (courseId, textAssignmentId, timeLimit, dueDate) { return __awaiter(void 0, void 0, void 0, function () {
    var input, variables, body, courseAssignment, course;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                input = {
                    textAssignmentId: textAssignmentId,
                    courseId: courseId,
                    timeLimit: timeLimit
                };
                if (dueDate != null)
                    input['dueDate'] = dueDate;
                variables = { input: input };
                return [4 /*yield*/, (0, utils_1.graphQlRequest)(mutations_2.createTextAssignmentCourse, variables).catch(function (error) {
                        throw error;
                    })];
            case 1:
                body = _a.sent();
                courseAssignment = body.data.createTextAssignmentCourse;
                console.log("Create Text Assignment Course Body", body);
                return [4 /*yield*/, (0, course_actions_1.getCourse)(courseId).catch(function (error) {
                        throw error;
                    })];
            case 2:
                course = _a.sent();
                console.log("Course Model", course);
                console.log("Users:", course.users.items);
                return [4 /*yield*/, Promise.all(course.users.items.map(function (user) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    console.log("User:", user);
                                    return [4 /*yield*/, (0, exports.createTextAssignmentUser)(user.userId, courseAssignment.id, textAssignmentId).catch(function (error) {
                                            throw error;
                                        })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 3:
                _a.sent();
                return [2 /*return*/, body];
        }
    });
}); };
exports.createTextAssignmentCourse = createTextAssignmentCourse;
var deleteTextAssignmentCourse = function (assignmentId) { return __awaiter(void 0, void 0, void 0, function () {
    var input, variables, body;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                input = {
                    id: assignmentId,
                };
                variables = { input: input };
                return [4 /*yield*/, (0, utils_1.graphQlRequest)(mutations_5.deleteTextAssignmentCourse, variables).catch(function (error) {
                        throw error;
                    })];
            case 1:
                body = _a.sent();
                return [2 /*return*/, body];
        }
    });
}); };
exports.deleteTextAssignmentCourse = deleteTextAssignmentCourse;
var createTextAssignmentUser = function (userId, textAssignmentCourseId, textAssignmentId) { return __awaiter(void 0, void 0, void 0, function () {
    var input, variables, body;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Create Text Assignment User", userId, textAssignmentCourseId, textAssignmentId);
                input = {
                    userId: userId,
                    textAssignmentCourseId: textAssignmentCourseId,
                    textAssignmentId: textAssignmentId,
                };
                variables = { input: input };
                return [4 /*yield*/, (0, utils_1.graphQlRequest)(mutations_3.createTextAssignmentUser, variables).catch(function (error) {
                        console.log("Error in Create Text User:", error);
                        throw error;
                    })];
            case 1:
                body = _a.sent();
                return [2 /*return*/, body];
        }
    });
}); };
exports.createTextAssignmentUser = createTextAssignmentUser;
