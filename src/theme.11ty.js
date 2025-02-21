import path from 'path';
import * as sass from 'sass';

export default class {
  // define meta data for this template,
  // just like you would with front matter in markdown.
  async data() {
    return {
      permalink: '/bundle.css',
      eleventyExcludeFromCollections: true,
      entryFile: path.join(process.cwd(), 'src/styles/main.scss'),
    };
  }

  // this function is mandatory and determines the contents of the
  // generated output file. it gets passed all our "front matter" data.
  async render({ entryFile }) {
    try {
      return sass.compile(entryFile).css;
    } catch (error) {
      throw error;
    }
  }
}
