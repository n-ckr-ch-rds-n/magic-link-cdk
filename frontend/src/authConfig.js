import Auth from "@aws-amplify/auth";
import {environment} from "./environment";

export const config = {
    Auth: {
        region: "eu-west-1",
        userPoolId: environment.userPoolId,
        userPoolWebClientId: environment.userPoolClientId,
        authenticationFlowType: "CUSTOM_AUTH"
    }
};

Auth.configure(config);
