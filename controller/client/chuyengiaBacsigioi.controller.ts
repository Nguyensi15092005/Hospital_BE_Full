import { Request, Response } from "express";
import BacSi from "../../models/bacsi.model";
import searchHelper from "../../helper/Search.helper";
import objectPaginationHelper from "../../helper/pagination";

export const index = async (req: Request, res: Response) => {
  try {
    const bacsi = await BacSi.find({
      deleted: false,
      status: true
    })
    res.json(bacsi);
  } catch (error) {
    console.log("Loi...........", error);
  }
}

export const pagi = async (req: Request, res: Response) => {
  try {
    interface Find {
      deleted: boolean,
      status?: boolean,
      fullName?: RegExp
    }
    let find: Find ={
      deleted: false,
      status: true
    };

    // search 
    const objectSearch = searchHelper(req.query);
    if(objectSearch.regex){
      find["fullName"] = objectSearch.regex;
    }

    //pagination
    const totalCount = await BacSi.countDocuments({
      deleted: false,
      status: true
    });
    const currentPage = Number(req.query.page) || 1;
    const limitItems = Number(req.query.limit) || 9;
    const skip = (currentPage - 1) * limitItems;

    const bacsi = await BacSi.find(find)
      .limit(limitItems)
      .skip(skip);
    res.json({
      bacsi,
      totalCount
    });
  } catch (error) {
    console.log("Loi...........", error);
  }
}

export const KhoaId = async (req: Request, res: Response) => {
  try {
    const khoa_id = req.params.khoa_id;
    const bacsi = await BacSi.find({
      khoa_id: khoa_id,
      deleted: false,
      status: true
    });
    res.json(bacsi);
  } catch (error) {
    console.log("Loi...........", error);
  }
}