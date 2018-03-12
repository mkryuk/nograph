import * as cors from 'cors';
import * as express from 'express';

import { graphqlRouter } from './api.graphql';
import { homeRouter } from './api.home';

export interface IRoute {
  url: string;
  router: express.Router;
}

export class ApiRouter {

  private routes: IRoute[];
  get apiRouter() {
    return this.router;
  }
  constructor(private router: express.Router) {
    const routes = [
      // API for home
      // Router for /api/home
      { url: '/home', router: homeRouter },
      // API for graphql
      // Router for /api/graphql
      { url: '/graphql', router: graphqlRouter },
    ];
    this.setupRouter();
    this.setupApiRoutes(routes);
  }

  public setupRouter() {
    // enable CORS
    this.router.use(cors());
  }

  public addApiRoute(url: string, router: express.Router) {
    this.router.use(url, router);
  }

  public setupApiRoutes(routes: IRoute[]) {
    routes.forEach((route) => {
      this.addApiRoute(route.url, route.router);
    });
  }

}

export const apiRouter = new ApiRouter(express.Router()).apiRouter;
