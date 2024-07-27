import ForbiddenError from "../../domain/errors/forbidden-error";
import { NextFunction, Request, Response } from "express";

const AuthorizationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //@ts-ignore
  if (req.auth.claims.metadata.role !== "admin") {
    throw new ForbiddenError("Admin only route");
  }
  next();
};

export default AuthorizationMiddleware;
