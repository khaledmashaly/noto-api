import { Router } from 'express';
import { MongoClient, ObjectID } from 'mongodb';
import assert from 'assert';

const noteRouter = new Router();
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
          })
          .delete((req, res) => {
            const id = new ObjectID(req.params.id);
            MongoClient.connect(mongoUrl, (err, client) => {
              assert.equal(null, err);
              console.log('connection success yaaaaaaay!');

              const db = client.db('noto');
              const collection = db.collection('notes');

              console.log('id:', id);

              collection.deleteOne({ _id: id })
                .then(({ acknowledged, deletedCount }) => {
                  assert.equal(deletedCount, 1);
                  res.status(204).send();
                })
                .catch((err) => console.error(err));

              client.close();
            });
          })
          .put((req, res) => {
            const id = new ObjectID(req.params.id);
            const { title: newTitle, body: newBody } = req.body;
            MongoClient.connect(mongoUrl, (err, client) => {
              assert.equal(null, err);

              const db = client.db('noto');
              const collection = db.collection('notes');

              collection.updateOne(
                { _id: id },
                {
                  $set: {
                    title: newTitle,
                    body: newBody
                  }
                }
              )
                .then((doc) => {
                  assert.equal(doc.modifiedCount, 1);
                  console.log('successfully edited notes from server');
                  res.status(204).send();
                })
                .catch((err) => console.error(err));

              client.close();
            });
          });

export default noteRouter;
