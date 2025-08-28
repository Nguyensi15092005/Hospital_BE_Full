import { Request, Response } from "express";
import TheChucNang from "../../models/thechucnang.model";


export const index = async (req: Request, res: Response) =>{ 
    try {
        const thechucnang = await TheChucNang.find();
        res.json({
            code: 200,
            thechucnang: thechucnang[0]
        });
    } catch (error) {
        console.log("Loi............", error);
    }
};