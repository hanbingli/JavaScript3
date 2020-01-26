'use strict';



{
  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status <= 299) {
        cb(null, xhr.response);
        console.log(xhr.response)
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
  
    
 
      const li =createAndAppend('li', ul);
      li.setAttribute('class', 'li');
   
      const ul2 = createAndAppend('ul', li);
      ul2.setAttribute('class', 'ul2');

      const li1 =createAndAppend('a', ul2, { text: 'Repository: ' + repo.name });
      li1.setAttribute('href', repo.html_url);
      const li2 =createAndAppend('li', ul2, { text: 'Description: ' + repo.description });
      const li3 =createAndAppend('li', ul2, { text: 'Forks: ' + repo.fork });
      const li4 =createAndAppend('li', ul2, { text: 'Updated : ' + repo.updated_at });
 
      


  
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
      repos.forEach(repo => renderRepoDetails(repo, ul));
    });
  }

  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  window.onload = () => main(HYF_REPOS_URL);
}



const root = document.querySelector('#root')
const header = document.createElement('div')
header.setAttribute('class', 'header')
header.innerText = 'HYF Repositories'

document.body.insertBefore(header, root)


