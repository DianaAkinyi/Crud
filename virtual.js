document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('crud-form');
    const numberInput=document.getElementById('number-input')
    const nameInput = document.getElementById('name-input');
    const ageInput = document.getElementById('age-input');
    const countryInput =document.getElementById('country-input')
    const table = document.getElementById('records-table');
  
    let records = [];
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const number=numberInput.value
      const name = nameInput.value;
      const age = ageInput.value;
      const country=countryInput.value
      createRecord(number,name, age,country);
    });
  
    function createRecord(number,name, age,country) {
      const record = {
        id: Date.now(),
        number:number,
        name: name,
        age: age,
        country:country
      };
      records.push(record);
      renderTable();
      clearForm();
    }
  
    function deleteRecord(id) {
      records = records.filter(record => record.id !== id);
      renderTable();
    }
  
    function updateRecord(newNumber,id, newName, newAge) {
      const record = records.find(record => record.id === id);
      if (record) {
        record.number = newNumber;
        record.name = newName;
        record.age = newAge;
        record.country=newCountry;
      }
      renderTable();
    }
  
    function renderTable() {
      table.innerHTML = `
        <tr>
        <th>No.</th>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Country</th>
          <th>Actions</th>
      
        </tr>
      `;
      records.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = 
        ` <td>${record.number}</td>
          <td>${record.id}</td>
          <td>${record.name}</td>
          <td>${record.age}</td>
          <td>${record.country}</td>
          <td>
            <button class="delete-button">Delete</button>
            <button class="update-button">Update</button>
          </td>
        `;
        const deleteButton = row.querySelector('.delete-button');
        deleteButton.addEventListener('click', function() {
          deleteRecord(record.id);
        });
        const updateButton = row.querySelector('.update-button');
        updateButton.addEventListener('click', function() {
          const newNumber =prompt('Enter a new number:',record.number);
          const newName = prompt('Enter a new name:', record.name);
          const newAge = prompt('Enter a new age:', record.age);
          const newCountry=prompt('Enter a new country:',record.country)
          updateRecord( newNumber,record.id, newName, newAge, newCountry);
        });
        table.appendChild(row);
      });
    }
  
    function clearForm() {
      numberInput.value=''
      nameInput.value = '';
      ageInput.value = '';
      countryInput.value='';
    }
  
    // Initial rendering
    renderTable();
  });