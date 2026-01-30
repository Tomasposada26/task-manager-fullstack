/**
 * Register a new user
 */
export declare const registerUserService: (email: string, password: string) => Promise<import("mongoose").Document<unknown, {}, import("../models/User").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("../models/User").IUser & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
/**
 * Login user and generate JWT
 */
export declare const loginUserService: (email: string, password: string) => Promise<{
    user: import("mongoose").Document<unknown, {}, import("../models/User").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("../models/User").IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    };
    token: string;
}>;
//# sourceMappingURL=authService.d.ts.map