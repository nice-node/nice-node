import Nice from 'nice';
// import App from './App';

const app = new Nice();

const { PORT } = process.env;

app.server.listen(PORT, () => {
  console.log(`🚀 http://localhost:${PORT}`);
});
