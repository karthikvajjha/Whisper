import { useState } from "react";
import quizQuestions from "../data/quizQuestions";

export default function QuizGame() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (id) => setSelected(id);

  const handleNext = () => {
    const question = quizQuestions[current];
    const isCorrect = selected === question.correctOption;
    if (isCorrect) setScore((prev) => prev + 10);

    setAnswers((prev) => ({
      ...prev,
      [current]: selected,
    }));

    if (current + 1 < quizQuestions.length) {
      setCurrent((prev) => prev + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  const resetGame = () => {
    setCurrent(0);
    setSelected(null);
    setAnswers({});
    setScore(0);
    setFinished(false);
  };

  return (
    <div className="min-h-screen bg-[#14181C] text-gray-200 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold text-[#00b020] mb-6">FinQuest Quiz</h1>
      <p className="mb-4 text-lg text-[#00b020] font-semibold">
        Score: {score}
      </p>

      {!finished ? (
        <div className="bg-[#1E2328] p-6 rounded-lg border border-gray-700 w-full max-w-xl">
          <h2 className="text-xl mb-4">{quizQuestions[current].question}</h2>
          <div className="space-y-3">
            {quizQuestions[current].options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                className={`w-full text-left p-3 rounded border transition ${
                  selected === opt.id
                    ? "bg-[#00b020] text-black"
                    : "bg-[#111] border-gray-700 hover:border-[#00b020]"
                }`}
              >
                {opt.id.toUpperCase()}. {opt.text}
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={!selected}
            className={`mt-6 w-full py-2 rounded font-semibold transition ${
              selected
                ? "bg-[#00b020] text-black hover:bg-[#00c030]"
                : "bg-gray-700 cursor-not-allowed"
            }`}
          >
            {current + 1 === quizQuestions.length ? "Finish" : "Next"}
          </button>
        </div>
      ) : (
        <div className="w-full max-w-xl bg-[#1E2328] p-6 rounded-lg border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-[#00b020]">Results</h2>
          {quizQuestions.map((q, idx) => (
            <div key={idx} className="mb-4">
              <p className="font-semibold">{q.question}</p>
              {q.options.map((opt) => {
                const isChosen = answers[idx] === opt.id;
                const isCorrect = q.correctOption === opt.id;
                return (
                  <div
                    key={opt.id}
                    className={`p-2 rounded mt-2 ${
                      isChosen
                        ? isCorrect
                          ? "bg-green-700 text-black"
                          : "bg-red-700 text-black"
                        : isCorrect
                        ? "bg-green-800/30"
                        : "bg-[#111]"
                    }`}
                  >
                    {opt.id.toUpperCase()}. {opt.text}
                  </div>
                );
              })}
            </div>
          ))}

          <div className="text-center mt-6">
            <p className="text-lg mb-2">Final Score: {score}</p>
            <button
              onClick={resetGame}
              className="bg-[#00b020] text-black py-2 px-4 rounded font-semibold hover:bg-[#00c030]"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
