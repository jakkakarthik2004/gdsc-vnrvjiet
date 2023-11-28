import React, { useState } from "react";
import { updateApproval, updateAnswer } from "../Apis/questions";

interface Props {
  selectedQuestion: {
    questionId: number;
    question: string;
    answer: string;
  } | null;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AnswerModal: React.FC<Props> = ({ selectedQuestion, setIsModalOpen }) => {
  const [data, setData] = useState(selectedQuestion?.answer);

  const update = () => {
    updateAnswer(selectedQuestion?.questionId, data);
    setIsModalOpen(false);
  };

  const submit = async () => {
    await update();
    updateApproval(selectedQuestion?.questionId);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
      <div className="bg-slate-100 mx-20 p-12 rounded shadow-md">
        <div>Q. {selectedQuestion?.question}</div>
        <textarea value={data} onChange={(e) => setData(e.target.value)} />
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={update}>Save</button>
        <button onClick={submit}>Submit</button>
      </div>
    </div>
  );
};

export default AnswerModal;
