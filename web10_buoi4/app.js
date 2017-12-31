const fileController = require ('./fileController');

fileController.writeFile("testFileController.txt", "Hello");




const fileSystem = require('fs'); //lấy thư viện fs để dùng


let writeData = "Hello this is file system";

let objectData = {
	a : 2,
	b : 5
}

// fileSystem.writeFileSync("test.txt", JSON.stringify(objectData), 'utf-8');
// console.log("Begin writing file sync");

// let readFileData = fileSystem.readFileSync("test.txt", 'utf-8');
// console.log(readFileData);

// let convertFileData = JSON.parse(readFileData);

// console.log(convertFileData.a);


// // fileSystem.writeFile();
// console.log("End writing file sync");
// // fileSystem.readFile();
// // fileSystem.readFileSync();



// fileSystem.writeFile("testAsync.txt", writeData, 'utf-8', (err) =>{
// 	console.log(err);
// 	console.log("Write file success");
// });









