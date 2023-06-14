/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
          revision
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getCourse = /* GraphQL */ `
  query GetCourse($id: ID!) {
    getCourse(id: $id) {
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
export const listCourses = /* GraphQL */ `
  query ListCourses(
    $filter: ModelCourseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCourses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const coursesByOwnerId = /* GraphQL */ `
  query CoursesByOwnerId(
    $ownerId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCourseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    coursesByOwnerId(
      ownerId: $ownerId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getTextAssignment = /* GraphQL */ `
  query GetTextAssignment($id: ID!) {
    getTextAssignment(id: $id) {
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
export const listTextAssignments = /* GraphQL */ `
  query ListTextAssignments(
    $filter: ModelTextAssignmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTextAssignments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const textAssignmentsByOwnerId = /* GraphQL */ `
  query TextAssignmentsByOwnerId(
    $ownerId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTextAssignmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    textAssignmentsByOwnerId(
      ownerId: $ownerId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getTextAssignmentCourse = /* GraphQL */ `
  query GetTextAssignmentCourse($id: ID!) {
    getTextAssignmentCourse(id: $id) {
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
          revision
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
export const listTextAssignmentCourses = /* GraphQL */ `
  query ListTextAssignmentCourses(
    $filter: ModelTextAssignmentCourseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTextAssignmentCourses(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const textAssignmentCoursesByCourseId = /* GraphQL */ `
  query TextAssignmentCoursesByCourseId(
    $courseId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTextAssignmentCourseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    textAssignmentCoursesByCourseId(
      courseId: $courseId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getTextAssignmentUser = /* GraphQL */ `
  query GetTextAssignmentUser($id: ID!) {
    getTextAssignmentUser(id: $id) {
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
      revision
      startTime
      endTime
      submissionTime
      createdAt
      updatedAt
    }
  }
`;
export const listTextAssignmentUsers = /* GraphQL */ `
  query ListTextAssignmentUsers(
    $filter: ModelTextAssignmentUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTextAssignmentUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
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
        userId
        user {
          id
          name
          email
          userType
          createdAt
          updatedAt
        }
        textAssignmentCourseId
        textAssignmentCourse {
          id
          courseId
          textAssignmentId
          dueDate
          timeLimit
          createdAt
          updatedAt
        }
        submission
        revision
        startTime
        endTime
        submissionTime
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const textAssignmentUsersByUserId = /* GraphQL */ `
  query TextAssignmentUsersByUserId(
    $userId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTextAssignmentUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    textAssignmentUsersByUserId(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
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
        userId
        user {
          id
          name
          email
          userType
          createdAt
          updatedAt
        }
        textAssignmentCourseId
        textAssignmentCourse {
          id
          courseId
          textAssignmentId
          dueDate
          timeLimit
          createdAt
          updatedAt
        }
        submission
        revision
        startTime
        endTime
        submissionTime
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const textAssignmentUsersByTextAssignmentCourseId = /* GraphQL */ `
  query TextAssignmentUsersByTextAssignmentCourseId(
    $textAssignmentCourseId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTextAssignmentUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    textAssignmentUsersByTextAssignmentCourseId(
      textAssignmentCourseId: $textAssignmentCourseId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
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
        userId
        user {
          id
          name
          email
          userType
          createdAt
          updatedAt
        }
        textAssignmentCourseId
        textAssignmentCourse {
          id
          courseId
          textAssignmentId
          dueDate
          timeLimit
          createdAt
          updatedAt
        }
        submission
        revision
        startTime
        endTime
        submissionTime
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCoursesUsers = /* GraphQL */ `
  query GetCoursesUsers($id: ID!) {
    getCoursesUsers(id: $id) {
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
export const listCoursesUsers = /* GraphQL */ `
  query ListCoursesUsers(
    $filter: ModelCoursesUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCoursesUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        courseId
        user {
          id
          name
          email
          userType
          createdAt
          updatedAt
        }
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const coursesUsersByUserId = /* GraphQL */ `
  query CoursesUsersByUserId(
    $userId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCoursesUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    coursesUsersByUserId(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        courseId
        user {
          id
          name
          email
          userType
          createdAt
          updatedAt
        }
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const coursesUsersByCourseId = /* GraphQL */ `
  query CoursesUsersByCourseId(
    $courseId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCoursesUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    coursesUsersByCourseId(
      courseId: $courseId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        courseId
        user {
          id
          name
          email
          userType
          createdAt
          updatedAt
        }
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
