import { Request, Response } from "express";
import Contact from "../../models/contact.model";

export const create = async (req: Request, res: Response) =>{ 
    try {
        const data = new Contact(req.body);
        await data.save();
        res.json({
            code: 200
        });
    } catch (error) {
        console.log("loi............................", error)
    }
}