module.exports = (sequelize, dataTypes) => {
    let alias = "Section";
    let cols = {
        id: {
            primaryKey: true,
            type: dataTypes.INTEGER(11),
            autoIncrement: true,
        },
        title: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        description: {
            type: dataTypes.STRING(45),
            allowNull: false,
        }
    };
    let config = {
        tableName: "section",
        timestamps: false,
    }
    const Section = sequelize.define(alias, cols, config);

    Section.associate = function (models)  {
        Section.belongsTo(models.Module ,{
            foreignKey: 'module',
            as: 'section'  })
        },
        Section.associate = function (models)  {
            Section.hasMany(models.Media ,{
                foreignKey: 'section',
                as: 'media'  })
            }
    
        return Section;
    }