import * as C from ".";
import { type IEntry } from "../base";

export * from "./resume";
export * from "./education";
export * from "./company";
export * from "./experience";
export * from "./content_block";
export * from "./page";

export interface TypeDirectory {
  resume: C.IResume;
  education: C.IEducation;
  company: C.ICompany;
  experience: C.IExperience;
  contentBlock: C.IContentBlock;
  page: C.IPage;
}

export interface ClassDirectory {
  resume: C.Resume;
  education: C.Education;
  company: C.Company;
  experience: C.Experience;
  contentBlock: C.ContentBlock;
  page: C.Page;
}

export function wrap(entry: C.IResume): C.Resume;
export function wrap(entry: C.IEducation): C.Education;
export function wrap(entry: C.ICompany): C.Company;
export function wrap(entry: C.IExperience): C.Experience;
export function wrap(entry: C.IContentBlock): C.ContentBlock;
export function wrap(entry: C.IPage): C.Page;
export function wrap<CT extends keyof TypeDirectory>(
  entry: TypeDirectory[CT]
): ClassDirectory[CT];
export function wrap(entry: IEntry<any>): IEntry<any> {
  const id = entry.sys.contentType.sys.id;
  switch (id) {
    case "resume":
      return new C.Resume(entry);
    case "education":
      return new C.Education(entry);
    case "company":
      return new C.Company(entry);
    case "experience":
      return new C.Experience(entry);
    case "contentBlock":
      return new C.ContentBlock(entry);
    case "page":
      return new C.Page(entry);
    default:
      throw new Error("Unknown content type:" + id);
  }
}
