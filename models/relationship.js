module.exports = (sequelize, DataTypes) => {
  const Relationship = sequelize.define("relationship", {
    user1: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user2: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Relationship.associate = function (models) {
    Relationship.belongsTo(models.User),
      {
        foreignKey: "id",
        as: "user1",
      };
    Relationship.hasMany(models.User),
      {
        foreignKey: "id",
        as: "user2",
      };
  };
  return Relationship;
};
