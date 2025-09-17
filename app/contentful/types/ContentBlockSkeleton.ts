import * as contentful from "contentful";

export type ContentBlockSkeleton = {
  contentTypeId: "contentBlock";
  fields: {
    heading: contentful.EntryFieldTypes.Text;
    body: contentful.EntryFieldTypes.RichText;
  };
};
