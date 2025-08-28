import { Request, Response } from "express";
import searchHelper from "../../helper/Search.helper";
import TinTuc from "../../models/tintucvasukien.model";

export const index = async (req: Request, res: Response) => {
  try {
    interface Find {
      deleted: boolean,
      status?: boolean,
      title?: RegExp
    };

    let find: Find = {
      deleted: false
    }

    //search 
    const objectSearch = searchHelper(req.query);
    if(objectSearch.regex){
      find["title"] = objectSearch.regex;
    };

    const tintuc = await TinTuc.find(find);
    res.json({
      code: 200,
      tintuc: tintuc
    })
  } catch (error) {
    console.log("Lỗi............", error);
  }
}

export const create = async (req: Request, res: Response) => {
  try {
    const data = new TinTuc(req.body);
    await data.save();
    res.json({
      code: 200
    });
  } catch (error) {
    console.log("Lỗi............", error);
  }
}

export const detail = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const tintuc = await TinTuc.findOne({
      _id: id
    });
    res.json({
      code: 200,
      tintuc: tintuc
    });
  } catch (error) {
    console.log("Lỗi............", error);
  }
}

export const edit = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await TinTuc.updateOne({ _id: id }, req.body);
    const tintuc = await TinTuc.findOne({
      _id: id
    });
    res.json({
      code: 200,
      tintuc: tintuc
    });
  } catch (error) {
    console.log("Lỗi............", error);
  }
}

export const del = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await TinTuc.deleteOne({_id: id});
    res.json({
      code: 200,
    });
  } catch (error) {
    console.log("Lỗi............", error);
  }
}