export const userCourseQuery = /* GraphQL */ `
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
          course {
            id
            name
            level
            startDate
            endDate
            ownerId
            ownerName
          }
        }
        nextToken
      }
    }
  }
`;
export const getCourseOwnerIdQuery = /* GraphQL */ `
  query GetCourse($id: ID!) {
    getCourse(id: $id) {
      id
      ownerId      
    }
  }
`;
export const getCourseWithUsersQuery = /* GraphQL */ `
  query GetCourse($id: ID!) {
    getCourse(id: $id) {
      id
      name
      level
      ownerId
      ownerName     
      startDate
      endDate
      users {
        items {
          id
          userId
          courseId
          createdAt
          updatedAt
          user {
            id
            name
            email
            userType
          }       
        }
        nextToken
      }
    }
  }
`;