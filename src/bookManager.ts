import { Book } from "./book";
import { Parser } from "./parser";
import axios from "axios";

export interface BookManager {
  find: (parser: Parser) => Promise<Book>;
}

export class Booklog implements BookManager {
  private readonly host = "https://booklog.jp";
  private readonly params =
    "?category_id=all&status=3&rank=all&sort=read_desc&display=front";

  /**
   * Find latest book user read
   * @param parser
   */
  async find(parser: Parser): Promise<Book> {
    const url = `${this.host}/users/${process.env.BOOKLOG_USER_ID}/all${this.params}`;
    if (await this.isDisAllowedScraping()) {
      throw new Error("Unable to parse");
    }
    return parser.parse(url);
  }

  private async isDisAllowedScraping(): Promise<boolean> {
    const { data: robotsTxt } = await axios.get<string>(
      `${this.host}/robots.txt`
    );

    return new RegExp("users/.*.all").test(robotsTxt);
  }
}
