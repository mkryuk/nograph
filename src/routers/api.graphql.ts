import * as express from 'express';
import { graphqlController, GraphqlController } from './../controllers/graphql/graphql.controller';

/* Graphql API /api/graphql */
export class GraphqlRouter {

  constructor(private router: express.Router, private controller: GraphqlController) {
    // /api/graphql
    this.router.use('/',  this.controller.root.bind(controller));
  }

  get graphqlRouter() {
    return this.router;
  }
}

export const graphqlRouter = new GraphqlRouter(express.Router(), graphqlController).graphqlRouter;
