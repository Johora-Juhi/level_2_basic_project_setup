export type TErrorSources = {
  path: number | string;
  message: string;
}[];

export type TGenericErrorResponse = {
  statusCode: number | string;
  message: string;
  errorSources: TErrorSources;
};
