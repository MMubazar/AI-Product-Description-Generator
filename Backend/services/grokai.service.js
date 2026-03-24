// const axios = require("axios");

// exports.generateDescription = async (data) => {
  //   try {
    
  //     const prompt = `
  //     Write a professional ecommerce product description.
  
  //     Product Name: ${data.name}
  //     Category: ${data.category}
//     Brand: ${data.brand}
//     Features: ${data.features}
//     Price: ${data.price}
//     `;

//     const response = await axios.post(
//       "https://api.x.ai/v1/responses",
//       {
//         model: "grok-1",   // 👈 change this
//         messages: [
//           {
//             role: "user",
//             content: prompt
//           }
//         ],
//         temperature: 0.7
//       },
//       {
  //         headers: {
    //           "Authorization": `Bearer ${process.env.GROK_API_KEY}`,
    //           "Content-Type": "application/json"
    //         }
    //       }
    //     );
    
    //     return response.data.choices[0].message.content;
    
//   } catch (error) {
  
//     console.log("Grok Error:", error.response?.data || error.message);

//     throw error;
//   }

// };




const axios = require("axios");

exports.generateDescription = async (data) => {
  console.log("GrokAI Service - Input Data:", data);
  
  try {
    
    const prompt = `
    Write a professional ecommerce product description.
    
    Product Name: ${data.name}
    Category: ${data.category}
    Brand: ${data.brand}
    Features: ${data.features}
    Price: ${data.price}
    `;
    
    const response = await axios.post(
      "https://api.x.ai/v1/responses", // ✅ correct endpoint
      {
        model: "grok-3-beta",               // ✅ correct model
        input: prompt,                 // Grok uses 'input' instead of 'messages'
        temperature: 0.7
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.GROK_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );
    
    // Grok returns response like: response.output_text
    console.log("Grok Response:", response.data);
    return response.data.output_text;

  } catch (error) {
    console.log("Grok Error:", error.response?.data || error.message);
    throw error;
  }

};