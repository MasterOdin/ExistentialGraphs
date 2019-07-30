$(document).ready(function(e) {

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({
        el: document.getElementById('workHolder'),
        model: graph,
        width: "88%",
        height: "70%",
        gridSize: 30,
        drawGrid: true
    });

    var last_mousex = last_mousey = 0;
    var mousex = mousey = 0;
    var currOperation = "";
    var message = "";

    $("#workHolder").on({
        mousedown: function(e) {
            last_mousex = parseInt(e.clientX - 185);
            last_mousey = parseInt(e.clientY - 55);
        },
        mouseup: function(e) {
            if ((last_mousex + 10 >= e.pageX - 185 && last_mousex - 10 <= e.pageX - 185) && (last_mousey + 10 >= e.pageY - 55&& last_mousey - 10 <= e.pageY - 55)) {
                if(currOperation == "Prop") {
                    var message = prompt("");
                    if(message != null) {
                        var rect = new joint.shapes.standard.Rectangle();
                        rect.position(last_mousex, last_mousey);
                        rect.resize(30, 30);
                        rect.attr({
                            body: {
                                fill: 'white',
                                stroke: 'white'
                            },
                            label: {
                                text: message,
                                fill: 'black'
                            }
                        });
                        rect.addTo(graph);
                    }
                }
            }
        }
    });

    $(".sidebar_button").on('click', function(e) {
        console.log(currOperation);
        if(currOperation != this.innerHTML){
            currOperation = this.innerHTML;
            $(this).css("background-color", "rgb(211, 138, 138)");
        } else {
            currOperation = "";
            $(this).css("background-color", "white");
        }
    });
});

function changeMode() {
    head = document.querySelector("header");
    if(head.innerText == "Work Mode") {
        head.innerText = "Proof Mode";
    } else {
        head.innerText = "Work Mode";
    }
}
