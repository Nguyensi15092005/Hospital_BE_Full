import { Request, Response } from "express";
import Khoa from "../../models/khoa.model";
import searchHelper from "../../helper/Search.helper";
import objectPaginationHelper from "../../helper/pagination";

export const index = async (req: Request, res: Response) => {
  try {
    interface Find {
      deleted: boolean,
      name?: RegExp,
      status?: boolean
    };

    let find: Find = {
      deleted: false,
    };

    //search
    const objectSearch = searchHelper(req.query);
    if(objectSearch.regex){
      find["name"] = objectSearch.regex;
    }

    //pagination
    const countKhoa = await Khoa.countDocuments({
      deleted: false,
    });
    const objectPagination = objectPaginationHelper(
      {
        currentPage: 1,
        limitItems: 50
      },
      req.query,
      countKhoa
    )


    const khoa = await Khoa.find(find)
      .limit(objectPagination.limitItems)
      .skip(objectPagination.skip)
      .select("id name headDepartment phone dateEstablishment status");
  
    res.json({
      code:200,
      khoa: khoa
    })
  } catch (error) {
    console.log("Lỗi ........", error);
  }
}

export const create = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const data = new Khoa(req.body);
    await data.save();
    res.json({
      code: 200,
    })
  } catch (error) {
    console.log("Lỗi ........", error);
  }
}

export const detail = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const khoa = await Khoa.findOne({
      _id:id,
      deleted: false
    });
    res.json({
      code: 200,
      khoa: khoa
    })
  } catch (error) {
    console.log("Lỗi ........", error);
  }
}

export const edit = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await Khoa.updateOne({_id: id}, req.body);
    const khoa = await Khoa.findOne({
      _id:id,
      deleted: false
    });
    res.json({
      code: 200,
      khoa: khoa
    })
  } catch (error) {
    console.log("Lỗi ........", error);
  }
}

export const deleteKhoa = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await Khoa.deleteOne({_id: id});
    res.json({
      code: 200
    })
  } catch (error) {
    console.log("Lỗi ........", error);
  }
}