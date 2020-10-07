const Comment = {
  author(parent, _, { db }) {
    return db.usersData.find((user) => user.id === parent.author);
  },
  post(parent, _, { db }) {
    return db.postsData.find((post) => post.id === parent.post);
  },
};

export default Comment;
