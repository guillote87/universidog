const db = require(".");

module.exports = (sequelize, dataTypes) => {
    let alias = "CursoDetail";
        let config = {
        tableName: "detalle_curso",
        timestamps: false,
    }
    const CursoDetail = sequelize.define(alias, config);

 
       return CursoDetail;
}