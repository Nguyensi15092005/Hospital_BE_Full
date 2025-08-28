import { Request, Response } from "express";
import TrangThietBi from "../../models/trangthietbi.model";
import searchHelper from "../../helper/Search.helper";

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

    const thietbi = await TrangThietBi.find(find);
    res.json({
      code: 200,
      thietbi: thietbi
    })
  } catch (error) {
    console.log("Lỗi............", error);
  }
}

export const create = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    const data = new TrangThietBi(req.body);
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
    const thietbi = await TrangThietBi.findOne({
      _id: id
    });
    res.json({
      code: 200,
      thietbi: thietbi
    });
  } catch (error) {
    console.log("Lỗi............", error);
  }
}

export const edit = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await TrangThietBi.updateOne({ _id: id }, req.body);
    const thietbi = await TrangThietBi.findOne({
      _id: id
    });
    res.json({
      code: 200,
      thietbi: thietbi
    });
  } catch (error) {
    console.log("Lỗi............", error);
  }
}

export const deleteThietBi = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await TrangThietBi.deleteOne({_id: id});
    res.json({
      code: 200,
    });
  } catch (error) {
    console.log("Lỗi............", error);
  }
}