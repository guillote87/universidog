module.exports = (sequelize, dataTypes) => {
    let alias = "Media";
    let cols = {
        id: {
            primaryKey: true,
            type: dataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
        },
        description: {
            type: dataTypes.STRING(50),
            allowNull: false,
        },
    };
    let config = {
        tableName: "medias",
        timestamps: false,
    }
    const Media = sequelize.define(alias, cols, config);

    Media.associate = (models) => {
        Media.belongsTo(models.Section, {
            as: 'section',
             foreignKey: 'media'
          
        })
    }

    return Media;
}