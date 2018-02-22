
const express  =  require ( 'express' );
const app  = express ();

const data  =  require ( './users.json' );
const users  = data . users;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app . get ( '/users' ,  function  ( req , res ) {
    res . send ( users );
});

app . get ( '/users/:id' ,  function ( req , res ){
    let id  = req . params . id;
    let res_data  =  "No user";
    for  ( let user of users ){
        if ( id  == user . id ){
            res_data  = user;
            break;
        }
    }
    res . send ( res_data );
});


app . get ( '/users/:id/view_followers' ,  function ( req , res ){

    let id  = req . params . id;
    let res_data  =  "No user";

    for  ( let user of users ){
        if ( id  == user . id ){
            res_data  = user;
            break;
        }
    }
    if (res_data != "No user") {
        console.log(res_data.followers);
        var json = JSON.parse(res_data);
        res.send(json.followers);
        res.send(res_data.followers);

    }

    else {
        res . send ( res_data );
    }

});




app.post( '/users' ,  function ( req , res ){

    let user_data  = req.body;
    users.push(user_data);
    res.send(users);
    console.log(req.body);
});

app . put ( '/users/:id' ,  function ( req , res ){
    let id  = req . params . id;
    let user_data  = req . body;
    for  ( let user of users ){
        if ( id  === user . id ){
            let uid  = users . indexOf ( user );
            users [ uid ]  = user_data;
            break;
        }
    }
    res . send ( user_data );
});

app . delete ( '/users/:id' ,  function ( req , res ){
    let id  = req . params . id;
    for  ( let user of users ){
        if ( id  == user . id ){
            let  uid  = users . indexOf ( user );
// remove 1 item at index ‘uid’
            users.splice ( uid, 1 );
        }
    }
    res . send ( users );
});

app . listen ( 3000 ,  function (){
    console . log ( "Example app listening on port 3000!" );
});