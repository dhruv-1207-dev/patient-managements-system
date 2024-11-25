import * as express from 'express';
import { Constants } from './config/constants';
import { AdminRoute } from './modules/admin/adminRoute';

export class Routes {
  protected basePath: string;

  constructor(NODE_ENV: string) {
    switch (NODE_ENV) {
      case 'production':
        this.basePath = '/app/dist';
        break;
      case 'development':
        this.basePath = '/app/public';
        break;
    }
  }

  public defaultRoute(req: express.Request, res: express.Response) {
    res.json({
      message: 'Hello !',
    });
  }

  public path() {
    const router = express.Router();
    router.use("/admin", AdminRoute);
    router.all('/*', (req, res) => {
      return res.status(Constants.NOT_FOUND_CODE).json({
        error: "URL NOT FOUND",
      });
    });
    return router;
  }
}
