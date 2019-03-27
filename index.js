let express = require('express');
let cors = require('cors');
let Faker = require('faker');
let multer = require('multer');
let bodyparser = require('body-parser');
let app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyparser.json());

app.get('/', (req, res)=>{
    res.send('Server is Happy and working');
});

app.get('/api/newcar', (req, res)=>{
    let genJob = {
        make: Faker.commerce.product() + ' Motors',
        model: Faker.commerce.productAdjective(),
        year: new Date( Faker.date.between('1995-01-01', '2099-01-01') ).getFullYear(),
        color: Faker.commerce.color(),
        owner: Faker.name.findName(),
        picture: Faker.image.transport()
    }
    console.log('generating new car Job', genJob)
    res.json(genJob);
})

app.get('/api/newnote', (req, res)=>{
    res.json({
        note: Faker.lorem.sentence()
    })
})

app.get('/api/jobprefill', (req, res)=>{
    let job = {
        description: Faker.lorem.sentence(),
        cost: Faker.finance.amount()
    }

    res.json(job);
});

app.post('/api/login', (req, res)=>{
    console.log(req.body);

    if ( req.body.user === req.body.password ){
        res.json({
            login: true
        })
    } else {
        res.json({
            login: false,
            message: 'that user/password combination is incorrect or doesnt exist'
        })
    }
})

app.post('/api/fail', (req, res)=>{
    res.status(408).json({error: true, message: "something went horribly wrong"});
})

app.listen(PORT, ()=>{
    console.log(`Server Running on port ${PORT}`);
})