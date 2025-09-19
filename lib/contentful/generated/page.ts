import { Entry, type IEntry } from "../base";

export interface IPageFields {
  heading: string;
  body: any;
}

/** Page */
export interface IPage extends IEntry<IPageFields> {}

export function isPage(entry: IEntry<any>): entry is IPage {
  return (
    entry &&
    entry.sys &&
    entry.sys.contentType &&
    entry.sys.contentType.sys &&
    entry.sys.contentType.sys.id == "page"
  );
}

export class Page extends Entry<IPageFields> implements IPage {
  get heading(): string {
    return this.fields.heading;
  }

  get body(): any {
    return this.fields.body;
  }

  constructor(entry: IPage);
  constructor(id: string, fields: IPageFields);
  constructor(entryOrId: IPage | string, fields?: IPageFields) {
    super(entryOrId, "page", fields);
  }
}
