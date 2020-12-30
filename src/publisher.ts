export interface Publisher {
  publish: (book: Book) => void;
}

export class Gist implements Publisher {
  publish(book: Book): void {}
}
