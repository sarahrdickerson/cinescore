"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { Question } from "@/lib/questionnaire-config";

type QuestionCardProps = {
  question: Question;
  answer: any;
  allAnswers?: Record<string, any>; // For filtering based on previous answers
  onAnswer: (answer: any) => void;
  onNext: () => void;
  onPrev: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  currentStep: number;
  totalSteps: number;
};

export function QuestionCard({
  question,
  answer,
  allAnswers = {},
  onAnswer,
  onNext,
  onPrev,
  canGoNext,
  canGoPrev,
  currentStep,
  totalSteps,
}: QuestionCardProps) {
  const isAnswered = answer !== null && answer !== undefined && answer !== "";

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="p-8 border-border/60 bg-card/70 backdrop-blur-xl shadow-2xl">
        {/* Progress indicator */}
        <CardHeader>
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>
              Question {currentStep + 1} of {totalSteps}
            </span>
            <span>{Math.round(((currentStep + 1) / totalSteps) * 100)}%</span>
          </div>
          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-indigo-500"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </CardHeader>

        <CardContent>
          {/* Question */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              {question.title}
            </h2>
            {question.description && (
              <p className="text-muted-foreground">{question.description}</p>
            )}
          </div>

          {/* Answer options based on type */}
          <div className="mb-8">
            {question.type === "single-choice" && (
              <SingleChoiceOptions
                options={question.options || []}
                selected={answer}
                onSelect={onAnswer}
              />
            )}

            {question.type === "multi-choice" && (
              <MultiChoiceOptions
                options={question.options || []}
                selected={answer || []}
                limit={question.limit}
                onToggle={(optionId) => {
                  const current = answer || [];
                  const isRemoving = current.includes(optionId);
                  const maxReached =
                    question.limit && current.length >= question.limit;

                  // If at limit and trying to add, don't allow
                  if (!isRemoving && maxReached) {
                    return;
                  }

                  const updated = isRemoving
                    ? current.filter((id: string) => id !== optionId)
                    : [...current, optionId];
                  onAnswer(updated);
                }}
              />
            )}

            {question.type === "artist-chips" && (
              <ArtistChips
                options={question.options || []}
                selected={answer || []}
                limit={question.limit}
                filterGenres={
                  question.dependsOn
                    ? allAnswers[question.dependsOn]
                    : undefined
                }
                onToggle={(optionId: string) => {
                  const current = answer || [];
                  const isRemoving = current.includes(optionId);
                  const maxReached =
                    question.limit && current.length >= question.limit;

                  if (!isRemoving && maxReached) {
                    return;
                  }

                  const updated = isRemoving
                    ? current.filter((id: string) => id !== optionId)
                    : [...current, optionId];
                  onAnswer(updated);
                }}
              />
            )}

            {question.type === "text" && (
              <Textarea
                placeholder={question.placeholder}
                value={answer || ""}
                onChange={(e) => onAnswer(e.target.value)}
                className="min-h-[120px] resize-none"
              />
            )}

            {question.type === "slider" && (
              <SliderOption
                min={question.min || 0}
                max={question.max || 10}
                step={question.step || 1}
                value={answer}
                onChange={onAnswer}
              />
            )}
          </div>
        </CardContent>

        <CardFooter>
          {/* Navigation */}
          <div className="flex items-center justify-between w-full">
            <Button
              variant="outline"
              onClick={onPrev}
              disabled={!canGoPrev}
              className="min-w-24"
            >
              Previous
            </Button>

            <Button
              onClick={onNext}
              disabled={!canGoNext && !isAnswered}
              className="min-w-24 bg-indigo-600 hover:bg-indigo-700"
            >
              {currentStep === totalSteps - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

// Single choice component (Radio-style)
function SingleChoiceOptions({
  options,
  selected,
  onSelect,
}: {
  options: Array<{ id: string; label: string; description?: string }>;
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid gap-3" role="radiogroup">
      {options.map((option) => {
        const isSelected = selected === option.id;
        return (
          <Label
            key={option.id}
            htmlFor={option.id}
            className={cn(
              "relative flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 transition-all",
              isSelected
                ? "border-indigo-500 bg-indigo-500/10"
                : "border-border/60 hover:border-border hover:bg-muted/50"
            )}
          >
            <input
              type="radio"
              id={option.id}
              name="single-choice"
              value={option.id}
              checked={isSelected}
              onChange={() => onSelect(option.id)}
              className="sr-only"
            />
            <div
              className={cn(
                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                isSelected
                  ? "border-indigo-500 bg-indigo-500"
                  : "border-muted-foreground/40"
              )}
            >
              {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
            </div>
            <div className="flex-1">
              <div className="font-medium text-foreground">{option.label}</div>
              {option.description && (
                <div className="text-sm text-muted-foreground mt-0.5">
                  {option.description}
                </div>
              )}
            </div>
          </Label>
        );
      })}
    </div>
  );
}

// Multi choice component
function MultiChoiceOptions({
  options,
  selected,
  limit,
  onToggle,
}: {
  options: Array<{ id: string; label: string; description?: string }>;
  selected: string[];
  limit?: number;
  onToggle: (id: string) => void;
}) {
  const maxReached = limit && selected.length >= limit;

  return (
    <div>
      {limit && (
        <p className="text-sm text-muted-foreground mb-3">
          {selected.length} of {limit} selected
        </p>
      )}
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => {
          const isSelected = selected.includes(option.id);
          const isDisabled = !isSelected && !!maxReached;

          return (
            <Label
              key={option.id}
              htmlFor={option.id}
              className={cn(
                "relative flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-all",
                isSelected
                  ? "border-indigo-500 bg-indigo-500/10"
                  : "border-border/60 hover:border-border hover:bg-muted/50",
                isDisabled &&
                  "opacity-40 cursor-not-allowed hover:border-border/60 hover:bg-transparent"
              )}
            >
              <Checkbox
                id={option.id}
                checked={isSelected}
                onCheckedChange={() => !isDisabled && onToggle(option.id)}
                disabled={isDisabled}
                className={cn(
                  "shrink-0",
                  isSelected && "border-indigo-500 data-checked:bg-indigo-500"
                )}
              />
              <div className="font-medium text-foreground">{option.label}</div>
            </Label>
          );
        })}
      </div>
    </div>
  );
}

// Slider component
function SliderOption({
  min,
  max,
  step,
  value,
  onChange,
}: {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-4">
      <Slider
        min={min}
        max={max}
        step={step}
        value={[value || min]}
        onValueChange={(values) => onChange(values[0])}
        className="w-full"
      />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>{min}</span>
        <span className="font-medium text-foreground">{value || min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

// Artist Chips component
function ArtistChips({
  options,
  selected,
  limit,
  filterGenres,
  onToggle,
}: {
  options: Array<{ id: string; label: string; genres?: string[] }>;
  selected: string[];
  limit?: number;
  filterGenres?: string[];
  onToggle: (id: string) => void;
}) {
  // Filter artists based on selected genres
  const filteredOptions =
    filterGenres && filterGenres.length > 0
      ? options.filter((artist) =>
          artist.genres?.some((genre) => filterGenres.includes(genre))
        )
      : options;

  const maxReached = limit && selected.length >= limit;

  if (filteredOptions.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Select some genres first to see artist recommendations</p>
      </div>
    );
  }

  return (
    <div>
      {limit && (
        <p className="text-sm text-muted-foreground mb-3">
          {selected.length} of {limit} selected
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        {filteredOptions.map((artist) => {
          const isSelected = selected.includes(artist.id);
          const isDisabled = !isSelected && !!maxReached;

          return (
            <motion.button
              key={artist.id}
              onClick={() => !isDisabled && onToggle(artist.id)}
              disabled={isDisabled}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
                isSelected
                  ? "bg-indigo-500 text-white border-2 border-indigo-500"
                  : "bg-muted/50 text-foreground border-2 border-border/60 hover:border-border hover:bg-muted",
                isDisabled &&
                  "opacity-40 cursor-not-allowed hover:border-border/60 hover:bg-muted/50"
              )}
              whileTap={!isDisabled ? { scale: 0.95 } : {}}
              layout
            >
              <span>{artist.label}</span>
              {isSelected && (
                <motion.svg
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 25,
                  }}
                  className="h-4 w-4"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 3L4.5 8.5L2 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
