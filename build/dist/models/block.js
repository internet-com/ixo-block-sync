"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Block = /** @class */ (function () {
    function Block(block) {
        this.block = block;
    }
    Block.prototype.getBlockHeight = function () {
        return this.block.header.height;
    };
    Block.prototype.getChainId = function () {
        return this.block.header.chain_id;
    };
    Block.prototype.hasTransactions = function () {
        return (this.block.data.txs.length !== 0);
    };
    Block.prototype.getTransaction = function () {
        return (this.block.data.txs[0]);
    };
    return Block;
}());
exports.Block = Block;
var NewBlockEvent = /** @class */ (function () {
    function NewBlockEvent(block) {
        this.block = new Block(block);
    }
    NewBlockEvent.prototype.getBlock = function () {
        return this.block;
    };
    NewBlockEvent.prototype.getBlockHeight = function () {
        return this.getBlock().getBlockHeight();
    };
    NewBlockEvent.prototype.getChainId = function () {
        return this.getBlock().getChainId();
    };
    return NewBlockEvent;
}());
exports.NewBlockEvent = NewBlockEvent;
var BlockQueue = /** @class */ (function () {
    function BlockQueue(conn, startBlock) {
        this.conn = conn;
        this.curBlock = startBlock;
        this.started = false;
    }
    BlockQueue.prototype.onBlock = function (callback) {
        this.callback = callback;
    };
    BlockQueue.prototype.sleep = function (ms) {
        if (ms === void 0) { ms = 0; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (r) { return setTimeout(r, ms); })];
            });
        });
    };
    BlockQueue.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var noBlocks;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.started = true;
                        noBlocks = false;
                        _a.label = 1;
                    case 1:
                        if (!this.started) return [3 /*break*/, 5];
                        if (!noBlocks) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.sleep(500)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.conn.getBlock(this.curBlock).then(function (block) {
                            if (block) {
                                _this.callback(new NewBlockEvent(block));
                                ++_this.curBlock;
                            }
                            else {
                                noBlocks = true;
                            }
                        })];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    BlockQueue.prototype.stop = function () {
        this.started = false;
    };
    return BlockQueue;
}());
exports.BlockQueue = BlockQueue;
//# sourceMappingURL=block.js.map