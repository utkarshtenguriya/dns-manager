"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./db/database"));
const app_1 = require("./app");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, "..", ".env") });
(0, database_1.default)()
    .then(() => {
    app_1.app.listen(process.env.PORT || 8080, () => {
        console.log(`🌐 Server is running on port ${process.env.PORT || 8080} `);
    });
})
    .catch((err) => {
    console.error(`❗Failed to connect MongoDB \n`, err);
});
//# sourceMappingURL=index.js.map