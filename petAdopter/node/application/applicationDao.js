import model from './applicationModel.js';

export const findPopulate = (filter) => {
    return model.find(filter).populate(
        'user',
        'name'
    );
}

export const aggregate = (character) => {
    return model.aggregate(character);
}

export const find = (myID) => {
    return model.find({user: myID});
}

export const newApplication = (info, myID) => {
    return new model({
        shelter: info.shelter,
        petItems: info.petItems,
        applicantAddress: info.applicantAddress,
        user: myID,
    });
}

export const findById = (myId) => {
    return model.findById(myId);
}

export const findPopulateByEmail = (filter) => {
    return model.find(filter).populate(
        'user',
        'email name'
    );
}

export const setApplication = (application, info) => {
    application.isApproved = true;
    application.approvedAt = Date.now();
    application.paymentResult = {
        id: info.id,
        status: info.status,
        update_time: info.update_time,
        email_address: info.email_address
    };
}

export const setApplicationApproved = (application) => {
    application.isApproved = true;
    application.approvedAt = Date.now();
}