"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { QuestionCard } from "@/components/question-card";
import { QUESTIONNAIRE_QUESTIONS } from "@/lib/questionnaire-config";
import { useRouter } from "next/navigation";

type Answers = Record<string, any>;

const QuestionnairePage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const currentQuestion = QUESTIONNAIRE_QUESTIONS[currentStep];

  const handleAnswer = (answer: any) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));
  };

  const handleNext = () => {
    if (currentStep === QUESTIONNAIRE_QUESTIONS.length - 1) {
      console.log("Questionnaire completed:", answers);
      // TODO: eventually persist to DB and store session ID
      localStorage.setItem(
        "cinescore-session",
        JSON.stringify({
          answers,
          timestamp: Date.now(),
        })
      );
      router.push("/mixer");
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="relative flex flex-col w-full items-center justify-center min-h-screen py-8 bg-gradient-to-br from-indigo-50 via-violet-50 to-purple-50 dark:from-indigo-950/40 dark:via-violet-950/30 dark:to-purple-950/40">
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22300%22 height=%22300%22 filter=%22url(%23n)%22 opacity=%220.7%22/%3E%3C/svg%3E')",
        }}
      />

      {/* Subtle animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-400/20 dark:bg-indigo-500/15 blur-3xl animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute bottom-[-180px] right-[10%] h-[520px] w-[520px] rounded-full bg-violet-400/15 dark:bg-violet-500/10 blur-3xl animate-pulse"
          style={{ animationDuration: "5s", animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-[10%] h-[420px] w-[420px] rounded-full bg-purple-400/10 dark:bg-purple-500/8 blur-3xl animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 w-full px-4">
        <AnimatePresence mode="wait">
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            answer={answers[currentQuestion.id]}
            allAnswers={answers}
            onAnswer={handleAnswer}
            onNext={handleNext}
            onPrev={handlePrev}
            canGoNext={true}
            canGoPrev={currentStep > 0}
            currentStep={currentStep}
            totalSteps={QUESTIONNAIRE_QUESTIONS.length}
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuestionnairePage;
