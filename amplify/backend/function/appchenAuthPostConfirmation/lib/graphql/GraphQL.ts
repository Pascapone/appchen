/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type User = {
  __typename: "User",
  id: string,
  name: string,
  email: string,
  userType: UserType,
  courses?: ModelCoursesUsersConnection | null,
  ownedCourses?: ModelCourseConnection | null,
  createdAt: string,
  updatedAt: string,
};

export enum UserType {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
}


export type ModelCoursesUsersConnection = {
  __typename: "ModelCoursesUsersConnection",
  items:  Array<CoursesUsers | null >,
  nextToken?: string | null,
};

export type CoursesUsers = {
  __typename: "CoursesUsers",
  id: string,
  userId: string,
  courseId: string,
  user: User,
  course: Course,
  createdAt: string,
  updatedAt: string,
};

export type Course = {
  __typename: "Course",
  id: string,
  name: string,
  level: Level,
  ownerId: string,
  ownerName: string,
  owner: User,
  inviteToken?: string | null,
  startDate: string,
  endDate: string,
  users?: ModelCoursesUsersConnection | null,
  createdAt: string,
  updatedAt: string,
};

export enum Level {
  A11 = "A11",
  A12 = "A12",
  A21 = "A21",
  A22 = "A22",
  B11 = "B11",
  B12 = "B12",
  B21 = "B21",
  B22 = "B22",
  C1 = "C1",
}


export type ModelCourseConnection = {
  __typename: "ModelCourseConnection",
  items:  Array<Course | null >,
  nextToken?: string | null,
};

export type CreateUserInput = {
  id?: string | null,
  name: string,
  email: string,
  userType: UserType,
};

