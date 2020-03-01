import {
  AttachmentAction,
  AttachmentActionSendObject,
  AttachmentActionReplyObject,
} from './attachment-action';

export interface AttachmentOptions {
  callbackId: string;
  actions: AttachmentAction[];
}

export interface AttachmentSendObject {
  callback_id: string;
  actions: AttachmentActionSendObject[];
}

export interface AttachmentReplyObject {
  CallbackId: string;
  Actions: AttachmentActionReplyObject[];
}

export class Attachment {
  protected readonly callbackId: string;

  protected readonly actions: AttachmentAction[];

  constructor(options: AttachmentOptions) {
    this.callbackId = options.callbackId;
    this.actions = options.actions;
  }

  toSendObject(): AttachmentSendObject {
    const sendObject: AttachmentSendObject = {
      // eslint-disable-next-line @typescript-eslint/camelcase
      callback_id: this.callbackId,
      actions: this.actions.map(action => action.toSendObject()),
    };

    return sendObject;
  }

  toReplyObject(): AttachmentReplyObject {
    const replyObject: AttachmentReplyObject = {
      CallbackId: this.callbackId,
      Actions: this.actions.map(action => action.toReplyObject()),
    };

    return replyObject;
  }
}
