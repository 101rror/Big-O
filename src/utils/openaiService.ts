interface DeepSeekResponse {
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
): Promise<DeepSeekResponse> => {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error(
      'OpenRouter API key is missing. Add VITE_OPENROUTER_API_KEY to your .env file.'
    );
  }

  const prompt = `
You are an expert in analyzing code complexity. Given the following ${language} code, analyze and return ONLY a pure JSON response following this structure (no markdown, no explanation, no code blocks):

{
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "explanation": {
    "time": "Explain time complexity here...",
    "space": "Explain space complexity here..."
  },
  "suggestions": ["Suggestion 1", "Suggestion 2"],
  "confidence": 0.9
}

Do not include any extra text, formatting, or markdown. Only return valid JSON.

Code:
${code}
`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:5173',
        'X-Title': 'Big-O Complexity Analyzer',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1-0528:free',
        messages: [
          { role: 'system', content: 'You are a code analysis expert. Return only JSON.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.2,
        max_tokens: 3500,
      }),
    });

    const data = await response.json();
    console.log('📦 OpenRouter raw response:', data);

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${data?.error?.message || 'Unknown error'}`);
    }

    const content = data.choices?.[0]?.message?.content;
    console.log('📝 Raw content:', content);

    if (!content || content.trim() === '') {
      throw new Error('Empty response from OpenRouter — possibly due to long input or timeout.');
    }

    const codeBlockMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    let jsonString = '';

    if (codeBlockMatch) {
      jsonString = codeBlockMatch[1];
    } else {
      const fallbackMatch = content.match(/\{[\s\S]*\}/);
      if (fallbackMatch) {
        jsonString = fallbackMatch[0];
      } else {
        throw new Error('Failed to extract JSON from model output');
      }
    }

    const parsed = JSON.parse(jsonString);
    console.log('✅ Parsed JSON:', parsed);
    return parsed;
  } catch (error) {
    console.error('❌ OpenRouter / DeepSeek error:', error);
    throw error;
  }
};
