// const OpenAI = require("openai");

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY
// });

// exports.generateDescription = async (data) => {

//   const prompt = `
//   Write a professional ecommerce product description.

//   Product Name: ${data.name}
//   Category: ${data.category}
//   Brand: ${data.brand}
//   Features: ${data.features}
//   Price: ${data.price}
//   `;

//   const response = await openai.responses.create({
//     model: "gpt-4.1-mini",
//     input: prompt
//   });
//   console.log("OpenAI Response:", response);

//   return response.output[0].content[0].text;
// };


const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.generateDescription = async (data, image) => {

//   const prompt = `
// Write a professional ecommerce product description.

// Product Name: ${data.name}
// Category: ${data.category}
// Brand: ${data.brand}
// Features: ${data.features}
// Price: ${data.price}
// `;
  const prompt = `
  You are an expert ecommerce copywriter specializing in product descriptions that drive conversions. Your task is to write a professional, compelling product description for an ecommerce listing.

Product Information:

Product Name: ${data.name}
Category: ${data.category}
Brand: ${data.brand}
Features: ${data.features}
Price: ${data.price}
Your Goal:
Create a single, cohesive product description that positions this product compellingly for potential buyers. The description should balance professionalism with persuasion—it must inform while encouraging purchase consideration.

Requirements:

Opening Hook (1-2 sentences): Start with the primary benefit or use case that immediately resonates with the target customer. Lead with value, not specifications.

Body (2-3 paragraphs): Weave the features into benefit-driven language. Explain what each feature does for the user, not just what it is. Address both functional and emotional needs.

Closing (1-2 sentences): Include a soft call-to-action or reinforce the value proposition. Don't be salesy—be confident.

Tone & Style:

Professional but approachable (not stiff or overly technical)
Avoid marketing clichés ("revolutionary," "game-changing," "one-of-a-kind")
Write for the actual customer, not for search engines
Use active voice and concrete language
Keep sentences clear and scannable
Technical Notes:

Aim for 150-250 words
Use line breaks between sections for readability
Assume the customer can see images; don't describe appearance—describe experience
If price positioning is relevant (premium, value, luxury), let it naturally inform your tone
Output only the product description, ready to publish on an ecommerce platform.`;
  let content = [
    {
      type: "input_text",
      text: prompt
    }
  ];

  // ✅ FIXED IMAGE PART
  // if(image){
  //   const base64 = image.buffer.toString("base64");

  //   content.push({
  //     type: "input_image",
  //     image_url: `data:${image.mimetype};base64,${base64}`
  //   });
  // }

  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: [
      {
        role: "user",
        content: content
      }
    ]
  });

  return response.output[0].content[0].text;
};