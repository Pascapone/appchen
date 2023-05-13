"use strict";
/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCoursesUsers = exports.updateCoursesUsers = exports.createCoursesUsers = exports.deleteCourse = exports.updateCourse = exports.createCourse = exports.deleteUser = exports.updateUser = exports.createUser = void 0;
exports.createUser = "\n  mutation CreateUser(\n    $input: CreateUserInput!\n    $condition: ModelUserConditionInput\n  ) {\n    createUser(input: $input, condition: $condition) {\n      id\n      name\n      email\n      userType\n      courses {\n        items {\n          id\n          userId\n          courseId\n          createdAt\n          updatedAt\n        }\n        nextToken\n      }\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.updateUser = "\n  mutation UpdateUser(\n    $input: UpdateUserInput!\n    $condition: ModelUserConditionInput\n  ) {\n    updateUser(input: $input, condition: $condition) {\n      id\n      name\n      email\n      userType\n      courses {\n        items {\n          id\n          userId\n          courseId\n          createdAt\n          updatedAt\n        }\n        nextToken\n      }\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.deleteUser = "\n  mutation DeleteUser(\n    $input: DeleteUserInput!\n    $condition: ModelUserConditionInput\n  ) {\n    deleteUser(input: $input, condition: $condition) {\n      id\n      name\n      email\n      userType\n      courses {\n        items {\n          id\n          userId\n          courseId\n          createdAt\n          updatedAt\n        }\n        nextToken\n      }\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.createCourse = "\n  mutation CreateCourse(\n    $input: CreateCourseInput!\n    $condition: ModelCourseConditionInput\n  ) {\n    createCourse(input: $input, condition: $condition) {\n      id\n      name\n      level\n      users {\n        items {\n          id\n          userId\n          courseId\n          createdAt\n          updatedAt\n        }\n        nextToken\n      }\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.updateCourse = "\n  mutation UpdateCourse(\n    $input: UpdateCourseInput!\n    $condition: ModelCourseConditionInput\n  ) {\n    updateCourse(input: $input, condition: $condition) {\n      id\n      name\n      level\n      users {\n        items {\n          id\n          userId\n          courseId\n          createdAt\n          updatedAt\n        }\n        nextToken\n      }\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.deleteCourse = "\n  mutation DeleteCourse(\n    $input: DeleteCourseInput!\n    $condition: ModelCourseConditionInput\n  ) {\n    deleteCourse(input: $input, condition: $condition) {\n      id\n      name\n      level\n      users {\n        items {\n          id\n          userId\n          courseId\n          createdAt\n          updatedAt\n        }\n        nextToken\n      }\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.createCoursesUsers = "\n  mutation CreateCoursesUsers(\n    $input: CreateCoursesUsersInput!\n    $condition: ModelCoursesUsersConditionInput\n  ) {\n    createCoursesUsers(input: $input, condition: $condition) {\n      id\n      userId\n      courseId\n      user {\n        id\n        name\n        email\n        userType\n        courses {\n          nextToken\n        }\n        createdAt\n        updatedAt\n      }\n      course {\n        id\n        name\n        level\n        users {\n          nextToken\n        }\n        createdAt\n        updatedAt\n      }\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.updateCoursesUsers = "\n  mutation UpdateCoursesUsers(\n    $input: UpdateCoursesUsersInput!\n    $condition: ModelCoursesUsersConditionInput\n  ) {\n    updateCoursesUsers(input: $input, condition: $condition) {\n      id\n      userId\n      courseId\n      user {\n        id\n        name\n        email\n        userType\n        courses {\n          nextToken\n        }\n        createdAt\n        updatedAt\n      }\n      course {\n        id\n        name\n        level\n        users {\n          nextToken\n        }\n        createdAt\n        updatedAt\n      }\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.deleteCoursesUsers = "\n  mutation DeleteCoursesUsers(\n    $input: DeleteCoursesUsersInput!\n    $condition: ModelCoursesUsersConditionInput\n  ) {\n    deleteCoursesUsers(input: $input, condition: $condition) {\n      id\n      userId\n      courseId\n      user {\n        id\n        name\n        email\n        userType\n        courses {\n          nextToken\n        }\n        createdAt\n        updatedAt\n      }\n      course {\n        id\n        name\n        level\n        users {\n          nextToken\n        }\n        createdAt\n        updatedAt\n      }\n      createdAt\n      updatedAt\n    }\n  }\n";
