import {Function} from "@aws-cdk/aws-lambda";
import {MagicLinkLambdaName} from "./magic.link.lambda.name";
import {GenerateResourceRequest} from "./generate.resource.request";

export interface GenerateUserPoolRequest extends GenerateResourceRequest {
    lambdas: Record<MagicLinkLambdaName, Function>
}
