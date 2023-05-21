"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const tileModel_1 = require("./tileModel");
const userModel_1 = require("./userModel");
exports.GameSchema = new mongoose_1.Schema({
    user: {
        type: userModel_1.UserSchema,
        required: true,
    },
    players: {
        type: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Player" }],
        required: true,
    },
    board: {
        type: [String],
        required: true,
    },
    deck: {
        type: [tileModel_1.TileSchema],
        required: true,
    },
}, {
    versionKey: false,
});
exports.default = mongoose_1.default.model("Game", exports.GameSchema);
