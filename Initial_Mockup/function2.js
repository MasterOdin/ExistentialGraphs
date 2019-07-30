$(document).ready(function(e) {

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({ el: $('#workHolder'), width: '88%', height: '70%', gridSize: 1, model: graph });

    var last_mousex = last_mousey = 0;
    var mousex = mousey = 0;
    var currOperation = "";
    var message = "";
        
    // First, unembed the cell that has just been grabbed by the user.
    paper.on('cell:pointerdown', function(cellView, evt, x, y) {
        console.log(x, y);
        var cell = cellView.model;

        if (!cell.get('embeds') || cell.get('embeds').length === 0) {
            // Show the dragged element above all the other cells (except when the
            // element is a parent).
            cell.toFront();
        }
        
        if (cell.get('parent')) {
            graph.getCell(cell.get('parent')).unembed(cell);
        }
    });

    // When the dragged cell is dropped over another cell, let it become a child of the
    // element below.
    paper.on('cell:pointerup', function(cellView, evt, x, y) {

        var cell = cellView.model;
        var cellViewsBelow = paper.findViewsFromPoint(cell.getBBox().center());

        if (cellViewsBelow.length) {
            // Note that the findViewsFromPoint() returns the view for the `cell` itself.
            var cellViewBelow = _.find(cellViewsBelow, function(c) { return c.model.id !== cell.id });
            // Prevent recursive embedding.
            if (cellViewBelow && cellViewBelow.model.get('parent') !== cell.id ) {
                //&& cellViewBelow.id == 'cut'
                console.log(cellViewBelow.model);
                cellViewBelow.model.embed(cell);
                
                cellViewBelow.model.fitEmbeds({deep: true, padding: 20});
            }
        }
    });

    $("#workHolder").on({
        mousedown: function(e) {
            last_mousex = parseInt(e.clientX - 185);
            last_mousey = parseInt(e.clientY - 55);
        },
        mouseup: function(e) {
            if ((last_mousex + 10 >= e.pageX - 185 && last_mousex - 10 <= e.pageX - 185) && (last_mousey + 10 >= e.pageY - 55&& last_mousey - 10 <= e.pageY - 55)) {
                if(currOperation == "Prop") {
                    var message = prompt("Enter proposition value: ");
                    if(message != null) {
                        var rect = new joint.shapes.standard.Rectangle();
                        rect.position(last_mousex, last_mousey);
                        rect.resize(10 + 10 * message.length, 20);
                        rect.attr({
                            id: 'pro',
                            body: {
                                fill: 'white',
                                fillOpacity: '0.0',
                                strokeOpacity: '0.0'
                            },
                            label: {
                                text: message,
                                fill: 'black'
                            }
                        });
                        rect.addTo(graph);
                    }
                } else if(currOperation == "Cut") {
                    console.log("epic gamer moment");
                    var cut = new joint.shapes.basic.Rect({
                        id: 'cut',
                        position: { x: last_mousex, y: last_mousey },
                        size: { width: 200, height: 200 },
                        attrs: {rect: {fill: 'white', stroke: 'black'}}
                    });
                    cut.addTo(graph);
                }
            }
        }
    });

    $(".sidebar_button").on('click', function(e) {
        if(currOperation == this.innerHTML) {
            currOperation = "";
            $(this).css("background-color", "white");
        } else {
            for(var i = 0; i < $(".sidebar_button").length; i++) {
                if($(".sidebar_button")[i].innerHTML == currOperation) {
                    console.log($(".sidebar_button")[i].innerHTML);
                    currOperation = "";
                    $($(".sidebar_button")[i]).css("background-color", "white");
                    break;
                }
            }
            currOperation = this.innerHTML;
            $(this).css("background-color", "rgb(211, 138, 138)");
        }
    });
});
