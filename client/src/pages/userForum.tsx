import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { createQuestion, getAnsweredQuestions } from "../Apis/questions";

interface Question {
  questionId: number;
  question: string;
  answer: string;
}

function Forum() {
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
    createQuestion({ userId, question });
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
    <div className="p-5 mx-20">
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
              className="w-full h-12 border rounded p-2 bg-slate-50"
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
        <h1 className="my-10 font-bold text-3xl"> Previously asked FAQ's :</h1>

        <div className="items-center justify-center border rounded mt-4 p-4 mx-30 shadow-md bg-white">
          {answeredQuestions !== undefined && answeredQuestions?.length > 0 ? (
            <div className="flex flex-col gap-4">
              {answeredQuestions.map((question: Question) => (
                <div key={question.questionId} className="flex flex-col gap-2">
                  <p>{question.question}</p>
                  <p className="border w-fit p-2">{question.answer}</p>
                </div>
              ))}
            </div>
          ) : (
            <>
              <p>Nothing to display here 〒▽〒</p>
              <p className="text-xl">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Officia iure deleniti magnam, similique odit reiciendis velit
                architecto enim nobis optio, dolore voluptates id. Dolorem, eos
                hic! Reiciendis totam blanditiis autem. Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Eaque consectetur explicabo
                at, natus similique quasi inventore consequatur hic accusamus
                earum recusandae laborum ab exercitationem ad. Ex, aliquam?
                Odit, repudiandae impedit? Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Libero esse labore incidunt quos
                quas, vel expedita ullam amet est laboriosam magnam modi a.
                Quidem recusandae dignissimos totam eos eaque illum?Lorem ipsum
                dolor sit, amet consectetur adipisicing elit. Fugit
                reprehenderit sit, provident ut a eos aliquam, recusandae
                praesentium itaque cupiditate tenetur earum laudantium quaerat
                quae tempore nobis tempora officia! Lorem ipsum dolor, sit amet
                consectetur adipisicing elit. Cum accusamus ullam natus illum
                recusandae veritatis ex soluta. Et autem debitis nostrum, totam
                tenetur enim at. In voluptatibus consectetur fugit
                exercitationem.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Forum;
