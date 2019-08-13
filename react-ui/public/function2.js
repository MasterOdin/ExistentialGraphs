// Things to do:
// - when dragging element, bring it to top level
// - when placing new proposition
// - copy 1 or all children: dia.Element.prototype.clone

$(document).ready(function(e) {
  var graph = new joint.dia.Graph();
  var paper = new joint.dia.Paper({
    el: $("#workHolder"),
    width: "88%",
    height: "70%",
    model: graph,
    gridSize: 10,
    drawGrid: true
  });

  var last_mousex = (last_mousey = 0);
  var mousex = (mousey = 0);
  var currOperation = "Proposition";
  var message = "";
  var offsetx = 185, offsety = 55;

  // First, unembed the cell that has just been grabbed by the user.
  paper.on("cell:pointerdown", function(cellView, evt, x, y) {
    var cell = cellView.model;

    if (cell.get("parent")) {
      graph.getCell(cell.get("parent")).unembed(cell);
      cell.toFront();
      return;
    }

    cell.toFront({deep: true});
  });

  // When the dragged cell is dropped over another cell, let it become a child of the
  // element below.
  paper.on("cell:pointerup", function(cellView, evt, x, y) {
    var cell = cellView.model;
    var cellViewsBelow = paper.findViewsFromPoint(cell.getBBox().center());
    console.log(cell, cellViewBelow);

    if (cellViewsBelow.length) {
      // Note that the findViewsFromPoint() returns the view for the `cell` itself.
      var cellViewBelow = _.find(cellViewsBelow, function(c) {
        return c.model.id !== cell.id;
      });
      // Prevent recursive embedding.
      if (cellViewBelow && cellViewBelow.model.get("parent") !== cell.id) {
        //&& cellViewBelow.id == 'cut'
        console.log(cellViewBelow.model);
        cellViewBelow.model.embed(cell);

        cellViewBelow.model.fitEmbeds({ deep: true, padding: 20 });
      }
    }
  });

  $("#workHolder").on({
    mousedown: function(e) {
      currOperation = $($($(".Mui-selected").html())[0].innerHTML)[0].innerHTML;
      last_mousex = parseInt(e.clientX);
      last_mousey = parseInt(e.clientY);
    },
    mouseup: function(e) {
      if ((last_mousex + 1 >= e.pageX && last_mousex - 1 <= e.pageX) && 
          (last_mousey + 1 >= e.pageY && last_mousey - 1 <= e.pageY)) {
        if (currOperation == "Proposition") {
          add_prop(graph, last_mousex, last_mousey);
        } else if (currOperation == "Cut") {
          add_cut(graph, last_mousex, last_mousey);
        } else if (currOperation == "Delete") {
          delete_x(e);
        }
      }
    }
  });

  // highlight parent element when hovering
  paper.bind("cell:mouseover cell:mousedown", function(cellView, evt, x, y) {
    /*
        cellView.
        cellView.el.attr({
            body: {
                stroke: 'red'
            }
        })
        */
  });

  $("#change_mode").on("click", function() {
    head = document.querySelector("header");
    if (head.innerText == "Work Mode") {
      head.innerText = "Proof Mode";
    } else {
      head.innerText = "Work Mode";
    }
  });
});

function add_prop(graph, last_mousex, last_mousey) {
  var message = $($(".MuiButtonBase-root").filter("[tabindex= '-1']")[0].innerHTML)[0].innerHTML;
  var rect = new joint.shapes.standard.Rectangle();
  if (message != null) {
    rect.position(last_mousex - 10, last_mousey - 10);
    rect.resize(10 + 10 * message.length, 20);
    rect.attr({
      id: "pro",
      body: {
        fill: "white",
        fillOpacity: "0.0",
        strokeOpacity: "0.0"
      },
      label: {
        text: message,
        fill: "black"
      }
    });
    rect.addTo(graph);
  }
  rect.toFront();
  $("#workHolder").trigger("cell:pointerdown");
  $("#workHolder").trigger("cell:pointerup");
}

function add_cut(graph, last_mousex, last_mousey) {
  var cut = new joint.shapes.basic.Rect();
  cut.position(last_mousex - 100, last_mousey - 95);
  cut.resize(200, 200);
  cut.attr({
    id: "cut",
    rect: {
      "fill-opacity": 0,
      stroke: "black"
    }
  });
  graph.addCell(cut);
}

function delete_x(cell) {
  console.log(cell.target);
  cell.target.remove();
}

