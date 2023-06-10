import { CourseAPI } from './CourseAPI'
import { AssignmentAPI } from './AssignmentAPI'
import { UserAPI } from './UserAPI'

class RestAPIClass {
  course: CourseAPI  
  assignment: AssignmentAPI
  user: UserAPI

  constructor() {
    this.course = new CourseAPI()
    this.assignment = new AssignmentAPI()
    this.user = new UserAPI()
  }
}

export const RestAPI = new RestAPIClass()