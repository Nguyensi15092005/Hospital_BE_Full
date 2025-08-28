import { Request, Response } from "express";
import BacSi from "../../models/bacsi.model";
import Khoa from "../../models/khoa.model";
import searchHelper from "../../helper/Search.helper";
import objectPaginationHelper from "../../helper/pagination";

export const index = async (req: Request, res: Response) => {
  try {
    interface Find {
      deleted: Boolean,
      status?: Boolean,
      code?: RegExp
    }
    let find: Find = {
      deleted: false
    };

    // Search
    const objectSearch = searchHelper(req.query);
    if(objectSearch.regex){
      find["code"]= objectSearch.regex
    }

    //pagination
    const countBacSi = await BacSi.countDocuments({
      deleted: false
    });
    const pagination = objectPaginationHelper(
      {
        currentPage: 1,
        limitItems: 50,
      },
      req.query,
      countBacSi
    );

    const bacsi = await BacSi.find(find)
      .lean()
      .limit(pagination.limitItems)
      .skip(pagination.skip);
    for (const item of bacsi) {
      const khoa = await Khoa.findOne({
        _id: item["khoa_id"],
        deleted: false
      });
      if (khoa) {
        item["nameKhoa"] = khoa["name"]
      }
    }
    res.json({
      code: 200,
      bacsi: bacsi,
    })
  } catch (error) {
    console.log("Lỗi ........", error);
  }
}

export const create = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    const countBacsi = await BacSi.countDocuments();
    const databs = {
      fullName: req.body.fullName,
      code: `nvs${countBacsi + 1}`,
      dateBirth: req.body.dateBirth,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      image: req.body.image,
      khoa_id: req.body.khoa_id,
      degree: req.body.degree,
      status: req.body.status,
      sex: req.body.sex,
    }
    const data = new BacSi(databs);
    await data.save();
    res.json({
      code: 200,
      succsse: true
    })
  } catch (error) {
    console.log("Lỗi ........", error);
  }
}

export const detail = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const bacsi = await BacSi.findOne({
      _id: id,
      deleted: false
    }).lean();
    const khoa = await Khoa.findOne({
      _id: bacsi["khoa_id"],
      deleted: false
    });
    if (khoa) {
      bacsi["nameKhoa"] = khoa["name"]
    }
    res.json({
      code: 200,
      bacsi: bacsi
    })
  } catch (error) {
    console.log("Lỗi ........", error);
  }
}

export const edit = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await BacSi.updateOne({_id:id}, req.body);
    const bacsi = await BacSi.findOne({
      _id:id
    });
    res.json({
      code: 200,
      bacsi: bacsi
    })
  } catch (error) {
    console.log("Lỗi ........", error);
  }
}

export const deleted = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await BacSi.updateOne({_id:id}, {deleted: true});
    res.json({
      code: 200,
    })
  } catch (error) {
    console.log("Lỗi ........", error);
  }
}

