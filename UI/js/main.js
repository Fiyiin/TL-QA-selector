 (function () {
    'use strict';
    window.addEventListener('load', function () {
        let forms = document.getElementsByClassName('needs-validation');
        let validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();


const url = 'https://tl-qa-selector.herokuapp.com/api/v1/';
const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-type': 'application/json',    
  }
};
const input = document.getElementById('get-team');
const button = document.getElementById('show-team')

button.addEventListener('click', (e) => {
  e.preventDefault();
  fetch(`${url}/generate/${input.value.trim()}`, options)
        .then(response => response.json())
        .then(({data}) => {
            window.sessionStorage.setItem('data', JSON.stringify(data));
            window.location.href = 'team.html'
        })
        .catch((error) => {
          console.log('System error', error);
        });
});

const createTeamBtn = document.getElementById('create-team-btn');
const teamInput = document.getElementById('new-team-name');
const memberInputs = document.getElementsByClassName('member-input');

createTeamBtn.addEventListener('click', (e) => {
  if (!teamInput.value) return;
  const body = {
    teamName: teamInput.value,
    member: [],
  }
  Array.prototype.forEach.call(memberInputs, ({ value }) => {
    if (value) body.member.push(value);
  })

  fetch(`${url}/team`, {
    method: 'POST',
    headers: options.headers,
    body: JSON.stringify(body),
  }).then(res => res.json()).then(console.log).catch(
      (error) => {
          console.log(error);
      }
  )
});