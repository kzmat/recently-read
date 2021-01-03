import { Octokit } from "@octokit/rest";
import { Book } from "./book";

export interface Publisher {
  publish: (book: Book) => void;
}

export class Gist implements Publisher {
  /**
   * Publish latest read book
   * @param book
   */
  async publish(book: Book): Promise<void> {
    const octokit = new Octokit({ auth: `token ${process.env.GH_TOKEN}` });

    const getGist = async () => {
      return await octokit.gists
        .get({ gist_id: process.env.GIST_ID! })
        .catch((error) => {
          throw new Error(`Unable to update gist\n${error}`);
        });
    };

    const udpateGist = async (filename: string) => {
      await octokit.gists.update({
        gist_id: process.env.GIST_ID,
        files: {
          [filename]: {
            filename: "Recently read 📚",
            content: `${book.title} \n${book.author}`,
          },
        },
      });
    };

    const gist = await getGist();
    const filename = Object.keys(gist.data.files!)[0];
    await udpateGist(filename);
  }
}
