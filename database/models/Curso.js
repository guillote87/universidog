const CartDetail = require("./CartDetail")

module.exports = (sequelize, dataTypes) => {
    let alias = "Curso"
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        description: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        category: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        price: {
            type: dataTypes.DOUBLE(10, 2),
            allowNull: false
        },
        created_at: dataTypes.DATE,
        updated_at: dataTypes.DATE,
        deleted_at: dataTypes.DATE
    }
    let config = {
        tableName: "cursos",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
        paranoid: true
    }

    const Curso = sequelize.define(alias, cols, config)

    Curso.associate = (models) => {
        Curso.belongsTo(models.Category, {
            as: 'categories',
            foreignKey: 'category'
        }),
            Curso.belongsToMany(models.Cart, {
                through: models.CartDetail
            })



    }

    return Curso
}