/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCourse = /* GraphQL */ `
  subscription OnCreateCourse($filter: ModelSubscriptionCourseFilterInput) {
    onCreateCourse(filter: $filter) {
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
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCourse = /* GraphQL */ `
  subscription OnUpdateCourse($filter: ModelSubscriptionCourseFilterInput) {
    onUpdateCourse(filter: $filter) {
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
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCourse = /* GraphQL */ `
  subscription OnDeleteCourse($filter: ModelSubscriptionCourseFilterInput) {
    onDeleteCourse(filter: $filter) {
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
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCoursesUsers = /* GraphQL */ `
  subscription OnCreateCoursesUsers(
    $filter: ModelSubscriptionCoursesUsersFilterInput
  ) {
    onCreateCoursesUsers(filter: $filter) {
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCoursesUsers = /* GraphQL */ `
  subscription OnUpdateCoursesUsers(
    $filter: ModelSubscriptionCoursesUsersFilterInput
  ) {
    onUpdateCoursesUsers(filter: $filter) {
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCoursesUsers = /* GraphQL */ `
  subscription OnDeleteCoursesUsers(
    $filter: ModelSubscriptionCoursesUsersFilterInput
  ) {
    onDeleteCoursesUsers(filter: $filter) {
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
