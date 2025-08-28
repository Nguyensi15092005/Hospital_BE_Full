import { Request, Response } from "express";
import DichVuKhamBenh from "../../models/dichvukhambenh.model";

export const index = async (req: Request, res: Response) =>{
    try {
        const dichvu = await DichVuKhamBenh.find({
            deleted: false,
            status: true
        });
        res.json({
            code: 200,
            dichvu
        })
    } catch (error) {
        console.log("loi...............", error);
    }
}