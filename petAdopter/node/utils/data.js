import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Mike',
      email: 'admin@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: true,
      isShelter: true,
      shelter: {
        name: 'Animal Shelter',
        logo: '/images/logo1.png',
        description: 'best shelter',
        rating: 4.5,
        numReviews: 12,
      },
    },
    {
      name: 'John',
      email: 'user@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: false,
    },
  ],
  pets: [
    {
      name: 'Mika',
      species: 'Cat',
      image: '/images/p1.jpg',
      price: 120,
      countInStock: 10,
      breed: 'Bunny RabbitRoyal Farm',
      rating: 4.5,
      numReviews: 10,
      description: 'good',
    }
  ],
};
export default data;
