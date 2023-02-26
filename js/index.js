$(document).ready(function () {

    $('.card').hover(function () {
           $(this).css({
                border:'1px solid black',
                transform:'scale(0.9)',
                transition:'.5s'
           });
            
        }, function () {
            $(this).css({
                border:'none',
                transform:'scale(1)'
            });
        }
    );

    $('.orderProduct').click(function (e) { 
        e.preventDefault();

        var prix=$(this).prevAll().eq(1).text()
        var nomProduit=$(this).prevAll().eq(3).text()
        var image=$(this).parent().prev().attr('src')

        $('.order').append(
            `<div class="row mb-3">
                <div class="col-5">
                    <img src="${image}" class="img-fluid">
                </div>
                <div class="col-4">
                    <p>${nomProduit}</p>
                    <p>${prix} <span class='d-none'>${prix}</span></p>
                    <p><input type="number" min="1" value="1" style="width: 50px;"></p>
                </div>
                <div class="col-3">
                    <i class="fa fa-trash text-danger fa-2x" aria-hidden="true"></i>
                </div>
            </div>`
        );
    });

    $('.order').on('click','.fa-trash', function () {
        $(this).parents().eq(1).remove()
    });

    $('.order').on('click','input[type=number]', function () {

       let val=$(this).val()
       let prix=$(this).parent().prev().text().replace('FCFA','')
       let total=parseInt(val)*parseInt(prix)
       $(this).parent().prev().children().text(total+' FCFA')

       let som=0

       $.each($('.order').children(), function (index, item) { 
         som=som+parseInt($(this).children().eq(1).children().eq(1).children().text().replace('FCFA',''))
       });
       $('.prixTotal').text(som+' FCFA');
    });

    setInterval(() => {
        let somme=0
        $.each($('.order').children(), function (index, item) { 
            somme=somme+parseInt($(this).children().eq(1).children().eq(1).children().text().replace('FCFA',''))
        });
        $('.prixTotal').text(somme+' FCFA');
    }, 100);

    $("#liveToastBtn").click(function (e) { 
        e.preventDefault();
        $('.order').empty()
    });

    const toastTrigger = document.getElementById('liveToastBtn')
    const toastLiveExample = document.getElementById('liveToast')
    if (toastTrigger) {
        toastTrigger.addEventListener('click', () => {
            const toast = new bootstrap.Toast(toastLiveExample)

            toast.show()
        })
    }
});