var express = require('express');
var cookieParser = require('cookie-parser');

var router = express.Router();





router.use(cookieParser());


const fs = require('fs')
router.get('/leer',function(req,res)
{
	 console.log(req.cookies)
     var path = req.query.path;
     var pos = req.query.pos || 0;
     var lenght = req.query.lenght || 16; 

     var buffer = new Buffer.alloc(parseInt(lenght));
     fs.open(path, 'r+', function (err, fd) {
	    if (err) {
		return console.error(err);
	    }
	  
	    console.log("Reading the file");
	  
	    fs.read(fd, buffer, 0, buffer.length,
		parseInt(pos), function (err, bytes) {
		    if (err) {
		        console.log(err);
		    }
	  
		    if (bytes > 0) {
		        console.log(buffer.
		            slice(0, bytes).toString());
		    }
		    console.log(bytes + " bytes read");
	  
		    // Close the opened file.
		    fs.close(fd, function (err) {
		        if (err) {
		            console.log(err);
		        }
	  
		        console.log("File closed successfully");
		    });
		      res.send(buffer.
		            slice(0, bytes).toString());
		});
       });
        	 
});

router.post('/escribir',function(req,res,next)

{
    //console.log(req);
    console.log(req.body);
  
    fs.appendFile(req.body.path, req.body.buffer , function (err) {
    if (err) throw err;
   		 console.log('Saved!');

	});
            
         res.send('Se guardo');
	
});


app.listen(3000, () => {
	console.log(`Example app listening at http://localhost:${port}`)
  }) 