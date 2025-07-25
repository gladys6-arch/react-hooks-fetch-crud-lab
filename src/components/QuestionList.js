import React from "react";

function QuestionList({ questions, onDeleteQuestion, onUpdateQuestion }) {
  function handleAnswerChange(id, newIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: parseInt(newIndex) }),
    })
      .then((r) => r.json())
      .then(onUpdateQuestion);
  }

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => onDeleteQuestion(id));
  }

  return (
    <section>
      <h2>Questions</h2>
      <ul>
        {questions.map((q) => (
          <li key={q.id}>
            <h4>{q.prompt}</h4>
            <select
              aria-label="Correct Answer"
              value={q.correctIndex}
              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
            >
              {q.answers.map((a, index) => (
                <option key={index} value={index}>
                  {a}
                </option>
              ))}
            </select>
            <button onClick={() => handleDelete(q.id)}>Delete Question</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
