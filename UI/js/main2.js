/* eslint-env browser */

window.addEventListener('load', () => {
    const data = JSON.parse(window.sessionStorage.getItem('data'));
    console.log(document.getElementById('team-nam'));
    document.getElementById('team-nam').innerHTML = data[0].team;
    document.getElementById('team-lid').innerHTML = data[2].name;
    document.getElementById('qa_one').innerHTML = data[0].name;
    document.getElementById('qa_two').innerHTML = data[1].name;
});