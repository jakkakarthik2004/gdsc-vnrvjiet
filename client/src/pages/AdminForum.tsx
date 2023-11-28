import React, { useEffect, useState } from "react";
import {
  getAllQuestions,
  getAnsweredQuestions,
  getUnAnsweredQuestions,
} from "../Apis/questions";
import AnswerModal from "./AnswerModal";

interface Question {
  questionId: number;
  question: string;
  answer: string;
}

const AdminForum = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Question[]>([]);
  const [unAnsweredQuestions, setUnAnsweredQuestions] = useState<Question[]>(
    []
  );

  const handleApprove = (question: Question) => {
    setSelectedQuestion(question);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data1 = await getUnAnsweredQuestions();
        setUnAnsweredQuestions(data1);

        const data2 = await getAnsweredQuestions();
        setAnsweredQuestions(data2);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className=" underline">View Questions here</h1>
      {isModalOpen && (
        <AnswerModal
          selectedQuestion={selectedQuestion}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      <div className="flex flex-col gap-4">
        {unAnsweredQuestions.map((question) => (
          <div key={question.questionId} className="flex gap-6">
            <p>{question.question}</p>
            <button
              className="text-xs border px-1"
              onClick={() => handleApprove(question)}
            >
              Answer
            </button>
          </div>
        ))}
      </div>

      <h1 className=" underline">Answered Questions</h1>
      <div className="flex flex-col gap-4">
        {answeredQuestions.map((question) => (
          <div key={question.questionId} className="flex flex-col gap-2">
            <p>{question.question}</p>
            <p className="border w-fit p-2">{question.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminForum;
