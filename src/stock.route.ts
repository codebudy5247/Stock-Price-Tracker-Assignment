import express from "express";
import {
  findAllStocksController,
  findStockController,
} from "./stock.controller";

const router = express.Router();

router.route("/").get(findAllStocksController);

router.route("/:stockSymbol").get(findStockController);

export default router;
