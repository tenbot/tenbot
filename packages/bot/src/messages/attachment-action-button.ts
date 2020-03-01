import {
  AttachmentAction,
  AttachmentActionOptions,
  AttachmentActionSendObject,
  AttachmentActionReplyObject,
} from './attachment-action';

export interface AttachmentActionButtonOptions extends AttachmentActionOptions {
  type: 'button';
  replaceText?: string;
  borderColor?: string;
  textColor?: string;
}

export interface AttachmentActionButtonSendObject
  extends AttachmentActionSendObject {
  type: 'button';
  replace_text?: string;
  border_color?: string;
  text_color?: string;
}

export interface AttachmentActionButtonReplyObject
  extends AttachmentActionReplyObject {
  Type: 'button';
  ReplaceText?: string;
  BorderColor?: string;
  TextColor?: string;
}

export class AttachmentActionButton extends AttachmentAction {
  protected readonly type: 'button';
  protected readonly replaceText?: string;
  protected readonly borderColor?: string;
  protected readonly textColor?: string;

  constructor(options: AttachmentActionButtonOptions) {
    super(options);
    this.type = 'button';
    this.replaceText = options.replaceText;
    this.borderColor = options.borderColor;
    this.textColor = options.textColor;
  }

  toSendObject(): AttachmentActionButtonSendObject {
    const sendObject: AttachmentActionButtonSendObject = {
      name: this.name,
      text: this.text,
      type: this.type,
      value: this.value,
    };

    if (this.replaceText) {
      // eslint-disable-next-line @typescript-eslint/camelcase
      sendObject.replace_text = this.replaceText;
    }

    if (this.borderColor) {
      // eslint-disable-next-line @typescript-eslint/camelcase
      sendObject.border_color = this.borderColor;
    }

    if (this.textColor) {
      // eslint-disable-next-line @typescript-eslint/camelcase
      sendObject.text_color = this.textColor;
    }

    return sendObject;
  }

  toReplyObject(): AttachmentActionButtonReplyObject {
    const replyObject: AttachmentActionButtonReplyObject = {
      Name: this.name,
      Text: this.text,
      Type: this.type,
      Value: this.value,
    };

    if (this.replaceText) {
      replyObject.ReplaceText = this.replaceText;
    }

    if (this.borderColor) {
      replyObject.BorderColor = this.borderColor;
    }

    if (this.textColor) {
      replyObject.TextColor = this.textColor;
    }

    return replyObject;
  }
}
