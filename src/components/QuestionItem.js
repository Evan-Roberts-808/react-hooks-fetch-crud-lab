import React from "react";

function QuestionItem({ question, onHandleDelete, onHandleUpdate }) {
  const { id, prompt, answers, correctIndex } = question;
  

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleUpdate(event) {
    const newCorrectIndex = parseInt(event.target.value);
    onHandleUpdate(id, newCorrectIndex);
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleUpdate}>{options}</select>
      </label>
      <button onClick={onHandleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
