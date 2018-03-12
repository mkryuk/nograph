import * as graphqlHTTP from 'express-graphql';
import { RootGraphQLSchema } from '../../graphql/schema/graphql.schema';

export class GraphqlController {

  constructor(private graphql: GQL) {
  }
  //  GET /api/graphql
  get root() {
    return this.graphql({
      schema: RootGraphQLSchema,
      graphiql: true,
    });
  }
}
type GQL = (options: graphqlHTTP.Options) => graphqlHTTP.Middleware;
export const graphqlController = new GraphqlController(graphqlHTTP);
