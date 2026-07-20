import {defineConfig} from 'sanity';
import type {Config} from 'sanity';
import {deskTool} from 'sanity/desk';
import {schemaTypes} from './schemas';

const filteredDocumentTypes = ['clientLogo'];

const config: Config = defineConfig({
  name: 'default',
  title: 'Core Communications Studio',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'vnioiwzw',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Client Logos')
              .child(
                S.list()
                  .title('Client Logos')
                  .items([
                    S.listItem()
                      .title('Showcase logos')
                      .child(
                        S.documentList()
                          .title('Showcase logos')
                          .schemaType('clientLogo')
                          .filter('_type == "clientLogo" && featured != false')
                          .defaultOrdering([{field: 'order', direction: 'asc'}]),
                      ),
                    S.listItem()
                      .title('Hidden logos')
                      .child(
                        S.documentList()
                          .title('Hidden logos')
                          .schemaType('clientLogo')
                          .filter('_type == "clientLogo" && featured == false')
                          .defaultOrdering([{field: 'order', direction: 'asc'}]),
                      ),
                    S.divider(),
                    S.documentTypeListItem('clientLogo').title('All client logos'),
                  ]),
              ),
            ...S.documentTypeListItems().filter(
              (item) => !filteredDocumentTypes.includes(item.getId() ?? ''),
            ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});

export default config;
