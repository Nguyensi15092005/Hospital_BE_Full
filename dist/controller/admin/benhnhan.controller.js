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
exports.deleteBN = exports.edit = exports.detailt = exports.create = exports.index = void 0;
const benhnhan_model_1 = __importDefault(require("../../models/benhnhan.model"));
const Search_helper_1 = __importDefault(require("../../helper/Search.helper"));
const pagination_1 = __importDefault(require("../../helper/pagination"));
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
        const countBenhNhan = yield benhnhan_model_1.default.countDocuments({ deleted: false });
        const objectPagination = (0, pagination_1.default)({
            currentPage: 1,
            limitItems: 100
        }, req.query, countBenhNhan);
        const benhnhan = yield benhnhan_model_1.default.find(find)
            .limit(objectPagination.limitItems)
            .skip(objectPagination.skip);
        res.json({
            code: 200,
            benhnhan: benhnhan
        });
    }
    catch (error) {
        console.log("Lỗi ........", error);
    }
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = new benhnhan_model_1.default(req.body);
        yield data.save();
        res.json({
            code: 200,
        });
    }
    catch (error) {
        console.log("Lỗi ........", error);
    }
});
exports.create = create;
const detailt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const benhnhan = yield benhnhan_model_1.default.findOne({
            deleted: false,
            _id: id
        });
        console.log(benhnhan);
        res.json({
            code: 200,
            benhnhan: benhnhan
        });
    }
    catch (error) {
        console.log("Lỗi ........", error);
    }
});
exports.detailt = detailt;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield benhnhan_model_1.default.updateOne({ _id: id }, req.body);
        const benhnhan = yield benhnhan_model_1.default.findOne({
            _id: id
        });
        console.log(benhnhan);
        res.json({
            code: 200,
            benhnhan: benhnhan
        });
    }
    catch (error) {
        console.log("Lỗi ........", error);
    }
});
exports.edit = edit;
const deleteBN = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield benhnhan_model_1.default.deleteOne({ _id: id });
        res.json({
            code: 200,
        });
    }
    catch (error) {
        console.log("Lỗi ........", error);
    }
});
exports.deleteBN = deleteBN;
