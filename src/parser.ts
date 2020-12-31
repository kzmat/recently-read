import { launch } from "puppeteer";
import { Book } from "./book";

export interface Parser {
  parse: (url: string) => Promise<Book>;
}

export class PuppeteerParser implements Parser {
  /**
   * Parse url with puppeteer
   * @param url
   */
  async parse(url: string): Promise<Book> {
    const [bookAttribute, authorWithTitle] = await this.scraping(url);

    return this.transform(bookAttribute, authorWithTitle);
  }

  /**
   * Do scaping
   * @param url
   */
  private async scraping(url: string): Promise<[string, string]> {
    const browser = await launch({
      executablePath: "/usr/local/bin/chromium",
    });

    const page = await browser.newPage();
    await page.goto(url);

    const bookAttribute = await page.$eval("#front .shelf-item", (e) => e.id);
    const authorWithTitle = await page.$eval(".item-area-img", (e) =>
      e.getAttribute("title")
    );

    if (!authorWithTitle) throw new Error("Not found");
    return [bookAttribute, authorWithTitle];
  }

  /**
   * Transform to Book from scraping result
   * @param bookAttribute
   * @param authorWithTitle
   */
  private transform(bookAttribute: string, authorWithTitle: string): Book {
    const id = bookAttribute.match(new RegExp("[0-9].*$"))?.pop();
    const author = authorWithTitle.match(new RegExp("(.*)(?=『)"))?.pop();
    const title = authorWithTitle.match("(?<=『).*?(?=』)")?.pop();

    if (!id || !author || !title) throw new Error("Not found");

    return new Book(id, author, title);
  }
}
