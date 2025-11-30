import { Express } from 'express';
import BacSi from "./bacsi.route";
import Khoa from "./khoa.route";
import BenhNhan from "./benhnhan.route";
import TrangThietBi from "./thietbi.route";
import Auth from "./accont.route";
import TaiKhoanAdmin from "./taikhoanadmin.route";
import NhomQuyen from "./nhomquyen.route";
import LichKham from "./lichkham.route";
import GioiThieu from "./about.route";
import Contact from "./contact.route";
import Banner from "./banner.route";
import Setting from "./settings.route";
import TheChucNang from "./thechucnang.route";
import DichVuKhamBenh from "./dichvukhambenh.route";
import TinTuc from "./tintuc.route";
import Role from "./role.route";
import Dashboard from "./dashboard.route";
import requireAuth from '../../middleware/auth.middleware';


const routerAdmin = (app:Express): void =>{
    app.use("/api/admin/dashboard",requireAuth, Dashboard);
    app.use("/api/admin/bac-si", requireAuth, BacSi);
    app.use("/api/admin/khoa", requireAuth, Khoa);
    app.use("/api/admin/benh-nhan", requireAuth, BenhNhan);
    app.use("/api/admin/trang-thiet-bi", requireAuth, TrangThietBi);
    app.use("/api/admin/auth", Auth);
    app.use("/api/admin/tai-khoan-admin", requireAuth, TaiKhoanAdmin);
    app.use("/api/admin/nhom-quyen", requireAuth, NhomQuyen);
    app.use("/api/admin/lich-kham", requireAuth, LichKham);
    app.use("/api/admin/gioi-thieu", requireAuth, GioiThieu);
    app.use("/api/admin/lien-he", requireAuth, Contact);
    app.use("/api/admin/banner", Banner);
    app.use("/api/admin/cai-dat-chung", requireAuth, Setting);
    app.use("/api/admin/the-chuc-nang", requireAuth, TheChucNang);
    app.use("/api/admin/dich-vu-kham-benh", requireAuth, requireAuth, DichVuKhamBenh);
    app.use("/api/admin/tin-tuc-su-kien", TinTuc);
    app.use("/api/admin/phan-quyen", requireAuth, Role);
}
export default routerAdmin;