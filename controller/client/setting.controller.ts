import { Request, Response } from "express";
import Settings from "../../models/setting.model";

export const index = async (req: Request, res: Response) =>{ 
    try {
        const setting = await Settings.find();
        res.json({
            code: 200,
            setting: setting[0]
        });
    } catch (error) {
        console.log("Loi............", error);
    }
};