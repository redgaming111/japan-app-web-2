const quizBtn=document.getElementById("startQuiz");
const quizBox=document.getElementById("quizBox");
const quizQuestion=document.getElementById("quizQuestion");
const quizOptions=document.getElementById("quizOptions");
const streakEl=document.getElementById("streak");

let streak=0;

quizBtn.onclick=()=>{
  if(currentList.length<4){
    alert("Chưa đủ dữ liệu 😅");
    return;
  }
  quizBox.style.display="block";
  nextQuestion();
};

function nextQuestion(){
  quizOptions.innerHTML="";
  const pool=[...currentList].sort(()=>0.5-Math.random()).slice(0,4);
  const ans=pool[Math.floor(Math.random()*4)];

  quizQuestion.textContent=`🤔 Nghĩa của 「${ans[0]}」 là gì?`;
  streakEl.textContent=streak>0?`🔥 Chuỗi đúng: ${streak}`:"";

  pool.forEach(i=>{
    const d=document.createElement("div");
    d.className="quiz-option";
    d.textContent=i[2];
    d.onclick=()=>{
      if(i[2]===ans[2]){
        streak++;
        d.classList.add("correct");
        d.textContent="🎉 Chuẩn!";
      }else{
        streak=0;
        d.classList.add("wrong");
        d.textContent=`💥 ${ans[2]}`;
      }
      setTimeout(nextQuestion,700);
    };
    quizOptions.appendChild(d);
  });
}


const starQuizBtn = document.getElementById("starQuizBtn");

starQuizBtn.onclick = () => {
  const saved = JSON.parse(localStorage.getItem("savedWords")) || [];

  if(saved.length < 4){
    alert("Cần ít nhất 4 từ đã đánh dấu 😅");
    return;
  }

  currentList = saved;
  quizBox.style.display = "block";
  streak = 0;
  nextQuestion();
};
