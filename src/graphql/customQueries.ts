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
      textAssignments {
        items {
          id
          courseId
          textAssignmentId
          textAssignment {
            id
            name
            ownerId
            owner {
              id
              name
              email
              userType
            }
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
        nextToken
      }
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

export const getUserAssignments = /* GraphQL */ `
query GetUserAssignments($id: ID!) {
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
          textAssignmentCourse {
            id
            courseId
            dueDate
            timeLimit
            course {
              id
              name
              level
              ownerId
              ownerName
            }
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
          }
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