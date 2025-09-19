import { Entry, type IEntry } from "../base";

export interface IContentBlockFields {
  heading: string;
  body: any;
}

/** Content Block */
export interface IContentBlock extends IEntry<IContentBlockFields> {}

export function isContentBlock(entry: IEntry<any>): entry is IContentBlock {
  return (
    entry &&
    entry.sys &&
    entry.sys.contentType &&
    entry.sys.contentType.sys &&
    entry.sys.contentType.sys.id == "contentBlock"
  );
}

export class ContentBlock
  extends Entry<IContentBlockFields>
  implements IContentBlock
{
  get heading(): string {
    return this.fields.heading;
  }

  get body(): any {
    return this.fields.body;
  }

  constructor(entry: IContentBlock);
  constructor(id: string, fields: IContentBlockFields);
  constructor(entryOrId: IContentBlock | string, fields?: IContentBlockFields) {
    super(entryOrId, "contentBlock", fields);
  }
}
