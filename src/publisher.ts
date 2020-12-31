import { Book } from "./book";

export interface Publisher {
  publish: (book: Book) => void;
}

export class Gist implements Publisher {
  publish(book: Book): void {
    console.log("Publish to gist", book);
  }
}
