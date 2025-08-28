import { Request, Response } from "express";
import Role from "../../models/role.model";

export const permission = async (req: Request, res: Response) =>{ 
    try {
        const permissions = req.body;
        Object.entries(permissions).map( async([role_id, permission])=> {
            await Role.updateOne({_id: role_id}, {permissions: permission});
        })
        res.json({
            code: 200,
            
        });
    } catch (error) {
        console.log("loi............................", error)
    }
};

export const role = async (req: Request, res: Response) =>{ 
    try {
        const role_id: string = req.params.role_id;
        const role = await Role.findOne({
            _id: role_id,
            deleted: false,
            status: true

        });
        res.json({
            code: 200,
            permission: role.permissions
        });
    } catch (error) {
        console.log("loi............................", error)
    }
};
