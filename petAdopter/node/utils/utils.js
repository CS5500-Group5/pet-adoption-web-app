import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isShelter: user.isShelter,
    },
    process.env.JWT_SECRET || 'somethingsecret',
    {
      expiresIn: '30d',
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(
      token,
      process.env.JWT_SECRET || 'somethingsecret',
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: 'Invalid Token' });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isShelter) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};
export const isShelter = (req, res, next) => {
  if (req.user && req.user.isShelter) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid shelter Token' });
  }
};
export const isShelterOrAdmin = (req, res, next) => {
  if (req.user && (req.user.isShelter || req.user.isAdmin)) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin/shelter Token' });
  }
};


export const payApplicationEmailTemplate = (application) => {
  return `<h1>Pet Adoption Application Submission</h1>
  <p>
  Hi ${application.user.name},</p>
  <p>We have finished processing your application.</p>
  <h2>[Application ${application._id}] (${application.createdAt.toString().substring(0, 10)})</h2>
  <table>
  <thead>
  <tr>
  <td><strong>pet</strong></td>
  <td><strong>Quantity</strong></td>
  <td><strong align="right">Price</strong></td>
  </thead>
  <tbody>
  ${application.petItems
    .map(
      (item) => `
    <tr>
    <td>${item.name}</td>
    <td align="center">${item.qty}</td>
    <td align="right"> $${item.price.toFixed(2)}</td>
    </tr>
  `
    )
    .join('\n')}
  </tbody>
  <tfoot>
  <tr>
  <td colspan="2">Items Price:</td>
  <td align="right"> $${application.itemsPrice.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2">Tax Price:</td>
  <td align="right"> $${application.taxPrice.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2">Contact Price:</td>
  <td align="right"> $${application.contactPrice.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2"><strong>Total Price:</strong></td>
  <td align="right"><strong> $${application.totalPrice.toFixed(2)}</strong></td>
  </tr>
  <tr>
  <td colspan="2">Payment Method:</td>
  <td align="right">${application.paymentMethod}</td>
  </tr>
  </table>
  <h2>Contact address</h2>
  <p>
  ${application.applicantAddress.fullName},<br/>
  ${application.applicantAddress.address},<br/>
  ${application.applicantAddress.city},<br/>
  ${application.applicantAddress.country},<br/>
  ${application.applicantAddress.postalCode}<br/>
  </p>
  <hr/>
  <p>
  Thanks for shopping with us.
  </p>
  `;
};
