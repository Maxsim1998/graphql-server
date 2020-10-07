const Subscription = {
  comment: {
    subscribe(_, { postId }, { db, pubsub }) {
      const post = db.postsData.find(
        (post) => post.id === postId && post.published
      );
      if (!post) {
        throw new Error('Post not found!');
      }

      return pubsub.asyncIterator(`comment:${postId}`);
    },
  },
  post: {
    subscribe(_, __, { db, pubsub }) {
      return pubsub.asyncIterator('post');
    },
  },
};

export default Subscription;
