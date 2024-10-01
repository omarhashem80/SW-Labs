function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.addEventListener('click', ()=> deleteEmployee(item.id))
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button
document.getElementById('employeeForm').addEventListener('submit', createEmployee);
// TODO
// add event listener to delete button
// The code in line 22
// TODO
function createEmployee (event){
    event.preventDefault();
  // get data from input field
    const nameField = document.getElementById('name');
    const name = nameField.value;

    const idField = document.getElementById('id');
    const id = idField.value;

  // send data to BE
    fetch('http://localhost:3000/api/v1/employee', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, id})
    })
        .then(res => res.json())
        .then(()=> {
            nameField.value = '';
            idField.value = '';
            // call fetchEmployees
            fetchEmployees();
        })
        .catch(err => console.error(err));

}

// TODO
function deleteEmployee (id){
    // get id
    // send id to BE
    fetch(`http://localhost:3000/api/v1/employee/${id}`, {
        method: 'DELETE',
    })
    .then(res => {
        // call fetchEmployees
        if(res.status === 204)
            fetchEmployees();
        else
            throw new Error('Failed to delete employee.');
    })
    .catch(err => console.error('Error deleting employee:', err));

}

fetchEmployees();
