const app = require('./../app');
const http = require('http')


const control = async (req, res, next, val, path) => {
    const postData = JSON.stringify({ command: val });  // Replace with actual data
    const smartHomeOptions = {  
      hostname: 'localhost', // smart home server
      port: 8000, // smart home port
      path: path, // api endpoint smart home server . 
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
       }
    };

    const smartHomeReq = await http.request(smartHomeOptions, (smartHomeRes) => {
      smartHomeRes.on('data', (d) => {
        console.log('Response from smart home server:', JSON.parse(d.toString()));
      });
    }); 
    
    smartHomeReq.on('error', (error) => {
      console.error('Error communicating with smart home server:', error.message);
    });

      smartHomeReq.write(postData); // include the commande to req body 
      smartHomeReq.end(); // send data to smart home server .

    next();
}



exports.controlLight = async (req,res,next,val = 'turn_off') => {

      res.json({message:" light on"}) // app server to the client . 
      control(req,res,next,val,'/light')
  
     next();
}


exports.controltemp = async (req,res,next,val = 'turn_off') => {

    res.json({message:" temp "}) // app server to the client . 
    control(req,res,next,val,'/temp')

   next();
}

exports.controlprise = async (req,res,next,val = 'turn_off') => {

    res.json({message:"prise "}) // app server to the client . 
    control(req,res,next,val,'/prise')

   next();
}


exports.controlgas = async (req,res,next,val = 'turn_off') => {

    res.json({message:"gas "}) // app server to the client . 
    control(req,res,next,val,'/gas')

   next();
}
