async function projectDelete() {
    // response

    
    const project_id = window.location.toString().split('/')[4];

    const response = await fetch(`/api/projects/${project_id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    
    console.log('hit');

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
document.querySelector('.deletion-form').addEventListener('submit', projectDelete);