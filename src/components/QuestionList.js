import React from "react";
import QuestionItem from "./QuestionItem.js"

function QuestionList({ questions, onHandleDelete, onHandleUpdate }) {
  const questionList = questions.map((question) => {
    return <QuestionItem key={question.id} question={question} onHandleDelete={() => onHandleDelete(question.id)} onHandleUpdate={(newCorrectIndex) => onHandleUpdate(question.id, newCorrectIndex)}/> 
  })
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionList}</ul>
    </section>
  );
}

export default QuestionList;
