function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $(input).next().html( $('<img>',{src:''}) );
            var img = $(input).next().find('img');
            img.attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
  
$(document).on('change','input[name="image[]"]',function(){
    var t = this;
    var that = $(this);   
    that.closest('li').find('u').remove();
    if(that.val()!=''){
        setTimeout(function(){
            var files = that[0].files;
            console.log(files);
            var c=0;
            var img_error = Array();
            for (var i = 0; i<files.length; i++){
                console.log(files[i]['name']);
                console.log(files[i]['size']);
                if(files[i]['size']>2048576){
                    img_error.push(files[i]['name']);
                    that.closest('input-images').append('<u>Tamanho não suportado! Tamanho máximo 2mb.</u>');
                } else {
                    readURL(t);
                }
            }
        },150);
    }
});
  
$(document).on("change",'[id^="input-image"]', function() {
    var _id = $(this).attr('id').split('-');
    var index_id = _id[2];
    var qtd_id = $('.input-images > div').length;
    console.log($('#input-image-'+(qtd_id-2)).val());
    console.log('#input-image-'+(qtd_id-2));
    if ($('#input-image-'+(qtd_id-2)).val()!=""&&$('#input-image-'+(qtd_id-2)).val()!=undefined) {
        //var id = $('.input-images').eq(qtd_id-1).find('label').attr('for').split('-')[2];
        //id++;
        var clone = $('.clone').html()
        .replace(/input-image-/g,'input-image-'+(qtd_id-1));
        $('.input-images').eq(1).append(clone);
        $('[for=input-image-'+(qtd_id-2)+'] i.fa').removeClass('fa-plus').addClass('fa-refresh');
    }
});