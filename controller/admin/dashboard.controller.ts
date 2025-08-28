import { Request, Response } from "express";
import BacSi from "../../models/bacsi.model";
import LichKham from "../../models/lichkham.model";
import BenhNhan from "../../models/benhnhan.model";
import Khoa from "../../models/khoa.model";
import TrangThietBi from "../../models/trangthietbi.model";
import DichVuKhamBenh from "../../models/dichvukhambenh.model";
import TinTuc from "../../models/tintucvasukien.model";
import Contact from "../../models/contact.model";
import Banner from "../../models/banner.model";
import Account from "../../models/account.model";
import Role from "../../models/role.model";

export const index = async (req: Request, res: Response) => {
    try {
        const countbacsi = await BacSi.countDocuments({
            deleted: false
        });
        const countlichkham = await LichKham.countDocuments({
            deleted: false
        });
        const countbenhnhan = await BenhNhan.countDocuments({
            deleted: false
        });
        const countkhoa = await Khoa.countDocuments({
            deleted: false
        });
        const countthietbi = await TrangThietBi.countDocuments({
            deleted: false
        });
        const countdichvu = await DichVuKhamBenh.countDocuments({
            deleted: false
        });
        const counttintuc = await TinTuc.countDocuments({
            deleted: false
        });
        const countlienhe = await Contact.countDocuments({
            deleted: false
        });
        const countbanner = await Banner.countDocuments({
            deleted: false
        });
        const countaccount = await Account.countDocuments({
            deleted: false
        });
        const countnhomquyen = await Role.countDocuments({
            deleted: false
        });

        res.json({
            countbacsi: countbacsi,
            countlichkham: countlichkham,
            countbenhnhan: countbenhnhan,
            countkhoa: countkhoa,
            countthietbi: countthietbi,
            countdichvu: countdichvu,
            counttintuc,
            countbanner,
            countaccount,
            countnhomquyen,
            countlienhe
        })
    } catch (error) {
        console.log("loi....................", error);
    }
}

export const bieudo = async (req: Request, res: Response) => {
    try {
        const thongke = await LichKham.aggregate([
            {
                $match: {
                    deleted: false
                }

            },
            {
                $group: {
                    _id: {
                        month: { $month: "$examination_date" },
                        year: { $year: "$examination_date" }
                    },
                    quantity: { $sum: 1 }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 }
            },
            {
                $limit: 12
            },
            {
                $project: {
                    date: {
                        $concat: [
                            { $toString: "$_id.month" }, "-",
                            { $toString: "$_id.year" }
                        ]
                    },
                    quantity: 1,
                    _id: 0
                }
            }
        ]);
        res.json(thongke)
    } catch (error) {
        console.log("loi....................", error);
    }
}

export const lichhen = async (req: Request, res: Response) => {
    try {
        const lichhen = await LichKham.find({
            deleted: false,
            status: true,
            examination_date: { $gte: new Date() } // 
        })
            .sort({ examination_date: -1 })
            .limit(8)
            .select("examination_date fullName")
            
        res.json(lichhen);
    } catch (error) {
        console.log("loi....................", error);
    }
}

export const gannhat = async (req: Request, res: Response) => {
    try {
        const lichkham = await LichKham.find({
            status: true,
            examination_date: { $lt: new Date() }
        }).lean().limit(8);
        
        for (const item of lichkham) {
            const bacsi = await BacSi.findOne({
                _id: item.bacsi_id,
                deleted: false
            });
            if(bacsi){
                item["nameBacsi"] = bacsi.fullName
            }
        }
            
        res.json(lichkham);
    } catch (error) {
        console.log("loi....................", error);
    }
}
