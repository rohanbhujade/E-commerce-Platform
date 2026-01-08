import express from 'express'
import { listproducts,addproduct,singleproduct,removeproduct } from '../controllers/productController.js'
import upload from '../middleware/multer.js'
import adminAuth from '../middleware/adminAuth.js'
const productrouter=express.Router()
productrouter.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addproduct)
productrouter.post('/remove',adminAuth,removeproduct)
productrouter.post('/single',singleproduct)
productrouter.get('/list',listproducts)
export default productrouter