'use strict';
const dropArea = document.querySelector('.drop-area');
const text = dropArea.querySelector('h2');
const textspan = dropArea.querySelector('span');
const button = dropArea.querySelector('button');
const input = dropArea.querySelector('#input-file');
const x = document.querySelector('.x');

let files;
let cont = 0;
let ids = [];
let band;

button.addEventListener('click', function (e) {
  input.click();
});

input.addEventListener('change', function (e) {
  files = input.files;
  dropArea.classList.add('active');
  showFiles(files);
  dropArea.classList.remove('active');
});

//se arrastra
dropArea.addEventListener('dragover', function (e) {
  e.preventDefault();
  dropArea.classList.add('active');
  text.textContent = 'DROP';
  textspan.textContent = '';
  button.style.visibility = 'hidden';
});

//se arrastra pero no estoy dentro de dragarea
dropArea.addEventListener('dragleave', function (e) {
  e.preventDefault();
  dropArea.classList.remove('active');
  text.textContent = 'DRAG & DROP';
  textspan.textContent = 'OR';
  button.style.visibility = 'visible';
});

//suelta
dropArea.addEventListener('drop', function (e) {
  e.preventDefault();
  files = e.dataTransfer.files;
  showFiles(files);
  dropArea.classList.remove('active');
  text.textContent = 'DRAG & DROP';
  textspan.textContent = 'OR';
  button.style.visibility = 'visible';
});

function showFiles(files) {
  if (files.length === undefined) processFiles(files);
  else for (const file of files) processFiles(file);
}

function processFiles(file) {
  const filestype = file.type;
  const validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];

  if (validExtensions.includes(filestype)) {
    const fileReader = new FileReader();
    const id = cont;
    ids[cont] = id;
    cont++;
    let image;
    fileReader.addEventListener('load', function (e) {
      const fileUrl = fileReader.result;
      if (cont % 5 === 0) {
        image = `
        <br></br>
        <img src="${fileUrl}" alt="${file.name}" id="${id}" width="100px" height="50px" margin= "30px">
        <button class="x" id="${id}">x</button>   
        `;
      } else {
        image = `
        <img src="${fileUrl}" alt="${file.name}" id="${id}" width="100px" height="50px" margin= "30px">
        <button class="x" id="${id}">x</button>    
        `;
      }
      const html = document.querySelector('#preview').innerHTML;
      document.querySelector('#preview').innerHTML = image + html;
    });

    fileReader.readAsDataURL(file);
  } else {
    console.log('Is not a picture');
  }
}

x?.addEventListener('click', function (e) {
  if (ids.length > 0) console.log('equis');
});

//Daniel Mora
