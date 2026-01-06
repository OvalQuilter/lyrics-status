import { IFieldAuthMethod } from "./AuthMethods/IFieldAuthMethod";
import { IOAuthMethod } from "./AuthMethods/IOAuthMethod";

export type IAuthMethod = IFieldAuthMethod | IOAuthMethod
