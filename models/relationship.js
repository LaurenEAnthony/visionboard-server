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
  return Relationship;
};
