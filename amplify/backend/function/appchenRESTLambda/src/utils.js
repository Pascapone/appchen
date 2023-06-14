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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAwsTimeToISODateString = exports.awsTimeToMilliseconds = exports.graphQlRequest = void 0;
var sha256_js_1 = require("@aws-crypto/sha256-js");
var credential_provider_node_1 = require("@aws-sdk/credential-provider-node");
var signature_v4_1 = require("@aws-sdk/signature-v4");
var protocol_http_1 = require("@aws-sdk/protocol-http");
var node_fetch_1 = __importDefault(require("node-fetch"));
var node_fetch_2 = require("node-fetch");
var GRAPHQL_ENDPOINT = process.env.API_APPCHENGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT;
var AWS_REGION = process.env.AWS_REGION || 'us-east-1';
var graphQlRequest = function (query, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var endpoint, signer, requestToBeSigned, signed, request, body, response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                endpoint = new URL(GRAPHQL_ENDPOINT);
                signer = new signature_v4_1.SignatureV4({
                    credentials: (0, credential_provider_node_1.defaultProvider)(),
                    region: AWS_REGION,
                    service: 'appsync',
                    sha256: sha256_js_1.Sha256
                });
                requestToBeSigned = new protocol_http_1.HttpRequest({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        host: endpoint.host
                    },
                    hostname: endpoint.host,
                    body: JSON.stringify({ query: query, variables: variables }),
                    path: endpoint.pathname
                });
                return [4 /*yield*/, signer.sign(requestToBeSigned)];
            case 1:
                signed = _a.sent();
                request = new node_fetch_2.Request(endpoint, signed);
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, (0, node_fetch_1.default)(request)];
            case 3:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 4:
                body = _a.sent();
                if (body.errors) {
                    throw new Error(body.errors[0].message);
                }
                return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                console.log("App Error:", error_1);
                throw error_1;
            case 6: return [2 /*return*/, body];
        }
    });
}); };
exports.graphQlRequest = graphQlRequest;
var awsTimeToMilliseconds = function (timeString) {
    var strip = timeString.slice(0, -4);
    var times = strip.split(':');
    return times.reduce(function (accumulator, currentValue, index) {
        var number = Number(currentValue);
        switch (index) {
            case 0:
                number *= 60 * 60 * 1000;
                break;
            case 1:
                number *= 60 * 1000;
                break;
            case 2:
                number *= 1000;
                break;
        }
        return accumulator + number;
    }, 0);
};
exports.awsTimeToMilliseconds = awsTimeToMilliseconds;
var addAwsTimeToISODateString = function (ISODateString, timeString) {
    var milliseconds = (0, exports.awsTimeToMilliseconds)(timeString);
    var date = new Date(ISODateString);
    return new Date(date.getTime() + milliseconds).toISOString();
};
exports.addAwsTimeToISODateString = addAwsTimeToISODateString;
