"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
const todo_1 = __importDefault(require("./routes/todo"));
const dbURL = "mongodb://127.0.0.1:27017/typescript-prac";
mongoose_1.default
    .connect(dbURL)
    .then(() => console.log("db connected"))
    .catch((err) => console.log("not connected" + err));
app.use("/public", todo_1.default);
app.use((err, req, res, next) => {
    return res.status(500).send(err);
});
app.listen(3000);
