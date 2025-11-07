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
const role_model_1 = __importDefault(require("../../models/role.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = yield role_model_1.default.find({
            deleted: false
        });
        res.json({
            code: 200,
            role: role
        });
    }
    catch (error) {
        console.log("Loi...........", error);
    }
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = new role_model_1.default(req.body);
        yield data.save();
        res.json({
            code: 200
        });
    }
    catch (error) {
        console.log("Loi...........", error);
    }
});
exports.create = create;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const role = yield role_model_1.default.findOne({
            _id: id
        });
        res.json({
            code: 200,
            role: role
        });
    }
    catch (error) {
        console.log("Loi...........", error);
    }
});
exports.detail = detail;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield role_model_1.default.updateOne({ _id: id }, req.body);
        const role = yield role_model_1.default.findOne({
            _id: id
        });
        res.json({
            code: 200,
            role: role
        });
    }
    catch (error) {
        console.log("Loi...........", error);
    }
});
exports.edit = edit;
const del = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield role_model_1.default.deleteOne({ _id: id });
        res.json({
            code: 200,
        });
    }
    catch (error) {
        console.log("Loi...........", error);
    }
});
exports.del = del;
