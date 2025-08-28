import { Request, Response } from "express";
import Banner from "../../models/banner.model";

export const index = async (req: Request, res: Response) =>{
    try {
        const banner = await Banner.find({
            deleted: false,
            status: true
        });
        res.json({
            code: 200,
            banner
        })
    } catch (error) {
        console.log("loi...............", error);
    }
}