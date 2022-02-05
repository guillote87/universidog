const fs = require("fs");
const path = require("path");
const {
    validationResult,
    body
} = require('express-validator');
const db = require('../../database/models')

const cursosController = {
    createView: (req, res) => {
        db.Category.findAll()
            .then((allCategories) => {
                res.render("cursos/createCursos", {
                    allCategories
                });
            })
            .catch((error) => {
                console.log(error);
            })
    },
    
    create: (req, res) => {
        foto = req.file == undefined ? "default-image.png" : req.file.filename;

        let errors = validationResult(req)
        console.log("ERRRORES " + errors.errors.length)

        if (errors.errors.length > 0) {
            db.Category.findAll()
                .then((allCategories) => {
                    return res.render("cursos/createCursos", {
                        old: req.body,
                        allCategories,
                        errors: errors.mapped(),

                    });
                })
        } else {
            db.Curso.create({
                name: req.body.name,
                description: req.body.description,
                category: req.body.category,
                price: req.body.price,
                image: foto
            })
                .then(() => {
                    return res.redirect('/');
                })
                .catch((error) => {
                    console.log(error);
                });
        }



    },

    detail: (req, res) => {
        let id = req.params.id;

        db.Curso.findAll()
            .then(interes => {
                db.Curso.findByPk(id)
                    .then(curso => {
                        //  res.json(curso)
                        res.render("cursos/cursoDetail", {
                            curso,
                            interes
                        });
                    })
            })
            .catch((error) => {
                console.log(error);
            })
    },

    list: (req, res) => {
            db.Curso.findAll()
                .then(curso => {
                  res.render('cursos/cursosList',{curso});
                })
        },

    filter: (req, res) => {
        let filter = req.params.filter;
        db.Curso.findAll()
            .then(cursos => {
                let curso = curso.filter((id) => id.category == filter);
                res.render("index", {
                    curso,
                });
            })
    },
  
    editView: (req, res) => {
        let id = req.params.id;
        db.Curso.findByPk(id)
            .then((curso) => {
                db.Category.findAll()
                    .then((allCategories) => {
                        res.render("cursos/editCursos", {
                            allCategories,
                            curso
                        });
                    })
            })
    },
editForm: (req, res) => {
    let id_edit = req.params.id;

    db.Curso.findByPk(id_edit)
        .then(curso => {
            db.Curso.update({
                name: req.body.name || curso.name,
                price: req.body.price || curso.price,
                category: req.body.category || curso.category,
                description: req.body.description ? req.body.description : curso.description,
                image: req.file == undefined ? curso.image : req.file.filename

            }, {
                where: {
                    id : id_edit
                }
            })
                .then(() => {
                    return res.redirect("/cursos/" + id_edit);
                })
                .catch(error => res.send(error))

        })
},


    destroy: function (req, res) {
        let cursoId = req.params.id;
        db.Curso.destroy({
            where: {
                id : cursoId
            }
        }) // force: true es para asegurar que se ejecute la acción
            .then(() => {
                return res.redirect("/");
            })
            .catch(error => res.send(error))
    }



};

module.exports = cursosController;