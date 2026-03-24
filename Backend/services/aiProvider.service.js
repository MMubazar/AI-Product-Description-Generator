// const openaiService = require("./openai.service");
// const grokService = require("./grokai.service");

// exports.generateDescription = async (data) => {

//   const provider = process.env.AI_PROVIDER;
//   console.log("Using AI Provider:", provider);
//   if(provider === "openai"){
//     return await openaiService.generateDescription(data);
//   }

//   if(provider === "grok"){
//     return await grokService.generateDescription(data);
//   }

//   throw new Error("Invalid AI Provider");
// };


const openaiService = require("./openai.service");
const grokService = require("./grokai.service");

exports.generateDescription = async (data, image) => {

  const provider = data.provider || process.env.AI_PROVIDER;

  if(provider === "openai"){
    return await openaiService.generateDescription(data, image);
  }

  if(provider === "grok"){
    return await grokService.generateDescription(data, image);
  }

  throw new Error("Invalid provider");
};