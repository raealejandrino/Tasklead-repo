async function newProjectHandler(event) {
    event.preventDefault();

    console.log('hit');
  
    const title = document.querySelector('input[name="project-title"]').value;
    const description = document.querySelector('textarea[name="project-desc"]').value;
    const department_tag_name = document.querySelector('#dropdownMenuButton').innerHTML;
    let department_tag_id;

    if (department_tag_name === 'Engineering') {
        
        department_tag_id = 1;
    } else if (department_tag_name === 'Human Resources') {
         department_tag_id = 2;
    } else {
        department_tag_id = null;
    }


    console.log(department_tag_name);
        console.log(department_tag_id);
    const response = await fetch(`/api/projects`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        department_tag_id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
};

function dropdownHandler(event) {
    event.preventDefault();

    console.log(this);
    const btnPlaceholder = document.querySelector('#dropdownMenuButton');
    const selectedDepartment = this.innerHTML;

    btnPlaceholder.innerHTML = selectedDepartment;
    
}

const dropdownItems = document.getElementsByClassName('dropdown-item');

console.log(dropdownItems); 

for (let i=0; i< dropdownItems.length; i++) {
    dropdownItems[i].addEventListener('click', dropdownHandler);
}

  document.querySelector('.newProjectForm').addEventListener('submit', newProjectHandler);