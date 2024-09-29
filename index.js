const express=require('express');                                   // create express
const cors=require('cors');                                         // create cross origion resource sharing mechanism
const app=express();                                                // open express
const stripe=require('stripe')('sk_test_51Q4GSlJTeMCB2dU79h0wGFMHg9Lbbu3q1OjimujMurn0QxpoxE0EZHwneKvPe4MMAlMXyyG6l7YqhnCBv2P9XaY400UNxXCT5c');

app.use(cors());                                                    // use cors

app.get('/', (req,res)=>{                                           // get api/call
    res.send("Hey, Buddy");                                         // response
});

app.listen(3000,()=>{                                               // listen
    console.log("Successfully run on port 3000");
});

app.post('/pay',async(req,res)=>{                                   // post api call 
    const product=await stripe.products.create({                    // create product
        name:"Pichla Bakaya Dhanrashi"                              // product name
    });

    if(product){                                                    // if true
        var price=await stripe.prices.create({                      // create price
            product:`${product.id}`,                                // access product via id
            unit_amount:18000*100,                                  // create amount
            currency:'inr',                                         // currency

        })
    }

    if(price.id){                                                   // if true
        var session =await stripe.checkout.sessions.create({        // create session
            line_items:[{                                           // create items array
                price:`${price.id}`,                                // access price via id
                quantity:1,                                         // quantity
            }
        ],
        mode:'payment',                                             // mode of payment
        success_url:'http://localhost:3000/success',                // success url
        cancel_url:'http://localhost:3000/cancel',                  // cancel url
        customer_email:'gurkirat.singh2508@gmail.com',              // email_id
        })
    
    }
    res.json(session)                                               // sending response


})


