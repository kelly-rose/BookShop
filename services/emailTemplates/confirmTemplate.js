const keys = require('../../config/keys');

module.exports = purchase => {
    let items ="";

    purchase.product.forEach(item => {
        items += (`<p>Title: ${item.title} </p><p> Qty : ${item.quantity} </p> <p> Price : ${item.price}</p>`);
    });

   return `
    <html>
      <body>

        <div>
          <h3>Thank you for your purchase!</h3>
          <p>Please, check following below : </p>
       </div>
     
       ${items}      

          <div>
          <p>CartType : ${purchase.cardType}</p>
          <p>Order Number : ${purchase._id}</p>

          <p>Total : ${purchase.totalAmount}</p>
          <p>
            <a href="${keys.redirectDomain}">Visit Our Website!</a>
            </p>
          </div>
      </body>
    </html>
  `;
};

// { __v: 0,
//     _user: 59980263efe2da1d84a11b04,
//     currency: 'usd',
//     totalAmount: '10.00',
//     cardType: 'Visa', shippingAddress: { phone: 'asf', addr2: 'asdf', addr1: 'asfd', postcode: 'asdf', Name: 'asdf', Country: 'asdf' },
//     billingEmail: 'kellyrose.evergreen@gmail.com', _id: 5999778769f09f0da032507f,
//     product: [ { quantity: 1, price: 10, image: '/images/home2.jpg', description: 'asf', title: 'asdf', _id: '59942fdccef01f2b3c9e4569' } ],
//     purchaseDate: 2017-08-20T11:50:31.957Z }
