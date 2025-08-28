import { Request, Response } from "express";
import TrangThietBi from "../../models/trangthietbi.model";

export const index = async (req: Request, res: Response) => {
    try {
        const thietbi = await TrangThietBi.find({
            deleted: false,
            status: true
        });
        res.json(thietbi);
    } catch (error) {
        console.log("Loi,.......", error);
    }
};