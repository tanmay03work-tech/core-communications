import caseStudy from './documents/caseStudy';
import service from './documents/service';
import siteSettings from './documents/siteSettings';
import teamMember from './documents/teamMember';
import blockContent from './objects/blockContent';
import seo from './objects/seo';
import stat from './objects/stat';
import {sectionSchemaTypes} from './sections';

export const schemaTypes = [
  caseStudy,
  service,
  siteSettings,
  teamMember,
  blockContent,
  seo,
  stat,
  ...sectionSchemaTypes,
];
