"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDeleteRecordCommand = exports.generateCreateRecordCommand = exports.generateSingleRecordFetchCommand = exports.generateListRecordSetsCommand = void 0;
const client_route_53_1 = require("@aws-sdk/client-route-53");
const generateListRecordSetsCommand = (hosted_zone_id) => {
    const listRecordSetsCommand = new client_route_53_1.ListResourceRecordSetsCommand({
        HostedZoneId: hosted_zone_id,
    });
    return listRecordSetsCommand;
};
exports.generateListRecordSetsCommand = generateListRecordSetsCommand;
const generateSingleRecordFetchCommand = (hosted_zone_id, Name) => {
    const listRecordsCommand = new client_route_53_1.ListResourceRecordSetsCommand({
        HostedZoneId: hosted_zone_id,
        StartRecordName: Name, // Optional: Start search from this record name
    });
    return listRecordsCommand;
};
exports.generateSingleRecordFetchCommand = generateSingleRecordFetchCommand;
const generateCreateRecordCommand = (body, hosted_zone_id) => {
    const { Name, Type, TTL, ResourceRecords } = body;
    const ChangeBatch = {
        Changes: [
            {
                Action: "CREATE",
                ResourceRecordSet: {
                    Name,
                    Type,
                    TTL,
                    ResourceRecords
                },
            },
        ],
    };
    return new client_route_53_1.ChangeResourceRecordSetsCommand({
        HostedZoneId: hosted_zone_id, // ID of the hosted zone
        ChangeBatch,
    });
};
exports.generateCreateRecordCommand = generateCreateRecordCommand;
const generateDeleteRecordCommand = (body, hosted_zone_id) => {
    const { Name, Type, TTL, ResourceRecords } = body;
    const ChangeBatch = {
        Changes: [
            {
                Action: "DELETE",
                ResourceRecordSet: {
                    Name,
                    Type,
                    TTL,
                    ResourceRecords,
                },
            },
        ],
    };
    return new client_route_53_1.ChangeResourceRecordSetsCommand({
        HostedZoneId: hosted_zone_id, // ID of the hosted zone
        ChangeBatch,
    });
};
exports.generateDeleteRecordCommand = generateDeleteRecordCommand;
//# sourceMappingURL=AwsCommands.js.map