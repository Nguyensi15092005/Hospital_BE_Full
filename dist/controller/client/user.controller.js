"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordReset = exports.otpPassword = exports.forgotPassword = exports.register = exports.login = void 0;
const md5_1 = __importDefault(require("md5"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const forgot_password_model_1 = __importDefault(require("../../models/forgot-password.model"));
const generate_1 = require("../../helper/generate");
const sendMail_1 = require("../../helper/sendMail");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const email = req.body.email;
        const phone = req.body.phone;
        const password = req.body.password;
        console.log((0, md5_1.default)(password));
        const user = yield user_model_1.default.findOne({
            email: email
        });
        console.log(user.password);
        if (!user) {
            console.log("Email đã tồn tại");
            res.json({
                code: 401,
                message: "Email không đúng"
            });
            return;
        }
        if (user.phone !== phone) {
            res.json({
                code: 401,
                message: "Số điện thoại không đúng"
            });
        }
        if (user.password !== (0, md5_1.default)(password)) {
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
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Đăng nhập thất bại"
        });
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        console.log("123");
        const email = req.body.email;
        const phone = req.body.phone;
        const password = req.body.password;
        const user = yield user_model_1.default.findOne({
            email: email
        });
        if (user) {
            console.log("Email da ton tai");
            res.json({
                code: 500,
                message: "Email đã tồn tại"
            });
            return;
        }
        if (user && user.phone === phone) {
            console.log("Số điện thoại nãy đã được đăng ký");
            res.json({
                code: 500,
                message: "Số điện thoại nãy đã được đăng ký"
            });
            return;
        }
        const data = new user_model_1.default({
            fullName: req.body.fullName,
            email: email,
            password: (0, md5_1.default)(password),
            phone: phone,
            token: (0, generate_1.randomString)(30),
        });
        console.log(data);
        yield data.save();
        res.json({
            code: 200
        });
    }
    catch (error) {
    }
});
exports.register = register;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const user = yield user_model_1.default.findOne({
            email: email
        });
        if (!user) {
            res.json({
                code: 404,
                message: "Tài khoản không tồn tại"
            });
            return;
        }
        ;
        const otp = (0, generate_1.randomNumber)(6);
        const dataForgot = new forgot_password_model_1.default({
            email: email,
            otp: otp,
            expireAt: Date.now()
        });
        yield dataForgot.save();
        const subject = "Mã OTP xác minh đổi mật khẩu bạn không nên chia sẻ cho người khác về vấn đề bảo mật";
        const html = `Mã OTP là <b>${otp}</b> thời hạn là 3 phút`;
        (0, sendMail_1.sendMail)(email, subject, html);
        res.json({
            code: 200,
            message: "gưởi OTP thành công"
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Thất bại"
        });
    }
});
exports.forgotPassword = forgotPassword;
const otpPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const otp = req.body.otp;
        const user = yield forgot_password_model_1.default.findOne({
            email: email
        });
        if (!user) {
            res.json({
                code: 404,
                message: "Mã OTP không tồn tại"
            });
            return;
        }
        if (user.otp != otp) {
            res.json({
                code: 403,
                message: "Sai mã OTP"
            });
            return;
        }
        console.log("Thanh cong");
        const userToken = yield user_model_1.default.findOne({
            email: email
        });
        res.json({
            code: 200,
            message: "Nhập mã OTP thành công",
            token: userToken.token
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Thất bại"
        });
    }
});
exports.otpPassword = otpPassword;
const passwordReset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const password = req.body.password;
        const token = req.body.token;
        console.log(password);
        console.log(token);
        yield user_model_1.default.updateOne({
            token: token
        }, {
            password: (0, md5_1.default)(password)
        });
        res.json({
            code: 200,
            message: "Đổi mật khẩu thành công"
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Thất bại"
        });
    }
});
exports.passwordReset = passwordReset;
