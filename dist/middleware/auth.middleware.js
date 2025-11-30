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
const account_model_1 = __importDefault(require("../models/account.model"));
const requireAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.headers.authorization);
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            const account = yield account_model_1.default.findOne({
                tokenAdmin: token,
                deleted: false
            });
            if (!account) {
                res.json({
                    code: 404,
                    message: "Không có tài khoản này"
                });
                return;
            }
            else {
                next();
            }
        }
        else {
            res.json({
                code: 404,
                message: "Bạn chưa đăng nhập"
            });
            return;
        }
    }
    catch (error) {
        res.json({
            code: 500,
            message: "Lỗi server khi middleware Autho"
        });
        return;
    }
});
exports.default = requireAuth;
