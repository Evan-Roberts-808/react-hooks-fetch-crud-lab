import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]) //set questions 

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(response => response.json())
    .then((question) => setQuestions(question) )
  },[])

  function handleAddQuestion(formData) {
    fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: formData.prompt,
        answers: [
          formData.answer1,
          formData.answer2,
          formData.answer3,
          formData.answer4,
        ],
        correctIndex: parseInt(formData.correctIndex)
      })
    })
    .then(response => response.json())
    .then((question) => setQuestions([...questions, question]))
  }

  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(() => {
      const updatedQuestions = questions.filter((question) => question.id !== id)
      setQuestions(updatedQuestions)
    })
  }

  function handleUpdateQuestion(id, newCorrectIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        "correctIndex" : newCorrectIndex
      })
    })
    .then(response => response.json())
    .then((updatedQuestion) => {
      const updatedQuestions = questions.map((question) => {
        if (question.id === updatedQuestion.id) {
          return updatedQuestion;
        }
        return question;
      });
      setQuestions(updatedQuestions);
    });
  }
  

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" 
      ? <QuestionForm 
      onAddQuestion={handleAddQuestion} 

      /> 
      : <QuestionList 
      questions={questions} 
      onHandleDelete={handleDeleteQuestion}
      onHandleUpdate={handleUpdateQuestion} 
      />
      }
    </main>
  );
}

export default App;
