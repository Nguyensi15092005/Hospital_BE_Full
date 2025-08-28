import md5 from "md5";
import { Request, Response } from "express";
import Account from "../../models/account.model";

export const login = async (req: Request, res: Response) => {
  try {
    const name: string = req.body.name;
    const email: string = req.body.email;
    const password: string = req.body.password;

    const existEmail = await Account.findOne({
      deleted: false,
      email: email,
    });
    if (!existEmail) {
      res.json({
        code: 400,
        message: "Email này không tồn tại!",
      });
      return;
    }
    if (existEmail.name !== name) {
      res.json({
        code: 400,
        message: "Sai tên đăng nhập!",
      });
      return;
    }
    if (md5(password) !== existEmail.password) {
      res.json({
        code: 400,
        message: "Sai mật khâu!",
      });
      return;
    }
    const tokenAdmin = existEmail.tokenAdmin;
    res.cookie("tokenAdmin", tokenAdmin, {
      httpOnly: true, // FE không đọc được (bảo mật)
      secure: true, // bắt buộc HTTPS
      sameSite: "none", // cho phép cross-domain
      maxAge: 24 * 60 * 60 * 1000, // 1 ngày
    });
    res.cookie("accountName", existEmail.name);
    res.json({
      code: 200,
      message: "Đăng nhập thành công",
      role_id: existEmail["role_id"],
    });
  } catch (error) {
    console.log("Loi...........", error);
  }
};
