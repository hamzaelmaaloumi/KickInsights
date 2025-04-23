import axios from 'axios';

interface myp {
  prompt: string,
}

// Function to generate content using Django proxy
export const generateContent = async ({prompt}: myp) => {
  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/myapp/api/gemini/generate-content/',
      {
        prompt: prompt,
      }
    );
    console.log(response.data)
    
    const generatedText = response.data.candidates[0].content.parts[0].text;

    return generatedText;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
};