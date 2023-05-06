let xml = new XMLHttpRequest();

let navigation = document.querySelector('.navbar-nav');
let title = document.getElementById('title');
let thead = document.getElementsByTagName('thead')[0];
let tbody = document.getElementsByTagName('tbody')[0];
let aTags = document.querySelectorAll('.navbar-nav > a');
let links = {
  books:
    'https://mysafeinfo.com/api/data?list=bestnovels&format=json&case=default&token=TvaUJpdfUMILnZPlY4DTDS8R4v5zpvil',
  nobels:
    'https://mysafeinfo.com/api/data?list=nobelwinnersliterature&format=json&case=default&token=TvaUJpdfUMILnZPlY4DTDS8R4v5zpvil',
  actors:
    'https://mysafeinfo.com/api/data?list=bestactors1&format=json&case=default&token=TvaUJpdfUMILnZPlY4DTDS8R4v5zpvil',
};

getData('books');

navigation.addEventListener('click', function (e) {
  e.preventDefault();
  var link = e.target.getAttribute('href');
  aTags.forEach((a) => a.classList.remove('active'));
  e.target.classList.add('active');
  getData(link);
});

function getData(link) {
  var safeInfoLink = links[link];
  xml.open('GET', safeInfoLink);
  xml.onreadystatechange = function () {
    if (xml.readyState == 4 && xml.status == 200) {
      displayData(JSON.parse(xml.responseText), link);
    }
  };
  xml.send();
}

function displayData(data, link) {
  title.innerHTML = link;
  var first = data[0];
  var text = '<tr>';
  for (var prop in first) {
    text += '<th>' + prop + '</th>';
  }
  text += '</tr>';
  thead.innerHTML = text;
  text = '';
  for (var i = 0; i < data.length; i++) {
    text += '<tr>';
    for (var prop in data[i]) {
      text += '<td>' + data[i][prop] + '</td>';
    }
    text += '</tr>';
  }
  tbody.innerHTML = text;
}
