import { wrap } from ".";
import { Entry, type IEntry, type ILink, isEntry } from "../base";
import { Education, type IEducation } from "./education";
import { Experience, type IExperience } from "./experience";

export interface IResumeFields {
  name: string;
  headline: string;
  summary: any;
  experience: Array<ILink<"Entry"> | IExperience>;
  education: Array<ILink<"Entry"> | IEducation>;
}

/** Resume */
export interface IResume extends IEntry<IResumeFields> {}

export function isResume(entry: IEntry<any>): entry is IResume {
  return (
    entry &&
    entry.sys &&
    entry.sys.contentType &&
    entry.sys.contentType.sys &&
    entry.sys.contentType.sys.id == "resume"
  );
}

export class Resume extends Entry<IResumeFields> implements IResume {
  get name(): string {
    return this.fields.name;
  }

  get headline(): string {
    return this.fields.headline;
  }

  get summary(): any {
    return this.fields.summary;
  }

  get experience(): Array<Experience | null> {
    return this.fields.experience.map((item) =>
      isEntry(item) ? wrap<"experience">(item) : null
    );
  }

  get education(): Array<Education | null> {
    return this.fields.education.map((item) =>
      isEntry(item) ? wrap<"education">(item) : null
    );
  }

  constructor(entry: IResume);
  constructor(id: string, fields: IResumeFields);
  constructor(entryOrId: IResume | string, fields?: IResumeFields) {
    super(entryOrId, "resume", fields);
  }
}
