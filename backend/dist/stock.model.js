"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stock = void 0;
const typegoose_1 = require("@typegoose/typegoose");
let Stock = class Stock {
};
__decorate([
    (0, typegoose_1.prop)({ unique: true, required: true }),
    __metadata("design:type", String)
], Stock.prototype, "company", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Stock.prototype, "price", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, minlength: 10, maxLength: 1000 }),
    __metadata("design:type", String)
], Stock.prototype, "description", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Stock.prototype, "symbol", void 0);
Stock = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            // Add createdAt and updatedAt fields
            timestamps: true,
        },
    })
], Stock);
exports.Stock = Stock;
// Create the book model from the Book class
const stockModel = (0, typegoose_1.getModelForClass)(Stock);
exports.default = stockModel;
