import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const tokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401);
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const data = jwt.verify(token, process.env.JWT_TOKEN!);
    console.log(data);
  } catch {
    return res.status(401);
  }
};

export default tokenMiddleware;
