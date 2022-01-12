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
          alert(response.statusText);
      }
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
        alert(response.statusText);
      }
    }
};
  
  
  
document.querySelector('.loginFormIdentify').addEventListener('submit', loginFormHandler);
document.querySelector('.registerFormIdentify').addEventListener('submit', signupFormHandler);