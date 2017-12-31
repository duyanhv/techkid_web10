const express = require('express');
const app = express();

app.use('/public',express.static(__dirname + '/public'));
app.use('/public/cv1',express.static(__dirname + '/public/cv1'));
app.use('/public/cv2',express.static(__dirname + '/public/cv2'));
app.use('/', express.static(__dirname + '/public/mainpage'));


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



//6969 là port ở local host
app.listen(8080, (err) =>{
	if(err){
		console.log(err);
	}
	console.log("App is listening at port ");
})

