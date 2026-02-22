import { Request, Response } from "express";
import LichKham from "../../models/lichkham.model";
import BacSi from "../../models/bacsi.model";
import Khoa from "../../models/khoa.model";
import User from "../../models/user.model";

export const create = async (req: Request, res: Response) => {
  try {
    const token = req.body.token;
    const user = await User.findOne({
      token: token,
      deleted: false
    });
    if(!user){
      res.json({
        code: 400,
        message: "tài khoản không tồn tại"
      });
      return;
    }
    req.body.user_id = user.id;
    const data = new LichKham(req.body);
    await data.save();
    res.json({
      code: 200,
      message: "Đặt lịch khám thành công"
    });
  } catch (error) {
    console.log("loi..............", error);
  }
};

export const getLinhkhamUser = async (req: Request, res: Response) => {
  try {
    const token: string = req.params.token;
    const user = await User.findOne({
      token: token,
      deleted: false
    });
    if(!user){
      res.json({
        code: 400,
        message: "tài khoản của bạn đã bị gián đoạn vui lòng đăng nhập lại để xem"
      });
      return;
    }

    
    const lichkhamUser = await LichKham.find({
      user_id: user.id,
      deleted: false
    }).lean();

    for (const item of lichkhamUser) {
      if (item.bacsi_id !== "") {
        const bacsi = await BacSi.findOne({
          _id: item.bacsi_id,
          deleted: false,
        });
        if(bacsi){
          item["bacsiName"] = bacsi.fullName;
        }
      }
      const khoa = await Khoa.findOne({
        _id: item.khoa_id,
        deleted: false,
      });
      item["khoaName"] = khoa.name;
    }

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

export const DelLichKham = async (req: Request, res:Response) => {
  try {
    const lichKhamId = req.params.lichKhamId;
    await LichKham.deleteOne({_id: lichKhamId});
    res.json({
      code:200
    })
  } catch (error) {
    res.json({code:404})
  }
}
