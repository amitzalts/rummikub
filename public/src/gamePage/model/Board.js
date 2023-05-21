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
class Board {
    constructor(tileArr = [], id = crypto.randomUUID()) {
        this.tileArr = tileArr;
        this.id = id;
        this.divArr = [];
    }
    buildEmptyBoard() {
        for (let i = 1; i <= 160; i++) {
            const newTile = new Tile("empty", -1);
            this.tileArr.push(newTile);
        }
        this.updateDivArr();
    }
    updateDivArr() {
        this.divArr = this.tileArr.map((tile) => tile.div);
        this.divArr.forEach((div) => toggleTileActive(div, this.divArr));
    }
    convertDivArrToTileArr() {
        this.tileArr = this.divArr.map((div) => {
            const color = div.dataset.color;
            const value = div.dataset.value;
            return new Tile(color, parseInt(value));
        });
    }
    updateBoardInDB() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Updating board...");
            this.convertDivArrToTileArr();
            yield fetch("api/v1/boards/updateBoard", {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ tileArr: this.tileArr, boardId: this.id }),
            }).catch((error) => console.error(error));
        });
    }
}
