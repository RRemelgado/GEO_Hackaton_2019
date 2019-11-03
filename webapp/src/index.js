// load all node modules
let express = require('express');
let app = express();
let port = 3000;

let mongoose = require("mongoose");
let Promise = require('promise');
let path = require('path');
let bodyParser = require('body-parser');

let GeoJSON = require('mongoose-geojson-schema');
let fs = require('fs');

let multer = require('multer');
let multipart = require('connect-multiparty');

// json parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//let FilePond = require('filepond');


// load index.html
app.get('/', function(req,res){
	res.sendfile(path.join(__dirname + '/index.html'));
});



// load test.html
app.get('/test', function(req,res){
	res.sendfile(path.join(__dirname + '/test.html'));
});


app.use(express.static('public'));


// use mongoose to load data into DB
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/hackathonDB");

let db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
});

// Build Schema
let GeoJSONSchema = new mongoose.Schema({
		type: String,
		date: Date,
		properties: {
			spotname: {
				type: String,
				required: true,
				max: 100
	    	},
			firstname: {
				type: String,
				required: true,
				max: 100
	    	},
			lastname: {
				type: String,
				required: true,
				max: 100
	    	},
			email: {
				type: String,
				required: true,
				max: 100
		   },
		   company: {
				type: String,
				required: true,
				max: 100
		   },
		   country: {
				type: String,
				required: true
		   },
		   groundwaterProbability: {
				type: Number,
				required: true,
				max: 100
		   },
		   landCover: {
		   	type: String,
				required: true
			},
			temperatureMax: {
				type: Number,
				required: true,
				max: 100
			},
			popDens: {
				type: Number,
				required: true,
				max: 100
			},
			soilDepth: {
				type: Number,
				required: true,
				max: 100
			},
			precipitationMax: {
				type: Number,
				required: true,
				max: 100
			},
		   images: {
			//data: Buffer,
			//contentType: String,
			path: Array
		   }
		},
		geometry: {
			type: {
			  type: String, // Don't do `{ location: { type: String } }`
			  enum: ['Point'], // 'location.type' must be 'Point'
			  required: true
			},
			coordinates: {
			  type: [Number],
			  required: true
			}
		}
});

// Build model from Schema
GeoJSON = mongoose.model("GeoJSON", GeoJSONSchema);


// Set storage for images
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/data/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + "." + file.mimetype.split("/").pop())
  }
});
let upload = multer({ storage: storage });

// Send 1 file from test.html
// app.post('/uploadfile', upload.single('filepond'), (req, res, next) => {
//   const file = req.file

//   if (!file) {
//     const error = new Error('Please upload a file')
//     error.httpStatusCode = 400
//     return next(error)
//   }
  
//   res.send(file)
  
// })

// Send multiple files from test.html
/*app.post('/uploadmultiple', upload.array('file', 12), (req, res, next) => {

	console.log(req.files);

  const files = req.files;
  if (!files) {
    const error = new Error('Please choose files')
    error.httpStatusCode = 400
    return next(error)
  }
 
  	console.log(files);
    res.send(files)
  
})*/



// Post data into DB incl. image paths
app.post('/submitdata', upload.array('file', 12), (req, res, next) => {

	// req.files is array of `photos` files
  // req.body will contain the text fields
	
	let spotname = req.body.spotName;
    let firstname = req.body.firstName;
    let lastname = req.body.lastName;
    let email = req.body.email;
    let country = req.body.country;
    let company = req.body.company;
    let lat = req.body.lat;
    let lon = req.body.lon;
    let date = new Date();
    let groundwaterProbability = req.body.groundwaterProbability;
    //let landCover = req.body.landCover;
    //let temperatureMax = req.body.temperatureMax;
    //let popDens = req.body.popDens;
    //let soilDepth = req.body.soilDepth;
    //let precipitationMax = req.body.precipitationMax;

    let imgPath = [];

    for (i = 0; i < req.files.length; i++) {
    	imgPath.push(req.files[i].filename);
    }

    //var img = fs.readFileSync(req.file.path);
	//var encode_image = img.toString('base64');

	let finalImg = {
      	//contentType: req.file.mimetype,
      	//data: new Buffer(encode_image, 'base64'),
      	path: imgPath
   	};
  
    let data = new GeoJSON ({
		"type": "Feature",
		"date": date,
		"properties":{
			"spotname": spotname,
			"firstname": firstname,
			"lastname":lastname,
			"email":email,
			"country":country,
			"company":company,
			"groundwaterProbability":groundwaterProbability,
			"images": finalImg
		},
		"geometry": {
			"type": "Point",
			"coordinates": [lon, lat]
		}
    });



		db.collection('submit').insertOne(data,function(err, collection){ 
		 	if (err) throw err; 
		  	console.log("Record inserted Successfully");
		});

		
		db.collection('submit').find().toArray(function(err, result) {
		    if (err) throw err;
		    console.log(result);

		    let jsonContent = JSON.stringify(result);

		    fs.writeFile("public/data/data.json", jsonContent, 'utf8', function (err) {
		    	if (err) throw err;

		    	console.log(result);
		    	console.log("JSON file has been saved.");
		    });
		});

		return res.redirect('/')

});



// run web server on Port 3000
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// run web server on Port 3000
// app.listen(port, () => {
//     console.log("Server listening on port " + port);
// });
  
  
  

