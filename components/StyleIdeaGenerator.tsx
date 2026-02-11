import React, { useState } from 'react';
import { SparklesIcon } from './Icons';
import { getStyleRecommendations } from '../services/geminiService';

const StyleIdeaGenerator: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [ideas, setIdeas] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async () => {
        if (!prompt) return;
        setIsLoading(true);
        setIdeas('');
        const result = await getStyleRecommendations(prompt);
        setIdeas(result);
        setIsLoading(false);
    };
    
    const formatIdeas = (text: string) => {
        // Basic splitting by newlines and filtering empty strings
        const lines = text.split('\n').filter(line => line.trim() !== '');
        return lines.map((line, index) => {
            // Check for bold markdown syntax *text* or **text**
            // Fixed regex to escape the asterisk correctly
            const boldRegex = /(\*\*|\*)(.*?)(\1)/g;
            const parts = line.split(boldRegex);
            
            return (
                <div key={index} className="mb-2 last:mb-0">
                    {parts.map((part, i) => {
                         // Simple check if it was a match for the delimiter
                         if (part === '*' || part === '**') return null;
                         
                         // If the previous part in the split array was a delimiter, this part is the bold content
                         // Note: split with capturing groups includes the captures in the result array
                         // Sequence is usually: [pre, delimiter, content, delimiter, post...]
                         // We can check if the current part is the content group
                         
                         const isBoldContent = (parts[i-1] === '*' || parts[i-1] === '**') && (parts[i+1] === '*' || parts[i+1] === '**');
                         // Simplified check: loosely detect if part is surrounded by delimiters in original split logic
                         // A safer way with React mapping is often parsing, but for this simple case:
                         
                         if (i > 0 && (parts[i-1] === '*' || parts[i-1] === '**')) {
                             return <strong key={i} className="text-brand-pink-600 font-semibold">{part}</strong>;
                         }
                         return <span key={i}>{part}</span>;
                    })}
                </div>
            );
        });
    };

    return (
        <div className="bg-gradient-to-r from-brand-pink-50 to-white p-4 rounded-xl mb-6 border border-brand-pink-100 shadow-sm">
            <div className="flex items-center mb-3">
                <SparklesIcon className="w-5 h-5 text-brand-pink-500 mr-2" />
                <h3 className="text-lg font-bold text-brand-pink-900">AI Style Inspo</h3>
            </div>
            <p className="text-xs text-brand-pink-700 mb-3">Describe a vibe or occasion (e.g., "Coachella boho", "Corporate chic").</p>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                    placeholder="What's the vibe?"
                    className="flex-grow px-3 py-2 bg-white border border-brand-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-pink-300 text-sm placeholder-brand-pink-300 text-gray-700"
                />
                <button 
                    onClick={handleGenerate} 
                    disabled={isLoading} 
                    className="bg-brand-pink-500 text-white font-semibold px-4 py-2 rounded-lg shadow-sm hover:bg-brand-pink-600 disabled:bg-brand-pink-300 transition text-sm flex-shrink-0"
                >
                    {isLoading ? (
                        <span className="animate-pulse">...</span>
                    ) : 'Ask'}
                </button>
            </div>
            {ideas && (
                <div className="mt-4 p-3 bg-white/80 backdrop-blur-sm rounded-lg border border-brand-pink-100 text-sm text-gray-700 shadow-inner animate-in fade-in duration-500">
                    {formatIdeas(ideas)}
                </div>
            )}

        </div>
    );
};

export default StyleIdeaGenerator;