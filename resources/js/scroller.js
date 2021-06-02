var document_ready = false;


$(document).ready(function() {
    document_ready = true;
});

$(window).scroll(function() {
    
    var height = $(window).scrollTop();
    if(document_ready && height > 0){
        console.log(height);
        $(document.body).css("background-color",`rgb(${100/height},${200/height},${300/height})`);
        console.log(`rgb(${100/height},${200/height},${300/height})`);
    }
});