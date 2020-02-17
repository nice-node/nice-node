import NiceNode from 'nice-node';

const { PORT } = process.env;

const app = new NiceNode();
app.server.listen(PORT, () => {
  console.log(`\n🚀 http://localhost:${PORT}`);
});
