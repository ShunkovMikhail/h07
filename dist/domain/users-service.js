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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersService = void 0;
const users_repository_1 = require("../repositories/users-repository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_query_repository_1 = require("../repositories/query/users-query-repository");
exports.usersService = {
    create(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEntry = {
                id: yield users_repository_1.usersRepo.newID(),
                login: req.body.login,
                password: yield bcrypt_1.default.hash(req.body.password, 8),
                email: req.body.email,
                createdAt: new Date().toISOString()
            };
            yield users_repository_1.usersRepo.create(Object.assign({}, newEntry));
            //exclude certain fields and return rest.
            const { password } = newEntry, rest = __rest(newEntry, ["password"]);
            return rest;
        });
    },
    delete(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return users_repository_1.usersRepo.delete(req.params.id);
        });
    },
    authenticate(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_query_repository_1.usersQueryRepo.getDataByLoginOrEmail(req.body.loginOrEmail);
            if (user) {
                if (yield bcrypt_1.default.compare(req.body.password, user.password)) {
                    return user;
                }
            }
            return null;
        });
    }
};
