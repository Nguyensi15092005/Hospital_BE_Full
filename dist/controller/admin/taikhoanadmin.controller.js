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
exports.del = exports.edit = exports.detail = exports.create = exports.index = void 0;
const md5_1 = __importDefault(require("md5"));
const account_model_1 = __importDefault(require("../../models/account.model"));
const role_model_1 = __importDefault(require("../../models/role.model"));
const Search_helper_1 = __importDefault(require("../../helper/Search.helper"));
const pagination_1 = __importDefault(require("../../helper/pagination"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let find = {
            deleted: false
        };
        const objectSearch = (0, Search_helper_1.default)(req.query);
        if (objectSearch.regex) {
            find["name"] = objectSearch.regex;
        }
        const countAccout = yield account_model_1.default.countDocuments({ deleted: false });
        const pagination = (0, pagination_1.default)({
            currentPage: 1,
            limitItems: 50,
        }, req.query, countAccout);
        const taikhoanadmin = yield account_model_1.default.find(find)
            .limit(pagination.limitItems)
            .skip(pagination.skip)
            .lean();
        yield Promise.all(taikhoanadmin.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            const role = yield role_model_1.default.findOne({
                _id: item.role_id,
                deleted: false
            }).lean();
            if (role) {
                item["roleName"] = role.name;
            }
        })));
        console.log(taikhoanadmin);
        res.json({
            code: 200,
            taikhoanadmin
        });
    }
    catch (error) {
        console.log("Lỗi............", error);
        res.status(500).json({ code: 500, message: "Lỗi server!" });
    }
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const email = req.body.email;
        const existEmail = yield account_model_1.default.findOne({
            email: email
        });
        if (existEmail) {
            res.json({
                code: 400,
                message: "Email đã tồn tại!!!"
            });
            return;
        }
        const existPhone = yield account_model_1.default.findOne({
            phone: req.body.phone
        });
        if (existPhone) {
            res.json({
                code: 400,
                message: "Số điện thoại đã tồn tại!!!"
            });
            return;
        }
        req.body.password = (0, md5_1.default)(req.body.password);
        const data = new account_model_1.default(req.body);
        yield data.save();
        res.json({
            code: 200,
            message: "Thêm mới tài khoản admin thành công"
        });
    }
    catch (error) {
        console.log("Loi............", error);
    }
});
exports.create = create;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const taikhoan = yield account_model_1.default.findOne({
            _id: id
        }).select("-password -tokenAdmin");
        res.json({
            code: 200,
            taikhoan
        });
    }
    catch (error) {
        console.log("Loi............", error);
    }
});
exports.detail = detail;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield account_model_1.default.updateOne({ _id: id }, req.body);
        const taikhoan = yield account_model_1.default.findOne({
            _id: id
        }).select("-password -tokenAdmin");
        res.json({
            code: 200,
            taikhoan
        });
    }
    catch (error) {
        console.log("Loi............", error);
    }
});
exports.edit = edit;
const del = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield account_model_1.default.updateOne({ _id: id }, { deleted: true });
        res.json({
            code: 200,
        });
    }
    catch (error) {
        console.log("Loi............", error);
    }
});
exports.del = del;
