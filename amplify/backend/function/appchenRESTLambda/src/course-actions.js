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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinCourseWithToken = exports.createInviteLink = exports.deleteCourse = exports.getCourse = exports.joinUserToCourse = exports.leaveCourse = exports.getCourseOwnerId = exports.getUser = exports.createCourse = void 0;
var mutations_1 = require("./graphql/mutations");
var mutations_2 = require("./graphql/mutations");
var queries_1 = require("./graphql/queries");
var queries_2 = require("./graphql/queries");
var mutations_3 = require("./graphql/mutations");
var mutations_4 = require("./graphql/mutations");
var customQueries_1 = require("./graphql/customQueries");
var crypto_1 = __importDefault(require("crypto"));
var utils_1 = require("./utils");
var aws_sdk_1 = require("aws-sdk");
var secretsInitialized = false;
var secrets = {
    JWT_PRIVATE_KEY: "",
};
var getSecrets = function () { return __awaiter(void 0, void 0, void 0, function () {
    var keys, Parameters;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                keys = Object.keys(secrets);
                return [4 /*yield*/, (new aws_sdk_1.SSM())
                        .getParameters({
                        Names: keys.map(function (secretName) { return process.env[secretName]; }),
                        WithDecryption: true,
                    })
                        .promise()];
            case 1:
                Parameters = (_a.sent()).Parameters;
                keys.forEach(function (key) {
                    secrets[key] = Parameters.find(function (parameter) { return parameter.Name === process.env[key]; }).Value;
                });
                secretsInitialized = true;
                return [2 /*return*/];
        }
    });
}); };
var createCourse = function (courseName, courseLevel, userName, ownerId, startDate, endDate) { return __awaiter(void 0, void 0, void 0, function () {
    var variables, body;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                variables = {
                    input: {
                        name: courseName,
                        level: courseLevel,
                        ownerId: ownerId,
                        startDate: startDate,
                        endDate: endDate,
                        ownerName: userName
                    }
                };
                return [4 /*yield*/, (0, utils_1.graphQlRequest)(mutations_1.createCourse, variables).catch(function (error) {
                        console.log("Create Course Promise Error:", error);
                        throw error;
                    })];
            case 1:
                body = _a.sent();
                return [2 /*return*/, body];
        }
    });
}); };
exports.createCourse = createCourse;
var getUser = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var variables, body;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                variables = {
                    id: userId
                };
                return [4 /*yield*/, (0, utils_1.graphQlRequest)(queries_2.getUser, variables).catch(function (error) {
                        console.log("Get Course Promise Error:", error);
                        throw error;
                    })];
            case 1:
                body = _a.sent();
                return [2 /*return*/, body.data.getUser];
        }
    });
}); };
exports.getUser = getUser;
var getCourseOwnerId = function (courseId) { return __awaiter(void 0, void 0, void 0, function () {
    var course;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, utils_1.graphQlRequest)(customQueries_1.getCourseOwnerIdQuery, { id: courseId }).catch(function (error) {
                    console.log("Get Course Owner Id Promise Error:", error);
                    throw error;
                })];
            case 1:
                course = _a.sent();
                return [2 /*return*/, course.data.getCourse.ownerId];
        }
    });
}); };
exports.getCourseOwnerId = getCourseOwnerId;
var leaveCourse = function (userId, courseId) { return __awaiter(void 0, void 0, void 0, function () {
    var ownerId, variables, body;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.group("Get Course Owner Id");
                return [4 /*yield*/, (0, exports.getCourseOwnerId)(courseId).catch(function (error) {
                        console.log("Get Course Owner Id Promise Error:", error);
                        throw error;
                    })];
            case 1:
                ownerId = _a.sent();
                console.log("Owner Id:", ownerId);
                if (ownerId === userId) {
                    throw new Error("Course owner cannot leave course");
                }
                variables = {
                    input: {
                        id: "".concat(userId, "_").concat(courseId),
                    }
                };
                return [4 /*yield*/, (0, utils_1.graphQlRequest)(mutations_3.deleteCoursesUsers, variables).catch(function (error) {
                        console.log("Delete Course User Relation Promise Error:", error);
                        throw error;
                    })];
            case 2:
                body = _a.sent();
                return [2 /*return*/, body];
        }
    });
}); };
exports.leaveCourse = leaveCourse;
var joinUserToCourse = function (userId, courseId) { return __awaiter(void 0, void 0, void 0, function () {
    var variables, body;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                variables = {
                    input: {
                        id: "".concat(userId, "_").concat(courseId),
                        userId: userId,
                        courseId: courseId
                    }
                };
                return [4 /*yield*/, (0, utils_1.graphQlRequest)(mutations_2.createCoursesUsers, variables).catch(function (error) {
                        console.log("Create Course Promise Error:", error);
                        throw error;
                    })];
            case 1:
                body = _a.sent();
                return [2 /*return*/, body];
        }
    });
}); };
exports.joinUserToCourse = joinUserToCourse;
var getCourse = function (courseId) { return __awaiter(void 0, void 0, void 0, function () {
    var courseQueryVariables, getCourseBody;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                courseQueryVariables = { id: courseId };
                return [4 /*yield*/, (0, utils_1.graphQlRequest)(queries_1.getCourse, courseQueryVariables).catch(function (error) {
                        console.log("Get Course Promise Error:", error);
                        throw error;
                    })];
            case 1:
                getCourseBody = _a.sent();
                return [2 /*return*/, getCourseBody.data.getCourse];
        }
    });
}); };
exports.getCourse = getCourse;
var deleteCourse = function (courseId, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var course, deleteCourseVariables;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.getCourse)(courseId).catch(function (error) {
                    console.log("Get Course Promise Error:", error);
                    throw error;
                })];
            case 1:
                course = _a.sent();
                console.log("Course:", course);
                console.log("Course Users:", course.users.items);
                return [4 /*yield*/, Promise.all(course.users.items.map(function (element) { return __awaiter(void 0, void 0, void 0, function () {
                        var deleteCoursesUsersVariables;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    deleteCoursesUsersVariables = {
                                        input: {
                                            id: element.id,
                                        }
                                    };
                                    return [4 /*yield*/, (0, utils_1.graphQlRequest)(mutations_3.deleteCoursesUsers, deleteCoursesUsersVariables)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })).catch(function (error) {
                        console.log("Delete Course Promise Error:", error);
                        throw error;
                    })];
            case 2:
                _a.sent();
                console.log("Course Id:", course.id);
                deleteCourseVariables = {
                    input: {
                        id: courseId,
                    }
                };
                return [4 /*yield*/, (0, utils_1.graphQlRequest)(mutations_1.deleteCourse, deleteCourseVariables).catch(function (error) {
                        console.log("Delete Course Promise Error:", error);
                        throw error;
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/, { success: "Deleted Course", courseId: courseId }];
        }
    });
}); };
exports.deleteCourse = deleteCourse;
var createInviteLink = function (courseId) { return __awaiter(void 0, void 0, void 0, function () {
    var token, course, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = crypto_1.default.randomBytes(10).toString('hex');
                return [4 /*yield*/, (0, exports.getCourse)(courseId).catch(function (error) {
                        console.log("Get Course Promise Error:", error);
                        throw error;
                    })];
            case 1:
                course = _a.sent();
                return [4 /*yield*/, (0, utils_1.graphQlRequest)(mutations_4.updateCourse, {
                        input: {
                            id: courseId,
                            inviteToken: token
                        }
                    }).catch(function (error) {
                        console.log("Get Course Promise Error:", error);
                        throw error;
                    })];
            case 2:
                response = _a.sent();
                console.log("Response Update", response);
                return [2 /*return*/, token];
        }
    });
}); };
exports.createInviteLink = createInviteLink;
var joinCourseWithToken = function (userId, courseId, token) { return __awaiter(void 0, void 0, void 0, function () {
    var course;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.getCourse)(courseId)];
            case 1:
                course = _a.sent();
                console.log("Course", course);
                console.log("Invite Token", course.inviteToken);
                if (!course.inviteToken || course.inviteToken === "") {
                    throw new Error("Course does not have an invite token");
                }
                if (course.inviteToken !== token) {
                    throw new Error("Invalid Token");
                }
                return [4 /*yield*/, (0, exports.joinUserToCourse)(userId, courseId)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.joinCourseWithToken = joinCourseWithToken;
