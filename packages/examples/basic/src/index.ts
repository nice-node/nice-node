import EasyNode from 'easy-node';
import homeRouter from './routes/home';

const app = new EasyNode();

const { PORT } = process.env;

app.server.use(homeRouter);

app.server.listen(PORT, () => {
  console.log(`🚀 http://localhost:${PORT}`);
});
