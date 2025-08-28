import { Request, Response } from "express";
import searchHelper from "../../helper/Search.helper";
import Contact from "../../models/contact.model";
import Settings from "../../models/setting.model";
import { sendMail } from "../../helper/sendMail";

export const index = async (req: Request, res: Response) => {
  try {
    interface Find {
      deleted: boolean,
      fullName?:RegExp,
    }
    let find: Find = {
      deleted: false
    };

    //search
    const objectSearch = searchHelper(req.query);
    if(objectSearch.regex){
      find["fullName"] = objectSearch.regex;
    };


    const contact = await Contact.find(find)
  
    res.json({
      code:200,
      contact
    })
  } catch (error) {
    console.log("Lỗi ........", error);
  }
}

export const detail = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const contact = await Contact.findOne({
        _id: id
    });
    res.json({
      code:200,
      contact
    })
  } catch (error) {
    console.log("Lỗi ........", error);
  }
}

export const del = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await Contact.deleteOne({_id: id});
    res.json({
      code:200
    })
  } catch (error) {
    console.log("Lỗi ........", error);
  }
};

export const changeStatus = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const status = req.params.status;
    if(status === "true"){
      await Contact.updateOne({_id: id}, {status: false})
    }
    else{
      await Contact.updateOne({_id: id}, {status: true});
    }


    
    res.json({
      code: 200,
    })
  } catch (error) {
    console.log("loi..............", error);
  }
}

export const reply = async (req: Request, res: Response) => {
  try {
    const user_email: string = req.body.user_email;
    const message: string = req.body.message;
    await Contact.updateOne({email: user_email}, {message_Reply: message});
    const name = await Settings.find();
    const subject: string = `Bệnh viện ${name[0].name}`;
    sendMail(user_email, subject, message);
    res.json({
      code: 200
    });
  } catch (error) {
    console.log("loi..............", error);
  }
};