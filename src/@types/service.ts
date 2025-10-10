export interface Response<T> {
	code: string;
	message: string;
	data: T;
}

export interface Pageable {
	currentPage: number;
	totalPages: number;
	totalElements: number;
	size: number;
}
