import path from 'node:path';
import { Router } from 'express';
import multer from 'multer';

import {
  createCategory,
  listCategory,
  listProductsByCategory,
} from './useCases/categories';
import { createProduct, listProducts } from './useCases/products';
import {
  cancelOrder,
  changeOrderStatus,
  createOrder,
  listOrders,
} from './useCases/orders';

const router = Router();
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', '..', 'uploads'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}.png`);
    },
  }),
});

router.get('/categories', listCategory);

router.post('/categories', createCategory);

router.get('/products', listProducts);

router.post('/products', upload.single('image'), createProduct);

router.get('/categories/:categoryId/products', listProductsByCategory);

router.get('/orders', listOrders);

router.post('/orders', createOrder);

router.patch('/orders/:orderId', changeOrderStatus);

router.delete('/orders/:orderId', cancelOrder);

export default router;
