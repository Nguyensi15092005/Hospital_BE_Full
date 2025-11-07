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
exports.reply = exports.changeStatus = exports.del = exports.detail = exports.index = void 0;
const Search_helper_1 = __importDefault(require("../../helper/Search.helper"));
const contact_model_1 = __importDefault(require("../../models/contact.model"));
const setting_model_1 = __importDefault(require("../../models/setting.model"));
const sendMail_1 = require("../../helper/sendMail");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let find = {
            deleted: false
        };
        const objectSearch = (0, Search_helper_1.default)(req.query);
        if (objectSearch.regex) {
            find["fullName"] = objectSearch.regex;
        }
        ;
        const contact = yield contact_model_1.default.find(find);
        res.json({
            code: 200,
            contact
        });
    }
    catch (error) {
        console.log("Lỗi ........", error);
    }
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const contact = yield contact_model_1.default.findOne({
            _id: id
        });
        res.json({
            code: 200,
            contact
        });
    }
    catch (error) {
        console.log("Lỗi ........", error);
    }
});
exports.detail = detail;
const del = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield contact_model_1.default.deleteOne({ _id: id });
        res.json({
            code: 200
        });
    }
    catch (error) {
        console.log("Lỗi ........", error);
    }
});
exports.del = del;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const status = req.params.status;
        if (status === "true") {
            yield contact_model_1.default.updateOne({ _id: id }, { status: false });
        }
        else {
            yield contact_model_1.default.updateOne({ _id: id }, { status: true });
        }
        res.json({
            code: 200,
        });
    }
    catch (error) {
        console.log("loi..............", error);
    }
});
exports.changeStatus = changeStatus;
const reply = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_email = req.body.user_email;
        const message = req.body.message;
        yield contact_model_1.default.updateOne({ email: user_email }, { message_Reply: message });
        const name = yield setting_model_1.default.find();
        const subject = `Bệnh viện ${name[0].name}`;
        (0, sendMail_1.sendMail)(user_email, subject, message);
        res.json({
            code: 200
        });
    }
    catch (error) {
        console.log("loi..............", error);
    }
});
exports.reply = reply;
