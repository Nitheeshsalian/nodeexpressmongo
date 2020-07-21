"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const boom = require('express-boom');
const connect_1 = __importDefault(require("./connect"));
const config_1 = require("./config/config");
const UserController = __importStar(require("./controllers/users_controller"));
const bootstrap_1 = require("./bootstrap");
const cors = require("cors");
const app = express_1.default();
const port = 5000 || process.env.PORT;
connect_1.default(config_1.db);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(cors());
app.use(boom());
app.get("/users", UserController.allUsers);
app.post("/login", UserController.login);
app.post("/signup", UserController.addUser);
app.listen(port, () => {
    console.log(`Server running on ${port}`);
    bootstrap_1.Bootstrap.initialize();
});
//# sourceMappingURL=app.js.map