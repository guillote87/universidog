const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");


const cursosController = require("../src/controllers/cursosController");
const authMiddleware = require("../src/middlewares/authMiddleware");
const guestMiddleware = require("../src/middlewares/guestMiddleware");
const cursosValidations = require('../src/middlewares/cursosValidations');
const adminMiddleware = require('../src/middlewares/adminMiddleware')

let multerDiskStorage = multer.diskStorage ({
    destination : (req,file,callback) =>{
        let folder = path.join (__dirname,"../public/images/cursos")
        console.log(__dirname)
        console.log(folder)
        callback(null,folder)
    },
    filename :(req,file,callback)=>{
        console.log(file)
        let image = Date.now() + path.extname(file.originalname)
        console.log(image)
        callback (null, image)
    }
})

const fileUpload = multer({storage: multerDiskStorage})

/*Ruta de listado */
router.get("/list",cursosController.list)

/* Rutas de creacion de cursos*/
router.get("/create",adminMiddleware,cursosController.createView);
router.post("/create",fileUpload.single("image"),cursosValidations, cursosController.create);
/* Rutas de detalle y filtro de cursos */

router.get("/:id", cursosController.detail);


/* Rutas de edicion de cursos */
router.get("/:id/edit",adminMiddleware, cursosController.editView);
router.put("/:id/edit",fileUpload.single("image") ,cursosValidations, cursosController.editForm);


router.get("/filter/:filter", cursosController.filter);

/* Rutas de eliminacion de curso */
router.delete("/:id/delete",adminMiddleware, cursosController.destroy);

module.exports = router;