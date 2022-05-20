import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Product = db.define(
  "product",
  {
    name: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DOUBLE,
    },
    stock: {
      type: DataTypes.DOUBLE,
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Product;
