const Post = {
  author(parent, _, { db }) {
    return db.usersData.find((user) => user.id === parent.author);
  },
  comments(parent, _, { db }) {
    return db.commentsData.filter((comment) => comment.post === parent.id);
  },
};

export default Post;
