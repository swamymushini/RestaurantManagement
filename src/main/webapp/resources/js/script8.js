var orderid = localStorage.getItem('OrderId');
function calrate(){
const stars=document.querySelectorAll('.star');
const current_rating=document.querySelector('.current-rating');

stars.forEach((star,index)=>{
  star.addEventListener('click',()=>{

    let current_star=index+1;
    current_rating.innerText=`${current_star}`;

    stars.forEach((star,i)=>{
        if(current_star>=i+1){
          star.innerHTML='&#9733;';
        }else{
          star.innerHTML='&#9734;';
        }
    });

  });
});
}
calrate();
validatecustomer();
var foodnames=[];
var foodids=[];
function validatecustomer(){
    fetch("https://gopal-swamy-sde2-1c9193a94105.herokuapp.com/apis/invoice")
        .then((response) => response.json())
        .then((json) => {
            {
                var invid;
                json.forEach((invoice) => {
                    if(JSON.stringify(invoice.order_id) == JSON.stringify(orderid))
                    {
                        invid = invoice.id;
                        customername(invoice.customer_id);
                        showorders(invid);
                    }
                })
            }
        })
    }
function customername(custid){
    var url ="https://gopal-swamy-sde2-1c9193a94105.herokuapp.com/apis/customer/"+custid;
    fetch(url)
        .then((response) => response.json())
        .then((json) => {
                document.getElementById('custname').innerHTML=json["customer_name"];
        })
    }

function showorders(invid){
    fetch("https://gopal-swamy-sde2-1c9193a94105.herokuapp.com/apis/invoiceItem")
        .then((response) => response.json())
        .then((json) => {
            {
                var li="";
                json.forEach((invoiceItem) => {
                    if(invid == invoiceItem.invoice_id){
                        var menu_id=invoiceItem.menu_id;
                        var url ="https://gopal-swamy-sde2-1c9193a94105.herokuapp.com/apis/menu/"+menu_id;
                        fetch(url)
                            .then((response) => response.json())
                            .then((json) => {
                                li+= `<div class="dishratings"><p id="menuid" style="display:none">${menu_id}</p>
                                <p id="invids" style="display:none">${invid}</p>
                                <p class="mt-5">${json["dish_name"]}</p>
                                <div class="range-wrap">
                                    <input type="range" class="range" id="range" min="1" max="5" step="1">
                                    <output class="bubble"></output>
                                </div></div>`
                            document.querySelector('.text').innerHTML=li
                            })
                        }
                    })

                }
            })
        }
function submitrating(){
    var overallrating=document.querySelector('.current-rating').innerHTML;
    var comments =$.trim($(".comments").val());
    if(overallrating==0){
        Swal.fire({
            html:
            '<h5>Pls rate to proceed <i class="fa fa-warning mx-2" style="color:green"></i></h5>'
          })
    }
    else{
        fetch("https://gopal-swamy-sde2-1c9193a94105.herokuapp.com/apis/invoice")
        .then((response) => response.json())
        .then((json) => {
            {
                json.forEach((invoice) => {
                    var orderid =localStorage.getItem('OrderId');
                    if(orderid == invoice.order_id){
                    var submitratingObject = {
                        invoice_id:invoice.id,
                        comments:comments,
                        rating_id:overallrating
                    };
                     reviewsubmit(submitratingObject)
            }
        })
    }
    })
    const invids = document.querySelectorAll('#invids');
    const menuids = document.querySelectorAll('#menuid');
    var ranges = document.querySelectorAll('#range');
    for(var i=0; i<invids.length;i++){
        updatedishratingobject(invids[i].innerHTML,menuids[i].innerHTML,ranges[i].value)
}
}
}
function updatedishratingobject(invid,menuid,rating){
    var url = "https://gopal-swamy-sde2-1c9193a94105.herokuapp.com/apis/avgRating/"+menuid;
    fetch(url)
    .then((response) => response.json())
    .then((json) =>{
        var updatemenuratingObject = {
            id:json["id"],
            menu_id:json["menu_id"],
            customercount:Number(json["customercount"])+1,
            avg_rating:(((json["avg_rating"])*(json["customercount"]))+rating)/(json["customercount"]+1)
          };
          updatedishrating(updatemenuratingObject);
})
}
function updatedishrating(updatemenuratingObject){
    fetch("https://gopal-swamy-sde2-1c9193a94105.herokuapp.com/apis/avgRating/update", {
             method: 'PUT',
             body: JSON.stringify(updatemenuratingObject),
             headers: {
             "Content-type": "application/json; charset=UTF-8"
             }
      })
}
 function reviewsubmit(submitratingObject){
     fetch("https://gopal-swamy-sde2-1c9193a94105.herokuapp.com/apis/userReview/create", {
             method: 'POST',
             body: JSON.stringify(submitratingObject),
             headers: {
               "Content-type": "application/json; charset=UTF-8"
             }
       })
    window.location.href="https://gopal-swamy-sde2-1c9193a94105.herokuapp.com/thankyou";
   }