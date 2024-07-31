document.addEventListener('DOMContentLoaded', () => {
  let title = document.getElementById('title');
  let price = document.getElementById('price');
  let taxes = document.getElementById('taxes');
  let ads = document.getElementById('ads');
  let discount = document.getElementById('discount');
  let total = document.getElementById('total');
  let count = document.getElementById('count');
  let category = document.getElementById('category');
  let submit = document.getElementById('submit');

  let mood = 'create';
  let tmp;
  let SearchMood = 'title';

  let dataPro;
  if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
  } else {
    dataPro = [];
  }

  // التأكد من تنفيذ دالة showData عند تحميل الصفحة
  showData();

  submit.addEventListener('click', () => {
    let newPro = {
      title: title.value.toLowerCase(),
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      total: total.innerText,
      count: count.value,
      category: category.value.toLowerCase(),
    };

    if (newPro.title !== '' && newPro.price !== '' && newPro.category !== '') {
      if (mood === 'create') {
        if (newPro.count > 1) {
          for (let i = 0; i < newPro.count; i++) {
            dataPro.push({ ...newPro });
          }
        } else {
          dataPro.push(newPro);
        }
      } else {
        dataPro[tmp] = newPro;
        mood = 'create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';
      }

      localStorage.setItem('product', JSON.stringify(dataPro));
      clearData();
      showData();
    } else {
      alert('Please fill in all the required fields.');
    }
  });

  function getTotal() {
    if (price.value !== '') {
      let result = (+price.value + +taxes.value + +ads.value) - discount.value;
      total.innerHTML = result;
      total.style.background = '#040';
    } else {
      total.innerHTML = '';
      total.style.background = '#a00d02';
    }
  }

  price.addEventListener('input', getTotal);
  taxes.addEventListener('input', getTotal);
  ads.addEventListener('input', getTotal);
  discount.addEventListener('input', getTotal);

  function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '0';
    count.value = '';
    category.value = '';
  }

  function showData() {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
      table += `
        <tr>
          <td>${i + 1}</td>
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads}</td>
          <td>${dataPro[i].discount}</td>
          <td>${dataPro[i].total}</td>
          <td>${dataPro[i].category}</td>
          <td><button onclick="updateData(${i})">Update</button></td>
          <td><button onclick="deleteData(${i})">Delete</button></td>
        </tr>
      `;
    }

    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if (dataPro.length > 0) {
      btnDelete.innerHTML = `<button onclick="deleteAll()">Delete All (${dataPro.length})</button>`;
    } else {
      btnDelete.innerHTML = '';
    }
  }

  window.deleteData = function (i) {
    dataPro.splice(i, 1);
    localStorage.setItem('product', JSON.stringify(dataPro));
    showData();
  }

  window.deleteAll = function () {
    localStorage.clear();
    dataPro = [];
    showData();
  }

  window.updateData = function (i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataPro[i].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
      top: 0,
      behavior: 'smooth'
    });
  }

  window.getSearchMood = function (searchType) {
    let searchInput = document.getElementById('search');
    if (searchType === 'searchTitle') {
      SearchMood = 'title';
      searchInput.placeholder = 'Search By Title';
    } else if (searchType === 'searchCategory') {
      SearchMood = 'category';
      searchInput.placeholder = 'Search By Category';
    }
    searchInput.focus();
    console.log(SearchMood);
  }

  window.searchData = function (value) {
    let table = '';

    if (SearchMood === 'title') {
      for (let i = 0; i < dataPro.length; i++) {
        if (dataPro[i].title.includes(value.toLowerCase())) {
          table += `
            <tr>
              <td>${i + 1}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
              <td><button onclick="updateData(${i})">Update</button></td>
              <td><button onclick="deleteData(${i})">Delete</button></td>
            </tr>
          `;
        }
      }
    } else if (SearchMood === 'category') {
      for (let i = 0; i < dataPro.length; i++) {
        if (dataPro[i].category.includes(value.toLowerCase())) {
          table += `
            <tr>
              <td>${i + 1}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
              <td><button onclick="updateData(${i})">Update</button></td>
              <td><button onclick="deleteData(${i})">Delete</button></td>
            </tr>
          `;
        }
      }
    }

    document.getElementById('tbody').innerHTML = table;
  }
});
