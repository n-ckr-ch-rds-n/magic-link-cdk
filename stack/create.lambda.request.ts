import {AssetCode} from "@aws-cdk/aws-lambda";
import {GenerateResourceRequest} from "./generate.resource.request";

export interface CreateLambdaRequest extends GenerateResourceRequest {
    lambdaName: string;
    code: AssetCode;
}
