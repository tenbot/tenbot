export interface ArticleOptions {
  title: string;
  description?: string;
  url: string;
  picurl?: string;
}

export interface ArticleSendObject {
  title: string;
  description?: string;
  url: string;
  picurl?: string;
}

export interface ArticleReplyObject {
  Title: string;
  Description?: string;
  Url: string;
  Picurl?: string;
}

export class Article {
  protected readonly title: string;
  protected readonly description?: string;
  protected readonly url: string;
  protected readonly picurl?: string;

  constructor(options: ArticleOptions) {
    this.title = options.title;
    this.description = options.description;
    this.url = options.url;
    this.picurl = options.picurl;
  }

  toSendObject(): ArticleSendObject {
    const sendObject: ArticleSendObject = {
      title: this.title,
      url: this.url,
    };

    if (this.description) {
      sendObject.description = this.description;
    }

    if (this.picurl) {
      sendObject.picurl = this.picurl;
    }

    return sendObject;
  }

  toReplyObject(): ArticleReplyObject {
    const replyObject: ArticleReplyObject = {
      Title: this.title,
      Url: this.url,
    };

    if (this.description) {
      replyObject.Description = this.description;
    }

    if (this.picurl) {
      replyObject.Picurl = this.picurl;
    }

    return replyObject;
  }
}
