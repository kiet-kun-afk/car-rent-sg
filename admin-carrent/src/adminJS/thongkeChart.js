import Chart from 'chart.js/auto';

export const drawChart1 = () => {
  const ctx = document.getElementById('myChart').getContext('2d');
  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'Doanh thu (triệu VND)',
        data: [12, 19, 3, 5, 2, 3, 7],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return value.toLocaleString('vi-VN');
            }
          }
        }
      }
    }
  });
};

export const drawChart2 = () => {
  const ctx = document.getElementById('myChart2').getContext('2d');
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      datasets: [{
        label: 'Số lượng đơn hàng mới',
        data: [30, 25, 50, 45, 60, 55, 70],
        fill: false,
        borderColor: 'rgba(54, 162, 235, 0.6)',
        tension: 0.1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
};
