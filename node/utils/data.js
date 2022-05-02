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
      breed: 'Bunny RabbitRoyal Farm',
      age: 2,
      gender: "Female",
      color: "grey",
      weight: 2.4,
      activity_level: "Moderate",
      gromming_requirement: "Moderate",
      rating: 4.5,
      numReviews: 10,
      description: 'good',
    }
  ],
};
export default data;
