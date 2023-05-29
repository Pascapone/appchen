export const userCourseQuery = /* GraphQL */ `
  query GetUserWithCourses($id: ID!) {
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
  query GetCourseOwnerId($id: ID!) {
    getCourse(id: $id) {
      id
      ownerId      
    }
  }
`;
export const getCourseWithUsersQuery = /* GraphQL */ `
  query GetCourseWithUsers($id: ID!) {
    getCourse(id: $id) {
      id
      name
      level
      ownerId
      ownerName  
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