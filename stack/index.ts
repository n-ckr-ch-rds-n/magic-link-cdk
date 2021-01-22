import {App} from "@aws-cdk/core";
import {MagicLinkStack} from "./magic.link.stack";

const app = new App();
new MagicLinkStack(app, "MagicLink", {});
