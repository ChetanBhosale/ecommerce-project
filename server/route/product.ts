import { Router } from "express";
import { addToCart, createProduct, getProducts, removeFromCart, removeUploadedImage, updateProduct, uploadImage, viewCart, viewProductList } from "../controller/product.controller";
import { isAuthenticated, isSeller, isUser } from "../middleware/isAuthenticated";
const router:Router = Router();

router.get('/products',[isAuthenticated,isSeller],getProducts)
router.post('/product',[isAuthenticated,isSeller],createProduct)
router.put('/product/:id',[isAuthenticated,isSeller],updateProduct)


// image upload for product
router.post('/product-image/:id',[isAuthenticated,isSeller],uploadImage)
router.put('/product-image/:id',[isAuthenticated,isSeller],removeUploadedImage)

// normal user
router.get('/products-view',viewProductList)

// add to cart
router.post('/cart-product/:id',[isAuthenticated,isUser],addToCart)
router.get('/cart-product',[isAuthenticated,isUser],viewCart)
router.delete('/cart-product/:id',[isAuthenticated,isUser],removeFromCart)




export default router