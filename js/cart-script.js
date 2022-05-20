// ************************************************
// Shopping Cart Services
// ************************************************

var shoppingCart = (function() {
    // =============================
    // Private methods and propeties
    // =============================
    cart = [];
    


    // Constructor
    function Item(name, arname,price, count) {
      this.name = name;
      this.arname = arname;
      this.price = price;
      this.count = count;
    }
    
    // Save cart
    function saveCart() {
      sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
    
      // Load cart
    function loadCart() {
      cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
      loadCart();
    }
    

  
    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};
    
    // Add to cart
    obj.addItemToCart = function(name,arname, price, count) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart[item].count ++;
          saveCart();
          return;
        }
      }
      var item = new Item(name,arname, price, count);
      cart.push(item);
      saveCart();
    }
    // Set count from item
    obj.setCountForItem = function(name, count) {
      for(var i in cart) {
        if (cart[i].name === name) {
          cart[i].count = count;
          break;
        }
      }
    };
    // Remove item from cart
    obj.removeItemFromCart = function(name) {
        for(var item in cart) {
          if(cart[item].name === name) {
            cart[item].count --;
            if(cart[item].count === 0) {
              cart.splice(item, 1);
            }
            break;
          }
      }
      saveCart();
    }
  
    // Remove all items from cart
    obj.removeItemFromCartAll = function(name) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart.splice(item, 1);
          break;
        }
      }
      saveCart();
    }
  
    // Clear cart
    obj.clearCart = function() {
      cart = [];
      saveCart();
    }
  
    // Count cart 
    obj.totalCount = function() {
      var totalCount = 0;
      for(var item in cart) {
        totalCount += cart[item].count;
      }
      return totalCount;
    }
  
    // Total cart
    obj.totalCart = function() {
      var totalCart = 0;
      for(var item in cart) {
        totalCart += cart[item].price * cart[item].count;
      }
      return Number(totalCart.toFixed(2));
    }
  
    // List cart
    obj.listCart = function() {
      var cartCopy = [];
      for(i in cart) {
        item = cart[i];
        itemCopy = {};
        for(p in item) {
          itemCopy[p] = item[p];
  
        }
        itemCopy.total = Number(item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy)
      }
      return cartCopy;
    }
  
    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // clearCart : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
  })();



//Categories toggle
$('.category').click(function(){
    $('.category').removeClass('active')
    $(this).addClass('active')
    let target = $(this).data('category')

    $('.products').removeClass('active')
    $(`.products[data-category='${target}']`).addClass('active')
})








// *****************************************
  // Triggers / Events
  // ***************************************** 
  // Add item
  $('.product').click(function() {
    var name = $(this).data('name');
    var arname = $(this).data('arname');
    var price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name,arname, price, 1);
    displayCart();
  });
  
  
  //Display cart
  function displayCart() {
    var cartArray = shoppingCart.listCart();
    if(cartArray.length < 1){
        $('.added-items').hide()
    }else{
        $('.added-items').show()
    }
    $('.items').html("")
    for(var i=0;i <cartArray.length;i++) {
        $('.items').append(`
        <div class="item" data-name="${cartArray[i].name}">
            <span class="delete" data-name="${cartArray[i].name}">&times;</span>
            <span>${cartArray[i].arname}</span>
            <span>${cartArray[i].name}</span>
            ${cartArray[i].price.toFixed(2)}
            <div class="count-div">
                <button class="plus-item" data-name="${cartArray[i].name}">+</button>
                <input type="number" data-name="${cartArray[i].name}" value="${cartArray[i].count}" min="0" class="count" id="">
                <button class="minus-item" data-name="${cartArray[i].name}">-</button>
            </div>
        </div>
        `)
    }

    $('.total').val(shoppingCart.totalCart().toFixed(2));
  }
  
  // Delete item button
  $('.items').on("click", ".delete", function(event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
  })
  
  
  // -1
  $('.items').on("click", ".minus-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCart(name);
    displayCart();
  })
  // +1
  $('.items').on("click", ".plus-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.addItemToCart(name);
    displayCart();
  })
  
  // Item count input
  $('.items').on("change", ".count", function(event) {
     var name = $(this).data('name');
     var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
  });
 

displayCart();





