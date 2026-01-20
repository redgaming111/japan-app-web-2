const levelSelect = document.getElementById("level");
const categorySelect = document.getElementById("category");
const contentTable = document.getElementById("content");
const searchInput = document.getElementById("search");

let currentList = [];

function renderTable(list){
  contentTable.innerHTML = "";

  if(list.length === 0){
    contentTable.innerHTML =
      "<tr><td colspan='4'>Không có dữ liệu</td></tr>";
    return;
  }

  const saved = getSavedWords();

  list.forEach(item => {
    const key = item[0];
    const starred = saved.some(w => w[0] === key);

    contentTable.innerHTML += `
      <tr>
        <td>
          <button class="star-btn" data-word="${key}">
            ${starred ? "⭐" : "☆"}
          </button>
        </td>
        <td>${item[0]}</td>
        <td>${item[1]}</td>
        <td>${item[2]}</td>
      </tr>
    `;
  });

  bindStarEvents(list);
}


function render(){
  const l=levelSelect.value, c=categorySelect.value;
  searchInput.value="";
  if(!l||!c){contentTable.innerHTML="";return;}
  currentList=data[l][c];
  renderTable(currentList);
}

searchInput.oninput=()=>{
  const k=searchInput.value.toLowerCase();
  renderTable(
    currentList.filter(i=>i.join(" ").toLowerCase().includes(k))
  );
};

levelSelect.onchange=render;
categorySelect.onchange=render;



const helpBtn = document.getElementById("helpBtn");
const helpModal = document.getElementById("helpModal");
const closeHelp = document.getElementById("closeHelp");

helpBtn.onclick = () => {
  helpModal.style.display = "flex";
};

closeHelp.onclick = () => {
  helpModal.style.display = "none";
};

helpModal.onclick = (e) => {
  if (e.target === helpModal) {
    helpModal.style.display = "none";
  }
};


function getSavedWords(){
  return JSON.parse(localStorage.getItem("savedWords")) || [];
}

function saveWords(list){
  localStorage.setItem("savedWords", JSON.stringify(list));
}

function bindStarEvents(currentList){
  document.querySelectorAll(".star-btn").forEach(btn => {
    btn.onclick = () => {
      const word = btn.dataset.word;
      let saved = getSavedWords();

      const item = currentList.find(i => i[0] === word);

      if(saved.some(w => w[0] === word)){
        saved = saved.filter(w => w[0] !== word);
      } else {
        saved.push(item);
      }

      saveWords(saved);
      renderTable(currentList);
    };
  });
}