export type ModelUserConditionInput = {
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  userType?: ModelUserTypeInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelUserTypeInput = {
  eq?: UserType | null,
  ne?: UserType | null,
};

export type UpdateUserInput = {
  id: string,
  name?: string | null,
  email?: string | null,
  userType?: UserType | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateCourseInput = {
  id?: string | null,
  name: string,
  level: Level,
  ownerId: string,
  ownerName: string,
  inviteToken?: string | null,
  startDate: string,
  endDate: string,
};

export type ModelCourseConditionInput = {
  name?: ModelStringInput | null,
  level?: ModelLevelInput | null,
  ownerId?: ModelIDInput | null,
  ownerName?: ModelStringInput | null,
  inviteToken?: ModelStringInput | null,
  startDate?: ModelStringInput | null,
  endDate?: ModelStringInput | null,
  and?: Array< ModelCourseConditionInput | null > | null,
  or?: Array< ModelCourseConditionInput | null > | null,
  not?: ModelCourseConditionInput | null,
};

export type ModelLevelInput = {
  eq?: Level | null,
  ne?: Level | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateCourseInput = {
  id: string,
  name?: string | null,
  level?: Level | null,
  ownerId?: string | null,
  ownerName?: string | null,
  inviteToken?: string | null,
  startDate?: string | null,
  endDate?: string | null,
};

export type DeleteCourseInput = {
  id: string,
};

export type CreateCoursesUsersInput = {
  id?: string | null,
  userId: string,
  courseId: string,
};

export type ModelCoursesUsersConditionInput = {
  userId?: ModelIDInput | null,
  courseId?: ModelIDInput | null,
  and?: Array< ModelCoursesUsersConditionInput | null > | null,
  or?: Array< ModelCoursesUsersConditionInput | null > | null,
  not?: ModelCoursesUsersConditionInput | null,
};

export type UpdateCoursesUsersInput = {
  id: string,
  userId?: string | null,
  courseId?: string | null,
};

export type DeleteCoursesUsersInput = {
  id: string,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  userType?: ModelUserTypeInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelCourseFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  level?: ModelLevelInput | null,
  ownerId?: ModelIDInput | null,
  ownerName?: ModelStringInput | null,
  inviteToken?: ModelStringInput | null,
  startDate?: ModelStringInput | null,
  endDate?: ModelStringInput | null,
  and?: Array< ModelCourseFilterInput | null > | null,
  or?: Array< ModelCourseFilterInput | null > | null,
  not?: ModelCourseFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelCoursesUsersFilterInput = {
  id?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  courseId?: ModelIDInput | null,
  and?: Array< ModelCoursesUsersFilterInput | null > | null,
  or?: Array< ModelCoursesUsersFilterInput | null > | null,
  not?: ModelCoursesUsersFilterInput | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  userType?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionCourseFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  level?: ModelSubscriptionStringInput | null,
  ownerId?: ModelSubscriptionIDInput | null,
  ownerName?: ModelSubscriptionStringInput | null,
  inviteToken?: ModelSubscriptionStringInput | null,
  startDate?: ModelSubscriptionStringInput | null,
  endDate?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionCourseFilterInput | null > | null,
  or?: Array< ModelSubscriptionCourseFilterInput | null > | null,
};

export type ModelSubscriptionCoursesUsersFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  userId?: ModelSubscriptionIDInput | null,
  courseId?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionCoursesUsersFilterInput | null > | null,
  or?: Array< ModelSubscriptionCoursesUsersFilterInput | null > | null,
};

export type GetUserWithCoursesQueryVariables = {
  id: string,
};

export type GetUserWithCoursesQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email: string,
    userType: UserType,
    courses?:  {
      __typename: "ModelCoursesUsersConnection",
      items:  Array< {
        __typename: "CoursesUsers",
        id: string,
        userId: string,
        courseId: string,
        course:  {
          __typename: "Course",
          id: string,
          name: string,
          level: Level,
          startDate: string,
          endDate: string,
          ownerId: string,
          ownerName: string,
        },
      } | null >,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type GetCourseOwnerIdQueryVariables = {
  id: string,
};

export type GetCourseOwnerIdQuery = {
  getCourse?:  {
    __typename: "Course",
    id: string,
    ownerId: string,
  } | null,
};

export type GetCourseWithUsersQueryVariables = {
  id: string,
};

export type GetCourseWithUsersQuery = {
  getCourse?:  {
    __typename: "Course",
    id: string,
    name: string,
    level: Level,
    ownerId: string,
    ownerName: string,
    inviteToken?: string | null,
    startDate: string,
    endDate: string,
    users?:  {
      __typename: "ModelCoursesUsersConnection",
      items:  Array< {
        __typename: "CoursesUsers",
        id: string,
        userId: string,
        courseId: string,
        createdAt: string,
        updatedAt: string,
        user:  {
          __typename: "User",
          id: string,
          name: string,
          email: string,
          userType: UserType,
        },
      } | null >,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email: string,
    userType: UserType,
    courses?:  {
      __typename: "ModelCoursesUsersConnection",
      items:  Array< {
        __typename: "CoursesUsers",
        id: string,
        userId: string,
        courseId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    ownedCourses?:  {
      __typename: "ModelCourseConnection",
      items:  Array< {
        __typename: "Course",
        id: string,
        name: string,
        level: Level,
        ownerId: string,
        ownerName: string,
        inviteToken?: string | null,
        startDate: string,
        endDate: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email: string,
    userType: UserType,
    courses?:  {
      __typename: "ModelCoursesUsersConnection",
      items:  Array< {
        __typename: "CoursesUsers",
        id: string,
        userId: string,
        courseId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    ownedCourses?:  {
      __typename: "ModelCourseConnection",
      items:  Array< {
        __typename: "Course",
        id: string,
        name: string,
        level: Level,
        ownerId: string,
        ownerName: string,
        inviteToken?: string | null,
        startDate: string,
        endDate: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email: string,
    userType: UserType,
    courses?:  {
      __typename: "ModelCoursesUsersConnection",
      items:  Array< {
        __typename: "CoursesUsers",
        id: string,
        userId: string,
        courseId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    ownedCourses?:  {
      __typename: "ModelCourseConnection",
      items:  Array< {
        __typename: "Course",
        id: string,
        name: string,
        level: Level,
        ownerId: string,
        ownerName: string,
        inviteToken?: string | null,
        startDate: string,
        endDate: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCourseMutationVariables = {
  input: CreateCourseInput,
  condition?: ModelCourseConditionInput | null,
};

export type CreateCourseMutation = {
  createCourse?:  {
    __typename: "Course",
    id: string,
    name: string,
    level: Level,
    ownerId: string,
    ownerName: string,
    owner:  {
      __typename: "User",
      id: string,
      name: string,
      email: string,
      userType: UserType,
      courses?:  {
        __typename: "ModelCoursesUsersConnection",
        nextToken?: string | null,
      } | null,
      ownedCourses?:  {
        __typename: "ModelCourseConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    inviteToken?: string | null,
    startDate: string,
    endDate: string,
    users?:  {
      __typename: "ModelCoursesUsersConnection",
      items:  Array< {
        __typename: "CoursesUsers",
        id: string,
        userId: string,
        courseId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCourseMutationVariables = {
  input: UpdateCourseInput,
  condition?: ModelCourseConditionInput | null,
};

export type UpdateCourseMutation = {
  updateCourse?:  {
    __typename: "Course",
    id: string,
    name: string,
    level: Level,
    ownerId: string,
    ownerName: string,
    owner:  {
      __typename: "User",
      id: string,
      name: string,
      email: string,
      userType: UserType,
      courses?:  {
        __typename: "ModelCoursesUsersConnection",
        nextToken?: string | null,
      } | null,
      ownedCourses?:  {
        __typename: "ModelCourseConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    inviteToken?: string | null,
    startDate: string,
    endDate: string,
    users?:  {
      __typename: "ModelCoursesUsersConnection",
      items:  Array< {
        __typename: "CoursesUsers",
        id: string,
        userId: string,
        courseId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCourseMutationVariables = {
  input: DeleteCourseInput,
  condition?: ModelCourseConditionInput | null,
};

export type DeleteCourseMutation = {
  deleteCourse?:  {
    __typename: "Course",
    id: string,
    name: string,
    level: Level,
    ownerId: string,
    ownerName: string,
    owner:  {
      __typename: "User",
      id: string,
      name: string,
      email: string,
      userType: UserType,
      courses?:  {
        __typename: "ModelCoursesUsersConnection",
        nextToken?: string | null,
      } | null,
      ownedCourses?:  {
        __typename: "ModelCourseConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    inviteToken?: string | null,
    startDate: string,
    endDate: string,
    users?:  {
      __typename: "ModelCoursesUsersConnection",
      items:  Array< {
        __typename: "CoursesUsers",
        id: string,
        userId: string,
        courseId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCoursesUsersMutationVariables = {
  input: CreateCoursesUsersInput,
  condition?: ModelCoursesUsersConditionInput | null,
};

export type CreateCoursesUsersMutation = {
  createCoursesUsers?:  {
    __typename: "CoursesUsers",
    id: string,
    userId: string,
    courseId: string,
    user:  {
      __typename: "User",
      id: string,
      name: string,
      email: string,
      userType: UserType,
      courses?:  {
        __typename: "ModelCoursesUsersConnection",
        nextToken?: string | null,
      } | null,
      ownedCourses?:  {
        __typename: "ModelCourseConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    course:  {
      __typename: "Course",
      id: string,
      name: string,
      level: Level,
      ownerId: string,
      ownerName: string,
      owner:  {
        __typename: "User",
        id: string,
        name: string,
        email: string,
        userType: UserType,
        createdAt: string,
        updatedAt: string,
      },
      inviteToken?: string | null,
      startDate: string,
      endDate: string,
      users?:  {
        __typename: "ModelCoursesUsersConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCoursesUsersMutationVariables = {
  input: UpdateCoursesUsersInput,
  condition?: ModelCoursesUsersConditionInput | null,
};

export type UpdateCoursesUsersMutation = {
  updateCoursesUsers?:  {
    __typename: "CoursesUsers",
    id: string,
    userId: string,
    courseId: string,
    user:  {
      __typename: "User",
      id: string,
      name: string,
      email: string,
      userType: UserType,
      courses?:  {
        __typename: "ModelCoursesUsersConnection",
        nextToken?: string | null,
      } | null,
      ownedCourses?:  {
        __typename: "ModelCourseConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    course:  {
      __typename: "Course",
      id: string,
      name: string,
      level: Level,
      ownerId: string,
      ownerName: string,
      owner:  {
        __typename: "User",
        id: string,
        name: string,
        email: string,
        userType: UserType,
        createdAt: string,
        updatedAt: string,
      },
      inviteToken?: string | null,
      startDate: string,
      endDate: string,
      users?:  {
        __typename: "ModelCoursesUsersConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCoursesUsersMutationVariables = {
  input: DeleteCoursesUsersInput,
  condition?: ModelCoursesUsersConditionInput | null,
};

export type DeleteCoursesUsersMutation = {
  deleteCoursesUsers?:  {
    __typename: "CoursesUsers",
    id: string,
    userId: string,
    courseId: string,
    user:  {
      __typename: "User",
      id: string,
      name: string,
      email: string,
      userType: UserType,
      courses?:  {
        __typename: "ModelCoursesUsersConnection",
        nextToken?: string | null,
      } | null,
      ownedCourses?:  {
        __typename: "ModelCourseConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    course:  {
      __typename: "Course",
      id: string,
      name: string,
      level: Level,
      ownerId: string,
      ownerName: string,
      owner:  {
        __typename: "User",
        id: string,
        name: string,
        email: string,
        userType: UserType,
        createdAt: string,
        updatedAt: string,
      },
      inviteToken?: string | null,
      startDate: string,
      endDate: string,
      users?:  {
        __typename: "ModelCoursesUsersConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email: string,
    userType: UserType,
    courses?:  {
      __typename: "ModelCoursesUsersConnection",
      items:  Array< {
        __typename: "CoursesUsers",
        id: string,
        userId: string,
        courseId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    ownedCourses?:  {
      __typename: "ModelCourseConnection",
      items:  Array< {
        __typename: "Course",
        id: string,
        name: string,
        level: Level,
        ownerId: string,
        ownerName: string,
        inviteToken?: string | null,
        startDate: string,
        endDate: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name: string,
      email: string,
      userType: UserType,
      courses?:  {
        __typename: "ModelCoursesUsersConnection",
        nextToken?: string | null,
      } | null,
      ownedCourses?:  {
        __typename: "ModelCourseConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCourseQueryVariables = {
  id: string,
};

export type GetCourseQuery = {
  getCourse?:  {
    __typename: "Course",
    id: string,
    name: string,
    level: Level,
    ownerId: string,
    ownerName: string,
    owner:  {
      __typename: "User",
      id: string,
      name: string,
      email: string,
      userType: UserType,
      courses?:  {
        __typename: "ModelCoursesUsersConnection",
        nextToken?: string | null,
      } | null,
      ownedCourses?:  {
        __typename: "ModelCourseConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    inviteToken?: string | null,
    startDate: string,
    endDate: string,
    users?:  {
      __typename: "ModelCoursesUsersConnection",
      items:  Array< {
        __typename: "CoursesUsers",
        id: string,
        userId: string,
        courseId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCoursesQueryVariables = {
  filter?: ModelCourseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCoursesQuery = {
  listCourses?:  {
    __typename: "ModelCourseConnection",
    items:  Array< {
      __typename: "Course",
      id: string,
      name: string,
      level: Level,
      ownerId: string,
      ownerName: string,
      owner:  {
        __typename: "User",
        id: string,
        name: string,
        email: string,
        userType: UserType,
        createdAt: string,
        updatedAt: string,
      },
      inviteToken?: string | null,
      startDate: string,
      endDate: string,
      users?:  {
        __typename: "ModelCoursesUsersConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CoursesByOwnerIdQueryVariables = {
  ownerId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCourseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type CoursesByOwnerIdQuery = {
  coursesByOwnerId?:  {
    __typename: "ModelCourseConnection",
    items:  Array< {
      __typename: "Course",
      id: string,
      name: string,
      level: Level,
      ownerId: string,
      ownerName: string,
      owner:  {
        __typename: "User",
        id: string,
        name: string,
        email: string,
        userType: UserType,
        createdAt: string,
        updatedAt: string,
      },
      inviteToken?: string | null,
      startDate: string,
      endDate: string,
      users?:  {
        __typename: "ModelCoursesUsersConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCoursesUsersQueryVariables = {
  id: string,
};

export type GetCoursesUsersQuery = {
  getCoursesUsers?:  {
    __typename: "CoursesUsers",
    id: string,
    userId: string,
    courseId: string,
    user:  {
      __typename: "User",
      id: string,
      name: string,
      email: string,
      userType: UserType,
      courses?:  {
        __typename: "ModelCoursesUsersConnection",
        nextToken?: string | null,
      } | null,
      ownedCourses?:  {
        __typename: "ModelCourseConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    course:  {
      __typename: "Course",
      id: string,
      name: string,
      level: Level,
      ownerId: string,
      ownerName: string,
      owner:  {
        __typename: "User",
        id: string,
        name: string,
        email: string,
        userType: UserType,
        createdAt: string,
        updatedAt: string,
      },
      inviteToken?: string | null,
      startDate: string,
      endDate: string,
      users?:  {
        __typename: "ModelCoursesUsersConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCoursesUsersQueryVariables = {
  filter?: ModelCoursesUsersFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCoursesUsersQuery = {
  listCoursesUsers?:  {
    __typename: "ModelCoursesUsersConnection",
    items:  Array< {
      __typename: "CoursesUsers",
      id: string,
      userId: string,
      courseId: string,
      user:  {
        __typename: "User",
        id: string,
        name: string,
        email: string,
        userType: UserType,
        createdAt: string,
        updatedAt: string,
      },
      course:  {
        __typename: "Course",
        id: string,
        name: string,
        level: Level,
        ownerId: string,
        ownerName: string,
        inviteToken?: string | null,
        startDate: string,
        endDate: string,
        createdAt: string,
        updatedAt: string,
      },
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CoursesUsersByUserIdQueryVariables = {
  userId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCoursesUsersFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type CoursesUsersByUserIdQuery = {
  coursesUsersByUserId?:  {
    __typename: "ModelCoursesUsersConnection",
    items:  Array< {
      __typename: "CoursesUsers",
      id: string,
      userId: string,
      courseId: string,
      user:  {
        __typename: "User",
        id: string,
        name: string,
        email: string,
        userType: UserType,
        createdAt: string,
        updatedAt: string,
      },
      course:  {
        __typename: "Course",
        id: string,
        name: string,
        level: Level,
        ownerId: string,
        ownerName: string,
        inviteToken?: string | null,
        startDate: string,
        endDate: string,
        createdAt: string,
        updatedAt: string,
      },
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CoursesUsersByCourseIdQueryVariables = {
  courseId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCoursesUsersFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type CoursesUsersByCourseIdQuery = {
  coursesUsersByCourseId?:  {
    __typename: "ModelCoursesUsersConnection",
    items:  Array< {
      __typename: "CoursesUsers",
      id: string,
      userId: string,
      courseId: string,
      user:  {
        __typename: "User",
        id: string,
        name: string,
        email: string,
        userType: UserType,
        createdAt: string,
        updatedAt: string,
      },
      course:  {
        __typename: "Course",
        id: string,
        name: string,
        level: Level,
        ownerId: string,
        ownerName: string,
        inviteToken?: string | null,
        startDate: string,
        endDate: string,
        createdAt: string,
        updatedAt: string,
      },
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email: string,
    userType: UserType,
    courses?:  {
      __typename: "ModelCoursesUsersConnection",
      items:  Array< {
        __typename: "CoursesUsers",
        id: string,
        userId: string,
        courseId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    ownedCourses?:  {
      __typename: "ModelCourseConnection",
      items:  Array< {
        __typename: "Course",
        id: string,
        name: string,
        level: Level,
        ownerId: string,
        ownerName: string,
        inviteToken?: string | null,
        startDate: string,
        endDate: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email: string,
    userType: UserType,
    courses?:  {
      __typename: "ModelCoursesUsersConnection",
      items:  Array< {
        __typename: "CoursesUsers",
        id: string,
        userId: string,
        courseId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    ownedCourses?:  {
      __typename: "ModelCourseConnection",
      items:  Array< {
        __typename: "Course",
        id: string,
        name: string,
        level: Level,
        ownerId: string,
        ownerName: string,
        inviteToken?: string | null,
        startDate: string,
        endDate: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email: string,
    userType: UserType,
    courses?:  {
      __typename: "ModelCoursesUsersConnection",
      items:  Array< {
        __typename: "CoursesUsers",
        id: string,
        userId: string,
        courseId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    ownedCourses?:  {
      __typename: "ModelCourseConnection",
      items:  Array< {
        __typename: "Course",
        id: string,
        name: string,
        level: Level,
        ownerId: string,
        ownerName: string,
        inviteToken?: string | null,
        startDate: string,
        endDate: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCourseSubscriptionVariables = {
  filter?: ModelSubscriptionCourseFilterInput | null,
};

export type OnCreateCourseSubscription = {
  onCreateCourse?:  {
    __typename: "Course",
    id: string,
    name: string,
    level: Level,
    ownerId: string,
    ownerName: string,
    owner:  {
      __typename: "User",
      id: string,
      name: string,
      email: string,
      userType: UserType,
      courses?:  {
        __typename: "ModelCoursesUsersConnection",
        nextToken?: string | null,
      } | null,
      ownedCourses?:  {
        __typename: "ModelCourseConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    inviteToken?: string | null,
    startDate: string,
    endDate: string,
    users?:  {
      __typename: "ModelCoursesUsersConnection",
      items:  Array< {
        __typename: "CoursesUsers",
        id: string,
        userId: string,
        courseId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCourseSubscriptionVariables = {
  filter?: ModelSubscriptionCourseFilterInput | null,
};

export type OnUpdateCourseSubscription = {
  onUpdateCourse?:  {
    __typename: "Course",
    id: string,
    name: string,
    level: Level,
    ownerId: string,
    ownerName: string,
    owner:  {
      __typename: "User",
      id: string,
      name: string,
      email: string,
      userType: UserType,
      courses?:  {
        __typename: "ModelCoursesUsersConnection",
        nextToken?: string | null,
      } | null,
      ownedCourses?:  {
        __typename: "ModelCourseConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    inviteToken?: string | null,
    startDate: string,
    endDate: string,
    users?:  {
      __typename: "ModelCoursesUsersConnection",
      items:  Array< {
        __typename: "CoursesUsers",
        id: string,
        userId: string,
        courseId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCourseSubscriptionVariables = {
  filter?: ModelSubscriptionCourseFilterInput | null,
};

export type OnDeleteCourseSubscription = {
  onDeleteCourse?:  {
    __typename: "Course",
    id: string,
    name: string,
    level: Level,
    ownerId: string,
    ownerName: string,
    owner:  {
      __typename: "User",
      id: string,
      name: string,
      email: string,
      userType: UserType,
      courses?:  {
        __typename: "ModelCoursesUsersConnection",
        nextToken?: string | null,
      } | null,
      ownedCourses?:  {
        __typename: "ModelCourseConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    inviteToken?: string | null,
    startDate: string,
    endDate: string,
    users?:  {
      __typename: "ModelCoursesUsersConnection",
      items:  Array< {
        __typename: "CoursesUsers",
        id: string,
        userId: string,
        courseId: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCoursesUsersSubscriptionVariables = {
  filter?: ModelSubscriptionCoursesUsersFilterInput | null,
};

export type OnCreateCoursesUsersSubscription = {
  onCreateCoursesUsers?:  {
    __typename: "CoursesUsers",
    id: string,
    userId: string,
    courseId: string,
    user:  {
      __typename: "User",
      id: string,
      name: string,
      email: string,
      userType: UserType,
      courses?:  {
        __typename: "ModelCoursesUsersConnection",
        nextToken?: string | null,
      } | null,
      ownedCourses?:  {
        __typename: "ModelCourseConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    course:  {
      __typename: "Course",
      id: string,
      name: string,
      level: Level,
      ownerId: string,
      ownerName: string,
      owner:  {
        __typename: "User",
        id: string,
        name: string,
        email: string,
        userType: UserType,
        createdAt: string,
        updatedAt: string,
      },
      inviteToken?: string | null,
      startDate: string,
      endDate: string,
      users?:  {
        __typename: "ModelCoursesUsersConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCoursesUsersSubscriptionVariables = {
  filter?: ModelSubscriptionCoursesUsersFilterInput | null,
};

export type OnUpdateCoursesUsersSubscription = {
  onUpdateCoursesUsers?:  {
    __typename: "CoursesUsers",
    id: string,
    userId: string,
    courseId: string,
    user:  {
      __typename: "User",
      id: string,
      name: string,
      email: string,
      userType: UserType,
      courses?:  {
        __typename: "ModelCoursesUsersConnection",
        nextToken?: string | null,
      } | null,
      ownedCourses?:  {
        __typename: "ModelCourseConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    course:  {
      __typename: "Course",
      id: string,
      name: string,
      level: Level,
      ownerId: string,
      ownerName: string,
      owner:  {
        __typename: "User",
        id: string,
        name: string,
        email: string,
        userType: UserType,
        createdAt: string,
        updatedAt: string,
      },
      inviteToken?: string | null,
      startDate: string,
      endDate: string,
      users?:  {
        __typename: "ModelCoursesUsersConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCoursesUsersSubscriptionVariables = {
  filter?: ModelSubscriptionCoursesUsersFilterInput | null,
};

export type OnDeleteCoursesUsersSubscription = {
  onDeleteCoursesUsers?:  {
    __typename: "CoursesUsers",
    id: string,
    userId: string,
    courseId: string,
    user:  {
      __typename: "User",
      id: string,
      name: string,
      email: string,
      userType: UserType,
      courses?:  {
        __typename: "ModelCoursesUsersConnection",
        nextToken?: string | null,
      } | null,
      ownedCourses?:  {
        __typename: "ModelCourseConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    course:  {
      __typename: "Course",
      id: string,
      name: string,
      level: Level,
      ownerId: string,
      ownerName: string,
      owner:  {
        __typename: "User",
        id: string,
        name: string,
        email: string,
        userType: UserType,
        createdAt: string,
        updatedAt: string,
      },
      inviteToken?: string | null,
      startDate: string,
      endDate: string,
      users?:  {
        __typename: "ModelCoursesUsersConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};
