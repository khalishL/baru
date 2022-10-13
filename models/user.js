"use strict";
const { hashPassword } = require("../helpers/bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, { foreignKey: "UserId" });
      User.hasMany(models.Like, { foreignKey: "UserId" });
      User.hasOne(models.Profile);
    }
  }
  User.init(
    {
      userName: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Please insert username",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Please insert password",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            msg: "Must be a valid email address",
          },
          notEmpty: {
            msg: "Please insert email",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.addHook("beforeCreate", (instance, options) => {
    instance.password = hashPassword(instance.password);
  });

  return User;
};
