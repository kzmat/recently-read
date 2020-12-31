import { Booklog, BookManager } from "./bookManager";
import { Parser, PuppeteerParser } from "./parser";
import { Gist, Publisher } from "./publisher";
import { Book } from "./book";

export default async function main(
  bookManager: BookManager,
  parser: Parser,
  publisher: Publisher
) {
  const book: Book = await bookManager.find(parser);

  publisher.publish(book);
}

main(new Booklog(), new PuppeteerParser(), new Gist());
