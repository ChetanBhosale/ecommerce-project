import e, { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "./CatchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AccessTokenSecret } from "../example.env";
import { redis } from "../utils/redis";

export const isAuthenticated = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.cookies);
      const access_token = req.cookies.access_token;
      if (!access_token) {
        return next(
          new ErrorHandler("please login to access this resources", 400)
        );
      }
      const decode = (await jwt.verify(
        access_token,
        AccessTokenSecret
      )) as JwtPayload;
      if (!decode) {
        return new ErrorHandler("access token is not valid", 400);
      }

      const user = await redis.get(decode.id);

      if (!user) {
        return next(
          new ErrorHandler("Please login to access this resource ", 400)
        );
      }
      req.user = JSON.parse(user);
      next();
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//authorization part of the applicant!

export const isSeller = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.user?.role === "SELLER") {
        next();
      } else {
        return next(
          new ErrorHandler(
            `${req.user.role} is not allowed to get access to resources!`,
            400
          )
        );
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const isUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.user?.role === "USER") {
        next();
      } else {
        return next(
          new ErrorHandler(
            `${req.user.role} is not allowed to get access to resources!`,
            400
          )
        );
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
