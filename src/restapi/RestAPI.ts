import { CourseAPI } from './CourseAPI'

class RestAPIClass {
  course: CourseAPI  

  constructor() {
    this.course = new CourseAPI()
  }
}

export const RestAPI = new RestAPIClass()