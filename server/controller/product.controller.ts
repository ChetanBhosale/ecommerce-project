import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/CatchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import {
  cartModel,
  cartProductModel,
  ICart,
  IcartProduct,
  IProduct,
  productModel,
} from "../model/product";
import cloudinary from "cloudinary";
import mongoose, { get } from "mongoose";
import { redis } from "../utils/redis";

export const createProduct = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, description, price, less, color, size, category, state } =
        req.body as IProduct;

      req.body;

      if (!name || !description || !price || !less || !category || !state) {
        return next(new ErrorHandler("please fill required fields!", 400));
      }

      let product = await productModel.create({
        name,
        description,
        price,
        less,
        category,
        color,
        size,
        user: req.user?._id,
        state,
      });

      res.status(201).json({
        success: true,
        message: "product created successfully!",
        product,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const updateProduct = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: IProduct = req.body;
      data;
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid product ID!", 400));
      }

      let product = await productModel.findByIdAndUpdate(id, data, {
        new: true,
      });

      res.status(201).json({
        success: true,
        product,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const uploadImage = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let id = req.params.id;
      let file: any = req?.files?.image;

      if (!file) {
        return next(new ErrorHandler("image not found!", 400));
      }
      const myCloud = await cloudinary.v2.uploader.upload(file?.tempFilePath, {
        folder: "ecommerce-application",
      });

      let productData = await productModel.findById(id);

      if (!productData) {
        return next(new ErrorHandler("product not found!", 400));
      }

      productData?.images?.push({
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      });

      productData.save();

      res.json({
        success: true,
        image: "image uploaded successfully!",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const removeUploadedImage = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;

      const { public_id, url } = req.body;

      let product = await productModel.findById(id);

      if (!product) {
        return next(new ErrorHandler("product not found!", 400));
      }

      product.images =
        product.images?.filter(
          (image) => image.public_id !== public_id && image.url !== url
        ) || [];

      product;

      // await cloudinary.v2.uploader.destroy(public_id)

      product.save();

      res.status(201).json({
        success: true,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//pagination part for the seller!

export const getProducts = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        page = 1,
        size = 10,
        sort = "createdAt",
        order = "desc",
        search = "",
        category = "",
        state = "",
        from = "0",
        to = "10000000",
      } = req.query;

      const fromPrice: number = parseFloat(from as string);
      const toPrice: number = parseFloat(to as string);

      const skip: number =
        (parseInt(page as string) - 1) * parseInt(size as string);

      const totalCount = await productModel.countDocuments({
        $and: [
          {
            $or: [
              { name: { $regex: search, $options: "i" } },
              { description: { $regex: search, $options: "i" } },
              { state: { $regex: state, $options: "i" } },
            ],
          },
          { price: { $gte: fromPrice, $lte: toPrice } }, // Use parsed numbers here
          { user: req.user._id },
          { category: { $regex: category, $options: "i" } },
        ],
      });

      const totalPages = Math.ceil(totalCount / parseInt(size as string));

      const products = await productModel
        .find({
          $and: [
            {
              $or: [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
                { category: { $regex: search, $options: "i" } },
              ],
            },
            { price: { $gte: fromPrice, $lte: toPrice } },
            { user: req.user._id },
          ],
        })
        .sort({ [sort as string]: order === "asc" ? 1 : -1 })
        .skip(skip)
        .limit(parseInt(size as string));

      console.log(products);

      res.status(200).json({
        success: true,
        products,
        page,
        size,
        totalPages,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const viewProductList = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        page = 1,
        size = 10,
        sort = "createdAt",
        order = "desc",
        search = "",
        category = "",
        state = "",
        from = "0",
        to = "1000000",
        topSold = "false",
      } = req.query;

      const fromPrice: number = parseFloat(from as string);
      const toPrice: number = parseFloat(to as string);

      const skip: number =
        (parseInt(page as string) - 1) * parseInt(size as string);

      const queryConditions: any = {
        $and: [
          {
            $or: [
              { name: { $regex: search, $options: "i" } },
              { description: { $regex: search, $options: "i" } },
              { state: { $regex: state, $options: "i" } },
            ],
          },
          { price: { $gte: fromPrice, $lte: toPrice } },
          { category: { $regex: category, $options: "i" } },
        ],
      };

      const totalCount = await productModel.countDocuments(queryConditions);

      const totalPages = Math.ceil(totalCount / parseInt(size as string));

      const sortOption: any = { [sort as string]: order === "asc" ? 1 : -1 };
      if (topSold === "true") {
        sortOption.totalPurchase = -1;
      }

      const products = await productModel
        .find(queryConditions)
        .select("-user")
        .sort(sortOption)
        .skip(skip)
        .limit(parseInt(size as string));

      res.status(200).json({
        success: true,
        products,
        page,
        size,
        totalPages,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

interface addQuantityData {
  quantity: number;
  color: string;
  size: string;
}

// used for increasing quantity too
export const addToCart = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let id = req.params.id;

      let { quantity = 1, color = "", size = "" }: addQuantityData = req.body;

      let getCart = await cartModel
        .findOne({ user: req.user._id })
        .populate("products");

      if (!getCart) {
        return next(new ErrorHandler("invalid request", 400));
      }
      console.log(getCart);
      let isProductNotInCart: IcartProduct = getCart.products.find(
        (ele: any) => ele.product.toString() === id
      ) as unknown as IcartProduct;

      console.log(isProductNotInCart);

      if (!isProductNotInCart) {
        let createProduct: IcartProduct = await cartProductModel.create({
          product: id,
          quantity,
          color,
          size,
        });

        console.log(createProduct);

        if (!createProduct) {
          return next(new ErrorHandler("invalid product!", 400));
        }

        getCart.products.push(createProduct._id as any);
        await getCart.save();
        console.log("run successfully!");
      } else {
        let quant = isProductNotInCart?.quantity;

        isProductNotInCart.quantity = quant + quantity;

        isProductNotInCart.save();
      }

      let newUpdatedCart: ICart = (await cartModel
        .findById({ _id: req.user.cart })
        .populate("products")) as ICart;
      let total = 0;
      // newUpdatedCart.products.forEach((ele) => {
      //     total += ele.product.
      // })

      redis.set(newUpdatedCart?._id.toString(), JSON.stringify(newUpdatedCart));

      return res.status(201).json({
        success: true,
        data: newUpdatedCart,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const viewCart = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let data = (await redis.get(req.user?.cart)) as string;

      if (data) {
        let cart: ICart = JSON.parse(data);
        res.status(201).json({
          success: true,
          data: cart,
        });
      }

      let cart: ICart = (await cartModel
        .findById({ _id: req.user.cart })
        .populate({
          path: "products",
          populate: {
            path: "product",
            model: "product",
          },
        })) as ICart;

      if (!cart) {
        return next(new ErrorHandler("invalid request", 400));
      }

      await redis.set(cart._id.toString(), JSON.stringify(cart));

      res.status(201).json({
        success: true,
        data: cart,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const removeFromCart = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;

      const deleteProduct: IcartProduct | null =
        await cartProductModel.findByIdAndDelete(id);

      if (!deleteProduct) {
        return next(new ErrorHandler("product not found!", 400));
      }

      let cart: ICart | null = await cartModel
        .findById(req.user.cart)
        .populate({
          path: "products",
          populate: {
            path: "product",
            model: "Product",
          },
        });

      if (!cart) {
        return next(new ErrorHandler("invalid request", 400));
      }

      cart.products = cart.products.filter(
        (product: any) =>
          product._id.toString() !== deleteProduct._id.toString()
      );

      await cart.save();
      await redis.set(cart._id.toString(), JSON.stringify(cart));

      res.status(201).json({
        success: true,
        data: cart,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
