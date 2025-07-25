import React, { useEffect, useState } from "react";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";

function App() {
  const [questions, setQuestions] = useState([]);
  const [view, setView] = useState("list"); // "list" or "form"

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then(setQuestions);
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function handleDeleteQuestion(id) {
    setQuestions(questions.filter((q) => q.id !== id));
  }

  function handleUpdateQuestion(updatedQuestion) {
    const updatedList = questions.map((q) =>
      q.id === updatedQuestion.id ? updatedQuestion : q
    );
    setQuestions(updatedList);
  }

  return (
    <main>
      <h1>Quiz Manager</h1>
      <button onClick={() => setView("list")}>View Questions</button>
      <button onClick={() => setView("form")}>New Question</button>

      {view === "list" ? (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      ) : (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      )}
    </main>
  );
}

export default App;
