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
exports.update = exports.create = exports.index = void 0;
const about_model_1 = __importDefault(require("../../models/about.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countAbout = yield about_model_1.default.countDocuments();
        if (countAbout === 0) {
            res.json({
                code: 200,
                countAbout: 0
            });
        }
        const about = yield about_model_1.default.find();
        res.json({
            code: 200,
            countAbout: countAbout,
            about: about[0]
        });
    }
    catch (error) {
        console.log("loi...............", error);
    }
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = new about_model_1.default(req.body);
        const about = yield about_model_1.default.find();
        yield data.save();
        res.json({
            code: 200,
            about: about[0]
        });
    }
    catch (error) {
        console.log("loi...............", error);
    }
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield about_model_1.default.updateOne({}, req.body);
        const about = yield about_model_1.default.find();
        res.json({
            code: 200,
            about: about[0]
        });
    }
    catch (error) {
        console.log("loi...............", error);
    }
});
exports.update = update;
