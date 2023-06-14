"use strict";
/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCoursesUsers = exports.updateCoursesUsers = exports.createCoursesUsers = exports.deleteTextAssignmentUser = exports.updateTextAssignmentUser = exports.createTextAssignmentUser = exports.deleteTextAssignmentCourse = exports.updateTextAssignmentCourse = exports.createTextAssignmentCourse = exports.deleteTextAssignment = exports.updateTextAssignment = exports.createTextAssignment = exports.deleteCourse = exports.updateCourse = exports.createCourse = exports.deleteUser = exports.updateUser = exports.createUser = void 0;
exports.createUser = "\n  mutation CreateUser(\n    $input: CreateUserInput!\n    $condition: ModelUserConditionInput\n  ) {\n    createUser(input: $input, condition: $condition) {\n      id\n      name\n      email\n      userType\n      courses {\n        items {\n          id\n          userId\n          courseId\n          createdAt\n          updatedAt\n        }\n        nextToken\n      }\n      ownedCourses {\n        items {\n          id\n          name\n          level\n          ownerId\n          ownerName\n          inviteToken\n          startDate\n          endDate\n          createdAt\n          updatedAt\n        }\n        nextToken\n      }\n      textAssignmentsUser {\n        items {\n          id\n          textAssignmentId\n          userId\n          textAssignmentCourseId\n          submission\n          revision\n          startTime\n          endTime\n          submissionTime\n          createdAt\n          updatedAt\n        }\n        nextToken\n      }\n      ownedTextAssignments {\n        items {\n          id\n          ownerId\n          name\n          description\n          link\n          level\n          timeLimit\n          createdAt\n          updatedAt\n        }\n        nextToken\n      }\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.updateUser = "\n  mutation UpdateUser(\n    $input: UpdateUserInput!\n    $condition: ModelUserConditionInput\n  ) {\n    updateUser(input: $input, condition: $condition) {\n      id\n      name\n      email\n      userType\n      courses {\n        items {\n          id\n          userId\n          courseId\n          createdAt\n          updatedAt\n        }\n        nextToken\n      }\n      ownedCourses {\n        items {\n          id\n          name\n          level\n          ownerId\n          ownerName\n          inviteToken\n          startDate\n          endDate\n          createdAt\n          updatedAt\n        }\n        nextToken\n      }\n      textAssignmentsUser {\n        items {\n          id\n          textAssignmentId\n          userId\n          textAssignmentCourseId\n          submission\n          revision\n          startTime\n          endTime\n          submissionTime\n          createdAt\n          updatedAt\n        }\n        nextToken\n      }\n      ownedTextAssignments {\n        items {\n          id\n          ownerId\n          name\n          description\n          link\n          level\n          timeLimit\n          createdAt\n          updatedAt\n        }\n        nextToken\n      }\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.deleteUser = "\n  mutation DeleteUser(\n    $input: DeleteUserInput!\n    $condition: ModelUserConditionInput\n  ) {\n    deleteUser(input: $input, condition: $condition) {\n      id\n      name\n      email\n      userType\n      courses {\n        items {\n          id\n          userId\n          courseId\n          createdAt\n          updatedAt\n        }\n        nextToken\n      }\n      ownedCourses {\n        items {\n          id\n          name\n          level\n          ownerId\n          ownerName\n          inviteToken\n          startDate\n          endDate\n          createdAt\n          updatedAt\n        }\n        nextToken\n      }\n      textAssignmentsUser {\n        items {\n          id\n          textAssignmentId\n          userId\n          textAssignmentCourseId\n          submission\n          revision\n          startTime\n          endTime\n          submissionTime\n          createdAt\n          updatedAt\n        }\n        nextToken\n      }\n      ownedTextAssignments {\n        items {\n          id\n          ownerId\n          name\n          description\n          link\n          level\n          timeLimit\n          createdAt\n          updatedAt\n        }\n        nextToken\n      }\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.createCourse = "\n  mutation CreateCourse(\n    $input: CreateCourseInput!\n    $condition: ModelCourseConditionInput\n  ) {\n    createCourse(input: $input, condition: $condition) {\n      id\n      name\n      level\n      ownerId\n      ownerName\n      owner {\n        id\n        name\n        email\n        userType\n        courses {\n          nextToken\n        }\n        ownedCourses {\n          nextToken\n        }\n        textAssignmentsUser {\n          nextToken\n        }\n        ownedTextAssignments {\n          nextToken\n        }\n        createdAt\n        updatedAt\n      }\n      inviteToken\n      startDate\n      endDate\n      users {\n        items {\n          id\n          userId\n          courseId\n          createdAt\n          updatedAt\n        }\n        nextToken\n      }\n      textAssignments {\n        items {\n          id\n          courseId\n          textAssignmentId\n          dueDate\n          timeLimit\n          createdAt\n          updatedAt\n        }\n        nextToken\n      }\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.updateCourse = "\n  mutation UpdateCourse(\n    $input: UpdateCourseInput!\n    $condition: ModelCourseConditionInput\n  ) {\n    updateCourse(input: $input, condition: $condition) {\n      id\n      name\n      level\n      ownerId\n      ownerName\n      owner {\n        id\n        name\n        email\n        userType\n        courses {\n          nextToken\n        }\n        ownedCourses {\n          nextToken\n        }\n        textAssignmentsUser {\n          nextToken\n        }\n        ownedTextAssignments {\n          nextToken\n        }\n        createdAt\n        updatedAt\n      }\n      inviteToken\n      startDate\n      endDate\n      users {\n        items {\n          id\n          userId\n          courseId\n          createdAt\n          updatedAt\n        }\n        nextToken\n      }\n      textAssignments {\n        items {\n          id\n          courseId\n          textAssignmentId\n          dueDate\n          timeLimit\n          createdAt\n          updatedAt\n        }\n        nextToken\n      }\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.deleteCourse = "\n  mutation DeleteCourse(\n    $input: DeleteCourseInput!\n    $condition: ModelCourseConditionInput\n  ) {\n    deleteCourse(input: $input, condition: $condition) {\n      id\n      name\n      level\n      ownerId\n      ownerName\n      owner {\n        id\n        name\n        email\n        userType\n        courses {\n          nextToken\n        }\n        ownedCourses {\n          nextToken\n        }\n        textAssignmentsUser {\n          nextToken\n        }\n        ownedTextAssignments {\n          nextToken\n        }\n        createdAt\n        updatedAt\n      }\n      inviteToken\n      startDate\n      endDate\n      users {\n        items {\n          id\n          userId\n          courseId\n          createdAt\n          updatedAt\n        }\n        nextToken\n      }\n      textAssignments {\n        items {\n          id\n          courseId\n          textAssignmentId\n          dueDate\n          timeLimit\n          createdAt\n          updatedAt\n        }\n        nextToken\n      }\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.createTextAssignment = "\n  mutation CreateTextAssignment(\n    $input: CreateTextAssignmentInput!\n    $condition: ModelTextAssignmentConditionInput\n  ) {\n    createTextAssignment(input: $input, condition: $condition) {\n      id\n      ownerId\n      owner {\n        id\n        name\n        email\n        userType\n        courses {\n          nextToken\n        }\n        ownedCourses {\n          nextToken\n        }\n        textAssignmentsUser {\n          nextToken\n        }\n        ownedTextAssignments {\n          nextToken\n        }\n        createdAt\n        updatedAt\n      }\n      name\n      description\n      link\n      level\n      timeLimit\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.updateTextAssignment = "\n  mutation UpdateTextAssignment(\n    $input: UpdateTextAssignmentInput!\n    $condition: ModelTextAssignmentConditionInput\n  ) {\n    updateTextAssignment(input: $input, condition: $condition) {\n      id\n      ownerId\n      owner {\n        id\n        name\n        email\n        userType\n        courses {\n          nextToken\n        }\n        ownedCourses {\n          nextToken\n        }\n        textAssignmentsUser {\n          nextToken\n        }\n        ownedTextAssignments {\n          nextToken\n        }\n        createdAt\n        updatedAt\n      }\n      name\n      description\n      link\n      level\n      timeLimit\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.deleteTextAssignment = "\n  mutation DeleteTextAssignment(\n    $input: DeleteTextAssignmentInput!\n    $condition: ModelTextAssignmentConditionInput\n  ) {\n    deleteTextAssignment(input: $input, condition: $condition) {\n      id\n      ownerId\n      owner {\n        id\n        name\n        email\n        userType\n        courses {\n          nextToken\n        }\n        ownedCourses {\n          nextToken\n        }\n        textAssignmentsUser {\n          nextToken\n        }\n        ownedTextAssignments {\n          nextToken\n        }\n        createdAt\n        updatedAt\n      }\n      name\n      description\n      link\n      level\n      timeLimit\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.createTextAssignmentCourse = "\n  mutation CreateTextAssignmentCourse(\n    $input: CreateTextAssignmentCourseInput!\n    $condition: ModelTextAssignmentCourseConditionInput\n  ) {\n    createTextAssignmentCourse(input: $input, condition: $condition) {\n      id\n      courseId\n      course {\n        id\n        name\n        level\n        ownerId\n        ownerName\n        owner {\n          id\n          name\n          email\n          userType\n          createdAt\n          updatedAt\n        }\n        inviteToken\n        startDate\n        endDate\n        users {\n          nextToken\n        }\n        textAssignments {\n          nextToken\n        }\n        createdAt\n        updatedAt\n      }\n      textAssignmentId\n      textAssignment {\n        id\n        ownerId\n        owner {\n          id\n          name\n          email\n          userType\n          createdAt\n          updatedAt\n        }\n        name\n        description\n        link\n        level\n        timeLimit\n        createdAt\n        updatedAt\n      }\n      textAssignmentUsers {\n        items {\n          id\n          textAssignmentId\n          userId\n          textAssignmentCourseId\n          submission\n          revision\n          startTime\n          endTime\n          submissionTime\n          createdAt\n          updatedAt\n        }\n        nextToken\n      }\n      dueDate\n      timeLimit\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.updateTextAssignmentCourse = "\n  mutation UpdateTextAssignmentCourse(\n    $input: UpdateTextAssignmentCourseInput!\n    $condition: ModelTextAssignmentCourseConditionInput\n  ) {\n    updateTextAssignmentCourse(input: $input, condition: $condition) {\n      id\n      courseId\n      course {\n        id\n        name\n        level\n        ownerId\n        ownerName\n        owner {\n          id\n          name\n          email\n          userType\n          createdAt\n          updatedAt\n        }\n        inviteToken\n        startDate\n        endDate\n        users {\n          nextToken\n        }\n        textAssignments {\n          nextToken\n        }\n        createdAt\n        updatedAt\n      }\n      textAssignmentId\n      textAssignment {\n        id\n        ownerId\n        owner {\n          id\n          name\n          email\n          userType\n          createdAt\n          updatedAt\n        }\n        name\n        description\n        link\n        level\n        timeLimit\n        createdAt\n        updatedAt\n      }\n      textAssignmentUsers {\n        items {\n          id\n          textAssignmentId\n          userId\n          textAssignmentCourseId\n          submission\n          revision\n          startTime\n          endTime\n          submissionTime\n          createdAt\n          updatedAt\n        }\n        nextToken\n      }\n      dueDate\n      timeLimit\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.deleteTextAssignmentCourse = "\n  mutation DeleteTextAssignmentCourse(\n    $input: DeleteTextAssignmentCourseInput!\n    $condition: ModelTextAssignmentCourseConditionInput\n  ) {\n    deleteTextAssignmentCourse(input: $input, condition: $condition) {\n      id\n      courseId\n      course {\n        id\n        name\n        level\n        ownerId\n        ownerName\n        owner {\n          id\n          name\n          email\n          userType\n          createdAt\n          updatedAt\n        }\n        inviteToken\n        startDate\n        endDate\n        users {\n          nextToken\n        }\n        textAssignments {\n          nextToken\n        }\n        createdAt\n        updatedAt\n      }\n      textAssignmentId\n      textAssignment {\n        id\n        ownerId\n        owner {\n          id\n          name\n          email\n          userType\n          createdAt\n          updatedAt\n        }\n        name\n        description\n        link\n        level\n        timeLimit\n        createdAt\n        updatedAt\n      }\n      textAssignmentUsers {\n        items {\n          id\n          textAssignmentId\n          userId\n          textAssignmentCourseId\n          submission\n          revision\n          startTime\n          endTime\n          submissionTime\n          createdAt\n          updatedAt\n        }\n        nextToken\n      }\n      dueDate\n      timeLimit\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.createTextAssignmentUser = "\n  mutation CreateTextAssignmentUser(\n    $input: CreateTextAssignmentUserInput!\n    $condition: ModelTextAssignmentUserConditionInput\n  ) {\n    createTextAssignmentUser(input: $input, condition: $condition) {\n      id\n      textAssignmentId\n      textAssignment {\n        id\n        ownerId\n        owner {\n          id\n          name\n          email\n          userType\n          createdAt\n          updatedAt\n        }\n        name\n        description\n        link\n        level\n        timeLimit\n        createdAt\n        updatedAt\n      }\n      userId\n      user {\n        id\n        name\n        email\n        userType\n        courses {\n          nextToken\n        }\n        ownedCourses {\n          nextToken\n        }\n        textAssignmentsUser {\n          nextToken\n        }\n        ownedTextAssignments {\n          nextToken\n        }\n        createdAt\n        updatedAt\n      }\n      textAssignmentCourseId\n      textAssignmentCourse {\n        id\n        courseId\n        course {\n          id\n          name\n          level\n          ownerId\n          ownerName\n          inviteToken\n          startDate\n          endDate\n          createdAt\n          updatedAt\n        }\n        textAssignmentId\n        textAssignment {\n          id\n          ownerId\n          name\n          description\n          link\n          level\n          timeLimit\n          createdAt\n          updatedAt\n        }\n        textAssignmentUsers {\n          nextToken\n        }\n        dueDate\n        timeLimit\n        createdAt\n        updatedAt\n      }\n      submission\n      revision\n      startTime\n      endTime\n      submissionTime\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.updateTextAssignmentUser = "\n  mutation UpdateTextAssignmentUser(\n    $input: UpdateTextAssignmentUserInput!\n    $condition: ModelTextAssignmentUserConditionInput\n  ) {\n    updateTextAssignmentUser(input: $input, condition: $condition) {\n      id\n      textAssignmentId\n      textAssignment {\n        id\n        ownerId\n        owner {\n          id\n          name\n          email\n          userType\n          createdAt\n          updatedAt\n        }\n        name\n        description\n        link\n        level\n        timeLimit\n        createdAt\n        updatedAt\n      }\n      userId\n      user {\n        id\n        name\n        email\n        userType\n        courses {\n          nextToken\n        }\n        ownedCourses {\n          nextToken\n        }\n        textAssignmentsUser {\n          nextToken\n        }\n        ownedTextAssignments {\n          nextToken\n        }\n        createdAt\n        updatedAt\n      }\n      textAssignmentCourseId\n      textAssignmentCourse {\n        id\n        courseId\n        course {\n          id\n          name\n          level\n          ownerId\n          ownerName\n          inviteToken\n          startDate\n          endDate\n          createdAt\n          updatedAt\n        }\n        textAssignmentId\n        textAssignment {\n          id\n          ownerId\n          name\n          description\n          link\n          level\n          timeLimit\n          createdAt\n          updatedAt\n        }\n        textAssignmentUsers {\n          nextToken\n        }\n        dueDate\n        timeLimit\n        createdAt\n        updatedAt\n      }\n      submission\n      revision\n      startTime\n      endTime\n      submissionTime\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.deleteTextAssignmentUser = "\n  mutation DeleteTextAssignmentUser(\n    $input: DeleteTextAssignmentUserInput!\n    $condition: ModelTextAssignmentUserConditionInput\n  ) {\n    deleteTextAssignmentUser(input: $input, condition: $condition) {\n      id\n      textAssignmentId\n      textAssignment {\n        id\n        ownerId\n        owner {\n          id\n          name\n          email\n          userType\n          createdAt\n          updatedAt\n        }\n        name\n        description\n        link\n        level\n        timeLimit\n        createdAt\n        updatedAt\n      }\n      userId\n      user {\n        id\n        name\n        email\n        userType\n        courses {\n          nextToken\n        }\n        ownedCourses {\n          nextToken\n        }\n        textAssignmentsUser {\n          nextToken\n        }\n        ownedTextAssignments {\n          nextToken\n        }\n        createdAt\n        updatedAt\n      }\n      textAssignmentCourseId\n      textAssignmentCourse {\n        id\n        courseId\n        course {\n          id\n          name\n          level\n          ownerId\n          ownerName\n          inviteToken\n          startDate\n          endDate\n          createdAt\n          updatedAt\n        }\n        textAssignmentId\n        textAssignment {\n          id\n          ownerId\n          name\n          description\n          link\n          level\n          timeLimit\n          createdAt\n          updatedAt\n        }\n        textAssignmentUsers {\n          nextToken\n        }\n        dueDate\n        timeLimit\n        createdAt\n        updatedAt\n      }\n      submission\n      revision\n      startTime\n      endTime\n      submissionTime\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.createCoursesUsers = "\n  mutation CreateCoursesUsers(\n    $input: CreateCoursesUsersInput!\n    $condition: ModelCoursesUsersConditionInput\n  ) {\n    createCoursesUsers(input: $input, condition: $condition) {\n      id\n      userId\n      courseId\n      user {\n        id\n        name\n        email\n        userType\n        courses {\n          nextToken\n        }\n        ownedCourses {\n          nextToken\n        }\n        textAssignmentsUser {\n          nextToken\n        }\n        ownedTextAssignments {\n          nextToken\n        }\n        createdAt\n        updatedAt\n      }\n      course {\n        id\n        name\n        level\n        ownerId\n        ownerName\n        owner {\n          id\n          name\n          email\n          userType\n          createdAt\n          updatedAt\n        }\n        inviteToken\n        startDate\n        endDate\n        users {\n          nextToken\n        }\n        textAssignments {\n          nextToken\n        }\n        createdAt\n        updatedAt\n      }\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.updateCoursesUsers = "\n  mutation UpdateCoursesUsers(\n    $input: UpdateCoursesUsersInput!\n    $condition: ModelCoursesUsersConditionInput\n  ) {\n    updateCoursesUsers(input: $input, condition: $condition) {\n      id\n      userId\n      courseId\n      user {\n        id\n        name\n        email\n        userType\n        courses {\n          nextToken\n        }\n        ownedCourses {\n          nextToken\n        }\n        textAssignmentsUser {\n          nextToken\n        }\n        ownedTextAssignments {\n          nextToken\n        }\n        createdAt\n        updatedAt\n      }\n      course {\n        id\n        name\n        level\n        ownerId\n        ownerName\n        owner {\n          id\n          name\n          email\n          userType\n          createdAt\n          updatedAt\n        }\n        inviteToken\n        startDate\n        endDate\n        users {\n          nextToken\n        }\n        textAssignments {\n          nextToken\n        }\n        createdAt\n        updatedAt\n      }\n      createdAt\n      updatedAt\n    }\n  }\n";
exports.deleteCoursesUsers = "\n  mutation DeleteCoursesUsers(\n    $input: DeleteCoursesUsersInput!\n    $condition: ModelCoursesUsersConditionInput\n  ) {\n    deleteCoursesUsers(input: $input, condition: $condition) {\n      id\n      userId\n      courseId\n      user {\n        id\n        name\n        email\n        userType\n        courses {\n          nextToken\n        }\n        ownedCourses {\n          nextToken\n        }\n        textAssignmentsUser {\n          nextToken\n        }\n        ownedTextAssignments {\n          nextToken\n        }\n        createdAt\n        updatedAt\n      }\n      course {\n        id\n        name\n        level\n        ownerId\n        ownerName\n        owner {\n          id\n          name\n          email\n          userType\n          createdAt\n          updatedAt\n        }\n        inviteToken\n        startDate\n        endDate\n        users {\n          nextToken\n        }\n        textAssignments {\n          nextToken\n        }\n        createdAt\n        updatedAt\n      }\n      createdAt\n      updatedAt\n    }\n  }\n";
