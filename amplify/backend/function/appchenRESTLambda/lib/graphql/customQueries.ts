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