import { Booklog, BookManager } from "./bookManager";
import { Parser, PuppeteerParser } from "./parser";
import { Gist, Publisher } from "./publisher";
import { Book } from "./book";

/**
 * Find latest book and publish
 * @param bookManager
 * @param parser
 * @param publisher
 */
export default async function execute(
  bookManager: BookManager,
  parser: Parser,
  publisher: Publisher
) {
  console.log(`Start finding book user ${process.env.BOOKLOG_USER_ID} read`);
  const book: Book = await bookManager.find(parser);
  console.log(`Found book: ${JSON.stringify(book)}`);

  console.info(`Publish latest read book`);
  await publisher.publish(book);
  console.info("Publish done");

  process.exit();
}

const resolveDependencies = (): [BookManager, Parser, Publisher] => {
  return [new Booklog(), new PuppeteerParser(), new Gist()];
};

execute(...resolveDependencies());
