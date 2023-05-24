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
          startDate
          endDate
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
        createdAt
        updatedAt
      }
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
        owner {
          id
          name
          email
          userType
          createdAt
          updatedAt
        }
        startDate
        endDate
        users {
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
        owner {
          id
          name
          email
          userType
          createdAt
          updatedAt
        }
        startDate
        endDate
        users {
          nextToken
        }
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
        createdAt
        updatedAt
      }
      course {
        id
        name
        level
        ownerId
        owner {
          id
          name
          email
          userType
          createdAt
          updatedAt
        }
        startDate
        endDate
        users {
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
