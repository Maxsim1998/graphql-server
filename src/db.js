let usersData = [
  {
    id: '123VFVFDVd1',
    name: 'Maxson',
    email: 'srakaton@gmail.com',
    age: 22,
  },
  {
    id: '123VFVFDVd2',
    name: 'Sashson',
    email: 'sashson@gmail.com',
    age: 20,
  },
  {
    id: '123VFVFDVd3',
    name: 'Floyd',
    email: 'floyd@gmail.com',
    age: 3,
  },
];

let postsData = [
  {
    id: '23423vf43243dw3',
    title: 'azaza kra kra',
    body: 'azaza kra kra kra kra',
    published: true,
    author: '123VFVFDVd1',
  },
  {
    id: '23423vfdvfdw3',
    title: 'lalalabalblalba',
    body: 'lalasc',
    published: false,
    author: '123VFVFDVd1',
  },
  {
    id: '23423v43242vfdw3',
    title: 'bCcd',
    body: 'vfvsssdaaAAvds',
    published: true,
    author: '123VFVFDVd2',
  },
  {
    id: '23423324324dvfdw3',
    title: 'avsdds',
    body: 'vsds dDd',
    published: false,
    author: '123VFVFDVd3',
  },
];

let commentsData = [
  {
    id: '1',
    text: 'some Text 1',
    author: '123VFVFDVd1',
    post: '23423vf43243dw3',
  },
  {
    id: '2',
    text: 'some Text 2',
    author: '123VFVFDVd2',
    post: '23423vfdvfdw3',
  },
  {
    id: '3',
    text: 'some Text 3',
    author: '123VFVFDVd3',
    post: '23423v43242vfdw3',
  },
  {
    id: '4',
    text: 'some Text 4',
    author: '123VFVFDVd1',
    post: '23423324324dvfdw3',
  },
];

const db = {
  usersData,
  postsData,
  commentsData,
};

export default db;
