import { Request, Response } from "express";
import LichKham from "../../models/lichkham.model";
import Khoa from "../../models/khoa.model";
import BacSi from "../../models/bacsi.model";
import searchHelper from "../../helper/Search.helper";
import Settings from "../../models/setting.model";
import { sendMail } from "../../helper/sendMail";

export const index = async (req: Request, res: Response) => {
  try {
    interface Find {
      deleted: boolean,
      fullName?: RegExp
    };
    let find: Find = {
      deleted: false
    };

    //search 
    const objectSearch = searchHelper(req.query);
    if(objectSearch.regex){
      find["fullName"] = objectSearch.regex;
    }

    const lichkham = await LichKham.find(find).lean();

    // tên khoa và tên bác sĩ
    await Promise.all(
      lichkham.map(async (item) => {
        const khoa = await Khoa.findOne({
          _id: item.khoa_id,
          deleted: false
        });
        const bacsi = await BacSi.findOne({
          _id: item.bacsi_id,
          deleted: false
        });
        if (khoa) {
          item["nameKhoa"] = khoa.name
        }
        if (bacsi) {
          item["nameBacsi"] = bacsi.fullName;
        }
      })
    );

    res.json({
      code: 200,
      lichkham
    })

  } catch (error) {
    console.log("loi..............", error);
  }
}

export const create = async (req: Request, res: Response) => {
  try {
    const data = new LichKham(req.body);
    await data.save();
    res.json({
      code: 200
    })
  } catch (error) {
    console.log("loi..............", error);
  }
};

export const detail = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const lichkham = await LichKham.findOne({
      _id:id,
      deleted: false
    });
    
    res.json({
      code: 200,
      lichkham
    })
  } catch (error) {
    console.log("loi..............", error);
  }
}

export const edit = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await LichKham.updateOne({_id:id}, req.body);
    const lichkham = await LichKham.findOne({
      _id:id,
      deleted: false
    });
    
    res.json({
      code: 200,
      lichkham
    })
  } catch (error) {
    console.log("loi..............", error);
  }
};

export const changeStatus = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const status = req.params.status;
    console.log(id, status)
    // await LichKham.updateOne({_id:id}, req.body);
    // const lichkham = await LichKham.findOne({
    //   _id:id,
    //   deleted: false
    // });

    if(status === "true"){
      await LichKham.updateOne({_id: id}, {status: false})
    }
    else{
      await LichKham.updateOne({_id: id}, {status: true});
    }


    
    res.json({
      code: 200,
    })
  } catch (error) {
    console.log("loi..............", error);
  }
}

export const del = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await LichKham.updateOne({_id:id}, {deleted: true});
    res.json({
      code: 200
    })
  } catch (error) {
    console.log("loi..............", error);
  }
};

export const sendmail = async (req: Request, res: Response) => {
  try {
    const user_email: string = req.body.user_email;
    const message: string = req.body.message;
    await LichKham.updateOne({email: user_email}, {message_Reply: message});
    const name = await Settings.find();
    const subject: string = `Bệnh viện ${name[0].name}`;
    sendMail(user_email, subject, message);
    res.json({
      code: 200
    })
  } catch (error) {
    console.log("loi..............", error);
  }
};