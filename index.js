const fs = require('fs');
const getAllFiles = require('./node_modules/node-recursive-directory');
const crypto = require('crypto');
//var path = "./test/"

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
   
readline.question('Folder to hash: ', hashPath => {
    readline.question('Folder to put the hashes: ', folderPath =>{
        main(hashPath,folderPath)
        readline.close();
    })    
});


async function main(hashPath, folderPath){
    const files = await getAllFiles(hashPath); // add true
    console.log(files);
    hashFiles(files, folderPath)
}

function hashFiles(files, folderPath){
    files.forEach(file => {
        var md5sum = crypto.createHash('md5');

        var s = fs.ReadStream(file);
        s.on('data', function(d) {
          md5sum.update(d);
        });

        s.on('end', function() {
          var d = md5sum.digest('hex');
          
          fs.writeFile(folderPath+'/'+d, d, function (err) {
            if (err) throw err;
            console.log(d + '  ' + file);
          }); 
        });
    });
}