import { restApiAction } from './utils'
import { graphQlQuery } from './utils';
import { getUser as getUserQuery } from '@/graphql/queries';
import { Level } from '@/GraphQL';

export class UserAPI {
  async getUser(userId: string) {
    const model = await graphQlQuery(getUserQuery, { id: userId })
    return model.data.getUser
  }
}
