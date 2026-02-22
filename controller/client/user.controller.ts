import md5 from "md5";
import { Request, Response } from "express";
import User from "../../models/user.model";
import ForgotPassword from "../../models/forgot-password.model";
import { randomNumber, randomString } from "../../helper/generate";
import { sendMail } from "../../helper/sendMail";
import { jwtDecode } from "jwt-decode";

export const login = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    console.log(md5(password));

    const user = await User.findOne({
      email: email,
    });
    console.log(user.password);
    if (!user) {
      console.log("Email đã tồn tại");
      res.json({
        code: 401,
        message: "Email không đúng",
      });
      return;
    }
    if (user.password !== md5(password)) {
      console.log("sai mk");
      res.json({
        code: 500,
        message: "Sai mật khẩu",
      });
      return;
    }
    const userRes = await User.findOne({
      email: email
    }).select("-password -googleId");
    res.json({
      code: 200,
      user: userRes,
      message: "Đăng nhập thành công",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Đăng nhập thất bại",
    });
  }
};

export const loginGoogle = async (req: Request, res: Response) => {
  try {
    const tokenGoogle = req.body.options;
    const tokenDecode = jwtDecode(tokenGoogle) as any;
    const {email, sub, name} = tokenDecode;
    let user = await User.findOne({
      googleId: sub
    });
    if(!user){
      user = await User.findOne({
        email: email
      });
      if(user){
        user.googleId = sub;
        await user.save();
      }
      else{
        user = await User.create({
          fullName: name,
          email: email,
          googleId: sub,
          token: randomString(30),
        })
      }
    }

    const userRes = await User.findOne({
      googleId: sub
    }).select("-password -googleId");
    res.json({
      code: 200,
      user: userRes,
      message: "Đăng nhập thành công"
    });
  } catch (error) {
    console.log("Lỗi đăng nhập gg", error);
    res.json({
      code: 400,
      message: "Đăng nhập thất bại",
    });
  }
}

export const register = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({
      email: email,
    });

    if (user) {
      console.log("Email da ton tai");
      res.json({
        code: 500,
        message: "Email đã tồn tại",
      });
      return;
    }
    const data = new User({
      fullName: req.body.fullName,
      email: email,
      password: md5(password),
      token: randomString(30),
    });

    console.log(data);
    await data.save();
    res.json({
      code: 200,
    });
  } catch (error) {}
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const email: string = req.body.email;
    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      res.json({
        code: 404,
        message: "Tài khoản không tồn tại",
      });
      return;
    }
    const otp = randomNumber(6);
    //Lưu thông tin vào db
    const dataForgot = new ForgotPassword({
      email: email,
      otp: otp,
      expireAt: Date.now(),
    });
    await dataForgot.save();
    // gửi otp về email
    const subject ="Mã OTP xác minh đổi mật khẩu bạn không nên chia sẻ cho người khác về vấn đề bảo mật";
    const html = `Mã OTP là <b>${otp}</b> thời hạn là 3 phút`;
    await sendMail(email, subject, html); 
       

    res.json({
      code: 200,
      message: "Gửi OTP thành công",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Thất bại",
    });
  }
};

export const otpPassword = async (req: Request, res: Response) => {
  try {
    const email: string = req.body.email;
    const otp: string = req.body.otp;
    const user = await ForgotPassword.findOne({
      email: email,
    });
    if (!user) {
      res.json({
        code: 404,
        message: "Mã OTP không tồn tại",
      });
      return;
    }
    if (user.otp != otp) {
      res.json({
        code: 403,
        message: "Sai mã OTP",
      });
      return;
    }
    console.log("Thanh cong");
    const userToken = await User.findOne({
      email: email,
    });
    res.json({
      code: 200,
      message: "Nhập mã OTP thành công",
      token: userToken.token,
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Thất bại",
    });
  }
};

export const passwordReset = async (req: Request, res: Response) => {
  try {
    const password = req.body.password;
    const token = req.body.token;

    console.log(password);
    console.log(token);
    await User.updateOne(
      {
        token: token,
      },
      {
        password: md5(password),
      }
    );
    res.json({
      code: 200,
      message: "Đổi mật khẩu thành công",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Thất bại",
    });
  }
};
