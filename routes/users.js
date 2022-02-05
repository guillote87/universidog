const express = require('express');
const router = express.Router();
const multer = require("multer")
const path = require('path');
const usersController = require('../src/controllers/usersController')
const regVal = require('../src/middlewares/regValidations');
const authLoginMiddleware = require('../src/middlewares/authLoginMiddleware')
const guestMiddleware = require("../src/middlewares/guestMiddleware")
const authMiddleware = require("../src/middlewares/authMiddleware");

let multerDiskStorage = multer.diskStorage({
  destination: (req, file, callback) => {
      let folder = path.join(__dirname, "../public/images/usuarios")
      console.log(__dirname)
      console.log(folder)
      callback(null, folder)
  },
  filename: (req, file, callback) => {
      console.log(file)
      let image = Date.now() + path.extname(file.originalname)
      console.log(image)
      callback(null, image)
  }
})

const fileUpload = multer({ storage: multerDiskStorage })

/* GET users listing. */
router.get("/login",guestMiddleware,usersController.login);
router.get("/login",guestMiddleware,usersController.login);
router.post("/login", authLoginMiddleware ,usersController.loginProcess)

router.get("/list",usersController.list)

router.get ("/curso",authMiddleware,usersController.curso)
router.get("/register",guestMiddleware,usersController.register);
router.post("/register",fileUpload.single('image'), regVal, usersController.registerForm)

router.get("/profile",authMiddleware, usersController.profile)

router.get("/logout",usersController.logout)

router.delete('/delete/:id', usersController.destroy);

module.exports = router;