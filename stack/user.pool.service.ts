import {
    Mfa,
    OAuthScope, UserPool, UserPoolClient,
    UserPoolClientIdentityProvider,
    UserPoolClientOptions,
    UserPoolOperation,
    UserPoolProps
} from "@aws-cdk/aws-cognito";
import {Function} from "@aws-cdk/aws-lambda";
import {Construct} from "@aws-cdk/core";
import {CognitoEventHandler} from "./cognito.event.handler";
import {MagicLinkLambdaName} from "./magic.link.lambda.name";
import {GenerateUserPoolRequest} from "./generate.user.pool.request";

export class UserPoolService {

    private userPoolOperationByHandler: Record<CognitoEventHandler, UserPoolOperation> = {
        [CognitoEventHandler.DefineAuthChallenge]: UserPoolOperation.DEFINE_AUTH_CHALLENGE,
        [CognitoEventHandler.CreateAuthChallenge]: UserPoolOperation.CREATE_AUTH_CHALLENGE,
        [CognitoEventHandler.VerifyAuthChallenge]: UserPoolOperation.VERIFY_AUTH_CHALLENGE_RESPONSE
    }

    private userPoolConfig: UserPoolProps = {
        mfa: Mfa.OFF,
        autoVerify: {
            email: true
        },
        standardAttributes: {
            email: {required: true, mutable: true},
            preferredUsername: {mutable: true}
        },
        customAttributes: {
            authChallenge: {bind: () => ({dataType: "String", mutable: true})}
        },
        passwordPolicy: {
            minLength: 6,
            requireLowercase: false,
            requireDigits: true,
            requireSymbols: false,
            requireUppercase: true
        }
    };

    private userPoolClientConfig: UserPoolClientOptions = {
        generateSecret: false,
        oAuth: {
            flows: {implicitCodeGrant: true},
            scopes: [OAuthScope.EMAIL, OAuthScope.OPENID],
            callbackUrls: [
                "http://localhost:3001/auth/callback"
            ]
        },
        supportedIdentityProviders: [UserPoolClientIdentityProvider.COGNITO]
    };

    private userPoolNameSuffix = "userPool";
    private userPoolClientNameSuffix = "userPoolClient";

    generateUserPool(request: GenerateUserPoolRequest): UserPool {
        const userPool = this.toUserPool(request.stackName, request.scope);
        return this.assignCognitoHandlers(userPool, request.lambdas);
    }

    generateUserPoolClient(userPool: UserPool, stackName: string): UserPoolClient {
        const userPoolClientName = `${stackName}-${this.userPoolClientNameSuffix}`;
        return userPool.addClient(userPoolClientName, {
            userPoolClientName,
            ...this.userPoolClientConfig
        });
    }

    assignCognitoHandlers(userPool: UserPool, lambdas: Record<MagicLinkLambdaName, Function> ): UserPool {
        return Object.keys(this.userPoolOperationByHandler).reduce((acc, handlerName) => {
            userPool.addTrigger(this.userPoolOperationByHandler[handlerName], lambdas[handlerName])
            return userPool;
        }, userPool);
    }

    toUserPool(stackName: string, scope: Construct): UserPool {
        const userPoolName = `${stackName}-${this.userPoolNameSuffix}`;
        return new UserPool(scope, userPoolName, {
            userPoolName,
            ...this.userPoolConfig
        });
    }

}
