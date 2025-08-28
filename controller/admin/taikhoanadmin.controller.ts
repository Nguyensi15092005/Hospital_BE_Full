import  md5  from 'md5';
import { Request, Response } from "express";
import Account from "../../models/account.model";
import Role from '../../models/role.model';
import searchHelper from '../../helper/Search.helper';
import objectPaginationHelper from '../../helper/pagination';

// export const index = async ( req: Request, res: Response) => {
//   try {
//     const taikhoanadmin = await Account.find({
//       deleted: false
//     }).lean();
//     for (const item of taikhoanadmin) {
//       const role = await Role.findOne({
//         _id: item.role_id,
//         deleted: false
//       });
//       if(role){
//         item["roleName"] = role.name;
//       }
//     }
//     console.log(taikhoanadmin);
//     res.json({
//       code: 200,
//       taikhoanadmin: taikhoanadmin
//     })
//   } catch (error) {
//     console.log("Loi............", error);
//   }
// }
export const index = async (req: Request, res: Response) => {
  try {
    interface Find {
      deleted: boolean,
      name?: RegExp
    }
    let find = {
      deleted: false 
    }

    //search 
    const objectSearch = searchHelper(req.query);
    if(objectSearch.regex){
      find["name"] = objectSearch.regex
    }

    //pagination
    const countAccout = await Account.countDocuments({deleted:false});
    const pagination = objectPaginationHelper(
      {
        currentPage: 1,
        limitItems: 50,
      },
      req.query,
      countAccout
    );

    const taikhoanadmin = await Account.find(find)
      .limit(pagination.limitItems)
      .skip(pagination.skip)
      .lean();

    
    await Promise.all(
      taikhoanadmin.map(async (item) => {
        const role = await Role.findOne({ 
          _id: item.role_id, 
          deleted: false 
        }).lean();
        if (role) {
          item["roleName"] = role.name;
        }
      })
    );
    console.log(taikhoanadmin);
    res.json({
      code: 200,
      taikhoanadmin
    });
  } catch (error) {
    console.log("Lỗi............", error);
    res.status(500).json({ code: 500, message: "Lỗi server!" });
  }
};


export const create = async ( req: Request, res: Response) => {
  try {
    console.log(req.body)
    const email = req.body.email;
    const existEmail = await Account.findOne({
      email: email
    });
    if(existEmail){
      res.json({
        code: 400,
        message: "Email đã tồn tại!!!"
      });
      return;
    }
    const existPhone = await Account.findOne({
      phone: req.body.phone
    });
    if(existPhone){
      res.json({
        code: 400,
        message: "Số điện thoại đã tồn tại!!!"
      });
      return;
    }
    req.body.password = md5(req.body.password)
    const data = new Account(req.body);
    await data.save();
    res.json({
      code: 200,
      message:"Thêm mới tài khoản admin thành công"
    })
  } catch (error) {
    console.log("Loi............", error);
  }
};

export const detail = async ( req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const taikhoan = await Account.findOne({
      _id: id
    }).select("-password -tokenAdmin");
    res.json({
      code: 200,
      taikhoan
    });
  } catch (error) {
    console.log("Loi............", error);
  }
};

export const edit = async ( req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await Account.updateOne({_id: id}, req.body);
    const taikhoan = await Account.findOne({
      _id: id
    }).select("-password -tokenAdmin");
    res.json({
      code: 200,
      taikhoan
    });
  } catch (error) {
    console.log("Loi............", error);
  }
};

export const del = async ( req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await Account.updateOne({_id: id}, {deleted: true});
    res.json({
      code: 200,
    });
  } catch (error) {
    console.log("Loi............", error);
  }
};