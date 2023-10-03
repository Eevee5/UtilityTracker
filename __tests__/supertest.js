const express = require('express');
const request = require('supertest');
const dotenv = require('dotenv');
dotenv.config();
const connectionString = process.env.MONGO_URI;
const mongoose = require('mongoose');
const User = require('../server/models/userModel');
const server = `http://localhost:3000`;

describe('Route Tests', () => {
beforeAll(async () => {
  connection = await mongoose.connect(connectionString, {
    dbName: 'Tests',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await User.deleteMany({});
});
afterAll(async () => {
  await mongoose.connection.close();
})
describe('POST /user/signup', function () {
  
  it('responds with status 200 when user is successfully created', async () => {
    request(server)
      .post('/user/signup')
      .send({
        username: 'test123',
        password: '123',
        securityQuestion: 'test@test',
        securityAnswer: 'test',
      })
      .expect(200);
  });
});
describe('POST /user/login', () => {
  it('responds with 200 and application/json type on successful login', () => {
    request(server)
      .post('/user/login')
      .send({
        username: 'test123', 
        password: '123'
      })
      .expect(200)
      .expect('Content Type', 'application/json')
  })
  it('responds with error on failed login', () => {
    request(server)
      .post('user/login')
      .send({
        username: 'badusername',
        password: 'wrongPassword'
      })
      .expect(401)
  })
})

describe('POST /user/forgotPassword', () => {
  
})

});
// describe('GET /favorite', function () {
//     it('responds with json', (done) => {
//       request(server)
//         .get('/Favorite')
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200, done);
//     });
//   });

//   describe('POST /Favorite/Add', function () {
//     it('responds with json', (done) => {
//       request(server)
//         .post('/Favorite/Add')
//         //name: 'RadhaKrishn',
//         .send({
//           name: 'show.name',
//           vote_average: 1,
//           first_air_date: 'show.first_air_date',
//           overview: 'show.overview',
//           poster_path: 'show.poster_path',
//         })
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200, done);
//     });
//   });

//   describe('POST /User', function () {
//     it('responds with right password', () => {
//       request(server)
//         .post('/User')
//         .send({
//           username: 'john',
//           password: '12345',
//         })
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200)
//         // .then ( (response) => {
//         //   expect(response.body).toEqual(true)
//         // })

//     });

//     it('responds with wrong password', () => {
//       request(server)
//         .post('/User')
//         .send({
//           username: 'john',
//           password: '123',
//         })
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200)
//         // .then ( (response) => {
//         //   expect(response.body).toEqual(false)
//         // })

//     });
//   });

//   describe('POST /User/signup', function () {
//     it('responds with existed username', () => {
//       request(server)
//         .post('/User/signup')
//         .send({
//           username: 'john',
//           password: '12345',
//         })
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200)
//         // .then ( (response) => {

//         //   expect(response.body.message).toEqual("User already exist")
//         // })

//     });

//     it('responds with new username', () => {
//       request(server)
//         .post('/User/signup')
//         .send({
//           username: 'Franck',
//           password: '12345',
//         })
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200)
//         // .then ( (response) => {
//         //   expect(response.body.username).toEqual(username)
//         // })

//     });
//   });
