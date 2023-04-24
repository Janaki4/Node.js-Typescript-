export function successResponse<T extends {} | string>(data: T) {
    return {
        result: 1,
        data
    }
}

export function errorResponse<T extends {} | string>(data: T) {
    return {
        result: 0,
        data
    }

}