"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourseWithUsersQuery = exports.getCourseOwnerIdQuery = exports.userCourseQuery = void 0;
exports.userCourseQuery = "\n  query GetUser($id: ID!) {\n    getUser(id: $id) {\n      id\n      name\n      email\n      userType\n      courses {\n        items {\n          id\n          userId\n          courseId          \n          course {\n            id\n            name\n            level\n            startDate\n            endDate\n            ownerId\n            ownerName\n          }\n        }\n        nextToken\n      }\n    }\n  }\n";
exports.getCourseOwnerIdQuery = "\n  query GetCourse($id: ID!) {\n    getCourse(id: $id) {\n      id\n      ownerId      \n    }\n  }\n";
exports.getCourseWithUsersQuery = "\n  query GetCourse($id: ID!) {\n    getCourse(id: $id) {\n      id\n      name\n      level\n      ownerId\n      ownerName     \n      startDate\n      endDate\n      users {\n        items {\n          id\n          userId\n          courseId\n          createdAt\n          updatedAt\n          user {\n            id\n            name\n            email\n            userType\n          }       \n        }\n        nextToken\n      }\n    }\n  }\n";
