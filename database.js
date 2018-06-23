$(document).ready(function() {

  var items = JSON.parse(localStorage.getItem("items") || "[]");
  items.forEach(addItem);

  function addItem(item) {
    if ($("#store-dropdown option[value='" + item.store + "']").length == 0) {
      $("#store-dropdown").append(`<option value="${item.store}"> ${item.store} </option>`);
    }
    if ($("#product-dropdown option[value='" + item.product + "']").length == 0) {
      $("#product-dropdown").append(`<option value="${item.product}"> ${item.product} </option>`);
    }
    $("#table tbody").prepend(`<tr>
      <td> ${item.date} </td>
      <td> ${item.store} </td>
      <td> ${item.product} </td>
      <td> ${item.price.toFixed(2)} </td>
      <td> ${item.quantity} </td>
      <td> ${(item.price * item.quantity).toFixed(2)} </td>
      <td> <button class="remove">x</button> </td>
    </tr>`);
  }

  $("#add-button").click(function() {
    var store = $("#store").val();
    var product = $("#product").val();
    var price = parseFloat($("#price").val()) || 0;
    var quantity = parseFloat($("#quantity").val()) || 1;

    var item = {
      date: moment().format('M.D.YYYY'),
      store: store,
      product: product,
      price: price,
      quantity: quantity,
    };

    $("#product").val("");
    $("#price").val("");
    $("#quantity").val("");

    items.push(item);
    addItem(item);
    localStorage.setItem("items", JSON.stringify(items));
  });

  $("#table tbody").on("click", ".remove", function() {
    var tableRow = $(this).parents("tr");
    items.splice(tableRow.index(), 1);
    tableRow.remove();
    localStorage.setItem("items", JSON.stringify(items));
  });

  $("#store-dropdown").change(function() {
    $("#store").val($("#store-dropdown").val());
    $("#store-dropdown").val("");
  });

  $("#product-dropdown").change(function() {
    $("#product").val($("#product-dropdown").val());
    $("#product-dropdown").val("");

    var store = $("#store").val();
    var product = $("#product").val();
    var price = "";

    for (var item of items) {
      if (item.store == store && item.product == product) {
        price = item.price;
      }
    }

    $("#price").val(price);
  });

});
