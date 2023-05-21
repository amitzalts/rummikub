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
exports.createGame = exports.getAllGames = void 0;
const gameModel_1 = __importDefault(require("../model/gameModel"));
const secret = process.env.JWT_SECRET;
const getAllGames = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const games = yield gameModel_1.default.find({});
        res.status(200).json({ games });
    }
    catch (error) {
        console.error(error);
    }
});
exports.getAllGames = getAllGames;
const createGame = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req.cookies;
        const { players, board, deck } = req.body;
        const game = yield gameModel_1.default.create({ user, players, board, deck });
        res.send({ ok: true });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: "error.message" });
    }
});
exports.createGame = createGame;
