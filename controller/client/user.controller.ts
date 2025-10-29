import md5  from 'md5';
import { Request, Response } from "express";
import User from "../../models/user.model";
import ForgotPassword from "../../models/forgot-password.model";
import { randomNumber, randomString } from '../../helper/generate';
import { sendMail } from '../../helper/sendMail';

export const login = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const email = req.body.email;
        const phone = req.body.phone;
        const password = req.body.password;
        console.log(md5(password));

        const user = await User.findOne({
            email: email
        });
        console.log(user.password);
        if(!user){
            console.log("Email đã tồn tại")
            res.json({
                code: 401,
                message: "Email không đúng"
            });
            return;
        }
        if(user.phone !== phone ){
             res.json({
                code: 401,
                message: "Số điện thoại không đúng"
            });
        }
        if(user.password !== md5(password)){
            console.log("sai mk");
            res.json({
                code: 500,
                message: "Sai mật khẩu"
            });
            return;
        }
        res.json({
            code: 200,
            user: user,
            message: "Đăng nhập thành công"
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Đăng nhập thất bại"
        })
    }
}

export const register = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        console.log("123")
        const email = req.body.email;
        const phone = req.body.phone;
        const password = req.body.password;
        const user = await User.findOne({
            email: email
        });
        
        if(user){
            console.log("Email da ton tai")
            res.json({
                code: 500,
                message: "Email đã tồn tại"
            });
            return;
        }
        if(user && user.phone === phone ){
            console.log("Số điện thoại nãy đã được đăng ký")
            res.json({
                code: 500,
                message: "Số điện thoại nãy đã được đăng ký"
            });
            return;
        }
        const data = new User({
            fullName: req.body.fullName,
            email: email,
            password: md5(password),
            phone: phone,
            token: randomString(30),
        })

        console.log(data);
        await data.save();
        res.json({
            code: 200
        })
    } catch (error) {
        
    }
}

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const email: string = req.body.email;
        const user = await User.findOne({
            email: email
        });
        if(!user){
            res.json({
                code: 404,
                message: "Tài khoản không tồn tại"
            });
            return;
        };
        //Lưu thông tin vào db
        const otp = randomNumber(6);
        const dataForgot = new ForgotPassword({
            email: email,
            otp: otp,
            expireAt: Date.now()
        })
        await dataForgot.save();
        // gửi otp về email
        const subject = "Mã OTP xác minh đổi mật khẩu bạn không nên chia sẻ cho người khác về vấn đề bảo mật";
        const html = `Mã OTP là <b>${otp}</b> thời hạn là 3 phút`;
        sendMail(email, subject, html);
        res.json({
            code: 200,
            message: "gưởi OTP thành công"
        });
    } catch (error) {
        res.json({
            code: 400,
            message: "Thất bại"
        })
    }
}

export const otpPassword = async (req: Request, res: Response) => {
    try {
        const email: string = req.body.email;
        const otp: string = req.body.otp;
        const user = await ForgotPassword.findOne({
            email: email
        });
        if(!user){
            res.json({
                code: 404,
                message: "Mã OTP không tồn tại"
            });
            return;
        }
        if(user.otp != otp){
            res.json({
                code: 403,
                message: "Sai mã OTP"
            });
            return;
        }
        console.log("Thanh cong");
        const userToken = await User.findOne({
            email: email
        });
        res.json({
            code: 200,
            message: "Nhập mã OTP thành công",
            token: userToken.token 
        });
    } catch (error) {
        res.json({
            code: 400,
            message: "Thất bại"
        })
    }
}

export const passwordReset = async (req: Request, res: Response) => {
    try {
        const password = req.body.password;
        const token = req.body.token;

        console.log(password);
        console.log(token);
        await User.updateOne({
            token: token
        },{
            password: md5(password)
        })
        res.json({
            code: 200,
            message: "Đổi mật khẩu thành công"
        });
    } catch (error) {
        res.json({
            code: 400,
            message: "Thất bại"
        })
    }
}