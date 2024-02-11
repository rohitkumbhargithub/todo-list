const addBtn = document.querySelector("#add-btn");
const newTask = document.querySelector(".wrapper input");
const taskAdd = document.querySelector(".tasks");
const Error = document.getElementById("error");


var input = document.getElementById("myInput");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("add-btn").click();
  }
});


const addTask = () => {
    const taskName = newTask.value.trim();

    if(!taskName){

        const showError = setInterval(() => {
            Error.style.display = "block";
        }, 100)

        setTimeout(() => {
            clearInterval(showError);
            Error.style.display = "none";

        }, 3000);
        return;
    }

    const task = `
        <div class = "task">
        <input type = "checkbox" class="task-check" >
        <span class = "taskname">${taskName}</span>
        <button class="edit" value="hidden"><img src="image/edit.png" alt="edit" width="20" height="17"> </button>
        <button class="delete"> <img src="image/bin.svg" alt="delete" width="15"></button>
        </div>         
    `;

    taskAdd.insertAdjacentHTML("beforeend", task);
    

    const editBtn = document.querySelectorAll(".edit");
    editBtn.forEach((editBtn) => {
        editBtn.onclick = (e) => {
            let targetEle = e.target;
            if(!(e.target.className == "edit")) {
                targetEle = e.target.parentElement;
            }
            newTask.value = targetEle.previousElementSibling?.innerText;
            targetEle.parentNode.remove();
        };
    });

    const taskCheck = document.querySelectorAll(".task-check");
    taskCheck.forEach((checkBox) => {
        checkBox.onchange = () => {
            checkBox.nextElementSibling.classList.toggle("completed");
        }
    });

    const deleteBtn = document.querySelectorAll(".delete");
    deleteBtn.forEach(button => {
            button.onclick = () => {
                button.parentNode.remove();
            }
        })
};

