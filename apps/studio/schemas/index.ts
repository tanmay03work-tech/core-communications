import caseStudy from './documents/caseStudy';
import blockContent from './objects/blockContent';
import seo from './objects/seo';
import stat from './objects/stat';
import {sectionSchemaTypes} from './sections';

export const schemaTypes = [
  caseStudy,
  blockContent,
  seo,
  stat,
  ...sectionSchemaTypes,
];
