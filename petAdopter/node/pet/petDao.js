import model from './petModel.js';

export const countNum = (filter) => {
    return model.count(filter);
}

export const find = (shelterFilter, nameFilter, speciesFilter, priceFilter, ratingFilter, sortApplication, pageSize, page) => {
    return model.find({
        ...shelterFilter,
        ...nameFilter,
        ...speciesFilter,
        ...priceFilter,
        ...ratingFilter,
    }).collation({locale: "en", strength: 2}).populate('shelter', 'shelter.name shelter.logo')
        .sort(sortApplication)
        .skip(pageSize * (page - 1))
        .limit(pageSize);
}

export const findspecies = () => {
    return model.find().distinct('species');
}

export const findById = (myID) => {
    return model.findById(myID).populate(
        'shelter',
        'shelter.name shelter.logo shelter.rating shelter.numReviews'
    );
}

export const createNew = (myName, myshelter) => {
    return new model({
        name: 'sample name ' + myName,
        shelter: myshelter,
        image: '/images/p1.jpg',
        price: 0,
        species: 'sample species',
        brand: 'sample brand',
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        description: 'sample description',
    })
}

export const justFindById = (myID) => {
    return model.findById(myID);
}
