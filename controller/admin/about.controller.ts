import { Request, Response } from "express";
import About from "../../models/about.model";

export const index = async (req: Request, res: Response) => {
  try {
    const countAbout = await About.countDocuments();
    if (countAbout === 0) {
      res.json({
        code: 200,
        countAbout: 0
      })

    }
    const about = await About.find();
    res.json({
      code: 200,
      countAbout: countAbout,
      about: about[0]
    })
  } catch (error) {
    console.log("loi...............", error);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const data = new About(req.body);
    const about = await About.find();
    await data.save();
    res.json({
      code: 200,
      about: about[0]
    })
  } catch (error) {
    console.log("loi...............", error);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    await About.updateOne({}, req.body);
    const about = await About.find();
    res.json({
      code: 200,
      about: about[0]
    })
  } catch (error) {
    console.log("loi...............", error);
  }
};