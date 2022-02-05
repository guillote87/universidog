module.exports = (sequelize, dataTypes) => {
    let alias = "Module";
    let cols = {
        id: {
            primaryKey: true,
            type: dataTypes.INTEGER(11),
            autoIncrement: true,
        },
        title: {
            type: dataTypes.STRING(45),
            allowNull: false,
        }
    };
    let config = {
        tableName: "module",
        timestamps: false,
    }
    const Module = sequelize.define(alias, cols, config);

    Module.associate = function (models)  {
        Module.belongsTo(models.Curso ,{
            foreignKey: 'module',
            as: 'curso'  })
        },
        Module.associate = function (models)  {
            Module.hasMany(models.Section ,{
                foreignKey: 'module',
                as: 'section'  })
            }
    
        return Module;
    }