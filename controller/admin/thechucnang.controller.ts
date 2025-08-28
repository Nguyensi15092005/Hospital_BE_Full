import { Request, Response } from "express";
import TheChucNang from "../../models/thechucnang.model";


export const index = async (req: Request, res: Response) => {
  try {
    const count = await TheChucNang.countDocuments();
    if (count === 0) {
      res.json({
        code: 200,
        countThechucnang: 0
      })

    }
    const thechucnang = await TheChucNang.find();
    res.json({
      code: 200,
      countThechucnang: count,
      thechucnang: thechucnang[0]
    })
  } catch (error) {
    console.log("loi...............", error);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const data = new TheChucNang(req.body);
    const thechucnang = await TheChucNang.find();
    await data.save();
    res.json({
      code: 200,
      thechucnang: thechucnang[0]
    })
  } catch (error) {
    console.log("loi...............", error);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    await TheChucNang.updateOne({}, req.body);
    const thechucnang = await TheChucNang.find();
    res.json({
      code: 200,
      thechucnang: thechucnang[0]
    })
  } catch (error) {
    console.log("loi...............", error);
  }
};