import {App} from "@aws-cdk/core";
import {MagicLinkStack} from "./magic.link.stack";
import {UserPoolService} from "./user.pool.service";
import {LambdaService} from "./lambda.service";

const stackName = "MagicLink";
const bundlePath = "api";
const app = new App();
const userPoolService = new UserPoolService();
const lambdaService = new LambdaService();

new MagicLinkStack(app, stackName, {
    stackName,
    bundlePath,
    env: {
        region: "eu-west-1"
    }
}, userPoolService, lambdaService);
