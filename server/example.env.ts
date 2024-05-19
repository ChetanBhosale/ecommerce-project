import 'dotenv/config'

export const PORT = process.env.PORT || 8000;
export const AccessTokenSecret = process.env.ACCESS_TOKEN!;
export const RefreshTokenSecret = process.env.REFRESH_TOKEN!;

export const AccessTokenExpire = process.env.ACCESS_TOKEN_EXPIRE!;
export const RefreshTokenExpire = process.env.REFRESH_TOKEN_EXPIRE!;

export const MAIL_HOST = process.env.MAIL_HOST!;
export const MAIL_USER = process.env.MAIL_USER!;
export const MAIL_PASS = process.env.MAIL_PASS!;


export const REDIS_URL = process.env.REDIS_URL;

export const CLOUD_NAME = process.env.CLOUD_NAME;
export const CLOUD_API_KEY = process.env.CLOUD_API_KEY;
export const CLOUD_SECRET_KEY = process.env.CLOUD_SECRET_KEY;