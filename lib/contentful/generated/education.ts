import {
  Asset,
  Entry,
  type IAsset,
  type IEntry,
  type ILink,
  isAsset,
} from "../base";

export interface IEducationFields {
  school: string;
  logo?: ILink<"Asset"> | IAsset;
  major?: string;
  minor?: string;
  societies?: string;
}

/** Education */
export interface IEducation extends IEntry<IEducationFields> {}

export function isEducation(entry: IEntry<any>): entry is IEducation {
  return (
    entry &&
    entry.sys &&
    entry.sys.contentType &&
    entry.sys.contentType.sys &&
    entry.sys.contentType.sys.id == "education"
  );
}

export class Education extends Entry<IEducationFields> implements IEducation {
  get school(): string {
    return this.fields.school;
  }

  get logo(): Asset | null | undefined {
    return !this.fields.logo
      ? undefined
      : isAsset(this.fields.logo)
        ? new Asset(this.fields.logo)
        : null;
  }

  get major(): string | undefined {
    return this.fields.major;
  }

  get minor(): string | undefined {
    return this.fields.minor;
  }

  get societies(): string | undefined {
    return this.fields.societies;
  }

  constructor(entry: IEducation);
  constructor(id: string, fields: IEducationFields);
  constructor(entryOrId: IEducation | string, fields?: IEducationFields) {
    super(entryOrId, "education", fields);
  }
}
