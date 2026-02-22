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
exports.DelLichKham = exports.getDateNowLichkhamUser = exports.getLinhkhamUser = exports.create = void 0;
const lichkham_model_1 = __importDefault(require("../../models/lichkham.model"));
const bacsi_model_1 = __importDefault(require("../../models/bacsi.model"));
const khoa_model_1 = __importDefault(require("../../models/khoa.model"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.body.token;
        const user = yield user_model_1.default.findOne({
            token: token,
            deleted: false
        });
        if (!user) {
            res.json({
                code: 400,
                message: "tài khoản không tồn tại"
            });
            return;
        }
        req.body.user_id = user.id;
        const data = new lichkham_model_1.default(req.body);
        yield data.save();
        res.json({
            code: 200,
            message: "Đặt lịch khám thành công"
        });
    }
    catch (error) {
        console.log("loi..............", error);
    }
});
exports.create = create;
const getLinhkhamUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.params.token;
        const user = yield user_model_1.default.findOne({
            token: token,
            deleted: false
        });
        if (!user) {
            res.json({
                code: 400,
                message: "tài khoản của bạn đã bị gián đoạn vui lòng đăng nhập lại để xem"
            });
            return;
        }
        const lichkhamUser = yield lichkham_model_1.default.find({
            user_id: user.id,
            deleted: false
        }).lean();
        for (const item of lichkhamUser) {
            if (item.bacsi_id !== "") {
                const bacsi = yield bacsi_model_1.default.findOne({
                    _id: item.bacsi_id,
                    deleted: false,
                });
                if (bacsi) {
                    item["bacsiName"] = bacsi.fullName;
                }
            }
            const khoa = yield khoa_model_1.default.findOne({
                _id: item.khoa_id,
                deleted: false,
            });
            item["khoaName"] = khoa.name;
        }
        res.json({
            code: 200,
            lichkhamUser,
        });
    }
    catch (error) {
        console.log("loi..............", error);
    }
});
exports.getLinhkhamUser = getLinhkhamUser;
const getDateNowLichkhamUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const lichkhamUser = yield lichkham_model_1.default.find({
            user_id: userId,
            deleted: false,
            examination_date: { $gt: new Date() },
        }).lean();
        for (const item of lichkhamUser) {
            if (item.bacsi_id !== "") {
                const bacsi = yield bacsi_model_1.default.findOne({
                    _id: item.bacsi_id,
                    deleted: false,
                });
                item["bacsiName"] = bacsi.fullName;
                item["imageBacsi"] = bacsi.image;
            }
            const khoa = yield khoa_model_1.default.findOne({
                _id: item.khoa_id,
                deleted: false,
            });
            item["khoaName"] = khoa.name;
        }
        res.json({
            code: 200,
            lichkhamUser: lichkhamUser.reverse(),
        });
    }
    catch (error) {
        console.log("loi..............", error);
    }
});
exports.getDateNowLichkhamUser = getDateNowLichkhamUser;
const DelLichKham = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lichKhamId = req.params.lichKhamId;
        yield lichkham_model_1.default.deleteOne({ _id: lichKhamId });
        res.json({
            code: 200
        });
    }
    catch (error) {
        res.json({ code: 404 });
    }
});
exports.DelLichKham = DelLichKham;
