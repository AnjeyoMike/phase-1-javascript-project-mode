const makeSelect = document.getElementById('make');
const modelSelect = document.getElementById('model');
const searchBtn = document.getElementById('searchBtn');
const resultsDiv = document.getElementById('results');

// Populate make select options using Car Query API
fetch('https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getMakes')
  .then(response => response.json())
  .then(data => {
    data.Makes.forEach(make => {
      const option = document.createElement('option');
      option.value = make.make_id;
      option.text = make.make_display;
      makeSelect.appendChild(option);
    });
  })
  .catch(error => console.error('Error fetching makes:', error));

// Populate model select options when make is selected
makeSelect.addEventListener('change', () => {
  const selectedMakeId = makeSelect.value;
  modelSelect.innerHTML = '<option>Loading...</option>';
  fetch(`https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getModels&make=${selectedMakeId}`)
    .then(response => response.json())
    .then(data => {
      modelSelect.innerHTML = '<option>Select Model</option>';
      data.Models.forEach(model => {
        const option = document.createElement('option');
        option.value = model.model_name;
        option.text = model.model_name;
        modelSelect.appendChild(option);
      });
      modelSelect.disabled = false;
    })
    .catch(error => console.error('Error fetching models:', error));
});

// Handle search button click
searchBtn.addEventListener('click', () => {
  const selectedMake = makeSelect.options[makeSelect.selectedIndex].text;
  const selectedModel = modelSelect.value;
  resultsDiv.innerHTML = `You have selected: ${selectedMake} ${selectedModel}`;
});
