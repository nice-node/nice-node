export default {
  Query: {
    async todoDetail(resolvers, { id }) {
      return {
        id,
        name: 'Joe'
      };
    }
  },
  Mutation: {
  }
};
