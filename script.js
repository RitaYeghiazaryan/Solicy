const BOXES_DATA_NAME_KEY = 'boxesData';

const addCard = document.getElementById('add');
const sortCards = document.getElementById('sort');
const root = document.querySelector('.root');

const dataStream = localStorage.getItem(BOXES_DATA_NAME_KEY);
const initialData = dataStream && JSON.parse(dataStream);

const data = initialData || {
    boxes: [],
    isSorted: false,
};

// CHECK ITEM AND SORT BOXES ELEMENTS
const sortBoxes = () => {
    if(!data.isSorted) {
        data.boxes = data.boxes.sort((a, b) => a - b);
        paintBoxes();
        data.isSorted = true;
    };
};

// REMOVE CURRENT SELECTED BOX ELEMENT 
const removeBox = (selectedIndex) => {
    data.boxes = data.boxes.filter((_, index) => selectedIndex !== index);
    paintBoxes();
};

// REPLACE BOX ELEMNTS IN DOM
const paintBoxes = () => {
    rootToInitial();
    data.boxes.forEach((boxNumber, index) => root.appendChild(
        boxUI(boxNumber, index)
    ));
    localStorage.setItem(BOXES_DATA_NAME_KEY, JSON.stringify(data));
};

// GENERATE A NEW RANDOM NUMBER AND APPEND TO BOXES DATA
const appendRandomBox = () => {
    const randomNumber = Math.floor(Math.random() * 100);
    data.boxes.push(randomNumber);
    data.isSorted = false;
    paintBoxes();
};

// CLEAR OLD ITEMS IN DOM
function rootToInitial () {
    if(root.innerHTML) {
        root.innerHTML = '';
    };
};

// UI FUNCTIONS CREATE DOM ELEMENT
function removeIconUI () {
    const icon = document.createElement('span');
    icon.innerHTML = 'X';
    icon.classList.add('removeBoxIcon');

    return icon;
};

function contentTextUI (content) {
    const contentSpan = document.createElement('span');
    contentSpan.innerHTML = content;
    contentSpan.classList.add('contentText');

    return contentSpan;
};

function boxUI (content, index) {
    const box = document.createElement('div');
    const icon = removeIconUI(content);
    icon.addEventListener('click', () => removeBox(index));

    box.appendChild(icon);
    box.appendChild(contentTextUI(content));
    
    box.classList.add('box');

    return box;
};

// START MAKE DOME ELEMNTS
paintBoxes();

// APPEND LISTENERS
addCard.addEventListener('click', appendRandomBox);
sortCards.addEventListener('click', sortBoxes);
