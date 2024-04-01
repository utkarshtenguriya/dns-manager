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
exports.updateRecord = exports.deleteRecord = exports.fetchRecord = exports.createRecord = void 0;
const ApiResponse_1 = require("../utils/ApiResponse");
const asyncHandler_1 = require("../utils/asyncHandler");
const client_route_53_1 = require("@aws-sdk/client-route-53");
const dotenv_1 = __importDefault(require("dotenv"));
const AwsCommands_1 = require("../utils/AwsCommands");
const ApiError_1 = require("../utils/ApiError");
dotenv_1.default.config();
const client = new client_route_53_1.Route53Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: process.env.AMAZONE_ACCESS_KEY,
        secretAccessKey: process.env.AMAZONE_ACCESS_SECRET,
    },
});
/**
 * Define controller for creating records on AWS Route53 DNS record table
 * @param request
 * @param response
 *
 * @returns ResourceRecordSets
 */
const createRecord = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hosted_zone_id = process.env.AMAZONE_HOSTED_ZONE_ID;
    console.log(req.body);
    const command = (0, AwsCommands_1.generateCreateRecordCommand)(req.body, hosted_zone_id);
    try {
        const flag = yield client.send(command);
        console.log(flag);
        let data = null;
        if (flag) {
            data = (yield client.send((0, AwsCommands_1.generateListRecordSetsCommand)(hosted_zone_id))).ResourceRecordSets;
        }
        return res
            .status(200)
            .json(new ApiResponse_1.ApiResponse(201, { data }, "Record set created successfully!"));
    }
    catch (error) {
        console.error(error);
        return res
            .status(400)
            .json(new ApiResponse_1.ApiResponse(400, { error: error.message }, "Failed to create record"));
    }
}));
exports.createRecord = createRecord;
/**
 * Controller define for retriving a list of records from AWS Rout53 DNS record table
 *
 * @param request
 * @param response
 *
 * @returns ResourceRecordSets
 */
const fetchRecord = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // extracting requesting body data
    try {
        const command = (0, AwsCommands_1.generateListRecordSetsCommand)(process.env.AMAZONE_HOSTED_ZONE_ID);
        const response = yield client.send(command);
        const data = response.ResourceRecordSets;
        return res
            .status(200)
            .json(new ApiResponse_1.ApiResponse(201, data, "Records fetch successfully"));
    }
    catch (error) {
        console.error(error);
        return res
            .status(400)
            .json(new ApiResponse_1.ApiResponse(400, { error: error.message }, "Failed to fetch records"));
    }
}));
exports.fetchRecord = fetchRecord;
/**
 * Controller define for updating a record on AWS Rout53 DNS record table
 *
 * @param request
 * @param response
 *
 * @returns ResourceRecordSets
 */
const updateRecord = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hosted_zone_id = process.env.AMAZONE_HOSTED_ZONE_ID;
    // extracting requesting body data
    const { Name } = req.body;
    console.log(req.body);
    try {
        // retriving the old records
        const awsResponse = (yield client.send((0, AwsCommands_1.generateSingleRecordFetchCommand)(hosted_zone_id, Name))).ResourceRecordSets;
        // through error if old record is missing
        if (!awsResponse) {
            throw new ApiError_1.ApiError(400, "Cannot find resource while updating!");
        }
        // filtering the records to get the index specified one and store it in a variable
        const index = awsResponse === null || awsResponse === void 0 ? void 0 : awsResponse.findIndex((el) => el.Name == Name);
        let oldData = awsResponse[index];
        oldData = Object.assign(Object.assign({}, oldData), { hosted_zone_id });
        // delete the old record
        let flag = yield client.send((0, AwsCommands_1.generateDeleteRecordCommand)(oldData, hosted_zone_id));
        // check if the deletion operating successful or not
        if (!flag)
            throw new ApiError_1.ApiError(400, "Cannot delete resource while updating!");
        // create new record
        flag = yield client.send((0, AwsCommands_1.generateCreateRecordCommand)(req.body, hosted_zone_id));
        // check creation operation
        if (!flag)
            throw new ApiError_1.ApiError(400, "Cannot create resource while updating!");
        // retriving all records
        const data = (yield client.send((0, AwsCommands_1.generateListRecordSetsCommand)(hosted_zone_id))).ResourceRecordSets;
        if (!data)
            throw new ApiError_1.ApiError(400, "Cannot retrive data while updating!");
        return res
            .status(200)
            .json(new ApiResponse_1.ApiResponse(200, data, "Resource updated successfully!"));
    }
    catch (error) {
        console.error(error);
        return res
            .status(400)
            .json(new ApiResponse_1.ApiResponse(400, { error: error.message }, "Failed to delete record!"));
    }
}));
exports.updateRecord = updateRecord;
/**
 * Controller define for deleting a record on AWS Rout53 DNS record table
 *
 * @param request
 * @param response
 *
 * @returns ResourceRecordSets
 */
const deleteRecord = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hosted_zone_id = process.env.AMAZONE_HOSTED_ZONE_ID;
    console.log(req.body);
    const command = (0, AwsCommands_1.generateDeleteRecordCommand)(req.body, hosted_zone_id);
    try {
        const dlFlag = yield client.send(command);
        if (!dlFlag) {
            throw new ApiError_1.ApiError(400, "Could not delete the record.");
        }
        const data = (yield client.send((0, AwsCommands_1.generateListRecordSetsCommand)(hosted_zone_id))).ResourceRecordSets;
        if (!data) {
            throw new ApiError_1.ApiError(400, "Something went wrong while deleting data");
        }
        return res
            .status(200)
            .json(new ApiResponse_1.ApiResponse(201, data, "Record set deleted successfully!"));
    }
    catch (error) {
        console.error(error);
        return res
            .status(400)
            .json(new ApiResponse_1.ApiResponse(400, { error: error.message }, "Failed to delete record!"));
    }
}));
exports.deleteRecord = deleteRecord;
//# sourceMappingURL=record.controllers.js.map