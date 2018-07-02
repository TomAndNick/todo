var todos = [];

var idCounter = 0;

var newTodo = function (description, bucket, position) {
    return todos.push({
        id: idCounter++,
        description: description,
        bucket: bucket,
        position: position,
    });
}

// Just to get us started add some todos
var initialiseData = function () {
    var counter = 1;
    newTodo("Item " + counter++, "todayList", 0);
    newTodo("Item " + counter++, "todayList", 1);
    newTodo("Item " + counter++, "todayList", 2);

    newTodo("Item " + counter++, "tomorrowList", 0);
    newTodo("Item " + counter++, "tomorrowList", 1);
    newTodo("Item " + counter++, "tomorrowList", 2);

    newTodo("Item " + counter++, "thisweekList", 0);
    newTodo("Item " + counter++, "thisweekList", 1);
    newTodo("Item " + counter++, "thisweekList", 2);

    newTodo("Item " + counter++, "nextweekList", 0);
    newTodo("Item " + counter++, "nextweekList", 1);
    newTodo("Item " + counter++, "nextweekList", 2);

    newTodo("Item " + counter++, "laterList", 0);
    newTodo("Item " + counter++, "laterList", 1);
    newTodo("Item " + counter++, "laterList", 2);

}

var initialiseHTML = function () {

    todos.sort(function (a, b) {
        return a.position - b.position;
    });

    for (x in todos) {
        var parent = document.getElementById(todos[x].bucket);
        buildToDoHTML(parent, todos[x].description, todos[x].id)
    }
}

var initialiseHandlers = function () {
    var dialog = document.querySelector('dialog');
    var showModalButton = document.querySelector('.show-modal');
    if (!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }

    showModalButton.addEventListener('click', function () {
        dialog.showModal();
    });
    dialog.querySelector('.closeDialog').addEventListener('click', function () {
        dialog.close();
        document.getElementById("descriptionInput").value = "";
        document.getElementById("bucketInput").value = "";
    });
}

var buildToDoHTML = function (parent, description, id) {
    var li = document.createElement("li");
    var span = document.createElement("span");

    span.setAttribute("class", "mdl-list__item-primary-content");
    span.textContent = description;

    var spanAction = document.createElement("span");
    spanAction.setAttribute("class", "mdl-list__item-secondary-action");

    var input = document.createElement("button");
    input.setAttribute("id", "todo-checkbox-" + id);
    input.setAttribute("class", "mdl-button mdl-js-button mdl-button--mini-fab mdl-js-ripple-effect");

    var icon = document.createElement("i");
    icon.setAttribute("class", "material-icons .md-6");
    icon.textContent = "adjust";

    input.appendChild(icon);
    spanAction.appendChild(input);

    li.setAttribute("id", "todoItem-" + id);
    li.setAttribute("class", "mdl-list__item");

    li.appendChild(spanAction);
    li.appendChild(span);
    parent.appendChild(li);
}

var addNewButtonHandler = function () {
    var description = document.getElementById("descriptionInput");
    var bucket = document.getElementById("bucketInput");

    var todo = newTodo(description.value, bucket.value, idCounter++);
    buildToDoHTML(document.getElementById(bucket.value), description.value, idCounter);

    document.querySelector('dialog').close();
    document.getElementById("descriptionInput").value = "";
    document.getElementById("bucketInputText").value = "";
};

document.getElementById('addNewButton').addEventListener('click', function(){
    addNewButtonHandler();
});

var initLists = function () {
    var today = document.getElementById("todayList");
    var tomorrow = document.getElementById("tomorrowList");
    var thisweek = document.getElementById("thisweekList");
    var nextweek = document.getElementById("nextweekList");
    var later = document.getElementById("laterList");

    var options = {
        group: 'todos',
        animation: 200,
        onUpdate: function (evt) {
            console.log(evt.item.id + " changed position in " + evt.from.id + " from position " + evt.oldIndex + " to position " + evt.newIndex);
        },
        onAdd: function (evt) {
            console.log(evt.item.id + " changed from bucket " + evt.from.id + " to " + evt.to.id + " position " + evt.newIndex);
        }
    }

    Sortable.create(today, options);
    Sortable.create(tomorrow, options);
    Sortable.create(thisweek, options);
    Sortable.create(nextweek, options);
    Sortable.create(later, options);
};

var init = function () {
    initialiseData();
    initialiseHTML();
    initialiseHandlers();
    initLists();
};

document.onload = init();