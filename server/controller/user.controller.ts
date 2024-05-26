import jwt, { JsonWebTokenError, Jwt, JwtPayload, Secret } from "jsonwebtoken";
import { CatchAsyncError } from "../middleware/CatchAsyncError";
import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { IUser, userModel } from "../model/user";
import { generateSixDigitCode } from "../utils/randomCode";
import sendMail from "../utils/sendMail";
import { AccessTokenSecret, RefreshTokenSecret } from "../example.env";
import { cartModel, ICart } from "../model/product";
import {
  accessTokenOption,
  refreshTokenOption,
  sendToken,
} from "../service/sentToken";
import { redis } from "../utils/redis";

interface IRegisterUser {
  email: string;
  password: string;
  role: string;
}

export const registerUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("Register User: Start");
    const { email, password, role }: IRegisterUser = req.body as IRegisterUser;
    if (!email || !password) {
      console.log("Missing email or password");
      return next(new ErrorHandler("Please enter email and password", 400));
    }

    const user = await userModel.findOne({ email });

    if (user) {
      console.log("User already exists");
      return next(new ErrorHandler("User already exists!", 400));
    }
    const code = generateSixDigitCode();

    console.log(code);

    const activationToken = jwt.sign(
      { code, email, password, role },
      AccessTokenSecret!,
      { expiresIn: "5m" }
    );
    console.log("Activation token generated:", activationToken);
    console.log(code);

    let data = {
      code,
    };

    await sendMail({
      email,
      subject: "Activate Your Account!",
      template: "verification.ejs",
      data,
    });

    res
      .cookie("activationToken", activationToken, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 5 * 60 * 1000),
      })
      .status(201)
      .json({
        message: "Activation code has been sent to your email!",
        token: activationToken,
      });
  }
);

interface IActivationData {
  email: string;
  password: string;
  role: string;
  code: string;
}

export const activeUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code } = req.body;
      console.log(req.body);
      const { activationToken } = req.cookies;
      console.log(req.cookies);

      if (!code || !activationToken) {
        return next(
          new ErrorHandler("Invalid, Please try to send new code!", 400)
        );
      }

      const newUser = jwt.verify(
        activationToken,
        AccessTokenSecret!
      ) as IActivationData;

      console.log(newUser);

      if (newUser.code !== code) {
        return next(new ErrorHandler("Invalid Activation Code", 400));
      }

      const {
        email,
        password,
        role,
      }: { email: string; password: string; role: string } = newUser;

      const existUser = await userModel.findOne({ email });

      if (existUser) {
        return next(new ErrorHandler("User already exists", 400));
      }
      const user: IUser = await userModel.create({
        email,
        password,
        role,
      });

      const cart: ICart = await cartModel.create({
        user: user._id,
      });

      console.log(cart);

      user.cart = cart._id;
      await user.save();

      res.status(201).json({
        success: true,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

interface ILogin {
  email: string;
  password: string;
}

export const loginUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as ILogin;

      if (!email || !password) {
        return next(
          new ErrorHandler("please provide correct email and password!", 400)
        );
      }

      const user = await userModel
        .findOne({
          email: new RegExp(`^${email}$`, "i"),
        })
        .populate("cart");

      if (!user) {
        return next(new ErrorHandler("user does't exists!", 400));
      }

      let isPasswordCorrect = await user.comparedPassword(password);

      console.log(isPasswordCorrect);

      if (!isPasswordCorrect) {
        return next(new ErrorHandler("password is incorrect!", 400));
      }

      sendToken(user, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const updateAccessToken = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("work");
    try {
      const refreshTokenData = req.cookies.refresh_token;

      const decode = jwt.verify(
        refreshTokenData,
        RefreshTokenSecret
      ) as JwtPayload;

      if (!decode) {
        return next(new ErrorHandler("could not refresh", 400));
      }

      console.log("decode value");
      console.log(decode);

      const session = await redis.get(decode.id as string);

      if (!session) {
        return next(
          new ErrorHandler("please login for access this resource!", 400)
        );
      }

      const user = JSON.parse(session);

      const accessToken = jwt.sign(
        { id: user._id },
        AccessTokenSecret as Secret,
        { expiresIn: "5m" }
      );
      const refreshToken = jwt.sign(
        { id: user._id },
        RefreshTokenSecret as Secret,
        { expiresIn: "3d" }
      );
      req.user = user;
      console.log(req.user);
      redis.del(user._id);
      redis.set(user._id, JSON.stringify(user) as string);

      res.cookie("access_token", accessToken, accessTokenOption);
      res.cookie("refresh_token", refreshToken, refreshTokenOption);

      res.status(201).json({
        success: true,
        user,
        accessToken,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const logoutUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      redis.del(req.user?._id);
      res.cookie("access_token", "", { maxAge: 1 });
      res.cookie("refresh_token", "", { maxAge: 1 });

      res.status(201).json({
        success: true,
        message: "logged out successfully!",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const userDetails = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({
        data: req.user,
        accessToken: req.cookies.access_token,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

interface IPassword {
  oldPassword: string;
  newPassword: string;
}
export const updatePassword = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { oldPassword, newPassword } = req.body as IPassword;

      let user = await userModel.findById(req.user?._id);

      console.log(user);

      if (user?.password === undefined) {
        return next(new ErrorHandler("Invalid User!", 400));
      }

      let isCorrectPassword = await user.comparedPassword(oldPassword);

      if (!isCorrectPassword) {
        return next(new ErrorHandler("old password is incorrect!", 400));
      }

      user.password = newPassword;

      user.save();

      redis.set(user._id, JSON.stringify(user));

      res.status(201).json({
        success: true,
        message: "password updated successfully!",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
