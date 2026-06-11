import {defineConfig} from 'sanity';
import type {Config} from 'sanity';
import {deskTool} from 'sanity/desk';
import {schemaTypes} from './schemas';

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
            ...S.documentTypeListItems(),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});

export default config;
