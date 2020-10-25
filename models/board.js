module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define("board", {
    owner: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    boardTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    tags: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    sharedBoard: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    }
  });
  Board.associate = function (models) {
    Board.belongsTo(models.User, {
      foreignKey: "owner",
      onDelete: "CASCADE",
    });
    Board.hasMany(models.Item, {
      foreignKey: "boardId",
      as: "items",
    });
  };
  return Board;
};
