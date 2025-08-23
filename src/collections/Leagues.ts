import { Block, CollectionConfig } from "payload";

const ContentBlock: Block = {
  slug: 'Content',
  fields: [
    { name: 'content', type: 'richText' },
  ],
};

const ColumnsBlock: Block = {
  slug: 'Columns',
  fields: [
    { name: 'columnCount', type: 'radio', options: [{ label: 'Full Width', value: '1' }, { label: 'Two Columns', value: '2' }, { label: 'Three Columns', value: '3' }] },
    { name: 'columnContent', type: 'array', fields: [{ name: 'content', type: 'blocks', blocks: [ContentBlock] }] }
  ],
}


export const Leagues: CollectionConfig = {
  slug: 'leagues',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'teams',
      type: 'relationship',
      relationTo: 'teams',
      hasMany: true,
    },
    {
      name: 'leagueContent',
      type: 'blocks',
      blocks: [ContentBlock, ColumnsBlock]
    }
  ],
};
