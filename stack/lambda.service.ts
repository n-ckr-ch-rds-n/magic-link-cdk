import {AssetCode, Function, Runtime} from "@aws-cdk/aws-lambda";
import {ApiEventSource} from "@aws-cdk/aws-lambda-event-sources";
import {MagicLinkLambdaName} from "./magic.link.lambda.name";
import {GenerateLambdasRequest} from "./generate.lambdas.request";
import {CreateLambdaRequest} from "./create.lambda.request";

export class LambdaService {
    private runtime = Runtime.NODEJS_12_X;

    generateLambdas(request: GenerateLambdasRequest): Record<MagicLinkLambdaName, Function> {
        const code = this.toAssetCode(request.bundlePath);
        const lambdas = Object.values<MagicLinkLambdaName>(MagicLinkLambdaName)
            .reduce((acc, lambdaName) => ({
                ...acc,
                [lambdaName]: this.toLambda({
                    code,
                    lambdaName,
                    stackName: request.stackName,
                    scope: request.scope,
                })
            }), {} as Record<MagicLinkLambdaName, Function>);
        lambdas[MagicLinkLambdaName.Login].addEventSource(new ApiEventSource("post", "/login"));
        return lambdas;
    }

    private toAssetCode(bundlePath: string): AssetCode {
        return new AssetCode(bundlePath);
    }

    private toLambda(request: CreateLambdaRequest): Function {
        return new Function(request.scope, `${request.stackName}-${request.lambdaName}`, {
            runtime: this.runtime,
            code: request.code,
            handler: `${request.lambdaName}.handler`
        })
    }

}
