var todos = [];

var client = Request.createClient(
  "https://scenic-hawaii-volcanoes-43539.herokuapp.com/"
);

var idCounter = 0;

var clearHTML = function() {
  var uls = [
    document.getElementById("todayList"),
    document.getElementById("next7daysList"),
    document.getElementById("laterList")
  ];

  for (ul in uls) {
    var lis = uls[ul].getElementsByTagName("li");
    while (lis.length > 0) {
      uls[ul].removeChild(lis[0]);
    }
  }
};

var initialiseHTML = function() {
  clearHTML();

  if (typeof todos == "array") {
    todos.sort(function(a, b) {
      return a.position - b.position;
    });
  }

  for (x in todos) {
    var parent = document.getElementById(todos[x].bucket);
    if (parent) {
      buildToDoHTML(parent, todos[x].description, todos[x].id);
    }
  }
};

// Just to get us started add some todos
var initialiseData = function() {
  client.get("/all").then(function(result) {
    body = result.body;
    todos = body;
    initialiseHTML();
    addDoneHandlers();
  });
};

var initialiseHandlers = function() {
  var dialog = document.querySelector("dialog");
  var showModalButton = document.querySelector(".show-modal");
  if (!dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
  }

  showModalButton.addEventListener("click", function() {
    dialog.showModal();
  });
  dialog.querySelector(".closeDialog").addEventListener("click", function() {
    dialog.close();
    document.getElementById("descriptionInput").value = "";
    document.getElementById("bucketInput").value = "";
  });
};

var buildToDoHTML = function(parent, description, id) {
  var li = document.createElement("li");
  var span = document.createElement("span");

  span.setAttribute("class", "mdl-list__item-primary-content");
  span.textContent = description;

  var spanAction = document.createElement("span");
  spanAction.setAttribute("class", "mdl-list__item-secondary-action");

  var input = document.createElement("button");
  input.setAttribute("id", "todo-checkbox-" + id);
  input.setAttribute(
    "class",
    "mdl-button mdl-js-button mdl-button--mini-fab mdl-js-ripple-effect doneBox"
  );

  var icon = document.createElement("i");
  icon.setAttribute("class", "material-icons .md-6");
  icon.textContent = "adjust";

  input.appendChild(icon);
  spanAction.appendChild(input);

  li.setAttribute("id", id);
  li.setAttribute("class", "mdl-list__item");

  li.appendChild(spanAction);
  li.appendChild(span);
  parent.appendChild(li);
};

var addNewButtonHandler = function() {
  var description = document.getElementById("descriptionInput");
  var bucket = document.getElementById("bucketInput");

  client
    .post("/new", {
      description: description.value,
      bucket: bucket.value,
      position: 100
    })
    .then(function(result) {
      initialiseData();
      document.querySelector("dialog").close();
      document.getElementById("descriptionInput").value = "";
      document.getElementById("bucketInputText").value = "";
    });
};

document.getElementById("addNewButton").addEventListener("click", function() {
  addNewButtonHandler();
});

var doneButtonHandler = function(evt) {
  client
    .post("/done", { id: evt.srcElement.offsetParent.id.split("-")[2] })
    .then(function(result) {
      initialiseData();
    });
};

var addDoneHandlers = function() {
  var elements = document.querySelectorAll(".doneBox");
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", function(evt) {
      doneButtonHandler(evt);
    });
  }
};

var initLists = function() {
  var today = document.getElementById("todayList");
  var next7days = document.getElementById("next7daysList");
  var later = document.getElementById("laterList");

  var options = {
    group: "todos",
    animation: 200,
    onUpdate: function(event) {
      var dataBody = {
        id: event.item.id,
        bucket: event.from.id,
        position: event.newIndex
      };

      client.post("/move", dataBody).then(function(result) {
        initialiseData();
      });
    },
    onAdd: function(event) {
      var dataBody = {
        id: event.item.id,
        bucket: event.to.id,
        position: event.newIndex
      };

      client.post("/move", dataBody).then(function(result) {
        initialiseData();
      });
    }
  };

  Sortable.create(today, options);
  Sortable.create(next7days, options);
  Sortable.create(later, options);
};

var init = function() {
  initialiseData();
  initialiseHandlers();
  initLists();
};

document.onload = init();
