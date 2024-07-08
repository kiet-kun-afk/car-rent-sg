
window.onload = function () {
	const mainBoard = document.getElementById('mainboard');

	if (mainBoard) {
		var allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

		var menuBar = document.getElementById('btn-menu');
		var sidebar = document.getElementById('sidebar');

		var searchButton = document.querySelector('#content nav form .form-input button');
		var searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
		var searchForm = document.querySelector('#content nav form');
		var switchMode = document.getElementById('switch-mode');

		var brandImg = document.getElementById('brand-img');
		var blackImg = brandImg.getAttribute('src');
		var whiteImg = ('../img/logoCarrent_W.png');

		var lineDash = document.getElementById('line');

		var modeText = document.getElementById('mode-text');

		var trangchuSidebar = document.getElementById('side-menu-trangchu');
		console.log(allSideMenu);

		allSideMenu.forEach(item => {
			var li = item.parentElement;
			console.log(li);

			item.addEventListener('click', function () {
				allSideMenu.forEach(i => {
					i.parentElement.classList.remove('active');
				})
				li.classList.add('active');
			})
		});

		// TOGGLE SIDEBAR
		// var menuBar = document.querySelector('#content nav .bx.bx-menu');
		menuBar.addEventListener('click', function () {
			sidebar.classList.toggle('hide_sidebar');
		});


		searchButton.addEventListener('click', function (e) {
			if (window.innerWidth < 576) {
				e.preventDefault();
				searchForm.classList.toggle('show');
				if (searchForm.classList.contains('show')) {
					searchButtonIcon.classList.replace('bx-search', 'bx-x');
				} else {
					searchButtonIcon.classList.replace('bx-x', 'bx-search');
				}
			}
		});

		switchMode.addEventListener('change', function () {
			if (this.checked) {
				document.body.classList.add('dark');
				brandImg.setAttribute('src', whiteImg);
				lineDash.classList.replace('line', 'line_white');
				modeText.innerHTML = 'Light Mode';
			} else {
				document.body.classList.remove('dark');
				brandImg.setAttribute('src', blackImg);
				lineDash.classList.replace('line_white', 'line');
				modeText.innerHTML = 'Dark Mode';
			}
		});

		brandImg.addEventListener('click', function () {
			allSideMenu.forEach(i => {
				i.parentElement.classList.remove('active');
			})
			trangchuSidebar.classList.add('active');
		})

		if (window.innerWidth < 768) {
			sidebar.classList.add('hide_sidebar');
		} else if (window.innerWidth > 576) {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
			searchForm.classList.remove('show');
		}

		window.addEventListener('resize', function () {
			if (this.innerWidth > 576) {
				searchButtonIcon.classList.replace('bx-x', 'bx-search');
				searchForm.classList.remove('show');
			}
		})
	}

}
