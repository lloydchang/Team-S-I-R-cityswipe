// import { NextApiRequest, NextApiResponse } from 'next';
// import { GoogleGenerativeAI } from '@google/generative-ai';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === 'POST') {
//         const { responses } = req.body;

//         if (!Array.isArray(responses) || responses.length === 0) {
//             return res.status(400).json({ error: 'Invalid input: responses must be a non-empty array' });
//         }

//         const prompt = `Based on the following travel preferences, generate a list of exactly 50 travel destinations formatted as 'City, Country [Compatibility Percentage]'. Make sure the compatibility percentage is a number between 0 and 100. Each entry should be on a new line, questions are answered in order of listing as follows: traveler type, mountain or beach, history or adventure, local cuisine or not, hotel or rental, budget importance, solo or companions, planning or spontaenity, outdoor or no, preffered transportation. Responses in order: \n\n${responses.join('\n')}`;

//         const genAI = new GoogleGenerativeAI("AIzaSyC2lYXKtSOt4vqGC2gSNFiT5mN8kXcB-5E");
//         const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

//         try {
//             const streamingResponse = await model.generateContentStream(prompt);
//             const destinations = await streamingResponse.getData();

//             const formattedDestinations = destinations.split('\n').filter(Boolean).map(destination => {
//                 const [location, score] = destination.split('[');
//                 return {
//                     location: location.trim(),
//                     compatibilityScore: score ? parseFloat(score.replace(']', '').trim()) : null,
//                 };
//             });

//             res.status(200).json({ destinations: formattedDestinations });
//         } catch (error) {
//             console.error('Error generating destinations:', error);
//             res.status(500).json({ error: 'Failed to generate destinations' });
//         }
//     } else {
//         res.setHeader('Allow', ['POST']);
//         res.status(405).end(`${req.method} Not Allowed`);
//     }
// }
