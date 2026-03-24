// const express = require("express");
// const router = express.Router();
// const Product = require("../models/product.model");
// const OpenAI = require("openai");

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY
// });


// router.post("/generate", async (req,res)=>{

//     try{

//         const {name,category,brand,features,price} = req.body;

//         const prompt = `
//         Write an ecommerce product description.

//         Product Name: ${name}
//         Category: ${category}
//         Brand: ${brand}
//         Features: ${features}
//         Price: ${price}

//         Make it engaging and professional.
//         `;

//         const response = await openai.responses.create({
//             model:"gpt-4.1-mini",
//             input:prompt
//         });

//         const description = response.output[0].content[0].text;

//         res.json({description});

//     }
//     catch(err){
//         console.log(err);
//         res.status(500).json({error:"AI generation failed"});
//     }

// });


// router.post("/save", async (req,res)=>{

//     try{

//         const product = new Product(req.body);

//         const saved = await product.save();

//         res.json(saved);

//     }
//     catch(err){
//         console.log(err);
//         res.status(500).json({error:"Save failed"});
//     }

// });

// module.exports = router;



// AI Gateway Layer
// const express = require("express");
// const router = express.Router();
// const aiService = require("../services/aiProvider.service");

// router.post("/generate", async (req,res)=>{

//   try{
//     const description = await aiService.generateDescription(req.body);
//     res.json({description});
//   }
//   catch(err){
//     console.log(err);
//     res.status(500).json({error:"AI failed"});
//   }

// });

// module.exports = router;



const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const aiService = require("../services/aiProvider.service");

router.post("/generate", upload.single("image"), async (req,res)=>{

  try{

    const data = req.body;
    const image = req.file;

    const description = await aiService.generateDescription(data, image);

    res.json({description});

  }
  catch(err){
    console.log(err);
    res.status(500).json({error:"AI failed"});
  }

});

module.exports = router;