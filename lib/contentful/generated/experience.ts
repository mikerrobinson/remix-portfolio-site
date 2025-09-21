import { wrap } from ".";
import { Entry, type IEntry, type ILink, isEntry } from "../base";
import { Company, type ICompany } from "./company";

export interface IExperienceFields {
  title: string;
  company?: ILink<"Entry"> | ICompany;
  startDate?: string;
  endDate?: string;
  location?: { lon: number; lat: number };
  description?: any;
}

/** Experience */
export interface IExperience extends IEntry<IExperienceFields> {}

export function isExperience(entry: IEntry<any>): entry is IExperience {
  return (
    entry &&
    entry.sys &&
    entry.sys.contentType &&
    entry.sys.contentType.sys &&
    entry.sys.contentType.sys.id == "experience"
  );
}

export class Experience
  extends Entry<IExperienceFields>
  implements IExperience
{
  get title(): string {
    return this.fields.title;
  }

  get company(): Company | null | undefined {
    return !this.fields.company
      ? undefined
      : isEntry(this.fields.company)
        ? wrap<"company">(this.fields.company)
        : null;
  }

  get startDate(): string | undefined {
    return this.fields.startDate;
  }

  get start_date(): string | undefined {
    return this.fields.startDate;
  }

  get endDate(): string | undefined {
    return this.fields.endDate;
  }

  get end_date(): string | undefined {
    return this.fields.endDate;
  }

  get location(): { lon: number; lat: number } | undefined {
    return this.fields.location;
  }

  get description(): any | undefined {
    return this.fields.description;
  }

  constructor(entry: IExperience);
  constructor(id: string, fields: IExperienceFields);
  constructor(entryOrId: IExperience | string, fields?: IExperienceFields) {
    super(entryOrId, "experience", fields);
  }
}
