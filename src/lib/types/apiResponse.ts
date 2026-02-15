export interface ApiResponse<T> {
    success: boolean;
    result: T;
}

export interface ApiResponseWithPagination<T> {
    success: boolean;
    result: T;
    pagination: {
        offset: number;
        limit: number;
        total: number;
        currentPage: number;
        totalPages: number;
        hasNext: boolean;
        hasPrevious: boolean;
    };
}