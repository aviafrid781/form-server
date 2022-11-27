const express = require('express');

const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;


const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//middle wire
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zoeq8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {

        await client.connect();
        console.log('connected  travel database Successfully');
        const database = client.db('travels-details');

        const servicesCollection = database.collection('services');
        const ordersCollection = database.collection('orders');
        const bikeCollection = database.collection('bikes');
        const carsCollection = database.collection('cars');
        const furnitureCollection = database.collection('furnitures');


        //Get multiple  api 
        app.get('/services', async (req, res) => {
            const cursor = servicesCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
        })
     
        //get oder Api
        app.get('/orders', async (req, res) => {
            const cursor = ordersCollection.find({});
            const order = await cursor.toArray();
            res.send(order);

        })

        //double 
        app.get('/orders', async (req, res) => {
            const cursor = ordersCollection.find({});
            const order = await cursor.toArray();
            res.send(order);

        })

        //Get single API
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            console.log('getting specific id', id);
            const query = { _id: ObjectId(id) };
            const service = await servicesCollection.findOne(query);
            res.json(service);
        })
        //get Bikes Api
        app.get('/bikes', async (req, res) => {
            const cursor = bikeCollection.find({});
            const order = await cursor.toArray();
            res.send(order);
        })

        //get furnitures Api
        app.get('/furnitures', async (req, res) => {
            const cursor = furnitureCollection.find({});
            const order = await cursor.toArray();
            res.send(order);
        })

        //get cars Api
        app.get('/cars', async (req, res) => {
            const cursor = carsCollection.find({});
            const order = await cursor.toArray();
            res.send(order);
        })
        //POST API
        app.post('/services', async (req, res) => {

            const service = req.body;
            console.log('hit the post api', service);
            const result = await servicesCollection.insertOne(service);
            console.log(result);
            res.json(result);
        });


        //order POST API
        app.post('/orders', async (req, res) => {
            const order = req.body;
            console.log('hit the post order api', order);
            const result = await ordersCollection.insertOne(order);;
            console.log(result);
            res.json(result);
        });


        //bike POST API
        app.post('/bikes', async (req, res) => {
            const bike = req.body;
            console.log('hit the post order api', bike);
            const result = await bikeCollection.insertOne(bike);;
            console.log(result);
            res.json(result);
        });
        //car POST API
        app.post('/cars', async (req, res) => {
            const car = req.body;
            console.log('hit the post order api', car);
            const result = await carsCollection.insertOne(car);;
            console.log(result);
            res.json(result);
        });

        //furniture POST API
        app.post('/furnitures', async (req, res) => {
            const furniture = req.body;
            console.log('hit the post order api', furniture);
            const result = await furnitureCollection.insertOne(furniture);;
            console.log(result);
            res.json(result);
        });
        //delete API 
        app.delete('/orders/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await ordersCollection.deleteOne(query);
            res.json(result);
        });
    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);
app.get('/', (req, res) => {
    res.send('running travel server');
})

app.listen(port, () => {
    console.log('Running travel tours server', port);
})
