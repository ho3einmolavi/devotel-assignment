export class StandardResponse {
  constructor(
    public status: number,
    public message: string,
    public payload: any,
    public errorTrace?: string,
  ) {}
}
