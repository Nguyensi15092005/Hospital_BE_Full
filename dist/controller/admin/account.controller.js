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
exports.login = void 0;
const md5_1 = __importDefault(require("md5"));
const account_model_1 = __importDefault(require("../../models/account.model"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const existEmail = yield account_model_1.default.findOne({
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
        if ((0, md5_1.default)(password) !== existEmail.password) {
            res.json({
                code: 400,
                message: "Sai mật khâu!",
            });
            return;
        }
        const tokenAdmin = existEmail.tokenAdmin;
        res.cookie("tokenAdmin", tokenAdmin, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.cookie("accountName", existEmail.name);
        res.json({
            code: 200,
            message: "Đăng nhập thành công",
            role_id: existEmail["role_id"],
        });
    }
    catch (error) {
        console.log("Loi...........", error);
    }
});
exports.login = login;
