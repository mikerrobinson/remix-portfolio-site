import {
  Asset,
  Entry,
  type IAsset,
  type IEntry,
  type ILink,
  isAsset,
} from "../base";

export interface ICompanyFields {
  name: string;
  logo?: IAsset; // ILink<"Asset"> | IAsset;
  website?: string;
  location?: string;
}

/** Company */
export interface ICompany extends IEntry<ICompanyFields> {}

export function isCompany(entry: IEntry<any>): entry is ICompany {
  return (
    entry &&
    entry.sys &&
    entry.sys.contentType &&
    entry.sys.contentType.sys &&
    entry.sys.contentType.sys.id == "company"
  );
}

export class Company extends Entry<ICompanyFields> implements ICompany {
  get name(): string {
    return this.fields.name;
  }

  get logo(): Asset | undefined {
    return !this.fields.logo ? undefined : new Asset(this.fields.logo);
  }

  get website(): string | undefined {
    return this.fields.website;
  }

  get location(): string | undefined {
    return this.fields.location;
  }

  constructor(entry: ICompany);
  constructor(id: string, fields: ICompanyFields);
  constructor(entryOrId: ICompany | string, fields?: ICompanyFields) {
    super(entryOrId, "company", fields);
  }
}
