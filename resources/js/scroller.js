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
var shift;
var default_navbar_vertical_padding = 25; 

$(document).ready(function() {
    document_ready = true;
    rainbow_colors = [[157,244,245,100],[255,244,220,100], [245,157,185,100],[220,255,254,100], [245,244,157,100], [255,220,220,100], [157,172,245,100]];
    gap = parseFloat(document.body.scrollHeight) / parseFloat(rainbow_colors.length - 1);
    shift = 400;
});

$(window).scroll(function() {
    
    var height = $(window).scrollTop();
    if(document_ready && height > 0){
        $("#navbar_at_top").css("background-image",scrollToRGB(height));
        // console.log(`rgb(${100/height},${200/height},${300/height})`);
        if(height < shift ){
            $("#navbar_at_top").css("padding-top",shift - height + default_navbar_vertical_padding);
        }else{
            $("#navbar_at_top").css("padding-top",0 + default_navbar_vertical_padding);
        }
    }else{
        $("#navbar_at_top").css("padding-top",shift + default_navbar_vertical_padding);
    }
    $("#navbar_at_top").css("padding-bottom",default_navbar_vertical_padding);
    console.log($("#navbar_at_top").css("padding_top"));
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
    var complement = rgbComplimentary(Math.round(new_color[0]),Math.round(new_color[1]),Math.round(new_color[2]));
    // console.log(`new_color: ${new_color}`);
    var message = `linear-gradient(
        to right,
        rgba(${new_color[0]},${new_color[1]},${new_color[2]},${new_color[3]}),
        rgba(${complement["r"]}, ${complement["g"]}, ${complement["b"]})
       )`; 
    // console.log(message);
    
    return message 
}


function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}


function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function rgbComplimentary(r,g,b){

    var hex = "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    var rgb = 'rgb(' + (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length/3 + '})', 'g')).map(function(l) { return parseInt(hex.length%2 ? l+l : l, 16); }).join(',') + ')';

    // Get array of RGB values
    rgb = rgb.replace(/[^\d,]/g, '').split(',');

    var r = rgb[0]/255.0, g = rgb[1]/255.0, b = rgb[2]/255.0;

    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2.0;

    if(max == min) {
        h = s = 0;  //achromatic
    } else {
        var d = max - min;
        s = (l > 0.5 ? d / (2.0 - max - min) : d / (max + min));

        if(max == r && g >= b) {
            h = 1.0472 * (g - b) / d ;
        } else if(max == r && g < b) {
            h = 1.0472 * (g - b) / d + 6.2832;
        } else if(max == g) {
            h = 1.0472 * (b - r) / d + 2.0944;
        } else if(max == b) {
            h = 1.0472 * (r - g) / d + 4.1888;
        }
    }

    h = h / 6.2832 * 360.0 + 0;

    // Shift hue to opposite side of wheel and convert to [0-1] value
    h+= 180;
    if (h > 360) { h -= 360; }
    h /= 360;

    // Convert h s and l values into r g and b values
    // Adapted from answer by Mohsen http://stackoverflow.com/a/9493060/4939630
    if(s === 0){
        r = g = b = l; // achromatic
    } else {
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;

        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    r = Math.round(r * 255);
    g = Math.round(g * 255); 
    b = Math.round(b * 255);

    // Convert r b and g values to hex
    rgb = b | (g << 8) | (r << 16); 
    return hexToRgb("#" + (0x1000000 | rgb).toString(16).substring(1));

}