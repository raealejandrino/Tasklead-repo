


const editDescBtn = document.querySelector('.editDescriptionBtn');

const descriptionContainer = document.querySelector('.descriptionContainer');

const currentDesc = document.querySelector('.descPTag');

function editDescHandler(event) {
    event.preventDefault();

    currentDesc.setAttribute("style", "display: none");

    const formEl = document.createElement("form");

    formEl.className = "w-100";

    

    const inputContainerEl = document.createElement("textarea");
    inputContainerEl.className = "form-control edit-input";
    inputContainerEl.setAttribute("rows", "6");
    

    formEl.appendChild(inputContainerEl);



    const newBtnContainer = document.createElement("div");
    newBtnContainer.className = "col-12 m-2 d-flex justify-content-end edit-btn-container"


    const cancelBtn = document.createElement("button");
    cancelBtn.className = "btn btn-outline-danger mr-1"
    cancelBtn.setAttribute("type", "button");
    cancelBtn.innerHTML = "Cancel";


    const updateBtn = document.createElement("button");
    updateBtn.className = "btn btn-success";
    updateBtn.setAttribute("type", "submit");
    updateBtn.innerHTML = "Update";

    newBtnContainer.appendChild(cancelBtn);
    newBtnContainer.appendChild(updateBtn);


    formEl.appendChild(newBtnContainer);

    descriptionContainer.appendChild(formEl);


    cancelBtn.addEventListener('click', cancelEditHandler);

   
    formEl.addEventListener('submit', confirmEditHandler);

    


};


function cancelEditHandler(event) {
    event.preventDefault();

    
    document.querySelector('.edit-btn-container').remove();
    document.querySelector('.edit-input').remove();

    currentDesc.setAttribute("style", "display: block");

    
};

function confirmEditHandler(event) {
    event.preventDefault();

    console.log('test');

};




editDescBtn.addEventListener('click', editDescHandler);