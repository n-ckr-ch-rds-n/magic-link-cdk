import {App} from "@aws-cdk/core";
import {MagicLinkStack} from "./magic.link.stack";

const stackName = "MagicLink";
const bundlePath = "api";
const app = new App();
new MagicLinkStack(app, stackName, {
    stackName,
    bundlePath,
    env: {
        region: "eu-west-1"
    }
});
