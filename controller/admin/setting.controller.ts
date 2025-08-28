import { Request, Response } from "express";
import Settings from "../../models/setting.model";

export const index = async (req: Request, res: Response) => {
  try {
    const count = await Settings.countDocuments();
    if (count === 0) {
      res.json({
        code: 200,
        countSetting: 0
      })
    }
    const setting = await Settings.find();
    res.json({
      code: 200,
      countSetting: count,
      setting: setting[0]
    })
  } catch (error) {
    console.log("loi.......................", error);
  }
}

export const create = async (req: Request, res: Response) => {
  try {
    const data = new Settings(req.body);
    await data.save();
    const setting = await Settings.find();
    res.json({
      code: 200,
      setting: setting[0]
    })
  } catch (error) {
    console.log("loi.......................", error);
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    await Settings.updateOne({}, req.body);
    const setting = await Settings.find();
    res.json({
      code: 200,
      setting: setting[0]
    })
  } catch (error) {
    console.log("loi.......................", error);
  }
}