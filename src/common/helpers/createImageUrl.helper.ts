export const createImageUrl = (url: string) => `${process.env.REACT_APP_S3_MEDIA}/${url}`;
export const createImageUrlFromBackend = (url: string) => `${process.env.REACT_APP_API_BASE_URL}/${url}`;
