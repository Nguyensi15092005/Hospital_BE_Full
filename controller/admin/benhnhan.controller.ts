import { Request, Response } from "express";
import BenhNhan from "../../models/benhnhan.model";
import searchHelper from "../../helper/Search.helper";
import objectPaginationHelper from "../../helper/pagination";


export const index = async (req: Request, res: Response) => {
  try {
    interface Find {
      deleted: boolean,
      fullName?:string,
    }
    let find = {
      deleted: false
    };

    //search
    const objectSearch = searchHelper(req.query);
    if(objectSearch.regex){
      find["fullName"] = objectSearch.regex;
    };

    //pagination
    const countBenhNhan = await BenhNhan.countDocuments({deleted: false});
    const objectPagination = objectPaginationHelper(
      {
        currentPage: 1,
        limitItems: 100
      },
      req.query,
      countBenhNhan
    );


    const benhnhan = await BenhNhan.find(find)
      .limit(objectPagination.limitItems)
      .skip(objectPagination.skip);
  
    res.json({
      code:200,
      benhnhan: benhnhan
    })
  } catch (error) {
    console.log("Lỗi ........", error);
  }
}

export const create = async (req: Request, res: Response) => {
  try {
    const data = new BenhNhan(req.body);
    await data.save();
    res.json({
      code: 200,
    })
  } catch (error) {
    console.log("Lỗi ........", error);
  }
}

export const detailt = async (req: Request, res: Response) => {
  try { 
    const id = req.params.id;
    const benhnhan = await BenhNhan.findOne({
      deleted: false,
      _id: id
    });
    console.log(benhnhan);
    res.json({
      code: 200,
      benhnhan: benhnhan
    })
  } catch (error) {
    console.log("Lỗi ........", error);
  }
}

export const edit = async (req: Request, res: Response) => {
  try { 
    const id = req.params.id;
    await BenhNhan.updateOne({_id: id}, req.body);
    const benhnhan = await BenhNhan.findOne({
      _id: id
    });
    console.log(benhnhan);
    res.json({
      code: 200,
      benhnhan: benhnhan
    })
  } catch (error) {
    console.log("Lỗi ........", error);
  }
}

export const deleteBN = async (req: Request, res: Response) => {
  try { 
    const id = req.params.id;
    await BenhNhan.deleteOne({_id: id});
    res.json({
      code: 200,
    })
  } catch (error) {
    console.log("Lỗi ........", error);
  }
}