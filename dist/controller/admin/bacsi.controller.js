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
exports.deleted = exports.edit = exports.detail = exports.create = exports.index = void 0;
const bacsi_model_1 = __importDefault(require("../../models/bacsi.model"));
const khoa_model_1 = __importDefault(require("../../models/khoa.model"));
const Search_helper_1 = __importDefault(require("../../helper/Search.helper"));
const pagination_1 = __importDefault(require("../../helper/pagination"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let find = {
            deleted: false
        };
        const objectSearch = (0, Search_helper_1.default)(req.query);
        if (objectSearch.regex) {
            find["code"] = objectSearch.regex;
        }
        const countBacSi = yield bacsi_model_1.default.countDocuments({
            deleted: false
        });
        const pagination = (0, pagination_1.default)({
            currentPage: 1,
            limitItems: 50,
        }, req.query, countBacSi);
        const bacsi = yield bacsi_model_1.default.find(find)
            .lean()
            .limit(pagination.limitItems)
            .skip(pagination.skip);
        for (const item of bacsi) {
            const khoa = yield khoa_model_1.default.findOne({
                _id: item["khoa_id"],
                deleted: false
            });
            if (khoa) {
                item["nameKhoa"] = khoa["name"];
            }
        }
        res.json({
            code: 200,
            bacsi: bacsi,
        });
    }
    catch (error) {
        console.log("Lỗi ........", error);
    }
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const countBacsi = yield bacsi_model_1.default.countDocuments();
        const databs = {
            fullName: req.body.fullName,
            code: `nvs${countBacsi + 1}`,
            dateBirth: req.body.dateBirth,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
            image: req.body.image,
            khoa_id: req.body.khoa_id,
            degree: req.body.degree,
            status: req.body.status,
            sex: req.body.sex,
        };
        const data = new bacsi_model_1.default(databs);
        yield data.save();
        res.json({
            code: 200,
            succsse: true
        });
    }
    catch (error) {
        console.log("Lỗi ........", error);
    }
});
exports.create = create;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const bacsi = yield bacsi_model_1.default.findOne({
            _id: id,
            deleted: false
        }).lean();
        const khoa = yield khoa_model_1.default.findOne({
            _id: bacsi["khoa_id"],
            deleted: false
        });
        if (khoa) {
            bacsi["nameKhoa"] = khoa["name"];
        }
        res.json({
            code: 200,
            bacsi: bacsi
        });
    }
    catch (error) {
        console.log("Lỗi ........", error);
    }
});
exports.detail = detail;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield bacsi_model_1.default.updateOne({ _id: id }, req.body);
        const bacsi = yield bacsi_model_1.default.findOne({
            _id: id
        });
        res.json({
            code: 200,
            bacsi: bacsi
        });
    }
    catch (error) {
        console.log("Lỗi ........", error);
    }
});
exports.edit = edit;
const deleted = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield bacsi_model_1.default.updateOne({ _id: id }, { deleted: true });
        res.json({
            code: 200,
        });
    }
    catch (error) {
        console.log("Lỗi ........", error);
    }
});
exports.deleted = deleted;
