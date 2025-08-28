import { Request, Response } from "express";
import About from "../../models/about.model";

export const index = async (req: Request, res: Response) =>{ 
    try {
        const about = await About.find();
        res.json({
            code: 200,
            about: about[0]
        });
    } catch (error) {
        console.log("Loi............", error);
    }
};