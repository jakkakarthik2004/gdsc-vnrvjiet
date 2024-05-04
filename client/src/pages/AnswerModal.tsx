import React, { useState } from "react";
import { updateApproval, updateQuestion } from "../Apis/questions";

interface Props {
  selectedQuestion: {
    _id: number;
    question: string;
    answer: string;
  } | null;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AnswerModal: React.FC<Props> = ({ selectedQuestion, setIsModalOpen }) => {
  const [data, setData] = useState(selectedQuestion?.answer);

  const update = () => {
    updateQuestion(selectedQuestion?._id, {answer: data});
    setIsModalOpen(false);
  };

  const submit = async () => {
    await update();
    updateApproval(selectedQuestion?._id);
    setIsModalOpen(false);
    window.location.reload();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
      <div className="bg-slate-100 xl:mx-18 md:mx-2 p-10 rounded-xl shadow-md">
        <div className="text-slate-900 text-xl font-bold">
          Q. {selectedQuestion?.question}
        </div>
        <textarea
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="w-full ring ring-offset-4 p-2 my-2 rounded-sm"
        />
        <div className="text-white font-bold">
          <button
            onClick={handleCancel}
            className="bg-[#D92929] rounded-md m-2 p-3"
          >
            Cancel
          </button>
          <button onClick={update} className="bg-[#F2A20C] rounded-md m-2 p-3">
            Save
          </button>
          <button onClick={submit} className="bg-[#318C07] rounded-md m-2 p-3">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnswerModal;
