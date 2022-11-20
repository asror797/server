import { Router , Request, Response } from "express";
import companyController from "../controllers/company.controller";
import company_typeController from "../controllers/company_type.controller";
const router = Router()

import orderController from "../controllers/order.controller";
import positionsController from "../controllers/positions.controller";
import postions_catController from "../controllers/postions_cat.controller";
import pricesController from "../controllers/prices.controller";
import processController from "../controllers/process.controller";
import productController from "../controllers/product.controller";
import { checkCompany } from "../middlwares/checkcompany";
import usersController from "./../controllers/users.controller"


router
      // PRODUCTS
      .get('/products', productController.GET)
      .get('/product/:id', productController.GET_PRODUCT_BY_ID)
      .post('/product', productController.INSERT_PRODUCT)

      // POSITION CATEGORY
      .get('/position-categories',postions_catController.GET)
      .get('/position-category/:id',postions_catController.GET_BY_ID)
      .post('/position-category',postions_catController.INSERT_CATEGORY)
      

      // PRICES 
      .get('/prices',pricesController.GET)
      .post('/price',pricesController.INSERT_PRICE)
      .post('/update/price',pricesController.UPDATE_COST)

      // STAFF
      .get('/staff', usersController.GET)
      .get('/staff/:id',usersController.GET_BY_USER_ID)
      .get('/staff-count',usersController.GET_USER_COUNT)
      .post('/staff',usersController.INSERT_NEW_USER)

      // POSITIONS
      .get('/positions',positionsController.GET)
      .post('/position',positionsController.INSERT_POSITION)

      // PROCESSES
      .get('/processes',processController.GET)
      .post('/process',processController.INSERT_NEW_PROCESS)

      // ORDER
      .get('/orders',orderController.GET)
      .get('/order/:id',orderController.GET_BY_ID)
      .post('/order',orderController.INSERT_ORDER)
      .post('/order/process',orderController.INSERT_PROCESS)

      // COMPANY TYPES
      .get('/types',company_typeController.GET)
      .post('/company-type',company_typeController.INSERT_TYPE_OF_COMPANY)

      // COMPANY 
      .get('/companies',companyController.GET)
      .post('/company',companyController.INSERT_COMPANIES)



      // AUTHORIZED 
      .post('/login',usersController.LOGIN_USERS)

      // TEST ROUTE
      .get('/test', checkCompany, (req:Request,res:Response) => { console.log(req.body.company_id); res.json("ok")})

      
      // .get('/',usersController.GET)  // GET USERS
      // .get('/position-cat',postions_catController.GET)  // GET POSITIONS CATEGORY
      // .get('/prices',pricesController.GET)   // GET PRICES 
      // .get('/positions',positionsController.GET)    // GET POSITIONS 
      // .post('/new-user',usersController.INSERT_NEW_USER)   // INSERT NEW USERS
      // .post('/new-cat',postions_catController.INSERT_CATEGORY)   // INSERT POSITIONS CATEGORY
      // .post('/insert-position',usersController.INSERT_POSITION)   // INSERT NEW POSITIONS USING USERS
      // .post('/new-position',positionsController.INSERT_POSITION)   // INSERT NEW POSITIONS 
      // .post('/login',usersController.LOGIN_USERS)   //  LOGIN USERS


export default router;
