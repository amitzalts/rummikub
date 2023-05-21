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
exports.updatePlayerByAdmin = exports.updatePlayer = exports.deleteAllPlayers = exports.getAllPlayersInGame = exports.createPlayer = exports.getAllPlayers = void 0;
const playerModel_1 = __importDefault(require("../model/playerModel"));
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const gameModel_1 = __importDefault(require("../model/gameModel"));
const secret = process.env.JWT_SECRET;
const getAllPlayers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const players = yield playerModel_1.default.find({});
        res.status(200).json({ players });
    }
    catch (error) {
        console.error(error);
    }
});
exports.getAllPlayers = getAllPlayers;
const createPlayer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, hand } = req.body;
        const player = yield playerModel_1.default.create({ name, hand });
        res.status(200).json({ player });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});
exports.createPlayer = createPlayer;
const getAllPlayersInGame = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { gamdId } = req.cookies;
        if (!secret)
            throw new Error("No secret");
        if (!gamdId)
            throw new Error("No player found");
        const decodedGamdId = jwt_simple_1.default.decode(gamdId, secret);
        const game = yield gameModel_1.default.findById(decodedGamdId).populate("players");
        if (!game)
            return;
        const players = [game.players];
        res.send({ players });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: "error.message" });
    }
});
exports.getAllPlayersInGame = getAllPlayersInGame;
const deleteAllPlayers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedPlayers = yield playerModel_1.default.deleteMany({});
        res.status(200).send({ deletedPlayers });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});
exports.deleteAllPlayers = deleteAllPlayers;
const updatePlayer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { playerId, firstName, lastName, gender, playerName, email } = req.body;
        const takenEmailPlayer = yield playerModel_1.default.findOne({ email });
        // if (takenEmailPlayer){
        //   if (takenEmailPlayer.email !== email) {
        //     res.status(500).json({ ok: false, errorMessage: `Email already exists in the system` })
        //   }else if(takenEmailPlayer.email === email){
        //     updatedPlayer(playerId, firstName, lastName, gender, playerName, email, res)
        //   }
        // } else {
        //   updatedPlayer(playerId, firstName, lastName, gender, playerName, email, res)
        // }
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});
exports.updatePlayer = updatePlayer;
function updatedPlayer(playerId, firstName, lastName, gender, playerName, email, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedPlayer = yield playerModel_1.default.findByIdAndUpdate({ _id: playerId }, {
                firstName,
                lastName,
                gender,
                playerName,
                email,
            });
            const player = yield playerModel_1.default.findById(playerId);
            if (!secret)
                throw new Error("Missing jwt secret");
            const token = jwt_simple_1.default.encode({
                playerId: playerId,
                firstName: firstName,
                lastName: lastName,
                gender: gender,
                playerName: playerName,
                email: email,
                playerRole: "simple",
                role: "public",
            }, secret);
            res.cookie("player", token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            res.status(201).json({ ok: true, player });
        }
        catch (error) {
            console.error(error);
        }
    });
}
//////////////////////////
const updatePlayerByAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { playerId, firstName, lastName, gender, playerName, email } = req.body;
        const takenEmailPlayer = yield playerModel_1.default.findOne({ email });
        // if (takenEmailPlayer){
        //   if (takenEmailPlayer.email !== email) {
        //     res.status(500).json({ ok: false, errorMessage: `Email already exists in the system` })
        //   }else if(takenEmailPlayer.email === email){
        //     updatedPlayerByAdmin(playerId, firstName, lastName, gender, playerName, email, res)
        //   }
        // } else {
        //   updatedPlayerByAdmin(playerId, firstName, lastName, gender, playerName, email, res)
        // }
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});
exports.updatePlayerByAdmin = updatePlayerByAdmin;
function updatedPlayerByAdmin(playerId, firstName, lastName, gender, playerName, email, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedPlayer = yield playerModel_1.default.findByIdAndUpdate({ _id: playerId }, {
                firstName,
                lastName,
                gender,
                playerName,
                email,
            });
            const player = yield playerModel_1.default.findById(playerId);
            // const players = await Player.find({ playerRole: "simple" })
            res.status(201).json({ ok: true, player });
        }
        catch (error) {
            console.error(error);
        }
    });
}
