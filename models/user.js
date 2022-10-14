"use strict";
const nodemailer = require("nodemailer");
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
      role: DataTypes.STRING,
      picture: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.addHook("beforeCreate", (instance, options) => {
    instance.password = hashPassword(instance.password);
  });
  User.addHook("afterCreate", (instance, options) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "khalishluthfi1@gmail.com",
        pass: "bguhfyojgwywlfnh", // inih sudah pke dummy email real
      },
    });

    var mailOptions = {
      from: "active-post@gmail.com",
      to: instance.email, // disini bebas masukin emai sapa aja
      subject: "Congratulations! You now have access to Active Post",
      text: "Selamat  nilai PP anda adalah 100!",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  });

  return User;
};
