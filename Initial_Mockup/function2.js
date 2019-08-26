// Things to do:
// - implement proof tools
// - fully integrate new code
// - debug


$(document).ready(function(e) {

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({ el: $('#workHolder'), width: '88%', height: '70%', model: graph, gridSize: 10, drawGrid: true });

    var last_mousex = last_mousey = 0;
    var mousex = mousey = 0;
    var currOperation = "";
    var message = "";
    var savedGraph = null;

    // First, unembed the cell that has just been grabbed by the user.
    paper.on('cell:pointerdown', function(cellView, evt, x, y) {
        var cell = cellView.model;
        this.options.embeddingMode = true;
        console.log(graph.toJSON());
        
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
                cellViewBelow.model.embed(cell);

                cellViewBelow.model.fitEmbeds({deep: true, padding: 20});
            }
        }
        this.embeddingMode = false;
    });

    $("#workHolder").on({
        mousedown: function(e) {
            last_mousex = parseInt(e.clientX - 185);
            last_mousey = parseInt(e.clientY - 55);
        },
        mouseup: function(e) {
            if ((last_mousex + 1 >= e.pageX - 185 && last_mousex - 1 <= e.pageX - 185) && (last_mousey + 1 >= e.pageY - 55&& last_mousey - 1 <= e.pageY - 55)) {
                if(currOperation == "Prop") {
                    add_prop(graph, last_mousex, last_mousey);
                } else if(currOperation == "Cut") {
                    add_cut(graph, last_mousex, last_mousey);
                } else if(currOperation == "Delete") {
                    delete_x(e);
                } else if(currOperation == "Insert DC") {
                    insert_dc(graph, last_mousex, last_mousey);
                }
            }
        }
    });

    $("#save").on('click', function() {
        savedGraph = graph.toJSON();
    });

    $("#load").on('click', function() {
        graph.fromJSON(savedGraph);
    });

    $(".sidebar_button").on('click', function(e) {
        if(currOperation == this.innerHTML) {
            currOperation = "";
            $(this).css("background-color", "white");
        } else {
            for(var i = 0; i < $(".sidebar_button").length; i++) {
                if($(".sidebar_button")[i].innerHTML == currOperation) {
                    currOperation = "";
                    $($(".sidebar_button")[i]).css("background-color", "white");
                    break;
                }
            }
            currOperation = this.innerHTML;
            $(this).css("background-color", "rgb(211, 138, 138)");
        }
    });

    $("#change_mode").on('click', function() {
        head = document.querySelector("header");
        if(head.innerText == "Work Mode") {
            head.innerText = "Proof Mode";
        } else {
            head.innerText = "Work Mode";
        }
    });
});

function add_prop(graph, last_mousex, last_mousey) {
    var message = prompt("Enter proposition value: ");
    if(message != null) {
        var rect = new joint.shapes.standard.Rectangle();
        rect.position(last_mousex + 15, last_mousey + 5);
        console.log(last_mousex, last_mousey);
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
        rect.toFront();
        rect.set('z', 100);
        $('#workHolder').trigger('cell:pointerup');
    }
}

function add_cut(graph, last_mousex, last_mousey) {
    var cut = new joint.shapes.basic.Rect();
    cut.position(last_mousex - 75, last_mousey - 75);
    cut.resize(200, 200);
    cut.attr({
        id: 'cut',
        rect: {
            'fill-opacity': 0, 
            stroke: 'black'
        }
    });
    graph.addCell(cut);
}

function delete_x(cell) {
    console.log(cell.target);
    cell.target.remove();
}

function insert_dc(graph, last_mousex, last_mousey) {
    var outter_cut = new joint.shapes.basic.Rect();
    var inner_cut = new joint.shapes.basic.Rect();
    outter_cut.position(last_mousex - 75, last_mousey - 75);
    outter_cut.resize(200, 200);
    outter_cut.attr({
        id: 'cut',
        rect: {
            'fill-opacity': 0, 
            stroke: 'black'
        }
    });
    inner_cut.position(last_mousex - 55, last_mousey - 55);
    inner_cut.resize(160, 160);
    inner_cut.attr({
        id: 'cut',
        rect: {
            'fill-opacity': 0, 
            stroke: 'black'
        }
    });
    graph.addCell(outter_cut);
    graph.addCell(inner_cut);
    console.log(inner_cut);
    outter_cut.embed(inner_cut);
}