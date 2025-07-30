interface OpenAIResponse {
  timeComplexity: string;
  spaceComplexity: string;
  explanation: {
    time: string;
    space: string;
  };
  suggestions: string[];
  optimizedCode?: string;
  confidence: number;
}

export const analyzeCodeWithOpenAI = async (
  code: string, 
  language: string
): Promise<OpenAIResponse> => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('OpenAI API key is not configured. Please add VITE_OPENAI_API_KEY to your environment variables.');
  }

  const prompt = `Analyze the following ${language} code for time and space complexity. Provide a detailed analysis in JSON format with the following structure:

{
  "timeComplexity": "Big-O notation (e.g., O(n), O(log n), O(n²))",
  "spaceComplexity": "Big-O notation for space usage",
  "explanation": {
    "time": "Detailed explanation of why this time complexity",
    "space": "Detailed explanation of why this space complexity"
  },
  "suggestions": ["Array of 3-5 optimization suggestions"],
  "optimizedCode": "Improved version of the code (if applicable)",
  "confidence": 0.95
}

Code to analyze:
\`\`\`${language}
${code}
\`\`\`

Please provide accurate Big-O analysis considering:
1. Loop structures and nesting
2. Recursive calls and their depth
3. Data structure operations
4. Algorithm patterns (sorting, searching, etc.)
5. Memory allocation and usage

Be precise with the complexity notation and provide actionable optimization suggestions.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert computer science professor specializing in algorithm analysis and Big-O complexity. Provide accurate, detailed complexity analysis in the requested JSON format.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.1,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No response content from OpenAI');
    }

    // Extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid JSON response from OpenAI');
    }

    const analysisResult = JSON.parse(jsonMatch[0]);
    
    // Validate the response structure
    if (!analysisResult.timeComplexity || !analysisResult.spaceComplexity) {
      throw new Error('Invalid analysis result structure');
    }

    return analysisResult;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw error;
  }
};