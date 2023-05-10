"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
var aws_serverless_express_1 = __importDefault(require("aws-serverless-express"));
var app_1 = __importDefault(require("./app"));
/**
 * @type {import('http').Server}
 */
var server = aws_serverless_express_1.default.createServer(app_1.default);
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
var handler = function (event, context) {
    console.log("EVENT: ".concat(JSON.stringify(event)));
    return aws_serverless_express_1.default.proxy(server, event, context, 'PROMISE').promise;
};
exports.handler = handler;
