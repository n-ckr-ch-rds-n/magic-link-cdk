import {Stack, App, StackProps} from "@aws-cdk/core";
import {AssetCode, Runtime, Function} from "@aws-cdk/aws-lambda";
import {ApiEventSource} from "@aws-cdk/aws-lambda-event-sources";
import {UserPool} from "@aws-cdk/aws-cognito";

export class MagicLinkStack extends Stack {
    constructor(app: App, id: string, props?: StackProps) {
        super(app, id, props);

        const login = new Function(this, "Login", {
            runtime: Runtime.NODEJS_12_X,
            handler: "login.handler",
            code: new AssetCode("api")
        }).addEventSource(new ApiEventSource("post", "/login")) // enable CORS?

        const defineAuthChallenge = new Function(this, "DefineAuthChallenge", {
            runtime: Runtime.NODEJS_12_X,
            handler: "define-auth-challenge.handler",
            code: new AssetCode("api")
        });

        const userPool = new UserPool(this, "MagicLinkUserPool");
    }

}
