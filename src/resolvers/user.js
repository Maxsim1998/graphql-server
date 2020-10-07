const User = {
  posts(parent, _, { db }) {
    return db.postsData.filter((post) => post.author === parent.id);
  },
  comments(parent, _, { db }) {
    return db.commentsData.filter((comment) => comment.author === parent.id);
  },
};

export default User;
