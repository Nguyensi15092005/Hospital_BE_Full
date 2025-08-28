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





const routerAdmin = (app:Express): void =>{
    app.use("/api/admin", Dashboard);
    app.use("/api/admin/bac-si", BacSi);
    app.use("/api/admin/khoa", Khoa);
    app.use("/api/admin/benh-nhan", BenhNhan);
    app.use("/api/admin/trang-thiet-bi", TrangThietBi);
    app.use("/api/admin/auth", Auth);
    app.use("/api/admin/tai-khoan-admin", TaiKhoanAdmin);
    app.use("/api/admin/nhom-quyen", NhomQuyen);
    app.use("/api/admin/lich-kham", LichKham);
    app.use("/api/admin/gioi-thieu", GioiThieu);
    app.use("/api/admin/lien-he", Contact);
    app.use("/api/admin/banner", Banner);
    app.use("/api/admin/cai-dat-chung", Setting);
    app.use("/api/admin/the-chuc-nang", TheChucNang);
    app.use("/api/admin/dich-vu-kham-benh", DichVuKhamBenh);
    app.use("/api/admin/tin-tuc-su-kien", TinTuc);
    app.use("/api/admin/phan-quyen", Role);



}
export default routerAdmin;