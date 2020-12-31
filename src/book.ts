export class Book {
  constructor(
    private _id: string,
    private _title: string,
    private _author: string
  ) {}

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get author(): string {
    return this._author;
  }
}
