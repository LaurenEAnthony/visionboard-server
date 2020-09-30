module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define("user", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    colorScheme: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });
  User.associate = function (models) {
    User.hasMany(models.Board, {
      foreignKey: "owner",
      as: "boards",
    });
    User.hasMany(models.Relationship, {
      foreignKey: "user1",
    });
    User.belongsTo(models.Relationship, {
      foreignKey: "user2",
    });
  };
  return User;
};

