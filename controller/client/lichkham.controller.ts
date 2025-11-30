import { Request, Response } from "express";
import LichKham from "../../models/lichkham.model";

export const create = async (req: Request, res: Response) => {
  try {
    const data = new LichKham(req.body);
    console.log(data);
    await data.save();
    res.json({
      code: 200,
    });
  } catch (error) {
    console.log("loi..............", error);
  }
};