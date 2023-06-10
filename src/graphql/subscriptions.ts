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
      TextAssignmentsUser {
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
      TextAssignments {
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
      TextAssignmentsUser {
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
      TextAssignments {
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
      TextAssignmentsUser {
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
      TextAssignments {
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
        TextAssignmentsUser {
          nextToken
        }
        TextAssignments {
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
      TextAssignments {
        items {
          id
          courseId
          textAssignmentId
          dueDate
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
        TextAssignmentsUser {
          nextToken
        }
        TextAssignments {
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
      TextAssignments {
        items {
          id
          courseId
          textAssignmentId
          dueDate
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
        TextAssignmentsUser {
          nextToken
        }
        TextAssignments {
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
      TextAssignments {
        items {
          id
          courseId
          textAssignmentId
          dueDate
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
export const onCreateTextAssignment = /* GraphQL */ `
  subscription OnCreateTextAssignment(
    $filter: ModelSubscriptionTextAssignmentFilterInput
  ) {
    onCreateTextAssignment(filter: $filter) {
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
        TextAssignmentsUser {
          nextToken
        }
        TextAssignments {
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
export const onUpdateTextAssignment = /* GraphQL */ `
  subscription OnUpdateTextAssignment(
    $filter: ModelSubscriptionTextAssignmentFilterInput
  ) {
    onUpdateTextAssignment(filter: $filter) {
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
        TextAssignmentsUser {
          nextToken
        }
        TextAssignments {
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
export const onDeleteTextAssignment = /* GraphQL */ `
  subscription OnDeleteTextAssignment(
    $filter: ModelSubscriptionTextAssignmentFilterInput
  ) {
    onDeleteTextAssignment(filter: $filter) {
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
        TextAssignmentsUser {
          nextToken
        }
        TextAssignments {
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
export const onCreateTextAssignmentCourse = /* GraphQL */ `
  subscription OnCreateTextAssignmentCourse(
    $filter: ModelSubscriptionTextAssignmentCourseFilterInput
  ) {
    onCreateTextAssignmentCourse(filter: $filter) {
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
        TextAssignments {
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
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTextAssignmentCourse = /* GraphQL */ `
  subscription OnUpdateTextAssignmentCourse(
    $filter: ModelSubscriptionTextAssignmentCourseFilterInput
  ) {
    onUpdateTextAssignmentCourse(filter: $filter) {
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
        TextAssignments {
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
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTextAssignmentCourse = /* GraphQL */ `
  subscription OnDeleteTextAssignmentCourse(
    $filter: ModelSubscriptionTextAssignmentCourseFilterInput
  ) {
    onDeleteTextAssignmentCourse(filter: $filter) {
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
        TextAssignments {
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
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTextAssignmentUser = /* GraphQL */ `
  subscription OnCreateTextAssignmentUser(
    $filter: ModelSubscriptionTextAssignmentUserFilterInput
  ) {
    onCreateTextAssignmentUser(filter: $filter) {
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
        TextAssignmentsUser {
          nextToken
        }
        TextAssignments {
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
export const onUpdateTextAssignmentUser = /* GraphQL */ `
  subscription OnUpdateTextAssignmentUser(
    $filter: ModelSubscriptionTextAssignmentUserFilterInput
  ) {
    onUpdateTextAssignmentUser(filter: $filter) {
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
        TextAssignmentsUser {
          nextToken
        }
        TextAssignments {
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
export const onDeleteTextAssignmentUser = /* GraphQL */ `
  subscription OnDeleteTextAssignmentUser(
    $filter: ModelSubscriptionTextAssignmentUserFilterInput
  ) {
    onDeleteTextAssignmentUser(filter: $filter) {
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
        TextAssignmentsUser {
          nextToken
        }
        TextAssignments {
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
        TextAssignmentsUser {
          nextToken
        }
        TextAssignments {
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
        TextAssignments {
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
        TextAssignmentsUser {
          nextToken
        }
        TextAssignments {
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
        TextAssignments {
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
        TextAssignmentsUser {
          nextToken
        }
        TextAssignments {
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
        TextAssignments {
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
