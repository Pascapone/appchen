"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourseWithUsersQuery = exports.getCourseOwnerIdQuery = exports.userCourseQuery = void 0;
exports.userCourseQuery = "\n  query GetUserWithCourses($id: ID!) {\n    getUser(id: $id) {\n      id\n      name\n      email\n      userType\n      courses {\n        items {\n          id\n          userId\n          courseId          \n          course {\n            id\n            name\n            level\n            startDate\n            endDate\n            ownerId\n            ownerName\n          }\n        }\n        nextToken\n      }\n    }\n  }\n";
exports.getCourseOwnerIdQuery = "\n  query GetCourseOwnerId($id: ID!) {\n    getCourse(id: $id) {\n      id\n      ownerId      \n    }\n  }\n";
exports.getCourseWithUsersQuery = "\n  query GetCourseWithUsers($id: ID!) {\n    getCourse(id: $id) {\n      id\n      name\n      level\n      ownerId\n      ownerName  \n      inviteToken   \n      startDate\n      endDate\n      textAssignments {\n        items {\n          id\n          courseId\n          textAssignmentId\n          textAssignment {\n            id\n            name\n            ownerId\n            owner {\n              id\n              name\n              email\n              userType\n            }\n            description\n            link\n            level\n            timeLimit\n            createdAt\n            updatedAt\n          }\n          textAssignmentUsers {\n            items {\n              id\n              textAssignmentId\n              userId\n              textAssignmentCourseId\n              submission\n              startTime\n              endTime\n              submissionTime\n              createdAt\n              updatedAt\n            }\n            nextToken\n          }\n          dueDate\n          timeLimit\n          createdAt\n          updatedAt\n        }\n        nextToken\n      }\n      users {\n        items {\n          id\n          userId\n          courseId\n          createdAt\n          updatedAt\n          user {\n            id\n            name\n            email\n            userType\n          }       \n        }\n        nextToken\n      }\n    }\n  }\n";
