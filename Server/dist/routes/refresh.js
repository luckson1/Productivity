"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const refreshTokenControllers_1 = __importDefault(require("../controllers/refreshTokenControllers"));
const refreshRoutes = express_1.default.Router();
refreshRoutes.get("/", refreshTokenControllers_1.default);
exports.default = refreshRoutes;
