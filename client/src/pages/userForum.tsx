import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { createQuestion, getAnsweredQuestions } from "../Apis/questions";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

interface Question {
  questionId: number;
  question: string;
  answer: string;
}

function UserForum() {
  const [question, setQuestion] = useState<string>();
  const faqRef = useRef<HTMLDivElement>(null);
  const userId = localStorage.getItem("userIdGDSC");
  const [answeredQuestions, setAnsweredQuestions] = useState<Question[]>();

  const handleScrollToFAQ = () => {
    if (faqRef.current) {
      faqRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const submitQuestion = (e: any) => {
    if (userId) {
      createQuestion({ userId, question });
      window.alert("Question submitted succesfully");
    } else {
      window.alert("Please login to ask a question");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAnsweredQuestions();
        setAnsweredQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-5 lg:mx-20 md:mx-4">
      <div className="flex justify-between items-center ">
        <div>
          <h1 className="text text-3xl font-bold">Welcome to Forum.</h1>
          <br />
          <p>You can have a look at the FAQ's, or ask your own doubt here.</p>
          <p>
            {" "}
            click{" "}
            <button
              className="font-bold text-[#318C07] underline decoration-[#F2A20C] decoration-solid decoration-4"
              onClick={handleScrollToFAQ}
            >
              {" "}
              Here{" "}
            </button>{" "}
            to jump to FAQ's{" "}
          </p>
        </div>
        <img
          src="https://gdsc.jit.ac.in/wp-content/uploads/2022/08/GDSCboy.png"
          alt="GDSC Boy"
          className="w-[200px]"
        />
      </div>
      <div className="items-center justify-center border rounded mt-4 p-4 shadow-md bg-white">
        <form>
          <label>
            <h1 className="mr-4 py-3">Ask your question here : </h1>
            <input
              type="text"
              className="w-full h-12 border rounded p-2 bg-slate-50 outline-none"
              placeholder="type your question here ..."
              onChange={(e) => setQuestion(e.target.value)}
            ></input>
          </label>
          <button
            className="text-white bg-[#0F71F2] p-1 rounded hover:ring-2 ring-offset-2 ring-[#0F71F2] mt-4 px-4"
            onClick={(e) => submitQuestion(e)}
          >
            Submit
          </button>
        </form>
      </div>
      <div ref={faqRef}>
        <h1 className="my-10 font-bold xl:text-3xl md:text-xl">
          {" "}
          Previously asked FAQ's :
        </h1>

        <div className="items-center justify-center rounded mt-4 p-4 mx-30">
          {answeredQuestions !== undefined && answeredQuestions?.length > 0 ? (
            <div className="flex flex-col">
              {answeredQuestions.map((question: Question) => (
                <div key={question.questionId} className="flex flex-col gap-2">
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
                    <AccordionDetails>
                      <Typography>{question.answer}</Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              ))}
            </div>
          ) : (
            <>
              <p>Nothing to display here 〒▽〒</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserForum;
