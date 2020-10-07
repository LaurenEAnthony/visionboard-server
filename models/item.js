module.exports = (sequelize, DataTypes) => {


    const Item = sequelize.define('items', {

        boardId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        itemTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        photo: {
            type: DataTypes.STRING(1000),
            allowNull: true
        }
      })


  Item.associate = function (models) {
    Item.belongsTo(models.Board, {
      foreignKey: "boardId",
      onDelete: "CASCADE",
    });
  };
  return Item;
};
