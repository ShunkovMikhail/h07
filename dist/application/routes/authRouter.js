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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const inputValidation_1 = require("../../inputValidation");
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const errorMapper_1 = require("../../utils/errorMapper");
const users_service_1 = require("../../domain/users-service");
const jwt_service_1 = require("../jwt-service");
const auth_middleware_1 = require("../../middlewares/auth-middleware");
exports.authRouter = (0, express_1.Router)({});
exports.authRouter.post('/login', inputValidation_1.loginVdChain, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, express_validator_1.validationResult)(req);
    if (result.isEmpty()) {
        const user = yield users_service_1.usersService.authenticate(req);
        if (user) {
            res.status(200).json({ accessToken: yield jwt_service_1.jwtService.createToken(user) });
        }
        else {
            res.sendStatus(401);
        }
    }
    else {
        res.status(400).json(yield (0, errorMapper_1.ErrorMapper)(result));
    }
}));
exports.authRouter.get('/me', auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const me = {
        email: req.user.email,
        login: req.user.login,
        userId: req.user.id
    };
    res.status(200).json(me);
}));
