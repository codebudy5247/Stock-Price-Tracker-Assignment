import { Request, Response, NextFunction } from "express";
import StockModel from "./stock.model";
import { stocks } from "./stocks.data";
import { log } from "console";

// Generate random number
export function randomIntFromInterval(min: any, max: any) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const findStockController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const symbol = req.params.stockSymbol;
    const stock = stocks.find((s) => s.symbol === symbol);

    if (!stock) {
      return res.status(404).json({
        status: "fail",
        message: "Stock not found",
      });
    }
    let price: any = randomIntFromInterval(101, 500);
    res.status(200).json({
      symbol,
      price,
      name: stock.company,
      description: stock.description,
    });
  } catch (err: any) {
    next(err);
  }
};

export const findAllStocksController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const stocks = await StockModel.find({});
    res.status(200).json({
      status: "success",
      result: stocks.length,
      data: {
        stocks,
      },
    });
  } catch (err) {
    next(err);
  }
};
