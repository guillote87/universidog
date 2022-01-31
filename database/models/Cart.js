module.exports = (sequelize, dataTypes) => {
    let alias = "Cart";
    let cols = {
        id: {
            primaryKey: true,
            type: dataTypes.INTEGER(11),
            autoIncrement: true,
        },
        id_usuario: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        }
        };
    let config = {
        tableName: "carrito",
        timestamps: false,
    }
    const Cart = sequelize.define(alias, cols, config);

    Cart.associate = function (models) {
        Cart.belongsToMany(models.Curso, {
                through: models.CartDetail 
            }),
            Cart.belongsTo(models.Usuario, {
                as: 'usuario',
                foreignKey: "id_usuario"
            })

    }

    return Cart
}