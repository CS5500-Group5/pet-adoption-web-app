import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import {
  isAdmin,
  isAuth,
  isShelterOrAdmin
} from '../utils/utils.js';
import {
    aggregate,
    find,
    findById,
    findPopulate,
    findPopulateByEmail,
    newApplication,
    setApplication,
    setApplicationApproved
} from "./applicationDao.js";

const applicationRouter = express.Router();
applicationRouter.get(
  '/',
  isAuth,
  isShelterOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const shelter = req.query.shelter || '';
    const shelterFilter = shelter ? { shelter } : {};

    const applications = await findPopulate({ ...shelterFilter });
    res.send(applications);
  })
);

applicationRouter.get(
  '/summary',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const applications = await aggregate([
      {
        $group: {
          _id: null,
          numApplications: { $sum: 1 },
          totalSales: { $sum: '$totalPrice' },
        },
      },
    ]);
    const users = await aggregate([
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]);
    const dailyApplications = await aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          applications: { $sum: 1 },
          sales: { $sum: '$totalPrice' },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const petspecies = await aggregate([
      {
        $group: {
          _id: '$species',
          count: { $sum: 1 },
        },
      },
    ]);
    res.send({ users, applications, dailyApplications, petspecies });
  })
);

applicationRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const applications = await find(req.user._id);
    res.send(applications);
  })
);

applicationRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.petItems.length === 0) {
      res.status(400).send({ message: 'Cart is empty' });
    } else {
      const application = newApplication(req.body, req.user._id);
      const createdApplication = await application.save();
      res
        .status(201)
        .send({ message: 'New Application Created', application: createdApplication });
    }
  })
);

applicationRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const application = await findById(req.params.id);
    if (application) {
      res.send(application);
    } else {
      res.status(404).send({ message: 'Application Not Found' });
    }
  })
);

applicationRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const application = await findById(req.params.id);
    if (application) {
      const deleteApplication = await application.remove();
      res.send({ message: 'Application Deleted', application: deleteApplication });
    } else {
      res.status(404).send({ message: 'Application Not Found' });
    }
  })
);

applicationRouter.put(
  '/:id/approve',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const application = await findById(req.params.id);
    if (application) {
      setApplicationApproved(application);
      const updatedApplication = await application.save();
      res.send({ message: 'Application Approved', application: updatedApplication });
    } else {
      res.status(404).send({ message: 'Application Not Found' });
    }
  })
);

export default applicationRouter;
