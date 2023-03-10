import { Router } from "express";
import { body, oneOf } from "express-validator";
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from "./handlers/product";
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from "./handlers/update";
import { handleInputsErrors } from "./modules/middleware";

const router = Router();

/**
 * Product
 */

router.get("/product", getProducts);
router.get("/product/:id", getOneProduct);
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputsErrors,
  updateProduct
);
router.post("/product", body("name").isString(), handleInputsErrors, createProduct);
router.delete("/product/:id", deleteProduct);

/**
 * Update
 */

router.get("/update", getUpdates);
router.get("/update/:id", getOneUpdate);
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body('status').isIn(["IN_PROGRESS","SHIPPED","DEPRECATED"]).optional(),
  body("version").optional(),
  updateUpdate
);

router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body('productId').exists().isString(),
  createUpdate
);
router.delete("/update/:id", deleteUpdate);

/**
 * Update points
 */

router.get("/updatepoints", () => {});
router.get("/updatepoints/:id", () => {});
router.put(
  "/updatepoints/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  () => {}
);
router.post(
  "/updatepoints",
  body("name").isString(),
  body("description").isString(),
  body('updateId').exists().isString(),
  () => {}
);
router.delete("/updatepoints/:id", () => {});


router.use((err,req,res,next)=>{
  console.log(err);
  res.json({message:'router error handler'})
})

export default router;
