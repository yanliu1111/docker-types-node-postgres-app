import db, { genId } from '../../src/modules/db';

const run = async () => {
  await db.post.createMany({
    data: [
      {
        id: genId(),
        slug: 'ultimate-guide-to-node-graphql',
        title: 'Ultimate Guide to Node and GraphQL',
        publishedAt: new Date(),
      },
      {
        id: genId(),
        slug: 'ultimate-guide-to-node-stack',
        title: 'Ultimate Guide to Node Stack',
      },
    ],
  });
};
// this is main module that node is running
if (require.main === module) {
  run()
    .then(() => {
      console.log('data seeded successfully');
      process.exit(0); //0 means success
    })
    .catch((err) => {
      console.error(err);
      process.exit(1); //1 means error
    });
}
