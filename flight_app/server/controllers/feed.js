const { validationResult } = require('express-validator/check');
const fetch = require('node-fetch');
const secret = require('secret');
const Flight = require('../models/Flight');
const Ticket = require('../models/Ticket');
const User = require('../models/User');

const baseURL = 'https://api.schiphol.nl/public-flights';

function validatePost(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      message: 'Validation failed, entered data is incorrect',
      errors: errors.array()
    });

    return false;
  }

  return true;
}

function encodeQueryString(params) {
  const keys = Object.keys(params)
  return keys.length ?
    "?" + keys
    .map(key => encodeURIComponent(key) +
      "=" + encodeURIComponent(params[key]))
    .join("&") :
    ""
}

function getProps(page, direction) {
  return Object.assign({
    "flightdirection": direction,
    "page": page,
    "sort": "scheduletime",
    "includedelays": "false"
  }, {
    app_id: secret.get('app_id')
  }, {
    app_key: secret.get('app_key')
  });
}

const barcodeNum = function randomRange() {
  return ~~(Math.random() * (1000000 - 1 + 1)) + 1
}

module.exports = {
  getFlights: (req, res, next) => {
    const { page, direction } = req.params;

    fetch(`${baseURL}/flights${encodeQueryString(getProps(page, direction))}`, {
        headers: {
          "ResourceVersion": "v3"
        }
      })
      .then((data) => data.json().then((parsed) => ({
        parsed,
        link: data.headers.get('link')
      })))
      .then((flights) => {
        let links = [];        
        if(flights.link) {
          links = flights.link.split(',').map((curr) => {              
            const key = (/(rel=")(.+)(")/).test(curr) 
            ? curr.match(/(rel=")(.+)(")/)[2] 
            : '';
            const val = (/(page=)(.+)(>)/).test(curr) 
            ? curr.match(/(page=)(.+)(>)/)[2] 
            : '0';
            
            return {[key]: val}
          }, {});
          
          const customSorting = ['first', 'prev', 'next', 'last']
          links.sort(function(a, b) {
            return customSorting.indexOf(Object.keys(a)[0]) - customSorting.indexOf(Object.keys(b)[0]);
          });
        }
        
        res
          .status(200)
          .json({
            message: 'Fetched flights successfully.',
            flights: flights.parsed,
            link: links
          });
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }

        next(error);
      });
  },
  getFlightById: (req, res, next) => {
    const flightId = req.params.flightId;

    fetch(`${baseURL}/flights/${flightId}${encodeQueryString(getProps(req))}`, {
        headers: {
          "ResourceVersion": "v3"
        }
      })
      .then((data) => data.json())
      .then((fligh) => {
        res
          .status(200)
          .json({
            message: 'Fetched flight successfully.',
            fligh
          });
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }

        next(error);
      });
  },
  createTicket: async (req, res, next) => {
    // Validate post using express-validator
    // Return 422 with errors array if something went wrong
    if (validatePost(req, res)) {
      const {
        flightId,
        userId,
        price
      } = req.body;

      // Create the ticket in DB and return 201 status code with a message and the ticket itself with the user
      try {
        const user = await User.findById(userId);

        const flightDetails = await
        fetch(`${baseURL}/flights/${flightId}${encodeQueryString(getProps(req))}`, {
            headers: {
              "ResourceVersion": "v3"
            }
          })
          .then((data) => data.json());

        const flight = new Flight({
          id: flightDetails.id
        })

        const barcode = barcodeNum();

        const ticket = new Ticket({
          flight,
          user,
          price,
          barcode
        });

        await ticket.save();

        user.flights.push(flight);
        user.tickets.push(ticket);
        await user.save();

        res
          .status(201)
          .json({
            message: 'Ticket created successfully!',
            ticket: ticket,
            user: {
              userId: userId,
              full_name: user.full_name
            }
          });
      } catch (error) {
        if (!error.statusCode) {
          error.statusCode = 500;
        }

        next(error);
      }
    }
    // const post = new Post({
    //   title,
    //   content,
    //   creator: req.userId
    // });
    // let creator;

    // post.save()
    //   .then(() => {
    //     return User.findById(req.userId);
    //   })
    //   .then((user) => {
    //     user.posts.push(post);
    //     creator = user;
    //     return user.save();
    //   })
    //   .then(() => {
    //     res
    //       .status(201)
    //       .json({
    //         message: 'Post created successfully!',
    //         post: post,
    //         creator: {
    //           userId: req.userId,
    //           name: creator.name
    //         }
    //       })
    //   })
    //   .catch((error) => {
    //     if (!error.statusCode) {
    //       error.statusCode = 500;
    //     }
    //   });
  },
  deletePost: (req, res, next) => {
    const postId = req.params.postId;

    Post.findById(postId)
      .then((post) => {
        if (!post) {
          const error = new Error('Post not found!');
          error.statusCode = 404;
          throw error;
        }

        if (post.creator.toString() !== req.userId) {
          const error = new Error('Unauthorized');
          error.statusCode = 403;
          throw error;
        }

        return Post.findByIdAndDelete(postId);
      })
      .then(() => {
        return User.findById(req.userId);
      })
      .then((user) => {
        user.posts.pull(postId);
        return user.save();
      })
      .then(() => {
        res.status(200)
          .json({
            message: 'Post deleted successfully!'
          })
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
      });
  },
  updatePost: (req, res) => {
    // Validate post using express-validator
    // Return 422 with errors array if something went wrong
    if (validatePost(req, res)) {
      const postId = req.params.postId;
      const post = req.body;

      Post.findById(postId)
        .then((p) => {
          if (!p) {
            const error = new Error('Post not found');
            error.statusCode = 404;
            throw error;
          }

          if (p.creator.toString() !== req.userId) {
            const error = new Error('Unauthorized');
            error.statusCode = 403;
            throw error;
          }

          p.title = post.title;
          p.content = post.content;

          return p.save();
        })
        .then((p) => {
          if (p) {
            res.status(200).json({
              message: 'Post updated!',
              post: p
            })
          }
        })
        .catch((error) => {
          if (!error.statusCode) {
            error.statusCode = 500;
          }
        });
    }
  }
}