export interface ResultData {
    isSuccess: boolean;
    results?: Record<string, any>[];
    totalPages?: number;
    currentPage?: number;
    nextPage?: number | null;
    previousPage?: number | null
    allCount?: number | null
    pageLinks?: string[]
}