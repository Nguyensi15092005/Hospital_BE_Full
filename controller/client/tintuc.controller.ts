import { Request, Response } from "express";
import TinTuc from "../../models/tintucvasukien.model";


export const index = async (req: Request, res: Response) =>{
    try {
        const tintuc = await TinTuc.find({
            deleted: false,
            status: true
        });
        res.json({
            code: 200,
            tintuc
        })
    } catch (error) {
        console.log("loi...............", error);
    }
}

export const detail = async (req: Request, res: Response) =>{
    try {
        const slug = req.params.slug;
        const tintuc = await TinTuc.findOne({
            slug: slug,
            deleted: false,
            status: true
        });
        res.json({
            code: 200,
            tintuc
        })
    } catch (error) {
        console.log("loi...............", error);
    }
}