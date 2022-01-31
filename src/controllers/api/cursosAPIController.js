const path = require('path');
const db = require('../../../database/models');
const sequelize = db.sequelize;
const {
    Op
} = require("sequelize");
const moment = require('moment');
const {
    QueryTypes
} = require('sequelize');
const Category = require('../../../database/models/Category');

const cursosAPIController = {
    'list': (req, res) => {

        db.sequelize.query("SELECT category.description AS categoría, COUNT(*) as Cantidad from universidog.cursos, universidog.category WHERE cursos.category = category.id and cursos.deleted_at IS NULL GROUP BY cursos.category", {
                type: QueryTypes.SELECT
            })
            .then(resultado => {
                db.Curso.findAll({
                    include:["categories"]
                })
                    .then(curso => {
                    
                        let respuesta = {
                            meta: {
                                status: 200,
                                url: 'api/cursos'
                            },
                            data: curso,
                            count: curso.length,
                            countByCategory: resultado
                                                 }
                        res.json(respuesta);
                    })
                
            })


    },

    'detail': (req, res) => {
        db.Curso.findByPk(req.params.id,
            {     include:["categories"]})
            .then(curso => {
                let respuesta = {
                    meta: {
                        status: 200,
                        url: '/api/cursos/' + req.params.id
                    },
                    data: producto,
                    image: "http://localhost:3003/images/cursos/"+ curso.image
                }
                res.json(respuesta);
            });
    }

}

module.exports = cursosAPIController;