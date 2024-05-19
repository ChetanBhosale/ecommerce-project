
import { IUser, userModel } from '../model/user'
import { redis } from '../utils/redis'
import { Response } from 'express'

export const accessTokenOption = {
    // expires: new Date(Date.now() + 5 * 60 * 1000),
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), //remove this after words
    httpOnly : true,
    secure : true
}

export const refreshTokenOption = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly : true,
    secure : true
}

export const sendToken = async(user:any,res:Response) => {
    const accessToken = user.SignAccessToken()
    const refreshToken = user.SignRefreshToken()

    redis.set(user._id,JSON.stringify(user) as any)

    if(process.env.NODE_ENV === "production"){
        accessTokenOption.secure = true;
    }

    res.cookie('access_token',accessToken,accessTokenOption)
    res.cookie('refresh_token',refreshToken,refreshTokenOption)

    res.status(201).json({
        success : true,
        user,
        accessToken
    })

}