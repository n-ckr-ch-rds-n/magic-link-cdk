import {App, Stack, StackProps} from "@aws-cdk/core";
import {UserPool, UserPoolClient} from "@aws-cdk/aws-cognito";
import {StackConfig} from "./stack.config";
import {UserPoolService} from "./user.pool.service";
import {LambdaService} from "./lambda.service";
import {Bucket} from "@aws-cdk/aws-s3";

export class MagicLinkStack extends Stack {

    public readonly userPool: UserPool;
    public readonly userPoolClient: UserPoolClient;

    constructor(app: App, id: string, props: StackConfig & StackProps,
                private userPoolService: UserPoolService,
                private lambdaService: LambdaService) {
        super(app, id, props);
        const stackName = props.stackName;
        const bundlePath = props.bundlePath;
        const scope = this;
        const lambdas = this.lambdaService.generateLambdas({
            stackName,
            bundlePath,
            scope
        });
        this.userPool = this.userPoolService.generateUserPool({
            stackName,
            lambdas,
            scope
        });
        this.userPoolClient = this.userPoolService.generateUserPoolClient(this.userPool, stackName);
        const bucketName = `${stackName}-webBucket`;
        const bucket = new Bucket(this, bucketName, {
            bucketName,
            websiteIndexDocument: "index.html",
            websiteErrorDocument: "index.html"
        });
    }

}
