/* istanbul ignore file */
export default (...args: any[]) => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV !== 'test') {
    console.log.apply(null, args);
  }
};
