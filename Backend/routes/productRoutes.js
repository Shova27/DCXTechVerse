const express=require('express');
const router=express.Router();
const productController=require('../controllers/productController');
 
router.post('/', productController.addProduct);
router.get('/', productController.getAllProducts);
router.get('/search/:productName', productController.searchProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.get("/category", productController.getProductByCategory);
 
module.exports = router;