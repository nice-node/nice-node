import EasyNode from 'easy-node';
import homeRouter from './routes/home';

const { PORT } = process.env;

const app = new EasyNode();
app.server.use(homeRouter);
app.server.listen(PORT, () => {
  console.log(`🚀 http://localhost:${PORT}`);
});
