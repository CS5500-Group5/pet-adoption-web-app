import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../utils/data.js';
import pet from './petModel.js';
import User from '../user/userModel.js';
import { isAdmin, isAuth, isShelterOrAdmin } from '../utils/utils.js';
import { countNum, createNew, find, findById, findspecies, justFindById } from "./petDao.js";

const petRouter = express.Router();


petRouter.get(
	'/',
	expressAsyncHandler(async (req, res) => {
		const text = req.query.species || '';
		const pageSize = 6;
		const page = Number(req.query.pageNumber) || 1;
		const name = req.query.name || text;
		const species = req.query.species || text;
		const breed = req.query.breed || text;
		const activity_level = req.query.activity_level || '';
		const grooming_requirement = req.query.grooming_requirement || '';
		const age = req.query.age || '';
		const gender = req.query.gender || '';
		const color = req.query.color || '';
		const weight = req.query.weight || '';
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
		const speciesFilter = species ? { species: { $regex: species, $options: 'i' } } : {};
		const breedFilter = breed ? { breed: { $regex: breed, $options: 'i' } } : {};
		const ratingFilter = rating ? { rating: { $gte: rating } } : {};
		const sortApplication =
			application === 'toprated'
				? { rating: -1 }
				: { _id: -1 };

		const count = await countNum({
			$or: [ nameFilter, speciesFilter , breedFilter],
			...shelterFilter,
			// ...nameFilter,
			// ...speciesFilter,
			...ratingFilter,
		});
		const pets = await find(shelterFilter, nameFilter, speciesFilter, breedFilter, ratingFilter, sortApplication, pageSize, page);
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
			pet.image = req.body.image;
			pet.species = req.body.species;
			pet.brand = req.body.brand;
			pet.countInStock = req.body.countInStock;
			pet.description = req.body.description;
			pet.breed = req.body.breed;
			pet.activity_level = req.body.activity_level;
			pet.grooming_requirement = req.body.grooming_requirement;
			pet.age = req.body.age;
			pet.gender = req.body.gender;
			pet.color = req.body.color;
			pet.weight = req.body.weight;
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
