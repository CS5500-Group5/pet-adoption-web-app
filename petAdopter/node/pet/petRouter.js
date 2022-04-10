import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../utils/data.js';
import pet from './petModel.js';
import User from '../user/userModel.js';
import { isAdmin, isAuth, isShelterOrAdmin } from '../utils/utils.js';
import {countNum, createNew, find, findById, findspecies, justFindById} from "./petDao.js";

const petRouter = express.Router();


petRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const pageSize = 6;
    const page = Number(req.query.pageNumber) || 1;
    const name = req.query.name || '';
    const species = req.query.species || '';
    const shelter = req.query.shelter || '';
    const application = req.query.application || '';
    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;

    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const shelterFilter = shelter ? { shelter } : {};
    const speciesFilter = species ? { species } : {};
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    const sortApplication =
      application === 'lowest'
        ? { price: 1 }
        : application === 'highest'
        ? { price: -1 }
        : application === 'toprated'
        ? { rating: -1 }
        : { _id: -1 };
    const count = await countNum({
      ...shelterFilter,
      ...nameFilter,
      ...speciesFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    const pets = await find(shelterFilter, nameFilter, speciesFilter, priceFilter, ratingFilter, sortApplication, pageSize, page);
    res.send({ pets, page, pages: Math.ceil(count / pageSize) });
  })
);

petRouter.get(
  '/species',
  expressAsyncHandler(async (req, res) => {
    const species = await findspecies();
    res.send(species);
  })
);

// petRouter.get(
//   '/seed',
//   expressAsyncHandler(async (req, res) => {
//      await pet.remove({});
//     const shelter = await User.findOne({ isShelter: true });
//     if (shelter) {
//       const pets = data.pets.map((pet) => ({
//         ...pet,
//         shelter: shelter._id,
//       }));
//       const createdpets = await pet.insertMany(pets);
//       res.send({ createdpets });
//     } else {
//       res
//         .status(500)
//         .send({ message: 'No shelter found. first run /api/users/seed' });
//     }
//   })
// );

petRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const pet = await findById(req.params.id);
    if (pet) {
      res.send(pet);
    } else {
      res.status(404).send({ message: 'pet Not Found' });
    }
  })
);

petRouter.post(
  '/',
  isAuth,
  isShelterOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const pet = createNew(Date.now(), req.user._id);
    const createdpet = await pet.save();
    res.send({ message: 'pet Created', pet: createdpet });
  })
);
petRouter.put(
  '/:id',
  isAuth,
  isShelterOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const petId = req.params.id;
    const pet = await justFindById(petId);
    if (pet) {
      pet.name = req.body.name;
      pet.price = req.body.price;
      pet.image = req.body.image;
      pet.species = req.body.species;
      pet.brand = req.body.brand;
      pet.countInStock = req.body.countInStock;
      pet.description = req.body.description;
      const updatedpet = await pet.save();
      res.send({ message: 'pet Updated', pet: updatedpet });
    } else {
      res.status(404).send({ message: 'pet Not Found' });
    }
  })
);

petRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const pet = await justFindById(req.params.id);
    if (pet) {
      const deletepet = await pet.remove();
      res.send({ message: 'pet Deleted', pet: deletepet });
    } else {
      res.status(404).send({ message: 'pet Not Found' });
    }
  })
);

petRouter.post(
  '/:id/reviews',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const petId = req.params.id;
    const pet = await justFindById(petId);
    if (pet) {
      if (pet.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: 'You already submitted a review' });
      }
      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      pet.reviews.push(review);
      pet.numReviews = pet.reviews.length;
      pet.rating =
        pet.reviews.reduce((a, c) => c.rating + a, 0) /
        pet.reviews.length;
      const updatedpet = await pet.save();
      res.status(201).send({
        message: 'Review Created',
        review: updatedpet.reviews[updatedpet.reviews.length - 1],
      });
    } else {
      res.status(404).send({ message: 'pet Not Found' });
    }
  })
);

export default petRouter;