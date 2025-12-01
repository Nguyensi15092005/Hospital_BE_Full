import { Request, Response } from "express";
import LichKham from "../../models/lichkham.model";
import BacSi from "../../models/bacsi.model";
import Khoa from "../../models/khoa.model";

export const create = async (req: Request, res: Response) => {
  try {
    const data = new LichKham(req.body);
    console.log(data);
    await data.save();
    res.json({
      code: 200,
    });
  } catch (error) {
    console.log("loi..............", error);
  }
};

export const getLinhkhamUser = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId;
    const lichkhamUser = await LichKham.find({
      user_id: userId,
      deleted: false,
    }).lean();
    for (const item of lichkhamUser) {
      if (item.bacsi_id !== "") {
        const bacsi = await BacSi.findOne({
          _id: item.bacsi_id,
          deleted: false,
        });
        item["bacsiName"] = bacsi.fullName;
      }
      const khoa = await Khoa.findOne({
        _id: item.khoa_id,
        deleted: false,
      });
      item["khoaName"] = khoa.name;
    }
    console.log(lichkhamUser);

    res.json({
      code: 200,
      lichkhamUser,
    });
  } catch (error) {
    console.log("loi..............", error);
  }
};

export const getDateNowLichkhamUser = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId;
    const lichkhamUser = await LichKham.find({
      user_id: userId,
      deleted: false,
      examination_date: { $gt: new Date() },
    }).lean();

    for (const item of lichkhamUser) {
      if (item.bacsi_id !== "") {
        const bacsi = await BacSi.findOne({
          _id: item.bacsi_id,
          deleted: false,
        });
        item["bacsiName"] = bacsi.fullName;
        item["imageBacsi"] = bacsi.image;
      }
      const khoa = await Khoa.findOne({
        _id: item.khoa_id,
        deleted: false,
      });
      item["khoaName"] = khoa.name;
    }

    res.json({
      code: 200,
      lichkhamUser: lichkhamUser.reverse(),
    });
  } catch (error) {
    console.log("loi..............", error);
  }
};