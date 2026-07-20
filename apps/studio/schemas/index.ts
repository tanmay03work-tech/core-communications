import caseStudy from './documents/caseStudy';
import blogPost from './documents/blogPost';
import clientLogo from './documents/clientLogo';
import blockContent from './objects/blockContent';
import seo from './objects/seo';
import stat from './objects/stat';
import {sectionSchemaTypes} from './sections';

export const schemaTypes = [
  caseStudy,
  blogPost,
  clientLogo,
  blockContent,
  seo,
  stat,
  ...sectionSchemaTypes,
];
