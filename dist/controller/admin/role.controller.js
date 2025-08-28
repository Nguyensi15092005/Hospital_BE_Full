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
exports.role = exports.permission = void 0;
const role_model_1 = __importDefault(require("../../models/role.model"));
const permission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const permissions = req.body;
        Object.entries(permissions).map((_a) => __awaiter(void 0, [_a], void 0, function* ([role_id, permission]) {
            yield role_model_1.default.updateOne({ _id: role_id }, { permissions: permission });
        }));
        res.json({
            code: 200,
        });
    }
    catch (error) {
        console.log("loi............................", error);
    }
});
exports.permission = permission;
const role = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role_id = req.params.role_id;
        const role = yield role_model_1.default.findOne({
            _id: role_id,
            deleted: false,
            status: true
        });
        res.json({
            code: 200,
            permission: role.permissions
        });
    }
    catch (error) {
        console.log("loi............................", error);
    }
});
exports.role = role;
