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
const stock_model_1 = __importDefault(require("./stock.model"));
const stocks_data_1 = require("./stocks.data");
const connectDB_1 = __importDefault(require("./connectDB"));
const stock_controller_1 = require("./stock.controller");
(0, connectDB_1.default)();
const importData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield stock_model_1.default.deleteMany();
        const predefinedStocks = stocks_data_1.stocks.map((stock) => {
            return Object.assign(Object.assign({}, stock), { price: (0, stock_controller_1.randomIntFromInterval)(101, 500) });
        });
        yield stock_model_1.default.insertMany(predefinedStocks);
        console.log("Data Imported!");
        process.exit();
    }
    catch (error) {
        console.error(`${error}`);
    }
});
const destroyData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield stock_model_1.default.deleteMany();
        console.log("Data Destroyed!");
        process.exit();
    }
    catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
});
if (process.argv[2] === "-d") {
    destroyData();
}
else {
    importData();
}
