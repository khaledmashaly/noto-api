import express from 'express';
import {MongoClient, ObjectID} from 'mongodb';
import assert from 'assert';

const noteRouter = new express.Router();
const mongoUrl = 'mongodb://localhost:27017';

noteRouter.route('/')
          .get((req, res) => {
            MongoClient.connect(mongoUrl, (err, client) => {
              assert.equal(null, err);
              console.log('connection success yaaaaaaay!');

              const db = client.db('noto');
              const collection = db.collection('notes');

              collection.find({})
                        .toArray()
                        .then((docs) => {
                          console.log('successfully retrieved notes from server');
                          res.status(200).json(docs);
                        })
                        .catch((err) => console.error(err));

              client.close();
            });
          })
          .post((req, res) => {
            res.status(201).json({'hello': 'world'});
          });

noteRouter.route('/:id')
          .get((req, res) => {
            const id = new ObjectID(req.params.id);
            MongoClient.connect(mongoUrl, (err, client) => {
              assert.equal(null, err);

              const db = client.db('noto');
              const collection = db.collection('notes');

              collection.findOne({_id: id})
                .then((doc) => {
                  res.status(200).json(doc);
                })
                .catch((err) => console.error(err));

              client.close();
            });
          });
          /* .put((req, res) => {
            const id = req.params.id;
            MongoClient.connect(mongoUrl, (err, client) => {
              assert.equal(null, err);
              console.log('connection success yaaaaaaay!');

              const db = client.db('noto');
              const collection = db.collection('notes');

              collection.findOneAndUpdate({ _id: id })
                .then((doc) => {
                  console.log('successfully retrieved notes from server');
                  res.status(200).json(doc);
                })
                .catch((err) => console.error(err));

              client.close();
            });
          })
          .delete((req, res) => {
            const id = req.params.id;
            MongoClient.connect(mongoUrl, (err, client) => {
              assert.equal(null, err);
              console.log('connection success yaaaaaaay!');

              const db = client.db('noto');
              const collection = db.collection('notes');

              collection.findOne({ _id: id })
                .then((doc) => {
                  console.log('successfully retrieved notes from server');
                  res.status(200).json(doc);
                })
                .catch((err) => console.error(err));

              client.close();
            });
          }); */

export default noteRouter;
