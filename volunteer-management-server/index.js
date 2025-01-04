const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();


app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://volunteer-management-a448a.web.app',
    'https://volunteer-management-a448a.firebaseapp.com'
    ],
  credentials:true

}));
app.use(express.json());
app.use(cookieParser());


const verifyToken =(req,res,next)=>{
  console.log('inside verify token',req.cookies);
  const token = req.cookies?.token;

  if(!token){
    return res.status(401).send({message: 'Unauthorized access'})
  }

  jwt.verify(token, process.env.JWT_SECRET, (err,decoded)=>{
    if(err){
      return res.status(401).send({message: 'Unauthorized access'});
    }

    req.user = decoded;
    next();
  })

}

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.y3dh1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const volunteerCollection = client.db("volunteerDB").collection("volunteer");
    const volunteerRequestCollection = client.db("volunteerDB").collection('volunteerRequest');

    //Auth related APIs
    app.post('/jwt', async(req,res)=>{
      const user = req.body;
      const token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '5h'});
      res
      .cookie('token',token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      })
      .send({success: true});
    });

    app.post('/logout', (req,res)=>{

      res.clearCookie('token',{
        httpOnly:true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      })
      .send({success:true})
    })




   // get all volunteer need posts

    app.get("/add-volunteer",async(req,res)=>{

      const search = req.query.search;
      const email = req.query.email;

      let filter ={};

      if (search) {
        filter = {
          title: {
            $regex: search,
            $options: 'i'
  
          }
         }
      }

      if(email){
        filter.email = email;
      }

      const cursor = volunteerCollection.find(filter);
      const result = await cursor.toArray();
      res.send(result);
    });


    app.post("/add-volunteer", async(req,res)=>{
      const addVolunteer = req.body;
      console.log(addVolunteer);

      const result = await volunteerCollection.insertOne(addVolunteer);
      res.send(result);
      
    });

    //get volunteer by specific id
    app.get('/volunteer/:id', async(req,res)=>{
      const id =req.params.id;
      const query={_id: new ObjectId(id)};
      const result= await volunteerCollection.findOne(query);
      res.send(result);
    });

    //update volunteer need post
    app.put('/volunteer/:id', async(req,res)=>{
      const id =req.params.id;
      const filter ={_id: new ObjectId(id)};
      const options={upsert: true};
      const updatedPost = req.body;
      const post={
        $set: {
          photo:updatedPost.photo,
          title:updatedPost.title,
          des:updatedPost.des,
          category:updatedPost.category,
          location:updatedPost.location,
          number:updatedPost.number,
          deadline:updatedPost.deadline
          
        }
      }

      const result =await volunteerCollection.updateOne(filter,post,options);
      res.send(result);
    })


    //delete volunteer need post
    app.delete('/volunteer/:id', async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await volunteerCollection.deleteOne(query);
      res.send(result);
    })


    

    //get volunteer request data of specific user
    app.get('/volunteer-request',verifyToken,async(req,res)=>{
      const email = req.query.email;
      const query = {volunteerEmail: email};

       // token email !== query email
       if(req.user.email !== req.query.email){
        return res.status(403).send({message: 'forbidden access'});

      }

      
      const result = await volunteerRequestCollection.find(query).toArray();
      res.send(result);
    })
       

  //add volunteer request data
    app.post('/volunteer-request', async (req, res) => {
      const requestData = req.body;
      const result = await volunteerRequestCollection.insertOne(requestData);

      const id = requestData.postId;
      const query = { _id: new ObjectId(id) };
      
      const volunteer = await volunteerCollection.findOne(query);

      const currentNumber = parseInt(volunteer.number, 10);
      if (isNaN(currentNumber)) {
        return res.status(400).send({ message: 'Invalid number value' });
      }

      const updatedData = {
        $set: { number: currentNumber - 1 }
      };

      const updatedNumber = await volunteerCollection.updateOne(query, updatedData);
      res.send(result);
    });

    //delete volunteer request post 
    app.delete('/volunteer-request/:id', async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await volunteerRequestCollection.deleteOne(query);
      res.send(result);
    })

    
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");


  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/' ,(req,res)=>{
    res.send('Volunteer management server is running');
})

app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`);
    
})