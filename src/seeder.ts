import mongoose from "mongoose";
import stockModel from "./stock.model";
import { stocks } from "./stocks.data";
import connectDB from "./connectDB";
import { randomIntFromInterval } from "./stock.controller";

connectDB();

const importData = async () => {
  try {
    await stockModel.deleteMany();
    const predefinedStocks = stocks.map((stock) => {
      return { ...stock, price: randomIntFromInterval(101, 500) };
    });

    await stockModel.insertMany(predefinedStocks);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
  }
};

const destroyData = async () => {
  try {
    await stockModel.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
