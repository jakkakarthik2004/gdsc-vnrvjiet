import React, { useEffect, useState } from "react";
import {
  getAllQuestions,
  getAnsweredQuestions,
  getUnAnsweredQuestions,
  updateQuestion,
} from "../Apis/questions";
import AnswerModal from "./AnswerModal";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

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
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [fetch, setFetch] = useState(false);
  const [updatedAnswers, setUpdatedAnswers] = useState<Record<number, string>>(
    {}
  );

  const handleApprove = (question: Question) => {
    setSelectedQuestion(question);
    setIsModalOpen(true);
  };

  const handleSave = (question: Question) => {
    try {
      updateQuestion(question.questionId, {
        answer: updatedAnswers[question.questionId],
      });
      const { [question.questionId]: _, ...remainingAnswers } = updatedAnswers;
      setUpdatedAnswers(remainingAnswers);
      setIsEditing(false);
      setFetch(true);
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  const handleDelete = (question: Question) => {
    updateQuestion(question.questionId, { answered: 0 });
    setFetch(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data1 = await getUnAnsweredQuestions();
        setUnAnsweredQuestions(data1);

        const data2 = await getAnsweredQuestions();
        setAnsweredQuestions(data2);
        const initialUpdatedAnswers: Record<number, string> = {};

        data2.forEach((question: { questionId: number; answer: string }) => {
          initialUpdatedAnswers[question.questionId] = question.answer || "";
        });

        setUpdatedAnswers(initialUpdatedAnswers);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    setFetch(false);
    fetchData();
  }, [isModalOpen == false, fetch == true]);

  return (
    <div className="p-3 m-3">
      <h1 className="text-2xl font-bold text-slate-800 underline my-4">
        View Questions here
      </h1>
      {isModalOpen && (
        <AnswerModal
          selectedQuestion={selectedQuestion}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      <div className="flex flex-col gap-4">
        {unAnsweredQuestions.map((question) => (
          <div key={question.questionId} className="flex gap-6">
            <p className="border rounded shadow-sm px-4 py-2 bg-white">
              Q. {question.question}
            </p>
            <button
              className="text-xs border px-4 rounded bg-[#318C07] text-white "
              onClick={() => handleApprove(question)}
            >
              Answer
            </button>
          </div>
        ))}
      </div>

      <h1 className=" underline text-2xl font-bold text-slate-800 my-6">
        Answered Questions
      </h1>
      <div className="flex flex-col border gap-1 rounded border-1 border-slate-500">
        {answeredQuestions.map((question) => (
          <div key={question.questionId} className="flex flex-col">
            <Accordion>
              <AccordionSummary
                expandIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                  </svg>
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <p className="font-bold text-lg">{question.question}</p>
              </AccordionSummary>
              <AccordionDetails className="flex justify-between">
                {isEditing ? (
                  <div className="w-full">
                    <textarea
                      value={updatedAnswers[question.questionId] || ""}
                      className="border outline-none w-[80%] p-1"
                      onChange={(e) =>
                        setUpdatedAnswers((prev) => ({
                          ...prev,
                          [question.questionId]: e.target.value,
                        }))
                      }
                    />

                    <div>
                      <button
                        className="text-xs border px-4 rounded bg-[#318C07] text-white "
                        onClick={() => handleSave(question)}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p>{question.answer}</p>
                    <div>
                      <button
                        className="text-xs border px-4 rounded bg-[#318C07] text-white "
                        onClick={() => setIsEditing(true)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-xs border px-4 rounded bg-[#318C07] text-white "
                        onClick={() => handleDelete(question)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminForum;
