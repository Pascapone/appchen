/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      name
      email
      userType
      courses {
        items {
          id
          userId
          courseId
          createdAt
          updatedAt
        }
        nextToken
      }
      ownedCourses {
        items {
          id
          name
          level
          ownerId
          ownerName
          inviteToken
          startDate
          endDate
          createdAt
          updatedAt
        }
        nextToken
      }
      textAssignmentsUser {
        items {
          id
          textAssignmentId
          userId
          textAssignmentCourseId
          submission
          startTime
          endTime
          submissionTime
          createdAt
          updatedAt
        }
        nextToken
      }
      ownedTextAssignments {
        items {
          id
          ownerId
          name
          description
          link
          level
          timeLimit
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      email
      userType
      courses {
        items {
          id
          userId
          courseId
          createdAt
          updatedAt
        }
        nextToken
      }
      ownedCourses {
        items {
          id
          name
          level
          ownerId
          ownerName
          inviteToken
          startDate
          endDate
          createdAt
          updatedAt
        }
        nextToken
      }
      textAssignmentsUser {
        items {
          id
          textAssignmentId
          userId
          textAssignmentCourseId
          submission
          startTime
          endTime
          submissionTime
          createdAt
          updatedAt
        }
        nextToken
      }
      ownedTextAssignments {
        items {
          id
          ownerId
          name
          description
          link
          level
          timeLimit
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      name
      email
      userType
      courses {
        items {
          id
          userId
          courseId
          createdAt
          updatedAt
        }
        nextToken
      }
      ownedCourses {
        items {
          id
          name
          level
          ownerId
          ownerName
          inviteToken
          startDate
          endDate
          createdAt
          updatedAt
        }
        nextToken
      }
      textAssignmentsUser {
        items {
          id
          textAssignmentId
          userId
          textAssignmentCourseId
          submission
          startTime
          endTime
          submissionTime
          createdAt
          updatedAt
        }
        nextToken
      }
      ownedTextAssignments {
        items {
          id
          ownerId
          name
          description
          link
          level
          timeLimit
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createCourse = /* GraphQL */ `
  mutation CreateCourse(
    $input: CreateCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    createCourse(input: $input, condition: $condition) {
      id
      name
      level
      ownerId
      ownerName
      owner {
        id
        name
        email
        userType
        courses {
          nextToken
        }
        ownedCourses {
          nextToken
        }
        textAssignmentsUser {
          nextToken
        }
        ownedTextAssignments {
          nextToken
        }
        createdAt
        updatedAt
      }
      inviteToken
      startDate
      endDate
      users {
        items {
          id
          userId
          courseId
          createdAt
          updatedAt
        }
        nextToken
      }
      textAssignments {
        items {
          id
          courseId
          textAssignmentId
          dueDate
          timeLimit
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateCourse = /* GraphQL */ `
  mutation UpdateCourse(
    $input: UpdateCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    updateCourse(input: $input, condition: $condition) {
      id
      name
      level
      ownerId
      ownerName
      owner {
        id
        name
        email
        userType
        courses {
          nextToken
        }
        ownedCourses {
          nextToken
        }
        textAssignmentsUser {
          nextToken
        }
        ownedTextAssignments {
          nextToken
        }
        createdAt
        updatedAt
      }
      inviteToken
      startDate
      endDate
      users {
        items {
          id
          userId
          courseId
          createdAt
          updatedAt
        }
        nextToken
      }
      textAssignments {
        items {
          id
          courseId
          textAssignmentId
          dueDate
          timeLimit
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteCourse = /* GraphQL */ `
  mutation DeleteCourse(
    $input: DeleteCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    deleteCourse(input: $input, condition: $condition) {
      id
      name
      level
      ownerId
      ownerName
      owner {
        id
        name
        email
        userType
        courses {
          nextToken
        }
        ownedCourses {
          nextToken
        }
        textAssignmentsUser {
          nextToken
        }
        ownedTextAssignments {
          nextToken
        }
        createdAt
        updatedAt
      }
      inviteToken
      startDate
      endDate
      users {
        items {
          id
          userId
          courseId
          createdAt
          updatedAt
        }
        nextToken
      }
      textAssignments {
        items {
          id
          courseId
          textAssignmentId
          dueDate
          timeLimit
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createTextAssignment = /* GraphQL */ `
  mutation CreateTextAssignment(
    $input: CreateTextAssignmentInput!
    $condition: ModelTextAssignmentConditionInput
  ) {
    createTextAssignment(input: $input, condition: $condition) {
      id
      ownerId
      owner {
        id
        name
        email
        userType
        courses {
          nextToken
        }
        ownedCourses {
          nextToken
        }
        textAssignmentsUser {
          nextToken
        }
        ownedTextAssignments {
          nextToken
        }
        createdAt
        updatedAt
      }
      name
      description
      link
      level
      timeLimit
      createdAt
      updatedAt
    }
  }
`;
export const updateTextAssignment = /* GraphQL */ `
  mutation UpdateTextAssignment(
    $input: UpdateTextAssignmentInput!
    $condition: ModelTextAssignmentConditionInput
  ) {
    updateTextAssignment(input: $input, condition: $condition) {
      id
      ownerId
      owner {
        id
        name
        email
        userType
        courses {
          nextToken
        }
        ownedCourses {
          nextToken
        }
        textAssignmentsUser {
          nextToken
        }
        ownedTextAssignments {
          nextToken
        }
        createdAt
        updatedAt
      }
      name
      description
      link
      level
      timeLimit
      createdAt
      updatedAt
    }
  }
`;
export const deleteTextAssignment = /* GraphQL */ `
  mutation DeleteTextAssignment(
    $input: DeleteTextAssignmentInput!
    $condition: ModelTextAssignmentConditionInput
  ) {
    deleteTextAssignment(input: $input, condition: $condition) {
      id
      ownerId
      owner {
        id
        name
        email
        userType
        courses {
          nextToken
        }
        ownedCourses {
          nextToken
        }
        textAssignmentsUser {
          nextToken
        }
        ownedTextAssignments {
          nextToken
        }
        createdAt
        updatedAt
      }
      name
      description
      link
      level
      timeLimit
      createdAt
      updatedAt
    }
  }
`;
export const createTextAssignmentCourse = /* GraphQL */ `
  mutation CreateTextAssignmentCourse(
    $input: CreateTextAssignmentCourseInput!
    $condition: ModelTextAssignmentCourseConditionInput
  ) {
    createTextAssignmentCourse(input: $input, condition: $condition) {
      id
      courseId
      course {
        id
        name
        level
        ownerId
        ownerName
        owner {
          id
          name
          email
          userType
          createdAt
          updatedAt
        }
        inviteToken
        startDate
        endDate
        users {
          nextToken
        }
        textAssignments {
          nextToken
        }
        createdAt
        updatedAt
      }
      textAssignmentId
      textAssignment {
        id
        ownerId
        owner {
          id
          name
          email
          userType
          createdAt
          updatedAt
        }
        name
        description
        link
        level
        timeLimit
        createdAt
        updatedAt
      }
      textAssignmentUsers {
        items {
          id
          textAssignmentId
          userId
          textAssignmentCourseId
          submission
          startTime
          endTime
          submissionTime
          createdAt
          updatedAt
        }
        nextToken
      }
      dueDate
      timeLimit
      createdAt
      updatedAt
    }
  }
`;
export const updateTextAssignmentCourse = /* GraphQL */ `
  mutation UpdateTextAssignmentCourse(
    $input: UpdateTextAssignmentCourseInput!
    $condition: ModelTextAssignmentCourseConditionInput
  ) {
    updateTextAssignmentCourse(input: $input, condition: $condition) {
      id
      courseId
      course {
        id
        name
        level
        ownerId
        ownerName
        owner {
          id
          name
          email
          userType
          createdAt
          updatedAt
        }
        inviteToken
        startDate
        endDate
        users {
          nextToken
        }
        textAssignments {
          nextToken
        }
        createdAt
        updatedAt
      }
      textAssignmentId
      textAssignment {
        id
        ownerId
        owner {
          id
          name
          email
          userType
          createdAt
          updatedAt
        }
        name
        description
        link
        level
        timeLimit
        createdAt
        updatedAt
      }
      textAssignmentUsers {
        items {
          id
          textAssignmentId
          userId
          textAssignmentCourseId
          submission
          startTime
          endTime
          submissionTime
          createdAt
          updatedAt
        }
        nextToken
      }
      dueDate
      timeLimit
      createdAt
      updatedAt
    }
  }
`;
export const deleteTextAssignmentCourse = /* GraphQL */ `
  mutation DeleteTextAssignmentCourse(
    $input: DeleteTextAssignmentCourseInput!
    $condition: ModelTextAssignmentCourseConditionInput
  ) {
    deleteTextAssignmentCourse(input: $input, condition: $condition) {
      id
      courseId
      course {
        id
        name
        level
        ownerId
        ownerName
        owner {
          id
          name
          email
          userType
          createdAt
          updatedAt
        }
        inviteToken
        startDate
        endDate
        users {
          nextToken
        }
        textAssignments {
          nextToken
        }
        createdAt
        updatedAt
      }
      textAssignmentId
      textAssignment {
        id
        ownerId
        owner {
          id
          name
          email
          userType
          createdAt
          updatedAt
        }
        name
        description
        link
        level
        timeLimit
        createdAt
        updatedAt
      }
      textAssignmentUsers {
        items {
          id
          textAssignmentId
          userId
          textAssignmentCourseId
          submission
          startTime
          endTime
          submissionTime
          createdAt
          updatedAt
        }
        nextToken
      }
      dueDate
      timeLimit
      createdAt
      updatedAt
    }
  }
`;
export const createTextAssignmentUser = /* GraphQL */ `
  mutation CreateTextAssignmentUser(
    $input: CreateTextAssignmentUserInput!
    $condition: ModelTextAssignmentUserConditionInput
  ) {
    createTextAssignmentUser(input: $input, condition: $condition) {
      id
      textAssignmentId
      textAssignment {
        id
        ownerId
        owner {
          id
          name
          email
          userType
          createdAt
          updatedAt
        }
        name
        description
        link
        level
        timeLimit
        createdAt
        updatedAt
      }
      userId
      user {
        id
        name
        email
        userType
        courses {
          nextToken
        }
        ownedCourses {
          nextToken
        }
        textAssignmentsUser {
          nextToken
        }
        ownedTextAssignments {
          nextToken
        }
        createdAt
        updatedAt
      }
      textAssignmentCourseId
      textAssignmentCourse {
        id
        courseId
        course {
          id
          name
          level
          ownerId
          ownerName
          inviteToken
          startDate
          endDate
          createdAt
          updatedAt
        }
        textAssignmentId
        textAssignment {
          id
          ownerId
          name
          description
          link
          level
          timeLimit
          createdAt
          updatedAt
        }
        textAssignmentUsers {
          nextToken
        }
        dueDate
        timeLimit
        createdAt
        updatedAt
      }
      submission
      startTime
      endTime
      submissionTime
      createdAt
      updatedAt
    }
  }
`;
export const updateTextAssignmentUser = /* GraphQL */ `
  mutation UpdateTextAssignmentUser(
    $input: UpdateTextAssignmentUserInput!
    $condition: ModelTextAssignmentUserConditionInput
  ) {
    updateTextAssignmentUser(input: $input, condition: $condition) {
      id
      textAssignmentId
      textAssignment {
        id
        ownerId
        owner {
          id
          name
          email
          userType
          createdAt
          updatedAt
        }
        name
        description
        link
        level
        timeLimit
        createdAt
        updatedAt
      }
      userId
      user {
        id
        name
        email
        userType
        courses {
          nextToken
        }
        ownedCourses {
          nextToken
        }
        textAssignmentsUser {
          nextToken
        }
        ownedTextAssignments {
          nextToken
        }
        createdAt
        updatedAt
      }
      textAssignmentCourseId
      textAssignmentCourse {
        id
        courseId
        course {
          id
          name
          level
          ownerId
          ownerName
          inviteToken
          startDate
          endDate
          createdAt
          updatedAt
        }
        textAssignmentId
        textAssignment {
          id
          ownerId
          name
          description
          link
          level
          timeLimit
          createdAt
          updatedAt
        }
        textAssignmentUsers {
          nextToken
        }
        dueDate
        timeLimit
        createdAt
        updatedAt
      }
      submission
      startTime
      endTime
      submissionTime
      createdAt
      updatedAt
    }
  }
`;
export const deleteTextAssignmentUser = /* GraphQL */ `
  mutation DeleteTextAssignmentUser(
    $input: DeleteTextAssignmentUserInput!
    $condition: ModelTextAssignmentUserConditionInput
  ) {
    deleteTextAssignmentUser(input: $input, condition: $condition) {
      id
      textAssignmentId
      textAssignment {
        id
        ownerId
        owner {
          id
          name
          email
          userType
          createdAt
          updatedAt
        }
        name
        description
        link
        level
        timeLimit
        createdAt
        updatedAt
      }
      userId
      user {
        id
        name
        email
        userType
        courses {
          nextToken
        }
        ownedCourses {
          nextToken
        }
        textAssignmentsUser {
          nextToken
        }
        ownedTextAssignments {
          nextToken
        }
        createdAt
        updatedAt
      }
      textAssignmentCourseId
      textAssignmentCourse {
        id
        courseId
        course {
          id
          name
          level
          ownerId
          ownerName
          inviteToken
          startDate
          endDate
          createdAt
          updatedAt
        }
        textAssignmentId
        textAssignment {
          id
          ownerId
          name
          description
          link
          level
          timeLimit
          createdAt
          updatedAt
        }
        textAssignmentUsers {
          nextToken
        }
        dueDate
        timeLimit
        createdAt
        updatedAt
      }
      submission
      startTime
      endTime
      submissionTime
      createdAt
      updatedAt
    }
  }
`;
export const createCoursesUsers = /* GraphQL */ `
  mutation CreateCoursesUsers(
    $input: CreateCoursesUsersInput!
    $condition: ModelCoursesUsersConditionInput
  ) {
    createCoursesUsers(input: $input, condition: $condition) {
      id
      userId
      courseId
      user {
        id
        name
        email
        userType
        courses {
          nextToken
        }
        ownedCourses {
          nextToken
        }
        textAssignmentsUser {
          nextToken
        }
        ownedTextAssignments {
          nextToken
        }
        createdAt
        updatedAt
      }
      course {
        id
        name
        level
        ownerId
        ownerName
        owner {
          id
          name
          email
          userType
          createdAt
          updatedAt
        }
        inviteToken
        startDate
        endDate
        users {
          nextToken
        }
        textAssignments {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateCoursesUsers = /* GraphQL */ `
  mutation UpdateCoursesUsers(
    $input: UpdateCoursesUsersInput!
    $condition: ModelCoursesUsersConditionInput
  ) {
    updateCoursesUsers(input: $input, condition: $condition) {
      id
      userId
      courseId
      user {
        id
        name
        email
        userType
        courses {
          nextToken
        }
        ownedCourses {
          nextToken
        }
        textAssignmentsUser {
          nextToken
        }
        ownedTextAssignments {
          nextToken
        }
        createdAt
        updatedAt
      }
      course {
        id
        name
        level
        ownerId
        ownerName
        owner {
          id
          name
          email
          userType
          createdAt
          updatedAt
        }
        inviteToken
        startDate
        endDate
        users {
          nextToken
        }
        textAssignments {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteCoursesUsers = /* GraphQL */ `
  mutation DeleteCoursesUsers(
    $input: DeleteCoursesUsersInput!
    $condition: ModelCoursesUsersConditionInput
  ) {
    deleteCoursesUsers(input: $input, condition: $condition) {
      id
      userId
      courseId
      user {
        id
        name
        email
        userType
        courses {
          nextToken
        }
        ownedCourses {
          nextToken
        }
        textAssignmentsUser {
          nextToken
        }
        ownedTextAssignments {
          nextToken
        }
        createdAt
        updatedAt
      }
      course {
        id
        name
        level
        ownerId
        ownerName
        owner {
          id
          name
          email
          userType
          createdAt
          updatedAt
        }
        inviteToken
        startDate
        endDate
        users {
          nextToken
        }
        textAssignments {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
