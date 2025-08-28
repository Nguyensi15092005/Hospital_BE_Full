"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bacsi_route_1 = __importDefault(require("./bacsi.route"));
const thietbi_route_1 = __importDefault(require("./thietbi.route"));
const khoa_route_1 = __importDefault(require("./khoa.route"));
const about_route_1 = __importDefault(require("./about.route"));
const contact_route_1 = __importDefault(require("./contact.route"));
const banner_route_1 = __importDefault(require("./banner.route"));
const setting_route_1 = __importDefault(require("./setting.route"));
const thechucnang_route_1 = __importDefault(require("./thechucnang.route"));
const dichvukhambenh_route_1 = __importDefault(require("./dichvukhambenh.route"));
const tintuc_model_1 = __importDefault(require("./tintuc.model"));
const routerClient = (app) => {
    app.use("/api/bac-si", bacsi_route_1.default);
    app.use("/api/trang-thiet-bi", thietbi_route_1.default);
    app.use("/api/khoa", khoa_route_1.default);
    app.use("/api/gioi-thieu", about_route_1.default);
    app.use("/api/lien-he", contact_route_1.default);
    app.use("/api/banner", banner_route_1.default);
    app.use("/api/setting", setting_route_1.default);
    app.use("/api/the-chuc-nang", thechucnang_route_1.default);
    app.use("/api/dich-vu-kham-benh", dichvukhambenh_route_1.default);
    app.use("/api/tin-tuc-su-kien", tintuc_model_1.default);
};
exports.default = routerClient;
