import { NextFunction, Request, Response } from "express";
import Account from "../models/account.model";

const requireAuth = async (req: Request, res: Response, next: NextFunction): Promise<void>=> {
    console.log(req.headers.authorization)

  try {
    if (req.headers.authorization) {
      const token: string = req.headers.authorization.split(" ")[1]

      const account = await Account.findOne({
        tokenAdmin: token,
        deleted: false
      });
      if(!account){
        res.json({
          code:404,
          message: "Không có tài khoản này"
        });
        return;
      }
      else{
        next();
      }
    }
    else{
      res.json({
        code:404,
        message: "Bạn chưa đăng nhập"
      })
      return;
    }
  } catch (error) {
    res.json({
      code:500,
      message: "Lỗi server khi middleware Autho"
    })
    return;
  }
};
export default requireAuth;
