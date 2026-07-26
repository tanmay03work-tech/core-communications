import caseStudy from './documents/caseStudy';
import blogPost from './documents/blogPost';
import blogLead from './documents/blogLead';
import clientLogo from './documents/clientLogo';
import blockContent from './objects/blockContent';
import seo from './objects/seo';
import stat from './objects/stat';
import {sectionSchemaTypes} from './sections';

export const schemaTypes = [
  caseStudy,
  blogPost,
  blogLead,
  clientLogo,
  blockContent,
  seo,
  stat,
  ...sectionSchemaTypes,
];
