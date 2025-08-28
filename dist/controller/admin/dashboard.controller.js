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
exports.gannhat = exports.lichhen = exports.bieudo = exports.index = void 0;
const bacsi_model_1 = __importDefault(require("../../models/bacsi.model"));
const lichkham_model_1 = __importDefault(require("../../models/lichkham.model"));
const benhnhan_model_1 = __importDefault(require("../../models/benhnhan.model"));
const khoa_model_1 = __importDefault(require("../../models/khoa.model"));
const trangthietbi_model_1 = __importDefault(require("../../models/trangthietbi.model"));
const dichvukhambenh_model_1 = __importDefault(require("../../models/dichvukhambenh.model"));
const tintucvasukien_model_1 = __importDefault(require("../../models/tintucvasukien.model"));
const contact_model_1 = __importDefault(require("../../models/contact.model"));
const banner_model_1 = __importDefault(require("../../models/banner.model"));
const account_model_1 = __importDefault(require("../../models/account.model"));
const role_model_1 = __importDefault(require("../../models/role.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countbacsi = yield bacsi_model_1.default.countDocuments({
            deleted: false
        });
        const countlichkham = yield lichkham_model_1.default.countDocuments({
            deleted: false
        });
        const countbenhnhan = yield benhnhan_model_1.default.countDocuments({
            deleted: false
        });
        const countkhoa = yield khoa_model_1.default.countDocuments({
            deleted: false
        });
        const countthietbi = yield trangthietbi_model_1.default.countDocuments({
            deleted: false
        });
        const countdichvu = yield dichvukhambenh_model_1.default.countDocuments({
            deleted: false
        });
        const counttintuc = yield tintucvasukien_model_1.default.countDocuments({
            deleted: false
        });
        const countlienhe = yield contact_model_1.default.countDocuments({
            deleted: false
        });
        const countbanner = yield banner_model_1.default.countDocuments({
            deleted: false
        });
        const countaccount = yield account_model_1.default.countDocuments({
            deleted: false
        });
        const countnhomquyen = yield role_model_1.default.countDocuments({
            deleted: false
        });
        res.json({
            countbacsi: countbacsi,
            countlichkham: countlichkham,
            countbenhnhan: countbenhnhan,
            countkhoa: countkhoa,
            countthietbi: countthietbi,
            countdichvu: countdichvu,
            counttintuc,
            countbanner,
            countaccount,
            countnhomquyen,
            countlienhe
        });
    }
    catch (error) {
        console.log("loi....................", error);
    }
});
exports.index = index;
const bieudo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thongke = yield lichkham_model_1.default.aggregate([
            {
                $match: {
                    deleted: false
                }
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$examination_date" },
                        year: { $year: "$examination_date" }
                    },
                    quantity: { $sum: 1 }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 }
            },
            {
                $limit: 12
            },
            {
                $project: {
                    date: {
                        $concat: [
                            { $toString: "$_id.month" }, "-",
                            { $toString: "$_id.year" }
                        ]
                    },
                    quantity: 1,
                    _id: 0
                }
            }
        ]);
        res.json(thongke);
    }
    catch (error) {
        console.log("loi....................", error);
    }
});
exports.bieudo = bieudo;
const lichhen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lichhen = yield lichkham_model_1.default.find({
            deleted: false,
            status: true,
            examination_date: { $gte: new Date() }
        })
            .sort({ examination_date: -1 })
            .limit(8)
            .select("examination_date fullName");
        res.json(lichhen);
    }
    catch (error) {
        console.log("loi....................", error);
    }
});
exports.lichhen = lichhen;
const gannhat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lichkham = yield lichkham_model_1.default.find({
            status: true,
            examination_date: { $lt: new Date() }
        }).lean().limit(8);
        for (const item of lichkham) {
            const bacsi = yield bacsi_model_1.default.findOne({
                _id: item.bacsi_id,
                deleted: false
            });
            if (bacsi) {
                item["nameBacsi"] = bacsi.fullName;
            }
        }
        res.json(lichkham);
    }
    catch (error) {
        console.log("loi....................", error);
    }
});
exports.gannhat = gannhat;
