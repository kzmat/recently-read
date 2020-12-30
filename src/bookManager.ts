import { Parser } from "./parser";

export interface BookManager {
  find: (parser: Parser) => Book;
}

export class Booklog implements BookManager {
  find(parser: Parser) {
    return new Book("foo", "bar", "_");
  }
}
