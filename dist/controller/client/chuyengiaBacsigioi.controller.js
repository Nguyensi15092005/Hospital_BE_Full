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
exports.KhoaId = exports.pagi = exports.index = void 0;
const bacsi_model_1 = __importDefault(require("../../models/bacsi.model"));
const Search_helper_1 = __importDefault(require("../../helper/Search.helper"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bacsi = yield bacsi_model_1.default.find({
            deleted: false,
            status: true
        });
        res.json(bacsi);
    }
    catch (error) {
        console.log("Loi...........", error);
    }
});
exports.index = index;
const pagi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let find = {
            deleted: false,
            status: true
        };
        const objectSearch = (0, Search_helper_1.default)(req.query);
        if (objectSearch.regex) {
            find["fullName"] = objectSearch.regex;
        }
        const totalCount = yield bacsi_model_1.default.countDocuments({
            deleted: false,
            status: true
        });
        const currentPage = Number(req.query.page) || 1;
        const limitItems = Number(req.query.limit) || 9;
        const skip = (currentPage - 1) * limitItems;
        const bacsi = yield bacsi_model_1.default.find(find)
            .limit(limitItems)
            .skip(skip);
        res.json({
            bacsi,
            totalCount
        });
    }
    catch (error) {
        console.log("Loi...........", error);
    }
});
exports.pagi = pagi;
const KhoaId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const khoa_id = req.params.khoa_id;
        const bacsi = yield bacsi_model_1.default.find({
            khoa_id: khoa_id,
            deleted: false,
            status: true
        });
        res.json(bacsi);
    }
    catch (error) {
        console.log("Loi...........", error);
    }
});
exports.KhoaId = KhoaId;
