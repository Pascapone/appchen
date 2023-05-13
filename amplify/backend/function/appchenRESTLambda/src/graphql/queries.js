"use strict";
/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten
Object.defineProperty(exports, "__esModule", { value: true });
exports.coursesUsersByCourseId = exports.coursesUsersByUserId = exports.listCoursesUsers = exports.getCoursesUsers = exports.listCourses = exports.getCourse = exports.listUsers = exports.getUser = void 0;
exports.getUser = "\n  query GetUser($id: ID!) {\n    getUser(id: $id) {\n      id\n      name\n      email\n      userType\n      courses {\n        items {\n          id\n          userId\n          courseId\n          createdAt\n          updatedAt\n        }\n        nextToken\n      }\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.listUsers = "\n  query ListUsers(\n    $filter: ModelUserFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      items {\n        id\n        name\n        email\n        userType\n        courses {\n          nextToken\n        }\n        createdAt\n        updatedAt\n      }\n      nextToken\n    }\n  }\n";
exports.getCourse = "\n  query GetCourse($id: ID!) {\n    getCourse(id: $id) {\n      id\n      name\n      level\n      users {\n        items {\n          id\n          userId\n          courseId\n          createdAt\n          updatedAt\n        }\n        nextToken\n      }\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.listCourses = "\n  query ListCourses(\n    $filter: ModelCourseFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listCourses(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      items {\n        id\n        name\n        level\n        users {\n          nextToken\n        }\n        createdAt\n        updatedAt\n      }\n      nextToken\n    }\n  }\n";
exports.getCoursesUsers = "\n  query GetCoursesUsers($id: ID!) {\n    getCoursesUsers(id: $id) {\n      id\n      userId\n      courseId\n      user {\n        id\n        name\n        email\n        userType\n        courses {\n          nextToken\n        }\n        createdAt\n        updatedAt\n      }\n      course {\n        id\n        name\n        level\n        users {\n          nextToken\n        }\n        createdAt\n        updatedAt\n      }\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.listCoursesUsers = "\n  query ListCoursesUsers(\n    $filter: ModelCoursesUsersFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listCoursesUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      items {\n        id\n        userId\n        courseId\n        user {\n          id\n          name\n          email\n          userType\n          createdAt\n          updatedAt\n        }\n        course {\n          id\n          name\n          level\n          createdAt\n          updatedAt\n        }\n        createdAt\n        updatedAt\n      }\n      nextToken\n    }\n  }\n";
exports.coursesUsersByUserId = "\n  query CoursesUsersByUserId(\n    $userId: ID!\n    $sortDirection: ModelSortDirection\n    $filter: ModelCoursesUsersFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    coursesUsersByUserId(\n      userId: $userId\n      sortDirection: $sortDirection\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n    ) {\n      items {\n        id\n        userId\n        courseId\n        user {\n          id\n          name\n          email\n          userType\n          createdAt\n          updatedAt\n        }\n        course {\n          id\n          name\n          level\n          createdAt\n          updatedAt\n        }\n        createdAt\n        updatedAt\n      }\n      nextToken\n    }\n  }\n";
exports.coursesUsersByCourseId = "\n  query CoursesUsersByCourseId(\n    $courseId: ID!\n    $sortDirection: ModelSortDirection\n    $filter: ModelCoursesUsersFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    coursesUsersByCourseId(\n      courseId: $courseId\n      sortDirection: $sortDirection\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n    ) {\n      items {\n        id\n        userId\n        courseId\n        user {\n          id\n          name\n          email\n          userType\n          createdAt\n          updatedAt\n        }\n        course {\n          id\n          name\n          level\n          createdAt\n          updatedAt\n        }\n        createdAt\n        updatedAt\n      }\n      nextToken\n    }\n  }\n";