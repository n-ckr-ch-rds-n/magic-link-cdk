import {Stack, App, StackProps} from "@aws-cdk/core";
import {AssetCode, Runtime, Function} from "@aws-cdk/aws-lambda";

export class MagicLinkStack extends Stack {
    constructor(app: App, id: string, props?: StackProps) {
        super(app, id, props);

        const login = new Function(this, "Login", {
            runtime: Runtime.NODEJS_12_X,
            handler: "login.handler",
            code: new AssetCode("api")
        })

    }

}
