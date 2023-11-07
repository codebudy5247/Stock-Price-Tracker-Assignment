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
const express_1 = __importDefault(require("express"));
require("dotenv").config();
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const stock_route_1 = __importDefault(require("./stock.route"));
const connectDB_1 = __importDefault(require("./connectDB"));
const port = process.env.PORT || 1337;
const app = (0, express_1.default)();
// Middleware
// Body Parser
app.use(express_1.default.json({ limit: "10kb" }));
// Logger
app.use((0, morgan_1.default)("dev"));
// Cors
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true,
}));
// Routes
app.use("/api/stock", stock_route_1.default);
// Testing
app.get("/health", (req, res, next) => {
    res.status(200).json({
        status: "success",
        message: "API is Up && Running 🚀🚀🚀",
    });
});
// UnKnown Routes
app.all("*", (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    err.statusCode = 404;
    next(err);
});
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`🚀 Server started on port: ${port}`);
    (0, connectDB_1.default)();
}));
