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
exports.sendmail = exports.del = exports.changeStatus = exports.edit = exports.detail = exports.create = exports.index = void 0;
const lichkham_model_1 = __importDefault(require("../../models/lichkham.model"));
const khoa_model_1 = __importDefault(require("../../models/khoa.model"));
const bacsi_model_1 = __importDefault(require("../../models/bacsi.model"));
const Search_helper_1 = __importDefault(require("../../helper/Search.helper"));
const setting_model_1 = __importDefault(require("../../models/setting.model"));
const sendMail_1 = require("../../helper/sendMail");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        ;
        let find = {
            deleted: false
        };
        const objectSearch = (0, Search_helper_1.default)(req.query);
        if (objectSearch.regex) {
            find["fullName"] = objectSearch.regex;
        }
        const lichkham = yield lichkham_model_1.default.find(find).lean();
        yield Promise.all(lichkham.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            const khoa = yield khoa_model_1.default.findOne({
                _id: item.khoa_id,
                deleted: false
            });
            const bacsi = yield bacsi_model_1.default.findOne({
                _id: item.bacsi_id,
                deleted: false
            });
            if (khoa) {
                item["nameKhoa"] = khoa.name;
            }
            if (bacsi) {
                item["nameBacsi"] = bacsi.fullName;
            }
        })));
        res.json({
            code: 200,
            lichkham
        });
    }
    catch (error) {
        console.log("loi..............", error);
    }
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = new lichkham_model_1.default(req.body);
        yield data.save();
        res.json({
            code: 200
        });
    }
    catch (error) {
        console.log("loi..............", error);
    }
});
exports.create = create;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const lichkham = yield lichkham_model_1.default.findOne({
            _id: id,
            deleted: false
        });
        res.json({
            code: 200,
            lichkham
        });
    }
    catch (error) {
        console.log("loi..............", error);
    }
});
exports.detail = detail;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield lichkham_model_1.default.updateOne({ _id: id }, req.body);
        const lichkham = yield lichkham_model_1.default.findOne({
            _id: id,
            deleted: false
        });
        res.json({
            code: 200,
            lichkham
        });
    }
    catch (error) {
        console.log("loi..............", error);
    }
});
exports.edit = edit;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const status = req.params.status;
        console.log(id, status);
        if (status === "true") {
            yield lichkham_model_1.default.updateOne({ _id: id }, { status: false });
        }
        else {
            yield lichkham_model_1.default.updateOne({ _id: id }, { status: true });
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
const del = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield lichkham_model_1.default.updateOne({ _id: id }, { deleted: true });
        res.json({
            code: 200
        });
    }
    catch (error) {
        console.log("loi..............", error);
    }
});
exports.del = del;
const sendmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_email = req.body.user_email;
        const message = req.body.message;
        yield lichkham_model_1.default.updateOne({ email: user_email }, { message_Reply: message });
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
exports.sendmail = sendmail;
