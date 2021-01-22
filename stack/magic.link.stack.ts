import {Stack, App, StackProps} from "@aws-cdk/core";

export class MagicLinkStack extends Stack {
    constructor(app: App, id: string, props?: StackProps) {
        super(app, id, props);
    }
}
