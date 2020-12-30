export interface Parser {
  parse: (url: string) => Book;
}

export class PuppeteerParser implements Parser {
  parse(url: string): Book {
    return new Book("foo", "bar", "_");
  }
}
