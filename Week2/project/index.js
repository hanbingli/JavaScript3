
'use strict';









{
  // 创建连接获取数据
  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status <= 299) {
        cb(null, xhr.response);

      } else {
        cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => cb(new Error('Network request failed'));
    xhr.send();
  }




  //*********** 创建并粘贴内容
  function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);


    // *****************************************************************
    Object.entries(options).forEach(([key, value]) => {
      if (key === 'text') {

        elem.textContent = value;
      } else {
        elem.setAttribute(key, value);
      }
    });

    return elem;
  }
  // *****************************************************************



  function renderRepoDetails(repo, ul) {


    const li = createAndAppend('li', ul);
    li.setAttribute('class', 'li');

    const ul2 = createAndAppend('ul', li);
    ul2.setAttribute('class', 'ul2');

    const li1 = createAndAppend('a', ul2, { text: 'Repository: ' + repo.name });
    li1.setAttribute('href', repo.html_url);
    li1.setAttribute('class', 'repoName');


    const li2 = createAndAppend('li', ul2, { text: 'Description: ' + repo.description });
    const li3 = createAndAppend('li', ul2, { text: 'Forks: ' + repo.fork });
    const li4 = createAndAppend('li', ul2, { text: 'Updated : ' + repo.updated_at });





    // { text: repo.name }

  }

  function main(url) {
    fetchJSON(url, (err, repos) => {
      const root = document.getElementById('root');
      if (err) {
        createAndAppend('div', root, {
          text: err.message,
          class: 'alert-error',
        });
        return;
      }
      const ul = createAndAppend('ul', root);
      ul.setAttribute('class', 'ul')

      let dataRes = repos;
      let dataSorted = dataRes.sort(function (a, b) {
        return a.name.localeCompare(b.name)
      });
      console.log(dataSorted);

      for (let i = 0; i < 10; i++) {
        renderRepoDetails(dataSorted[i], ul);
        let op = document.createElement('option');
        op.text = dataSorted[i].name;
        dropdownL.appendChild(op);

      }



    });
  }


  ///innerText for
  function renderContributor(data, contriUl) {
    for (let i = 0; i < data.length; ++i) {
      const li = createAndAppend('li', contriUl, {
        class: 'contributorLi',
      });
      createAndAppend('img', li, {
        src: data[i].avatar_url,
        class: 'contributor-avatar',
      });
      createAndAppend('a', li, {
        text: data[i].login,
        href: data[i].html_url,
        target: '_blank',
        class: 'contributor-name',
      });
      createAndAppend('span', li, {
        text: data[i].contributions,
        class: 'contributor-number',
      });
    }
  }




  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  window.onload = () => main(HYF_REPOS_URL);








  const root = document.querySelector('#root');



  const mainUl = document.querySelector('.ul');
  const header = document.createElement('div');
  header.setAttribute('class', 'header');
  header.innerText = 'HYF Repositories';
  const dropdownL = document.createElement('select');
  header.appendChild(dropdownL);
  dropdownL.setAttribute('class', 'dropdownL');
  
  document.body.insertBefore(header, root);
  
  
  
  
  
  
  
  
  
  
  dropdownL.addEventListener('change', function () {
  
  
    let index = dropdownL.selectedIndex;
    let selected = dropdownL.options[index].text;
    console.log(selected);
    let repoName = document.getElementsByClassName('repoName');

    let ul = document.querySelector('.ul');
    console.log(ul)
    ul.setAttribute('class', 'ul_onclick')

  
    const contributerBox = document.createElement('div');
    contributerBox.setAttribute('class', 'contributerBox');
    root.appendChild(contributerBox);
    contributerBox.innerHTML = 'contributions'
  
    const contriUl = document.createElement('ul');
    contriUl.setAttribute('class', 'contriUl');
    contributerBox.appendChild(contriUl);

  
  
  
    for (let i = 0; i < 10; ++i) {
  
      console.log(repoName[i].innerText)
      if (repoName[i].innerText == 'Repository: ' + selected) {
        let repoLi = repoName[i].parentElement.parentElement
        console.log(true);
        console.log(repoLi)
  
      } else {
        repoName[i].parentElement.parentElement.style.display = 'none';
      }
  
    }
    contributerBox.style.display = 'block';

  
  
  
    // function appendContributers(data){
    //   const contributer = data.contributer
    //   parent.appendChild(elem);
  
  
    // }
  
    fetch(
      `https://api.github.com/repos/HackYourFuture/${selected}/contributors`,
    )
      .then(res => res.json())
      .then(data => {
        console.log(data)

          renderContributor(data, contriUl)
  
      })
      .catch(err => console.error(err));
  
  
  
  
  })
  
  











}
















