// import React, { ReactDOM } from "react";
// import moment from 'moment';

// const Heading = ({ date, changeMonth, resetDate }) => /*#__PURE__*/
//   React.createElement("nav", { className: "calendar--nav" }, /*#__PURE__*/
//     React.createElement("a", { onClick: () => changeMonth(date.month() - 1) }, "\u2039"), /*#__PURE__*/
//     React.createElement("h1", { onClick: () => resetDate() }, date.format('MMMM'), " ", /*#__PURE__*/React.createElement("small", null, date.format('YYYY'))), /*#__PURE__*/
//     React.createElement("a", { onClick: () => changeMonth(date.month() + 1) }, "\u203A"));

// const Day = ({ currentDate, date, startDate, endDate, onClick }) => {
//   let className = [];

//   if (moment().isSame(date, 'day')) {
//     className.push('active');
//   }

//   if (date.isSame(startDate, 'day')) {
//     className.push('start');
//   }

//   if (date.isBetween(startDate, endDate, 'day')) {
//     className.push('between');
//   }

//   if (date.isSame(endDate, 'day')) {
//     className.push('end');
//   }

//   if (!date.isSame(currentDate, 'month')) {
//     className.push('muted');
//   }

//   // Disable dates before the current date
//   const isDisabled = date.isBefore(moment(), 'day');

//   // Define the onClick handler based on whether the date is disabled
//   const handleClick = isDisabled ? undefined : () => onClick(date);

//   return /*#__PURE__*/(
//     React.createElement("span", { onClick: handleClick, currentDate: date, className: `${className.join(' ')} ${isDisabled ? 'disabled' : ''}` }, date.date()));
// };

// const Days = ({ date, startDate, endDate, onClick }) => {
//   const thisDate = moment(date);
//   const daysInMonth = moment(date).daysInMonth();
//   const firstDayDate = moment(date).startOf('month');
//   const previousMonth = moment(date).subtract(1, 'month');
//   const previousMonthDays = previousMonth.daysInMonth();
//   const nextsMonth = moment(date).add(1, 'month');
//   let days = [];
//   let labels = [];

//   for (let i = 1; i <= 7; i++) {
//     labels.push( /*#__PURE__*/React.createElement("span", { className: "label" }, moment().day(i).format('ddd')));
//   }

//   for (let i = firstDayDate.day(); i > 1; i--) {
//     previousMonth.date(previousMonthDays - i + 2);

//     days.push( /*#__PURE__*/
//       React.createElement(Day, { key: moment(previousMonth).format('DD MM YYYY'), onClick: date => onClick(date), currentDate: date, date: moment(previousMonth), startDate: startDate, endDate: endDate }));

//   }

//   for (let i = 1; i <= daysInMonth; i++) {
//     thisDate.date(i);

//     days.push( /*#__PURE__*/
//       React.createElement(Day, { key: moment(thisDate).format('DD MM YYYY'), onClick: date => onClick(date), currentDate: date, date: moment(thisDate), startDate: startDate, endDate: endDate }));

//   }

//   const daysCount = days.length;
//   for (let i = 1; i <= 42 - daysCount; i++) {
//     nextsMonth.date(i);
//     days.push( /*#__PURE__*/
//       React.createElement(Day, { key: moment(nextsMonth).format('DD MM YYYY'), onClick: date => onClick(date), currentDate: date, date: moment(nextsMonth), startDate: startDate, endDate: endDate }));

//   }

//   return /*#__PURE__*/(
//     React.createElement("nav", { className: "calendar--days" },
//       labels.concat(),
//       days.concat()));

// };

// class Calendar extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       date: moment(),
//       startDate: moment(),
//       endDate: moment()
//     };

//   }

//   resetDate() {
//     this.setState({
//       date: moment()
//     });

//   }

//   changeMonth(month) {
//     const { date } = this.state;

//     date.month(month);

//     this.setState(date);

//   }

//   changeDate(date) {
//     let { startDate, endDate } = this.state;

//     if (startDate === null || date.isBefore(startDate, 'day') || !startDate.isSame(endDate, 'day')) {
//       startDate = moment(date);
//       endDate = moment(date);
//     } else if (date.isSame(startDate, 'day') && date.isSame(endDate, 'day')) {
//       startDate = null;
//       endDate = null;
//     } else if (date.isAfter(startDate, 'day')) {
//       endDate = moment(date);
//     }

//     this.setState({
//       startDate,
//       endDate
//     });

//   }

//   render() {
//     const { date, startDate, endDate } = this.state;

//     // Calculate the difference in days between startDate and endDate
//     const startInModal = startDate.format('DD/MM/YYYY');
//     const endInModal = endDate.format('DD/MM/YYYY');
//     const daysDifference = endDate.diff(startDate, 'days') + 1;

//     document.getElementById("startInModal").innerHTML = startInModal;
//     document.getElementById("endInModal").innerHTML = endInModal;
//     document.getElementById("daysDifference").innerHTML = daysDifference;

//     document.getElementById("startDate").textContent = startInModal;
//     document.getElementById("endDate").textContent = endInModal;
//     document.getElementById("countDays").textContent = daysDifference;

//     document.getElementById("createDateInput").value = new Date();
//     document.getElementById("startDateInput").value = new Date(startDate);
//     document.getElementById("endDateInput").value = new Date(endDate);
//     var priceRentPerDay = parseInt(document.getElementById("price").innerHTML);
//     document.getElementById("priceInput").value = priceRentPerDay;
//     var totalPriceRent = priceRentPerDay * daysDifference;
//     document.getElementById("totalPriceInput").value = totalPriceRent;

//     document.getElementById("priceRent").innerHTML = formatNumberWithPeriods(priceRentPerDay);
//     document.getElementById("priceRent1").innerHTML = formatNumberWithPeriods(priceRentPerDay);
//     document.getElementById("priceRent2").innerHTML = formatNumberWithPeriods(priceRentPerDay);
//     document.getElementById("totalPrice").innerHTML = formatNumberWithPeriods(totalPriceRent);


//     return /*#__PURE__*/(
//       React.createElement("div", { className: "calendar" }, /*#__PURE__*/
//         React.createElement(Heading, { date: date, changeMonth: month => this.changeMonth(month), resetDate: () => this.resetDate() }), /*#__PURE__*/

//         React.createElement(Days, { onClick: date => this.changeDate(date), date: date, startDate: startDate, endDate: endDate })));

//   }
// }


// ReactDOM.render( 
//   React.createElement(Calendar, null),
//   document.getElementById('calendar'));

// // Get references to the button and the div
// const buttonOpenModal = document.getElementById('openModal');
// const dateFormDiv = document.getElementById('chooseDate');

// // Add click event listener to the div
// dateFormDiv.addEventListener('click', () => {
//   // Trigger click event on the button
//   buttonOpenModal.click();
// });

// document.getElementById('carInput').value = document.getElementById('carId').innerHTML;

// const btnContinue = document.getElementById("continue");
// btnContinue.addEventListener("click", clickContinueFunction);

// const btnRENT = document.getElementById("chooseRent");
// btnRENT.addEventListener("click", clickRENTFunction);

// function clickContinueFunction() {
//   document.getElementById("closeModal").click();
// }

// function clickRENTFunction() {
//   document.getElementById("RENT").click();
// }

// function formatNumberWithPeriods(number) {
//   return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
// }
