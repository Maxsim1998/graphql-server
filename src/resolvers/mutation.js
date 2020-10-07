import { v4 as uuidv4 } from 'uuid';

const Mutation = {
  deleteUser(_, args, { db }) {
    const userIndex = db.usersData.findIndex((user) => user.id === args.id);

    if (userIndex === -1) {
      throw new Error('User not found');
    }

    const deletedUsers = db.usersData.splice(userIndex, 1);

    db.postsData = db.postsData.filter((post) => {
      const isMatch = post.author === args.id;

      if (isMatch) {
        db.commentsData = db.commentsData.filter(
          (comment) => comment.post !== post.id
        );
      }

      return !isMatch;
    });

    db.commentsData = db.commentsData.filter(
      (comment) => comment.author !== args.id
    );

    return deletedUsers[0];
  },
  updateUser(_, { id, data }, { db }) {
    const userToEdit = db.usersData.find((user) => user.id === id);

    if (!userToEdit) {
      throw new Error('User not found');
    }

    const newUsers = (db.usersData = db.usersData.map((user) => {
      if (user.id === userToEdit.id) {
        return {
          ...user,
          ...data,
        };
      }
      return user;
    }));

    return newUsers.find((user) => user.id === id);
  },
  updatePost(_, { id, data }, { db }) {
    const postToEdit = db.postsData.find((post) => post.id === id);

    if (!postToEdit) {
      throw new Error('Post not found');
    }

    const newPosts = (db.postsData = db.postsData.map((post) => {
      if (post.id === postToEdit.id) {
        return {
          ...post,
          ...data,
        };
      }
      return post;
    }));

    return newPosts.find((post) => post.id === id);
  },
  updateComment(_, { id, data }, { db }) {
    const commentToEdit = db.commentsData.find((comment) => comment.id === id);

    if (!commentToEdit) {
      throw new Error('Comment not found');
    }

    const newComments = (db.commentsData = db.commentsData.map((comment) => {
      if (comment.id === commentToEdit.id) {
        return {
          ...comment,
          ...data,
        };
      }
      return comment;
    }));

    return newComments.find((comment) => comment.id === id);
  },
  deletePost(_, { id }, { db, pubsub }) {
    const postIndex = db.postsData.findIndex((post) => post.id === id);

    if (postIndex === -1) {
      throw new Error('Post not found');
    }

    const deletedPosts = db.postsData.splice(postIndex, 1);

    db.commentsData = db.commentsData.filter((comment) => comment.post !== id);

    if (deletedPosts[0].published) {
      pubsub.publish('post', {
        post: {
          mutation: 'DELETED',
          data: deletedPosts[0],
        },
      });
    }

    return deletedPosts[0];
  },
  deleteComment(_, { id }, { db }) {
    const commentIndex = db.commentsData.findIndex(
      (comment) => comment.id === id
    );

    if (commentIndex === -1) {
      throw new Error('Comment not found');
    }

    const deletedComments = db.commentsData.splice(commentIndex, 1);

    return deletedComments[0];
  },
  createUser(_, args, { db }) {
    const { email, name, age } = args.data;
    const emailIsNotUnique = db.usersData.some((user) => user.email === email);
    if (emailIsNotUnique) {
      throw new Error('Email is not unique');
    }
    const user = {
      id: uuidv4(),
      email,
      name,
      age,
    };

    db.usersData.push(user);

    return user;
  },
  createPost(_, args, { db, pubsub }) {
    const { author, title, body, published } = args.data;
    const isAuthorExist = db.usersData.some((user) => user.id === author);
    if (!isAuthorExist) {
      throw new Error('Author is not exist!');
    }
    const post = {
      id: uuidv4(),
      title,
      body,
      published,
      author,
    };

    db.postsData.push(post);
    if (published) {
      pubsub.publish('post', {
        post: {
          mutation: 'CREATED',
          data: post,
        },
      });
    }

    return post;
  },
  createComment(_, args, { db, pubsub }) {
    const { text, post, author } = args.data;
    const isPostExist = db.postsData.some((item) => item.id === post);
    const isAuthorExist = db.usersData.some((user) => user.id === author);

    if (!isPostExist) {
      throw new Error('Post is not exist!');
    } else if (!isAuthorExist) {
      throw new Error('Author is not exist!');
    }

    const comment = {
      id: uuidv4(),
      text,
      post,
      author,
    };
    db.commentsData.push(comment);
    pubsub.publish(`comment:${post}`, {
      comment,
    });

    return comment;
  },
};

export default Mutation;
