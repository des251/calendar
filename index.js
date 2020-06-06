function getMonthTitle(month) {
  const monthList = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  return monthList[month];
}
function setMonthTitle() {
  const month = new Date().getMonth();
  const title = document.querySelector(".month-title");
  title.innerHTML = getMonthTitle(month);
}
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFistDayInMonth(year, month) {
  const day = new Date(year, month, 1).getDay();
  return day ? day : 7;
}
function createElement(parent, val) {
  const day = document.createElement("li");
  day.innerHTML = `
    <div class="labels">
      <div class="label label-0"></div>
      <div class="label label-1"></div>
    </div>
    <span>${val}</span>
  `;
  parent.appendChild(day);
  return day;
}
function generateDays(shedule) {
  const daysList = document.querySelector(".days-list");
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const amountDays = getDaysInMonth(currentYear, currentMonth);
  let firstDay = getFistDayInMonth(currentYear, currentMonth);

  while (firstDay !== 1) {
    createElement(daysList, "");
    firstDay--;
  }
  for (let i = 0; i < amountDays; i++) {
    const el = createElement(daysList, i + 1);
    el.querySelector(".label-0").classList.add(shedule[i][0]);
    el.querySelector(".label-1").classList.add(shedule[i][1]);
  }
}
function highlightCurrentDay() {
  const day = new Date().getDate();
  const list = document.querySelectorAll(".days-list li span");
  for (let i = 0; i < list.length; i++) {
    if (parseInt(list[i].innerHTML) === day) {
      list[i].classList.add("current-day");
    }
  }
}
function generateShedule() {
  const dn = ["blue", "red"];
  const nv = ["red", "green"];
  const dv = ["blue", "green"];
  const week = [dn, nv, dv, nv, dv, dn, nv];
  const amountDays = getDaysInMonth(
    new Date().getFullYear(),
    new Date().getMonth()
  );
  const amountWeeks = Math.floor(amountDays / 7);
  const tail = amountDays % 7;
  const result = [];
  for (let i = 0; i < amountWeeks; i++) {
    result.push(...week);
  }
  for (let i = 0; i < tail; i++) {
    result.push(week[i]);
  }
  //return [].concat(...result);
  return result;
}

window.onload = function () {
  const shedule = generateShedule();
  setMonthTitle();
  generateDays(shedule);
  highlightCurrentDay();
};
