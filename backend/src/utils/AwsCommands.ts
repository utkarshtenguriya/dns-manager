import { ChangeResourceRecordSetsCommand, ListResourceRecordSetsCommand } from "@aws-sdk/client-route-53";
import { RecordBody } from "../@types";


export const generateListRecordSetsCommand = (hosted_zone_id: string) => {
    const listRecordSetsCommand = new ListResourceRecordSetsCommand({
        HostedZoneId: hosted_zone_id,
    });

    return listRecordSetsCommand;
}

export const generateSingleRecordFetchCommand = (hosted_zone_id: string, Name: string) => {
    const listRecordsCommand = new ListResourceRecordSetsCommand({
        HostedZoneId: hosted_zone_id,
        StartRecordName: Name, // Optional: Start search from this record name
    });

    return listRecordsCommand;
}


export const generateCreateRecordCommand = (body: RecordBody, hosted_zone_id: string) => {
    const {Name, Type, TTL, ResourceRecords} = body

    const ChangeBatch: any = {
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

    return new ChangeResourceRecordSetsCommand({
        HostedZoneId: hosted_zone_id, // ID of the hosted zone
        ChangeBatch,
    });
}


export const generateDeleteRecordCommand = (body: RecordBody, hosted_zone_id: string) => {
    const {Name, Type, TTL, ResourceRecords} = body


    const ChangeBatch: any = {
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


    return new ChangeResourceRecordSetsCommand({
        HostedZoneId: hosted_zone_id, // ID of the hosted zone
        ChangeBatch,
    });
}