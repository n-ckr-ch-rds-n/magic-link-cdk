import {GenerateResourceRequest} from "./generate.resource.request";

export interface GenerateLambdasRequest extends GenerateResourceRequest {
    bundlePath: string;
}
