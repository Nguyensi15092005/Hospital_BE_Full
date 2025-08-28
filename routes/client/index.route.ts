import { Express } from 'express';
import BacSi from "./bacsi.route";
import TrangThietBi from "./thietbi.route";
import Khoa from "./khoa.route";
import About from "./about.route";
import Contact from "./contact.route";
import Banner from "./banner.route";
import Setting from "./setting.route";
import TheChucNang from "./thechucnang.route";
import DichVuKhamBenh from "./dichvukhambenh.route";
import TinTuc from "./tintuc.model";






const routerClient = (app: Express): void =>{
    app.use("/api/bac-si", BacSi)
    app.use("/api/trang-thiet-bi", TrangThietBi);
    app.use("/api/khoa", Khoa);
    app.use("/api/gioi-thieu", About);
    app.use("/api/lien-he", Contact);
    app.use("/api/banner", Banner);
    app.use("/api/setting", Setting);
    app.use("/api/the-chuc-nang", TheChucNang);
    app.use("/api/dich-vu-kham-benh", DichVuKhamBenh);
    app.use("/api/tin-tuc-su-kien", TinTuc);


}
export default routerClient;