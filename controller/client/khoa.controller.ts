import { Request, Response } from "express";
import Khoa from "../../models/khoa.model";


export const index = async (req: Request, res: Response) => {
  try {
    const khoa = await Khoa.find({
      deleted: false,
      status: true
    })
    res.json(khoa);
  } catch (error) {
    console.log("Loi...........", error);
  }
};