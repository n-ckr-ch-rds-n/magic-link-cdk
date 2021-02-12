import {Construct} from "@aws-cdk/core";

export interface GenerateResourceRequest {
    scope: Construct;
    stackName: string;
}
