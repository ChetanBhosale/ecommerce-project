import { NextFunction } from "express";
import { CatchAsyncError } from "../middleware/CatchAsyncError";

export const OrderProduct = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {}
);
