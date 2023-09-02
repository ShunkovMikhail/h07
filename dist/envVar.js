"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtSecret = exports.mongoURI = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.mongoURI = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017';
exports.jwtSecret = process.env.JWT_SECRET || '12345';
