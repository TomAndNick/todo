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

var initialiseHTML = function () {

    todos.sort(function (a, b) {
        return a.position - b.position;
    });

    for (x in todos) {
        var ul = document.getElementById(todos[x].bucket);
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(todos[x].description));
        li.setAttribute("id", "todoItem-" + todos[x].id);
        ul.appendChild(li);
    }
}

var newTodoHandler = function () {
    var dialog = document.querySelector('dialog');
    var showModalButton = document.querySelector('.show-modal');
    if (!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    showModalButton.addEventListener('click', function () {
        dialog.showModal();
    });
    dialog.querySelector('.close').addEventListener('click', function () {
        dialog.close();
    });
}

var addNewButtonHandler = function () {
    console.log(todos);
    var description = document.getElementById("descriptionInput");
    var bucket = document.getElementById("bucketInput");

    console.log(description.value);
    console.log(bucket.value);

    var todo = newTodo(description.value, bucket.value, idCounter++);
    console.log(todos[todo-1]);
    var ul = document.getElementById(bucket.value);
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(description.value));
    li.setAttribute("id", "todoItem-" + todos[todo-1].id);
    ul.appendChild(li);
};