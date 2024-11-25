import { Request, Response } from 'express';
import * as l10n from 'jm-ez-l10n';
import * as _ from 'lodash';
import { Constants } from './config/constants';
import { Jwt } from './helpers/jwt';
import { RoleAccess } from './config/roleAccess';
import { UserUtils } from './modules/user/userUtils';

export class Middleware {
  private userUtils = new UserUtils();
  public getAdminAuthorized = async (
    req: any,
    res: Response,
    next: () => void
  ) => {
    if (req.headers.authorization && !_.isEmpty(req.headers.authorization)) {
      try {
        const currentMethod = req.method;
        const currentPath = req.originalUrl.split('?')[0]; 

        const tokenInfo = Jwt.decodeAuthToken(
          req.headers.authorization.toString()
        );
        if (tokenInfo) {
          const user = await this.userUtils.getUser({ _id: tokenInfo.id });
          if (user && !user.isDeleted) {
            const allowedRoutes = RoleAccess[user.role] || [];
            const isAuthorized = allowedRoutes.some((route) => {
              const formattedPath = `^/${route.path.replace(/:\w+/g, '\\w+')}$`; // Add leading slash and replace `:id`
              const pathRegex = new RegExp(formattedPath);
              return route.method === currentMethod && pathRegex.test(currentPath);
            });
            if (isAuthorized) {
              req._user = user;
              next();
            } else {
              return res
                .status(Constants.UNAUTHORIZED_CODE)
                .json({ error: 'You are unauthorized' });
            }
          } else {
            return res
              .status(Constants.UNAUTHORIZED_CODE)
              .json({ error: 'You are unauthorized' });
          }
        } else {
          return res
            .status(Constants.UNAUTHORIZED_CODE)
            .json({ error: 'You are unauthorized' });
        }
      } catch (error) {
        res.status(Constants.INTERNAL_SERVER_ERROR_CODE).json({
          error: l10n.t('ERR_INTERNAL_SERVER'),
          code: Constants.INTERNAL_SERVER_ERROR_CODE,
        });
        return;
      }
    } else {
      return res
        .status(Constants.UNAUTHORIZED_CODE)
        .json({ error: 'You are unauthorized' });
    }
  };
}
