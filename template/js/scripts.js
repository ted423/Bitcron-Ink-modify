/* search function */
function search() {
	if (document.getElementById('search-bar').value) location.href = '//' + location.host + '?s=' + document.getElementById('search-bar').value;
	else return false;
}

function displayFix() { //窗口大小变更调整
	$('pre').each(function() {
		if (window.outerHeight >= screen.availHeight && window.outerWidth >= screen.availWidth /*FF、IE下会大16*/ ) this.style.width = "";
		if (this.getClientRects()[0] && this.getClientRects()[0].width > document.getElementsByClassName('post')[0].getClientRects()[0].width) {
			this.style.width = "100%";
		}
	})
	//code add button
	$('.select-btn').remove();
	addSelectBtn();
}

$('pre>code,.codehilite>pre,#out').resize(function() {//resize事件单独添加以避免添加过多的resize事件
	displayFix();
	console.log("displayFix");
});

function addSelectBtn() {
	$('pre>code,.codehilite>pre').each(function() {
		var btn = document.createElement("span");
		btn.className = 'select-btn'
		btn.innerHTML = '<i class="fa fa-code" title="点击全选"></i>';
		btn.onclick = function() {
			var target = this.previousSibling;
			var range = document.createRange();
			range.setStart(target, 0);
			range.setEnd(target, target.childNodes.length);
			document.getSelection().removeAllRanges();
			document.getSelection().addRange(range);
		}
		var btnTop = $(this).position().top,
			btnLeft = $(this).position().left + this.offsetWidth - 17;
		btn.style.top = btnTop + "px";
		btn.style.left = btnLeft + "px";
		$(btn).insertAfter(this);
	})
}



/* search bar toggle */
$(document).ready(function() {
	$(".sidebar #search").click(function() {
		$(".sidebar .search-bar").slideToggle("250");
		$(".sidebar #search a").toggleClass("selected");
		$("#search-bar").focus();
	});

	if (location.search.indexOf('?s=') == 0) {
		$(".sidebar #search").click()
	}
});

/* responsive menu */
$(document).ready(function() {
	$("#switch").click(function() {
		$(".nav").slideToggle("250");
		$(".infobar").slideToggle("250");
		$("#switch").toggleClass("switch_current");
	});
	$(window).resize(function() {
		if ($('.logo').width() > 100) {
			$(".nav").show();
			$(".infobar").show();
		}
	});
	$(window).resize(function() {
		if ($('.logo').width() < 100) {
			$(".nav").hide();
			$(".infobar").hide();
		}
	});
});

/* smooth scroll */
$(function() {
	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 250);
				return false;
			}
		}
	});
});


(function() {
	//add onedrive notice
	$("a[href*='https://www.dropbox.com'],a[href*='https://1drv.ms'],a[href*='https://mega.nz']").attr('title', '可能需要翻墙');
	//ed2k UTF-8再编码
	$("a[href*='ed2k://']").attr('title', '本站提供只支持离线，并且未必能离线成功').each(function() {
		this.href = decodeURIComponent(this.href)
	});

	/*ol fix
	lis = document.querySelectorAll('ol>li');
	[].forEach.call(lis, function(li) {
		if (li.firstChild.nodeName == "#text" || getComputedStyle(li.firstChild).display == "inline") {
			p = document.createElement('p');
			if (li.firstChild.nodeName == "#text") p.innerHTML = li.firstChild.textContent;
			else p.innerHTML = li.firstChild.outerHTML;
			that = li.firstChild;
			while (that.nextSibling && (that.nextSibling.nodeName == "#text" ||that.nextSibling.nodeName == "P"|| getComputedStyle(that.nextSibling).display == "inline")) { //处理文字+inline元素的情况
				if (that.nextSibling.nodeName == "#text") p.innerHTML += that.nextSibling.textContent;
				else p.innerHTML += that.nextSibling.outerHTML;
				$(that.nextSibling).remove();
			}
			$(li.childNodes[0]).remove();
			if (li.firstChild) li.insertBefore(p, li.firstChild)
			else li.appendChild(p);
		} else if (li.firstChild.nodeName != "P" && li.firstChild.nodeName != "H6" && getComputedStyle(li.firstChild).display == "block") {
			p = document.createElement('p');
			if (li.firstChild) li.insertBefore(p, li.firstChild);
		}
	});*/
	$('li>code').each(function() {
		if ($(this).text().substring(0, 1) == "\n") {
			pre = document.createElement("pre");
			pre.innerHTML = "<code>" + this.innerHTML.substring(1) + "</code>"
			$(this).replaceWith(pre);
		}
	});
})();

window.onload = displayFix();

window.onresize = function() {
	displayFix();
};

document.onreadystatechange = function() {
	if (document.readyState == "complete") {
		displayFix();
	}
};