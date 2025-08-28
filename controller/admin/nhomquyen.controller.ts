import { Request, Response } from "express";
import Role from "../../models/role.model";

export const index = async (req: Request, res: Response) => {
  try {
    const role = await Role.find({
      deleted: false
    });
    res.json({
      code: 200,
      role: role
    })
  } catch (error) {
    console.log("Loi...........", error);
  }
}

export const create = async (req: Request, res: Response) => {
  try {
    const data = new Role(req.body);
    await data.save();
    res.json({
      code: 200
    })
  } catch (error) {
    console.log("Loi...........", error);
  }
}

export const detail = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const role = await Role.findOne({
      _id: id
    });
    res.json({
      code: 200,
      role: role
    })
  } catch (error) {
    console.log("Loi...........", error);
  }
}

export const edit = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await Role.updateOne({_id:id}, req.body);
    const role = await Role.findOne({
      _id: id
    });
    res.json({
      code: 200,
      role: role
    })
  } catch (error) {
    console.log("Loi...........", error);
  }
}

export const del = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await Role.deleteOne({_id:id});
    res.json({
      code: 200,
    })
  } catch (error) {
    console.log("Loi...........", error);
  }
}