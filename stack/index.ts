import {App, CfnOutput} from "@aws-cdk/core";
import {MagicLinkStack} from "./magic.link.stack";
import {UserPoolService} from "./user.pool.service";
import {LambdaService} from "./lambda.service";
import {MagicLinkStackOutput} from "./magic.link.stack.output";

function generateStack() {
    const stackName = "MagicLink";
    const bundlePath = "api";
    const app = new App();
    const userPoolService = new UserPoolService();
    const lambdaService = new LambdaService();
    const stack = new MagicLinkStack(app, stackName, {
        stackName,
        bundlePath,
        env: {
            region: "eu-west-1"
        }
    }, userPoolService, lambdaService);
    const outputs: Record<MagicLinkStackOutput, CfnOutput> = {
        [MagicLinkStackOutput.UserPoolId]: new CfnOutput(stack, MagicLinkStackOutput.UserPoolId, {
            value: stack.userPool.userPoolId
        }),
        [MagicLinkStackOutput.UserPoolClientId]: new CfnOutput(stack, MagicLinkStackOutput.UserPoolClientId, {
            value: stack.userPoolClient.userPoolClientId
        })
    }
}

generateStack();
