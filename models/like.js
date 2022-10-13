"use strict";
const { Model, QueryInterface } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    //
    static associate(models) {
      // define association here
      Like.belongsTo(models.Post, { foreignKey: "PostId" });
      Like.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  Like.init(
    {
      PostId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Like",
    }
  );
  return Like;
};
