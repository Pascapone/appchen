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
export const updateCourse = /* GraphQL */ `
  mutation UpdateCourse(
    $input: UpdateCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    updateCourse(input: $input, condition: $condition) {
      id
      name
      level
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
export const deleteCourse = /* GraphQL */ `
  mutation DeleteCourse(
    $input: DeleteCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    deleteCourse(input: $input, condition: $condition) {
      id
      name
      level
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
        createdAt
        updatedAt
      }
      course {
        id
        name
        level
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
        createdAt
        updatedAt
      }
      course {
        id
        name
        level
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
        createdAt
        updatedAt
      }
      course {
        id
        name
        level
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
