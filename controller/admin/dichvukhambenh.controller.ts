import { Request, Response } from "express";
import searchHelper from "../../helper/Search.helper";
import DichVuKhamBenh from "../../models/dichvukhambenh.model";

export const index = async (req: Request, res: Response) => {
  try {
    interface Find {
      deleted: Boolean,
      status?: Boolean,
      title?: RegExp
    }
    let find: Find = {
      deleted: false
    };

    // Search
    const objectSearch = searchHelper(req.query);
    if(objectSearch.regex){
      find["title"]= objectSearch.regex
    }

    const dichvu = await DichVuKhamBenh.find(find);
    res.json({
      code: 200,
      dichvu: dichvu,
    })
  } catch (error) {
    console.log("Lỗi ........", error);
  }
}

export const create = async (req: Request, res: Response) => {
  try {
    const data = new DichVuKhamBenh(req.body);
    await data.save();
    res.json({
      code: 200
    })
  } catch (error) {
    console.log("Lỗi ........", error);
  }
}

export const detail = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const dichvu = await DichVuKhamBenh.findOne({
      _id: id,
      deleted: false
    });
    res.json({
      code: 200,
      dichvu: dichvu
    })
  } catch (error) {
    console.log("Lỗi ........", error);
  }
}

export const edit = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await DichVuKhamBenh.updateOne({_id:id}, req.body);
    const dichvu = await DichVuKhamBenh.findOne({
      _id:id
    });
    res.json({
      code: 200,
      dichvu
    })
  } catch (error) {
    console.log("Lỗi ........", error);
  }
}

export const deleted = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await DichVuKhamBenh.deleteOne({_id:id});
    res.json({
      code: 200,
    })
  } catch (error) {
    console.log("Lỗi ........", error);
  }
}

