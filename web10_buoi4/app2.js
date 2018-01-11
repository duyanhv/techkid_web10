const express = require('express');
const app = express();
const config = require('./config.json');
const askRouter = require('./askRouter');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const mainpageRoute = require('./mainpageRouter');
const fc = require('./fileController');
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended:true }))
app.engine("handlebars", handlebars({defaultLayout: 'main'}));
app.set("view engine", "handlebars");
// app.use(express.static('public'));

// app.get('/',(req,res)=>{
// 	res.render("index",{
// 		layouts: "other",
// 		varibles: "hey"
// 	});
// });



// app.use('/public',express.static(__dirname + '/public'));
// app.use('/public/cv1',express.static(__dirname + '/public/cv1'));
// app.use('/public/cv2',express.static(__dirname + '/public/cv2'));
// app.use('/', express.static(__dirname + '/public'));


// app.get('/', (req, res)=>{
// 	res.render("main");
// })

app.use('/', askRouter);

app.use('/mainpage', mainpageRoute);


app.use(express.static('public'));

                         

//mỗi khi có người request pathname (domain) thì sẽ gọi 1 hàm để xử lý request
// app.get('/', (req, res) =>{
// 	res.sendFile(__dirname + "/public/" +"index.html");
// })

// app.get('/about1', (req, res) =>{
// 	res.sendFile(__dirname + "/public/cv1/" +"index.html");

// })

// app.get('/about2', (req, res) =>{
// 	res.sendFile(__dirname + "/public/cv2/" +"index.html");

// })


mongoose.connect("mongodb://localhost:27017/decide", (err) =>{
	if(err){
		console.log(err);
	}else{
		console.log("Connect successfully");
	}
});

//6969 là port ở local host
app.listen(config.port, (err) =>{
	if(err){
		console.log(err);
	}
	console.log(`App is listening at port ${config.port}`);
})

