const addBtn = document.querySelector("#add-btn");
const newTask = document.querySelector(".wrapper input");
const taskCount = document.querySelector(".tasks");
const Error = document.getElementById("error");
const countValue = document.querySelector(".count-value");
let todos = JSON.parse(localStorage.getItem("todo-list"));
let countTask = 0;

const displayCount = (countTask) => {
    countValue.innerText = countTask;
};

const addTask = () => {
    const taskName = newTask.value.trim();
    Error.style.display = "none";
    if(!taskName){
        setTimeout(() => {
            Error.style.display = "block";
        }, 200);
        return;
    }

    const task = `
        <div class = "task">
        <input type = "checkbox" class="task-check" >
        <span class = "taskname">${taskName}</span>
        <button class="edit"><img src="image/edit.png" alt="edit" width="20" height="17"> </button>
        <button class="delete"> <img src="image/bin.svg" alt="delete" width="15"></button>
        </div>         
    `;

    taskCount.insertAdjacentHTML("beforeend", task);
    
    const deleteBtn = document.querySelectorAll(".delete");
    deleteBtn.forEach(button => {
        button.onclick = () => {
            button.parentNode.remove();
            countTask -= 1;
            displayCount(countTask);
        };
    });

    const editBtn = document.querySelectorAll(".edit");
    editBtn.forEach((editBtn) => {
        editBtn.onclick = (e) => {
            let targetEle = e.target;
            if(!(e.target.className == "edit")) {
                targetEle = e.target.parentElement;
            }
            newTask.value = targetEle.previousElementSibling?.innerText;
            targetEle.parentNode.remove();
            countTask -= 1;
            displayCount(countTask);
        };
    });

    const taskCheck = document.querySelectorAll((".task-check"));
    taskCheck.forEach((checkBox) => {
        checkBox.onchange = () => {
            checkBox.nextElementSibling.classList.toggle("completed");
            if(checkBox.checked){
                countTask -= 1;
            }
            else{
                countTask += 1;
            }
            displayCount(countTask);
        };
    });
    countTask += 1;
    displayCount(countTask);
    newTask.value = "";
};


addBtn.addEventListener("click", addTask);

window.onload = () => {
    countTask = 0;
    displayCount(countTask);
    newTask.value = "";
}