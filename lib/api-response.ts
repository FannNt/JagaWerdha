export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
}

export const ResponseUtil = {
    success: <T>(message: string, data?: T): ApiResponse<T> => ({
        success: true,
        message,
        data,
    }),
    error: (message: string, error?: any): ApiResponse => ({
        success: false,
        message,
        error: typeof error === "string" ? error : JSON.stringify(error),
    }),
};
