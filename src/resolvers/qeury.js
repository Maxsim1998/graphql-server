const Query = {
  me() {
    return {
      id: '123VFVFDVd',
      name: 'Maxson',
      email: 'srakaton@gmail.com',
      age: 22,
    };
  },
  comments(_, __, { db }) {
    return db.commentsData;
  },
  post() {
    return {
      id: '23423vfdvfdw3',
      title: 'lalalabalblalba',
      body: 'azaza kra kra kra kra',
      published: true,
    };
  },
  users(_, args, { db }) {
    const { query } = args;
    if (!query) return db.usersData;
    return db.usersData.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  },
  posts(_, args, { db }) {
    const { query } = args;
    if (!query) return db.postsData;

    return postsData.filter((item) => {
      const isTitleMatch = item.title
        .toLowerCase()
        .includes(query.toLowerCase());
      const isBodyMatch = item.body.toLowerCase().includes(query.toLowerCase());
      return isTitleMatch || isBodyMatch;
    });
  },
};

export default Query;
