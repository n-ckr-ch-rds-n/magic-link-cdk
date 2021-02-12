import {CognitoEventHandler} from "./cognito.event.handler";
import {ApiEventHandler} from "./api.event.handler";

export type MagicLinkLambdaName = CognitoEventHandler | ApiEventHandler;
export const MagicLinkLambdaName = {
    ...CognitoEventHandler,
    ...ApiEventHandler
}
