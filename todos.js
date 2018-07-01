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

initialiseData();

var init = function () {
    initialiseHTML();
    initialiseHandlers();
}

var initialiseHTML = function () {

    todos.sort(function (a, b) {
        return a.position - b.position;
    });

    for (x in todos) {
        var parent = document.getElementById(todos[x].bucket);
        /*
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(todos[x].description));
        li.setAttribute("id", "todoItem-" + todos[x].id);
        ul.appendChild(li);
        */

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

    console.log(description.value);
    console.log(bucket.value);

    var todo = newTodo(description.value, bucket.value, idCounter++);
    console.log(todos[todo - 1]);
    var ul = document.getElementById(bucket.value);
    var li = document.createElement("li");

    var span = document.createElement("span");
    span.setAttribute("class", "mdl-list__item-primary-content");


    span.appendChild(document.createTextNode(description.value));
    li.setAttribute("id", "todoItem-" + todos[todo - 1].id);
    li.setAttribute("class", "mdl-list__item");

    li.appendChild(span)
    ul.appendChild(li);

    document.querySelector('dialog').close();
    document.getElementById("descriptionInput").value = "";
    document.getElementById("bucketInputText").value = "";
};