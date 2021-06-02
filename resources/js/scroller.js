var document_ready = false;
var rainbow_colors;
var gap;
// var rainbow_color_index = -1;
// var delta_incr = NaN;
var start;
var end;
var rainbow_index;
var delta;
var new_color;
var offset;

$(document).ready(function() {
    document_ready = true;
    rainbow_colors = [[148,0,211],[75,0,130], [0,0,255],[0,255,0], [255,255,0], [255,127,0], [255,0,0]];
    gap = parseFloat(document.body.scrollHeight) / parseFloat(rainbow_colors.length - 1);
});

$(window).scroll(function() {
    
    var height = $(window).scrollTop();
    if(document_ready && height > 0){
        $("#navbar_at_top").css("background-color",scrollToRGB(height));
        // console.log(`rgb(${100/height},${200/height},${300/height})`);
    }
});

function scrollToRGB(height){
    
    // var rainbow_color_index = parseInt(height/gap);
    
    if(parseInt(height/gap) != rainbow_index){
        
        var rainbow_index = parseInt(height/gap);
        
        start = rainbow_colors[rainbow_index].slice();
        end = rainbow_colors[rainbow_index + 1 ].slice();
        
        // console.log(start);
        // console.log(end);
        
        delta = end.map(function(item,index){
            return parseFloat(item - start[index]);
        });
        
        // console.log(`delta: ${delta}`);
    }
    
    offset = height%gap;
    
    new_color = start.map(function(item,index){
        return parseFloat(item + delta[index] * offset/gap);
    })
    
    // console.log(`new_color: ${new_color}`);
    
    return `rgb(${new_color[0]},${new_color[1]},${new_color[2]})`; 
}