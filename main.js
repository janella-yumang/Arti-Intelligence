const currentPage = document.body.dataset.page;

if (currentPage) {
  document.querySelectorAll('.nav-links a').forEach((link) => {
    if (link.dataset.page === currentPage) {
      link.classList.add('active');
    }
  });
}

const terms = document.querySelectorAll('.term');
terms.forEach((term) => {
  const button = term.querySelector('button');
  if (button) {
    button.addEventListener('click', () => {
      term.classList.toggle('open');
    });
  }
});

const predictBtn = document.getElementById('predictBtn');
if (predictBtn) {
  const hoursInput = document.getElementById('hours');
  const practiceInput = document.getElementById('practice');
  const topicInput = document.getElementById('topic');
  const output = document.getElementById('predictionOutput');

  predictBtn.addEventListener('click', () => {
    const hours = Number(hoursInput.value);
    const practice = practiceInput.value;
    const topic = topicInput.value.trim() || 'your topic';

    if (!Number.isFinite(hours) || hours < 0) {
      output.textContent = 'Please enter a valid non-negative number for study hours.';
      return;
    }

    let score = hours;
    if (practice === 'high') score += 6;
    if (practice === 'medium') score += 3;

    let level = '';
    if (score >= 12) level = 'Excellent progress expected';
    else if (score >= 7) level = 'Steady progress expected';
    else level = 'Progress may be slow';

    output.innerHTML = `
      <strong>Topic:</strong> ${topic}<br>
      <strong>Estimated outcome:</strong> ${level}<br>
      <strong>Tip:</strong> Practice consistently and test your understanding weekly.
    `;
  });
}

const checkQuizBtn = document.getElementById('checkQuiz');
if (checkQuizBtn) {
  const quizResult = document.getElementById('quizResult');
  const answerKey = {
    q1: 'b',
    q2: 'c',
    q3: 'c',
    q4: 'b',
    q5: 'c',
    q6: 'c',
    q7: 'b',
    q8: 'b',
    q9: 'b',
    q10: 'c',
    q11: 'true',
    q12: 'false',
    q13: 'true',
    q14: 'false',
    q15: 'true',
    q16: 'true',
    q17: 'true',
    q18: 'true',
    q19: 'false',
    q20: 'true'
  };

  checkQuizBtn.addEventListener('click', () => {
    let score = 0;
    Object.entries(answerKey).forEach(([key, correct]) => {
      const selected = document.querySelector(`input[name="${key}"]:checked`);
      if (selected && selected.value === correct) {
        score += 1;
      }

      const questionInputs = document.querySelectorAll(`input[name="${key}"]`);
      if (questionInputs.length > 0) {
        const questionBlock = questionInputs[0].closest('.quiz-question');
        const correctInput = document.querySelector(`input[name="${key}"][value="${correct}"]`);
        const correctLabel = correctInput ? correctInput.parentElement.textContent.trim() : 'N/A';
        const selectedLabel = selected ? selected.parentElement.textContent.trim() : 'No answer selected';
        const isCorrect = selected && selected.value === correct;

        questionBlock.classList.remove('quiz-correct', 'quiz-incorrect');
        questionBlock.classList.add(isCorrect ? 'quiz-correct' : 'quiz-incorrect');

        let feedback = questionBlock.querySelector('.question-feedback');
        if (!feedback) {
          feedback = document.createElement('p');
          feedback.className = 'question-feedback';
          questionBlock.appendChild(feedback);
        }

        if (isCorrect) {
          feedback.textContent = `✅ Correct. Answer: ${correctLabel}`;
        } else {
          feedback.textContent = `❌ Correct answer: ${correctLabel}. Your answer: ${selectedLabel}.`;
        }
      }
    });

    quizResult.classList.remove('score-good', 'score-mid', 'score-bad');
    const total = Object.keys(answerKey).length;

    if (score >= 17) {
      quizResult.classList.add('score-good');
      quizResult.textContent = `Excellent! You scored ${score}/${total}.`;
    } else if (score >= 11) {
      quizResult.classList.add('score-mid');
      quizResult.textContent = `Good work! You scored ${score}/${total}. Review weak topics and try again.`;
    } else {
      quizResult.classList.add('score-bad');
      quizResult.textContent = `You scored ${score}/${total}. Revisit Basics, Types, and Glossary, then retake the quiz.`;
    }
  });
}
