const express= require("express");
const bodyParser= require ("body-parser");
const request= require("request");

const app= express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function (req,res){
  let firstName= req.body.fName;
  let lastName= req.body.lName;
  let email=req.body.email;

  let data= {
    members:[
      {
        email_address:email,
        status: "subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
  let jsonData=JSON.stringify(data);

  let options={
    url: "https://us15.api.mailchimp.com/3.0/lists/d8eca4ed2a",
    method: "POST",
    headers:{
      "Authorization": "Practising f697f8281863a923afbe7329261d6d8c-us15"
    },
    body: jsonData
  };

  request(options,function(error,response,body){
    if(error){
      res.sendFile(__dirname+ "/failure.html");
    }else { if(response.statusCode===200){
      res.sendFile(__dirname+ "/success.html");
    } else {
      res.sendFile(__dirname+ "/failure.html");
    }

    }

  });
});
app.post("/failure", function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});

//f697f8281863a923afbe7329261d6d8c-us15

//d8eca4ed2a - id
