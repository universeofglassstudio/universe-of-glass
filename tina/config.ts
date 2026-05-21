import { defineConfig } from 'tinacms';

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.RENDER_GIT_BRANCH ||
  process.env.HEAD ||
  'main';

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID!,
  token: process.env.TINA_TOKEN!,

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'images',
      publicFolder: 'public',
    },
  },

  schema: {
    collections: [
      {
        name: 'artwork',
        label: 'Artworks',
        path: 'src/content/artworks',
        format: 'md',
        ui: {
          filename: {
            slugify: (values) =>
              (values?.title_en ?? 'untitled')
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, ''),
          },
        },
        fields: [
          { type: 'string',  name: 'title_en', label: 'Title (EN)', isTitle: true, required: true },
          { type: 'string',  name: 'title_ro', label: 'Titlu (RO)', required: true },
          { type: 'string', name: 'price_en', label: 'Price (EN)', required: true },
          { type: 'string', name: 'price_ro', label: 'Price (RO)', required: true },
          {
            type: 'string', name: 'status', label: 'Status', required: true,
            options: [
              { value: 'available',     label: 'Available' },
              { value: 'sold',          label: 'Sold' },
              { value: 'made_to_order', label: 'Made to order' },
            ],
          },
          { type: 'image',  name: 'images', label: 'Images', list: true, required: true },
          { type: 'string', name: 'dimensions', label: 'Dimensions' },
          { type: 'string', name: 'technique',  label: 'Technique' },
          { type: 'string', name: 'tags', label: 'Tags', list: true },
          { type: 'string', name: 'desc_en', label: 'Description (EN)', ui: { component: 'textarea' }, required: true },
          { type: 'string', name: 'desc_ro', label: 'Descriere (RO)',   ui: { component: 'textarea' }, required: true },
          { type: 'boolean', name: 'show',    label: 'Show on site' },
        ],
      },
    ],
  },
});
