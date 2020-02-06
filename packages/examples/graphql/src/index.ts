import EasyNode from 'nice-node';
import homeRouter from './routes/home';

const { PORT } = process.env;

const app = new EasyNode();
app.server.use(homeRouter);
app.server.listen(PORT, () => {
  console.log(`\n🚀 http://localhost:${PORT}`);
});
