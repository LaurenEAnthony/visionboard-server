module.exports = (sequelize, DataTypes) => {
  const Relationship = sequelize.define("relationship", {
    user_1: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_2: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Relationship;
};
