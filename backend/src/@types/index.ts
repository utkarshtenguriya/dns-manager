import { Types } from "mongoose";

export interface UserBody {
    _id: Types.ObjectId;
    username: string;
    email: string;
    password: string;
}

export interface ApiResponseInfer {
    statusCode: number;
    payload: Object;
    message: string;
    success: boolean;
}

export interface ApiErrorInfer {
    statusCode: number;
    data: null | Object;
    message: string;
    success: boolean;
    errors: Error[];
    stack?: string;
}

export interface LogInBody {
    email: string;
    password: string;
}

export interface tokenPayloadInfer {
    _id: Types.ObjectId;
    userName?: string;
    email?: string;
}

export interface RecordBody {
    Name: string;
    Type: string;
    TTL: number;
    ResourceRecords: [any];
    hosted_zone_id: string
}

export interface TypedRequest<T> {
    body: T;
    files?: File // optional:: for setting avater purpose
}
