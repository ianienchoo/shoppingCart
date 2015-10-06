/*global $ */
(function() {
	'use strict';

	function updateSubtotalAndTotal() {
		var qty, $row, $price, $subtotal, $total, price, oldSubtotal, newSubtotal, total;

		qty = parseInt($(this).val(), 10);
		$row = $(this).parent().siblings();
		$price = $row.filter('.price').eq(0);
		$subtotal = $row.filter('.subtotal').eq(0);
		$total = $('#total');
		price = parseFloat($price.html().substr(1));
		oldSubtotal = parseFloat($subtotal.html().substr(1));
		total = parseFloat($total.html().substr(1));
		newSubtotal = (qty * price);
		total = total - oldSubtotal + newSubtotal;
		$subtotal.html('$' + newSubtotal.toFixed(2));
		$total.html('$' + total.toFixed(2));
	}

	function setQtyToZero() {
		var $qty, $subtotal, $total, oldSubtotal, total;

		$qty = $(this).prev();
		$subtotal = $(this).parent().siblings().filter('.subtotal').eq(0);
		$total = $('#total');
		oldSubtotal = parseFloat($subtotal.html().substr(1));
		total = parseFloat($total.html().substr(1));
		total = total - oldSubtotal;
		$subtotal.html('$0.00');
		$qty.val('0');
		$total.html('$' + total.toFixed(2));
	}

	function addNewItem() {
		var $tr = $('<tr><td class="item"></td><td class="price"></td><td class="quantity"><label>QTY</label> <input type="text" value="0"> <button>cancel</button></td><td class="subtotal">$0.00</td></tr>'),
			item = $('#add-item').val(),
			price = parseFloat($('#add-price').val()).toFixed(2);

		$tr.find('.item').eq(0).html(item);
		$tr.find('.price').eq(0).html('$' + price);
		$tr.find('input').eq(0).on('blur', updateSubtotalAndTotal);
		$tr.find('button').eq(0).on('click', setQtyToZero);
		$('#item-list').append($tr);
		$('#add-item').val('');
		$('#add-price').val('');
	}

	$(function () {
		$('td.quantity > input').on('blur', updateSubtotalAndTotal);
		$('td.quantity > button').on('click', setQtyToZero);
		$('#create-item').on('click', addNewItem);
	});
}());