'use client'

import { Button } from "@/components/ui/button";
import { useQuiz } from './quizContext';
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import quizQuestions from "./quiz-questions/questions";
import { House } from "lucide-react";
import { streamConversation, Message } from "./actions";
import { readStreamableValue } from "ai/rsc";

export default function Hero() {
    const { isStarted, setIsStarted } = useQuiz();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [responses, setResponses] = useState<string[]>([]);
    const [destinations, setDestinations] = useState<any[]>([]);
    const questionKeys = Object.keys(quizQuestions);

    // gemini consts
    const [conversation, setConversation] = useState<Message[]>([]);
    const [input, setInput] = useState<string>("");

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'ArrowDown') {
            setCurrentQuestionIndex((prevIndex) => 
                Math.min(prevIndex + 1, questionKeys.length - 1)
            );
        } else if (event.key === 'ArrowUp') {
            setCurrentQuestionIndex((prevIndex) => 
                Math.max(prevIndex - 1, 0)
            );
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleNext = () => {
        setCurrentQuestionIndex((prevIndex) => 
            Math.min(prevIndex + 1, questionKeys.length - 1)
        );
    };

    const handlePrevious = () => {
        setCurrentQuestionIndex((prevIndex) => 
            Math.max(prevIndex - 1, 0)
        );
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newResponses = [...responses];
        newResponses[currentQuestionIndex] = event.target.value;
        setResponses(newResponses);
    };

    const handleFinish = async () => {
        try {
            const response = await fetch('/api/generatedestinations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ responses }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch destinations');
            }

            const data = await response.json();
            setDestinations(data.destinations);
        } catch (error) {
            console.error('Error fetching destinations:', error);
        }
    };

    return (
        <>        
    <div className="flex flex-col w-full place-items-center gap-6">
        {!isStarted ? (
            <>
                <h1 className="text-5xl cursor-pointer select-none">Match with your destination</h1>
                <Button className="select-none" onClick={() => setIsStarted(true)}>Get Started</Button>

                {/* debug Gemini server action */}
                {/* <div>
                    <div>
                        {conversation.map((message, index) => (
                            <div key={index}>
                                {message.role}: {message.content}
                            </div>
                        ))}
                    </div>

                    <div>
                        <input
                            type="text"
                            value={input}
                            onChange={(event) => {
                                setInput(event.target.value);
                            }}
                        />
                        <button
                            onClick={async () => {
                                const { messages, newMessage } = await streamConversation([
                                    ...conversation,
                                    { role: "user", content: input },
                                ]);

                                let textContent = "";

                                for await (const delta of readStreamableValue(newMessage)) {
                                    textContent = `${textContent}${delta}`;

                                    setConversation([
                                        ...messages,
                                        { role: "assistant", content: textContent },
                                    ]);
                                }
                            }}
                        >
                            Send Message
                        </button>
                    </div>
                </div> */}
                </>
            ) : (
                <>
                    <div id="question-container" className="w-full h-64 gap-6 flex flex-col place-items-center place-content-center">
                        
                        <p className="text-lg">{quizQuestions[questionKeys[currentQuestionIndex] as keyof typeof quizQuestions]}</p>
                        
                        <div className="flex w-full gap-6 place-content-center">
                        {responses[currentQuestionIndex]?.length > 2 && 
                        <Button className="p-0 m-0 select-none bg-transparent hover:bg-transparent text-primary hover:opacity-80 flex place-self-start" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>Back</Button>
                        }
                        <Input 
                            id="response-input" 
                            type="text" 
                            className="w-1/4" 
                            autoComplete="off"
                            value={responses[currentQuestionIndex] || ''}
                            onChange={handleInputChange}
                        />
                        {responses[currentQuestionIndex]?.length > 2 && 
                            <Button className="select-none" onClick={handleNext}>Next</Button>
                        }
                        </div>
                    </div>

                    <button className=" w-5 h-5 absolute bottom-10 right-10 bg-transparent hover:bg-transparent text-primary hover:opacity-80 z-10" onClick={() => setIsStarted(false)}>
                        <House className="absolute bottom-10 right-10 w-5 h-5" />
                    </button>

                    {isStarted && currentQuestionIndex === questionKeys.length - 1 &&
                    <>
                        <Button className="select-none w-max flex place-self-center" onClick={handleFinish}>Find Your Match!</Button>
                    </>
                    }
                </>
            )}
        </div>

        {destinations.length > 0 && (
            <div className="mt-6">
                <h2 className="text-2xl">Generated Destinations:</h2>
                <ul>
                    {destinations.map((destination, index) => (
                        <li key={index}>{`${destination.location} [${destination.compatibilityScore}]`}</li>
                    ))}
                </ul>
            </div>
        )}
        </>
    );
}
