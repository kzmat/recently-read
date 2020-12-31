import { Book } from "./book";
import { Parser } from "./parser";

export interface BookManager {
  find: (parser: Parser) => Promise<Book>;
}

export class Booklog implements BookManager {

  /**
   * Find latest book user read
   * @param parser 
   */
  find(parser: Parser): Promise<Book> {
    const host = "https://booklog.jp";
    const params =
      "?category_id=all&status=3&rank=all&sort=read_desc&display=front";
    const url = `${host}/users/${process.env.BOOKLOG_USER_ID}/all${params}`;

    return parser.parse(url);
  }
}
