"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllStocksController = exports.findStockController = exports.randomIntFromInterval = void 0;
const stock_model_1 = __importDefault(require("./stock.model"));
const stocks_data_1 = require("./stocks.data");
// Generate random number
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
exports.randomIntFromInterval = randomIntFromInterval;
const findStockController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const symbol = req.params.stockSymbol;
        const stock = stocks_data_1.stocks.find((s) => s.symbol === symbol);
        if (!stock) {
            return res.status(404).json({
                status: "fail",
                message: "Stock not found",
            });
        }
        let price = randomIntFromInterval(101, 500);
        res.status(200).json({
            symbol,
            price,
            name: stock.company,
            description: stock.description,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.findStockController = findStockController;
const findAllStocksController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stocks = yield stock_model_1.default.find({});
        res.status(200).json({
            status: "success",
            result: stocks.length,
            data: {
                stocks,
            },
        });
    }
    catch (err) {
        next(err);
    }
});
exports.findAllStocksController = findAllStocksController;
