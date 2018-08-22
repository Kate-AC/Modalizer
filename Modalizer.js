'use strict';

function Modalizer(object)
{
	this.target       = object.target;
	this.header       = object.header;
	this.body         = object.body;
	this.footer       = object.footer;
	this._modalOpen   = null;
	this._modalOpened = null;
	this._modalClose  = null;
	this._modalClosed = null;

	this.setEvent();

	return this;
}

Modalizer.prototype.setEvent = function ()
{
	var self = this;
	this.target.addEventListener('click', function () {
		if (null !== self._modalOpen) {
			self._modalOpen();
		}

		self.setModalEvent();

		if (null !== self._modalOpened) {
			setTimeout(function () {
				self._modalOpened();
			}, 500);
		}
	});
}

Modalizer.prototype.setModalEvent = function ()
{
	var element          = this.createElement();
	var modalCloseButton = element.querySelector('.modalClose');
	var modalBackGround  = element.querySelector('.modalBackGround');

	var self = this;

	var resizeFunction = function resize() {
		var modal  = element.querySelector('.modal');
		var body   = element.querySelector('.modalBody');
		var height = window.innerHeight - (modal.getBoundingClientRect().y * 2) - (40 * 2);
		body.style.height = height + 'px';
	}
	window.addEventListener('resize', resizeFunction);
	resizeFunction();

	modalCloseButton.addEventListener('click', function () {
		if (null !== self._modalClose) {
			self._modalClose();
		}

		element.style.display = 'none';

		setTimeout(function () {
			if (null !== self._modalClosed) {
				self._modalClosed();
			}
			element.parentNode.removeChild(element);
		}, 20);
	});

	modalBackGround.addEventListener('click', function (e) {
		if (null !== self._modalClose) {
			self._modalClose();
		}

		element.style.display = 'none';

		setTimeout(function () {
			if (null !== self._modalClosed) {
				self._modalClosed();
			}
			element.parentNode.removeChild(element);
		}, 20);
	});

	var intervalBackGround = setInterval(function () {
		modalBackGround.style.opacity = parseFloat(modalBackGround.style.opacity) + 0.1;
		if (0.8 <= modalBackGround.style.opacity) {
			clearInterval(intervalBackGround);
			var modal = element.querySelector('.modal');
			var intervalModal = setInterval(function () {
				modal.style.opacity = parseFloat(modal.style.opacity) + 0.1;
				if (1 <= modal.style.opacity) {
					clearInterval(intervalModal);
				}
			}, 20);
		}
	}, 30);
}

Modalizer.prototype.createElement = function ()
{
	var modalWrap = document.createElement('div');
	modalWrap.setAttribute('class', 'modalWrap');
	modalWrap.style.alignItems     = 'center';
	modalWrap.style.display        = 'flex';
	modalWrap.style.flexDirection  = 'column';
	modalWrap.style.height         = '100%';
	modalWrap.style.justifyContent = 'center';
	modalWrap.style.left           = '0';
	modalWrap.style.position       = 'fixed';
	modalWrap.style.top            = '0';
	modalWrap.style.width          = '100%';
	modalWrap.style.zIndex         = '100';

	var modal = document.createElement('div');
	modal.setAttribute('class', 'modal');
	modal.style.height   = '60%';
	modal.style.position = 'relative';
	modal.style.opacity  = '0';
	modal.style.width    = '60%';

	var modalContent = document.createElement('div');
	modalContent.setAttribute('class', 'modalContent');
	modalContent.style.borderRadius    = '5px';
	modalContent.style.backgroundColor = '#ffffff';

	var modalHeader = document.createElement('div');
	modalHeader.setAttribute('class', 'modalHeader');
	modalHeader.style.borderBottom = '1px solid #cccccc';
	modalHeader.style.height       = '40px';
	modalHeader.style.position     = 'relative';

	var modalClose = document.createElement('span');
	modalClose.setAttribute('class', 'modalClose');
	modalClose.style.cursor   = 'pointer';
	modalClose.style.fontSize = '1.2em';
	modalClose.style.position = 'absolute';
	modalClose.style.top      = '5px';
	modalClose.style.right    = '10px';
	modalClose.innerText      = '✖';

	var modalHeaderContent = document.createElement('span');
	modalHeaderContent.setAttribute('class', 'modalHeaderContent');
	modalHeaderContent.style.position = 'absolute';
	modalHeaderContent.style.top      = '10px';
	modalHeaderContent.style.left     = '10px';

	var modalBody = document.createElement('div');
	modalBody.setAttribute('class', 'modalBody');
	modalBody.style.padding   = '5px 10px 0px 10px';
	modalBody.style.textAlign = 'left';
	modalBody.style.overflowY = 'scroll';

	var modalBodyContent = document.createElement('div');
	modalBodyContent.setAttribute('class', 'modalBodyContent');

	var modalFooter = document.createElement('div');
	modalFooter.setAttribute('class', 'modalFooter');
	modalFooter.style.borderTop = '1px solid #cccccc';
	modalFooter.style.height    = '40px';
	modalFooter.style.textAlign = 'right';
	modalFooter.style.position  = 'relative';

	var modalBackGround = document.createElement('div');
	modalBackGround.setAttribute('class', 'modalBackGround');
	modalBackGround.style.backgroundColor = '#000000';
	modalBackGround.style.height          = '100%';
	modalBackGround.style.left            = '0';
	modalBackGround.style.margin          = '0';
	modalBackGround.style.opacity         = '0';
	modalBackGround.style.position        = 'fixed';
	modalBackGround.style.top             = '0';
	modalBackGround.style.width           = '100%';

	modalHeaderContent.appendChild(this.convertHtml(this.header));
	modalHeader.appendChild(modalHeaderContent);
	modalHeader.appendChild(modalClose);
	modalContent.appendChild(modalHeader);

	modalBodyContent.appendChild(this.convertHtml(this.body));
	modalBody.appendChild(modalBodyContent);
	modalContent.appendChild(modalBody);

	modalFooter.appendChild(this.convertHtml(this.footer));
	modalContent.appendChild(modalFooter);

	modal.appendChild(modalContent);
	modalWrap.appendChild(modalBackGround);
	modalWrap.appendChild(modal);

	document.body.insertBefore(modalWrap, document.body.firstChild);

	return modalWrap;
}

Modalizer.prototype.convertHtml = function (html)
{
	var span = document.createElement('span');
	span.innerHTML = html;
	return span.firstElementChild;
}


Modalizer.prototype.modalOpen = function (event)
{
	this._modalOpen = event;
	return this;
}

Modalizer.prototype.modalOpened = function (event)
{
	this._modalOpened = event;
	return this;
}

Modalizer.prototype.modalClose = function (event)
{
	this._modalClose = event;
	return this;
}

Modalizer.prototype.modalClosed = function (event)
{
	this._modalClosed = event;
	return this;
}

