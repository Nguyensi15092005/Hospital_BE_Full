import { Request, Response } from "express";
import Banner from "../../models/banner.model";

export const index = async (req: Request, res: Response) => {
  try {
    const banner = await Banner.find({
        deleted: false
    });
    res.json({
      code: 200,
      banner: banner
    });
  } catch (error) {
    console.log("loi...............", error);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const data = new Banner(req.body);
    await data.save();
    res.json({
      code: 200,
    });
  } catch (error) {
    console.log("loi...............", error);
  }
};

export const detail = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const banner = await Banner.findOne({
        _id: id
    });
    res.json({
      code: 200,
      banner
    });
  } catch (error) {
    console.log("loi...............", error);
  }
};

export const edit = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await Banner.updateOne({_id:id}, req.body);
    const banner = await Banner.findOne({
        _id: id
    });
    res.json({
      code: 200,
      banner
    });
  } catch (error) {
    console.log("loi...............", error);
  }
};

export const del = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await Banner.deleteOne({_id:id});
    res.json({
      code: 200,
    });
  } catch (error) {
    console.log("loi...............", error);
  }
};