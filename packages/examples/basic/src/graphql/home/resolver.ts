export default {
  Query: {
    async todoDetail(root, { id }) {
      return {
        id,
        name: 'Joe'
      };
    }
  },
  Mutation: {
  }
};
