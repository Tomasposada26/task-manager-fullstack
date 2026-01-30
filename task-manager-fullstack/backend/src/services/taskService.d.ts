export declare const createTaskService: (userId: string, data: any) => Promise<import("mongoose").Document<unknown, {}, import("../models/Task").ITask, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Task").ITask & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare const getTasksService: (userId: string, status?: string, priority?: string, page?: number, limit?: number) => Promise<{
    tasks: (import("mongoose").Document<unknown, {}, import("../models/Task").ITask, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Task").ITask & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[];
    total: number;
    page: number;
    totalPages: number;
}>;
export declare const getTaskByIdService: (userId: string, taskId: string) => Promise<import("mongoose").Document<unknown, {}, import("../models/Task").ITask, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Task").ITask & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare const updateTaskService: (userId: string, taskId: string, data: any) => Promise<import("mongoose").Document<unknown, {}, import("../models/Task").ITask, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Task").ITask & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare const deleteTaskService: (userId: string, taskId: string) => Promise<void>;
//# sourceMappingURL=taskService.d.ts.map