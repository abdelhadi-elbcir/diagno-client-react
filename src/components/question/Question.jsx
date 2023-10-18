import React, { useState, useEffect } from 'react';
import api from '../../utils/axiosConfig';
import { useUser } from '../../contexts/UserProvider';

function Question() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [token , setToken] = useState(JSON.parse(localStorage.getItem('user')).accessToken);
  useEffect(() => {
    console.log()
    let headers = {
      Authorization: `Bearer ${token}`
    };
    api.get("/qst/all", {
      headers,
      withCredentials: true
    })
      .then((res) => {
        console.log(res.data);
        setQuestions(res.data);
        alert("done");
      })
      .catch((error) => alert(error.message));
    
  }, []);

  const handleChoiceChange = (questionIndex, choice) => {
    const newResponses = [...responses];
    newResponses[questionIndex] = choice;
    setResponses(newResponses);
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleButtonClick = () => {
    if (isLastQuestion) {
      // Handle the submit action here
      console.log("Responses:", responses);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <div className="container-fluid mt-3">
      {questions.length > 0 && currentQuestionIndex < questions.length ? (
        <div className="row">
          <div className="col-md-6 mt-3">
            <p>{questions[currentQuestionIndex].text}</p>

            <div>
              <input
                type="radio"
                id="toute-a-fait-daccord"
                name={`question-${currentQuestionIndex}`}
                value="toute-a-fait-daccord"
                onChange={() => handleChoiceChange(currentQuestionIndex, "toute-a-fait-daccord")}
              />
              <label htmlFor="toute-a-fait-daccord">Toute à fait d'accord</label>
            </div>
            <div>
              <input
                type="radio"
                id="daccord"
                name={`question-${currentQuestionIndex}`}
                value="daccord"
                onChange={() => handleChoiceChange(currentQuestionIndex, "daccord")}
              />
              <label htmlFor="daccord">D'accord</label>
            </div>
            <div>
              <input
                type="radio"
                id="neutre"
                name={`question-${currentQuestionIndex}`}
                value="neutre"
                onChange={() => handleChoiceChange(currentQuestionIndex, "neutre")}
              />
              <label htmlFor="neutre">Neutre</label>
            </div>
            <div>
              <input
                type="radio"
                id="pas-daccord"
                name={`question-${currentQuestionIndex}`}
                value="pas-daccord"
                onChange={() => handleChoiceChange(currentQuestionIndex, "pas-daccord")}
              />
              <label htmlFor="pas-daccord">Pas d'accord</label>
            </div>
            <div>
              <input
                type="radio"
                id="desaccord-total"
                name={`question-${currentQuestionIndex}`}
                value="desaccord-total"
                onChange={() => handleChoiceChange(currentQuestionIndex, "desaccord-total")}
              />
              <label htmlFor="desaccord-total">Désaccord total</label>
            </div>
          </div>
          <div className="col-md-6 p-4">
            <button className='btn btn-secondary ' style={{ borderRadius: "24px", width: "130px", float: "right", marginBlockStart: "180px" }} onClick={handleButtonClick}>
              {isLastQuestion ? "Send" : "Next Question"}
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...
        </p>
      )}
    </div>
  );
}

export default Question;