var document_ready = false;
var rainbow_colors;
var gap;
var rainbow_color_index = -1;
var delta_incr = NaN;
var start;
var end;

$(document).ready(function() {
    document_ready = true;
    rainbow_colors = [[148,0,211],[75,0,130], [0,0,255],[0,255,0], [255,255,0], [255,127,0], [255,0,0]];
    gap = parseFloat(document.body.scrollHeight) / parseFloat(rainbow_colors.length - 1);
});

$(window).scroll(function() {
    
    var height = $(window).scrollTop();
    if(document_ready && height > 0){
        console.log($("#navbar_at_top"));
        $("#navbar_at_top").css("background-color",scrollToRGB(height));
        // console.log(`rgb(${100/height},${200/height},${300/height})`);
    }
});

function scrollToRGB(height){
    
    // var rainbow_color_index = parseInt(height/gap);
    
    
    if(parseInt(height/gap) != rainbow_color_index){
        //Time to update gap
        rainbow_color_index = parseInt(height/gap);
        
        start = rainbow_colors[rainbow_color_index].slice();
        end = rainbow_colors[rainbow_color_index+1].slice();
        
        var delta = [];
        // console.log(`start: ${start}, end: ${end}, rainbow_color_index: ${rainbow_color_index}`);
        for(var i = 0; i < start.length; i++){
            delta.push(start[i] - end[i]);
        }
        
        // var delta = start.map(function(element, index) {
        //     element - end[index];
        // });
        
        delta_incr = delta.map(item => item/gap);
    }
    
    var offset = height%gap;
    
    var new_colors = start.map(function(item, index) {
        return parseFloat(item) - delta_incr[index]*offset;
    });

    start = new_colors;

    // console.log(`start: ${start}, offset: ${offset}, new_colors: ${new_colors}`);
    
    // console.log(`gap: ${gap} , offset: ${offset}, rainbow_color_index: ${rainbow_color_index}, delta_incr: ${delta_incr}, new_colors: ${new_colors}`);
    console.log(new_colors);
    
    return `rgb(${new_colors[0]},${new_colors[1]},${new_colors[2]})`;
}