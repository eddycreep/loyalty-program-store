"use client"

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Angry, Annoyed, Meh, Smile, Laugh } from "lucide-react";

export function SurveySheet({
    questions,
    surveyName,
    surveyCategory,
}: {
    questions: { question: string; answer: string; action: string; options?: string[] }[];
    surveyName: string;
    surveyCategory: string;
}) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Preview Survey</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Survey Preview</SheetTitle>
                    <SheetDescription>Preview of your current survey</SheetDescription>
                </SheetHeader>

                <div className="py-4">
                    {/* Display survey name and category at the top */}
                    <div className="mb-4">
                        <strong>{surveyName || "N/A"}</strong> <br />
                        <strong>Category: </strong> {surveyCategory || "N/A"}
                    </div>

                    {questions.length === 0 ? (
                        <p>No questions added yet.</p>
                    ) : (
                        questions.map((q, index) => (
                            <div key={index} className="py-4 border-b">
                                <div className="mb-2">
                                    <strong>{`Question ${index + 1}:`}</strong> {q.question}
                                </div>
                                <div className="mb-4">
                                    {q.action === "Text" && (
                                        <input
                                            type="text"
                                            placeholder="Your answer..."
                                            className="w-full p-2 rounded-lg border border-gray-300"
                                        />
                                    )}

                                    {q.action === "Rating" && (
                                        <div className="flex flex-col gap-2">
                                            {/* Add radio buttons, icons, and corresponding ratings */}
                                            <label className="flex items-center gap-2">
                                                <input type="radio" name={`rating-${index}`} value="1" />
                                                <Angry color="red" /> 1 - Poor
                                            </label>
                                            <label className="flex items-center gap-2">
                                                <input type="radio" name={`rating-${index}`} value="2" />
                                                <Annoyed color="orange" /> 2 - Bad
                                            </label>
                                            <label className="flex items-center gap-2">
                                                <input type="radio" name={`rating-${index}`} value="3" />
                                                <Meh color="gray" /> 3 - Okay
                                            </label>
                                            <label className="flex items-center gap-2">
                                                <input type="radio" name={`rating-${index}`} value="4" />
                                                <Smile color="green" /> 4 - Good
                                            </label>
                                            <label className="flex items-center gap-2">
                                                <input type="radio" name={`rating-${index}`} value="5" />
                                                <Laugh color="blue" /> 5 - Excellent
                                            </label>
                                        </div>
                                    )}

                                    {q.action === "Multiple Choice" && (
                                        <div className="flex flex-col gap-2">
                                            {q.options?.map((option, optionIndex) => (
                                                <label key={optionIndex} className="flex items-center gap-2">
                                                    <input type="radio" name={`question-${index}`} />
                                                    {option || `Option ${optionIndex + 1}`}
                                                </label>
                                            ))}
                                        </div>
                                    )}

                                    {q.action === "" && <em>Answer type not selected</em>}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}