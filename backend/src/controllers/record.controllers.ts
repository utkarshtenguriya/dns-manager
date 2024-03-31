import { ApiResponse } from "../utils/ApiResponse";
import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { Route53Client, ResourceRecordSet } from "@aws-sdk/client-route-53";
import dotenv from "dotenv";
import {
    generateCreateRecordCommand,
    generateDeleteRecordCommand,
    generateListRecordSetsCommand,
    generateSingleRecordFetchCommand,
} from "../utils/AwsCommands";
import { RecordBody, TypedRequest } from "../@types";
import { ApiError } from "../utils/ApiError";
dotenv.config();

const client = new Route53Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_ACCESS_SECRET as string,
    },
});



/**
 * Define controller for creating records on AWS Route53 DNS record table
 * @param request
 * @param response
 *
 * @returns ResourceRecordSets
 */
const createRecord = asyncHandler(async (req: Request, res: Response) => {
    const hosted_zone_id = process.env.AWS_HOSTED_ZONE_ID as string;

    console.log(req.body);
    

    const command = generateCreateRecordCommand(req.body, hosted_zone_id);

    try {
        const flag = await client.send(command);
        console.log(flag);

        let data = null;

        if (flag) {
            data = (
                await client.send(
                    generateListRecordSetsCommand(hosted_zone_id)
                )
            ).ResourceRecordSets;
        }
        return res
            .status(200)
            .json(
                new ApiResponse(
                    201,
                    { data },
                    "Record set created successfully!"
                )
            );
    } catch (error: any) {
        console.error(error);
        return res
            .status(400)
            .json(
                new ApiResponse(
                    400,
                    { error: error.message },
                    "Failed to create record"
                )
            );
    }
});



/**
 * Controller define for retriving a list of records from AWS Rout53 DNS record table
 *
 * @param request
 * @param response
 *
 * @returns ResourceRecordSets
 */
const fetchRecord = asyncHandler(async (req: Request, res: Response) => {
    // extracting requesting body data
    const { hosted_zone_id } = req.body;

    try {
        const command = generateListRecordSetsCommand(
            process.env.AWS_HOSTED_ZONE_ID as string
        );

        const response = await client.send(command);

        const data: any = response.ResourceRecordSets;

        return res
            .status(200)
            .json(new ApiResponse(201, data, "Records fetch successfully"));
    } catch (error: any) {
        console.error(error);
        return res
            .status(400)
            .json(
                new ApiResponse(
                    400,
                    { error: error.message },
                    "Failed to fetch records"
                )
            );
    }
});


/**
 * Controller define for updating a record on AWS Rout53 DNS record table
 *
 * @param request
 * @param response
 *
 * @returns ResourceRecordSets
 */
const updateRecord = asyncHandler(
    async (req: TypedRequest<RecordBody>, res: Response) => {
        const hosted_zone_id = process.env.AWS_HOSTED_ZONE_ID as string;
        // extracting requesting body data
        const { Name } = req.body;

        console.log(req.body);

        try {
            // retriving the old records
            const awsResponse: ResourceRecordSet[] | undefined = (
                await client.send(
                    generateSingleRecordFetchCommand(hosted_zone_id, Name)
                )
            ).ResourceRecordSets;

            // through error if old record is missing
            if (!awsResponse) {
                throw new ApiError(400, "Cannot find resource while updating!");
            }

            // filtering the records to get the index specified one and store it in a variable
            const index = awsResponse?.findIndex((el) => el.Name == Name);
            let oldData: any = awsResponse[index];

            oldData = { ...oldData, hosted_zone_id };

            // delete the old record
            let flag = await client.send(
                generateDeleteRecordCommand(oldData, hosted_zone_id)
            );

            // check if the deletion operating successful or not
            if (!flag)
                throw new ApiError(
                    400,
                    "Cannot delete resource while updating!"
                );

            // create new record
            flag = await client.send(
                generateCreateRecordCommand(req.body, hosted_zone_id)
            );

            // check creation operation
            if (!flag)
                throw new ApiError(
                    400,
                    "Cannot create resource while updating!"
                );

            // retriving all records
            const data = (
                await client.send(generateListRecordSetsCommand(hosted_zone_id))
            ).ResourceRecordSets;

            if (!data)
                throw new ApiError(400, "Cannot retrive data while updating!");

            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        data,
                        "Resource updated successfully!"
                    )
                );
        } catch (error: any) {
            console.error(error);
            return res
                .status(400)
                .json(
                    new ApiResponse(
                        400,
                        { error: error.message },
                        "Failed to delete record!"
                    )
                );
        }
    }
);



/**
 * Controller define for deleting a record on AWS Rout53 DNS record table
 *
 * @param request
 * @param response
 *
 * @returns ResourceRecordSets
 */
const deleteRecord = asyncHandler(
    async (req: TypedRequest<RecordBody>, res: Response) => {
        const hosted_zone_id = process.env.AWS_HOSTED_ZONE_ID as string;

        console.log(req.body);
        
        const command = generateDeleteRecordCommand(req.body, hosted_zone_id);


        try {
            const dlFlag = await client.send(command);

            if (!dlFlag) {
                throw new ApiError(400, "Could not delete the record.");
            }

            const data = (
                await client.send(generateListRecordSetsCommand(hosted_zone_id))
            ).ResourceRecordSets;

            if (!data) {
                throw new ApiError(
                    400,
                    "Something went wrong while deleting data"
                );
            }

            return res
                .status(200)
                .json(
                    new ApiResponse(
                        201,
                         data,
                        "Record set deleted successfully!"
                    )
                );
        } catch (error: any) {
            console.error(error);
            return res
                .status(400)
                .json(
                    new ApiResponse(
                        400,
                        { error: error.message },
                        "Failed to delete record!"
                    )
                );
        }
    }
);

export { createRecord, fetchRecord, deleteRecord, updateRecord };
