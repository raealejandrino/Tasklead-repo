const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
alertPlaceholder.className = "d-flex justify-content-center";

const alertFunction = () => {
  const wrapper = document.createElement("div");

  wrapper.className = "w-100";

  alertPlaceholder.innerHTML = "<div class='alert alert-danger alert-dismissible alertLogin' role='alert'>Uh oh, something went wrong! Please try again.<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button></div>"

};

async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#exampleInputUser1').value.trim();
    const email = document.querySelector('#exampleInputEmail2').value.trim();
    const password = document.querySelector('#exampleInputPassword2').value.trim();
  
    if (username && email && password) {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          username,
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      // check the response status
     

      if (response.ok) {
            document.location.replace('/dashboard');
      } else {
         
        alertFunction();
          
      }
    } else {
      alertFunction();
    }
};
  

async function loginFormHandler(event) {
    event.preventDefault();
  
    const email = document.querySelector('#exampleInputEmail1').value.trim();
    const password = document.querySelector('#exampleInputPassword1').value.trim();
  
    
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
    if (response.ok) {
        document.location.replace('/dashboard');
      } else {


        alertFunction();


      }
    }
};
  
  
  
document.querySelector('.loginFormIdentify').addEventListener('submit', loginFormHandler);
document.querySelector('.registerFormIdentify').addEventListener('submit', signupFormHandler);