import e, { NextFunction,Request,Response } from "express";
import { CatchAsyncError } from "../middleware/CatchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import { IAddress, userAddressModel } from "../model/user";

export const createAddress = CatchAsyncError(async(req:Request,res:Response,next:NextFunction) => {
    try {
        let {lane1,lane2,name,contact1,contact2,zipcode,city,state,country} = req.body as IAddress

        let address = await userAddressModel.create({
            name,
            contact1,
            contact2,
            lane1,
            lane2,
            zipcode,
            city,
            state,
            country,
            user : req.user?._id
        })

        res.json({
            success : true,
            message :"Address created successfully!",
            address
        })


    } catch (error:any) {
        return next(new ErrorHandler(error.message,400))
    }
})

export const updateAddress = CatchAsyncError(async(req:Request,res:Response,next:NextFunction) => {
    try {
        let {lane1,lane2,name,contact1,contact2,zipcode,city,state,country} = req.body as IAddress
        let _id = req.params.id
        let address = await userAddressModel.findByIdAndUpdate({_id},{
            name,
            contact1,
            contact2,
            lane1,
            lane2,
            zipcode,
            city,
            state,
            country,
            user : req.user?._id
        },{new : true})

        if(!address){
            return next(new ErrorHandler('address could not be found!',400))
        }

        res.status(201).json({
            success : true,
            message : 'address updated successfully!',
            address
        })

    } catch (error:any) {
        return next(new ErrorHandler(error.message,400))
    }
})


export const deleteAddress = CatchAsyncError(async(req:Request,res:Response,next:NextFunction) => {
    try {
        const id = req.params.id;
        let address = await userAddressModel.findById(id)
        if(address?.user != req.user._id){
            return next(new ErrorHandler('Invalid Request!',400))
        }           

        await userAddressModel.findByIdAndDelete(id)

        res.status(201).json({
            success : true,
            message : 'address deleted successfully!'
        })
    } catch (error:any) {
        return next(new ErrorHandler(error.message,400))
    }
})

export const getAddress = CatchAsyncError(async(req:Request,res:Response,next:NextFunction) => {
    try {
        let id = req.user?._id;
        let address = await userAddressModel.find({user : id})
        return res.status(201).json({
            success : true,
            address
        })
    } catch (error:any) {
        return next(new ErrorHandler(error.message,400))
    }
})

export const getSingleAddress = CatchAsyncError(async(req:Request,res:Response,next:NextFunction) => {
    try {
        let id = req.params.id;
        let userId = req.user._id;

        let address = await userAddressModel.find({_id:id,user : userId})

        if(!address){
            return next(new ErrorHandler('Address not found!',400))
        }
        
        res.status(201).json({
            success : true,
            address
        })

    } catch (error:any) {
        return next(new ErrorHandler(error.message,400))
    }
})