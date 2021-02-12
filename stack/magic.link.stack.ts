import {App, Stack, StackProps} from "@aws-cdk/core";
import {AssetCode, Function, Runtime} from "@aws-cdk/aws-lambda";
import {ApiEventSource} from "@aws-cdk/aws-lambda-event-sources";
import {Mfa, UserPool} from "@aws-cdk/aws-cognito";
import {StackConfig} from "./stack.config";
import {UserPoolService} from "./user.pool.service";
import {LambdaService} from "./lambda.service";

export class MagicLinkStack extends Stack {
    constructor(app: App, id: string, props: StackConfig & StackProps,
                private userPoolService: UserPoolService,
                private lambdaService: LambdaService) {
        super(app, id, props);

        const runtime = Runtime.NODEJS_12_X;
        const code = new AssetCode("api");

        const login = new Function(this, "Login", {
            runtime,
            code,
            handler: "login.handler"
        }).addEventSource(new ApiEventSource("post", "/login")) // enable CORS?

        const defineAuthChallenge = new Function(this, "DefineAuthChallenge", {
            runtime,
            code,
            handler: "define-auth-challenge.handler"
        });

        const userPool = new UserPool(this, "MagicLinkUserPool", {
            mfa: Mfa.OFF,
            userPoolName: "magic-link-user-pool",
            autoVerify: {
                email: true
            }
        });
    }

}
