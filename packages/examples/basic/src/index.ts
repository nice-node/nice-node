import EasyNode from 'easy-node';

const app = new EasyNode();

const { PORT } = process.env;

app.server.listen(PORT, () => {
  console.log(`🚀 http://localhost:${PORT}`);
});
