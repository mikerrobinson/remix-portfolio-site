import * as contentful from "contentful";

export type PageSkeleton = {
  contentTypeId: "page";
  fields: {
    title: contentful.EntryFieldTypes.Text;
    description: contentful.EntryFieldTypes.RichText;
  };
};
