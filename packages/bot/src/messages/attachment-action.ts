export interface AttachmentActionOptions {
  name: string;
  text: string;
  type: string;
  value: string;
}

export interface AttachmentActionSendObject {
  name: string;
  text: string;
  type: string;
  value: string;
}

export interface AttachmentActionReplyObject {
  Name: string;
  Text: string;
  Type: string;
  Value: string;
}

export abstract class AttachmentAction {
  protected readonly name: string;
  protected readonly text: string;
  protected readonly type: string;
  protected readonly value: string;

  constructor(options: AttachmentActionOptions) {
    this.name = options.name;
    this.text = options.text;
    this.type = options.type;
    this.value = options.value;
  }

  abstract toSendObject(): AttachmentActionSendObject;
  abstract toReplyObject(): AttachmentActionReplyObject;
}
