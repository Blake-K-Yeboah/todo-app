// Import Mobx Decorators
import { decorate, observable, action } from 'mobx';

// Import Datatbase from config
import { db } from './config/fire';

// Import uuid to generate an id
import uuidv4 from 'uuid/v4';

// Mobx Store
class Store {

    // The logged in user's email
    userEmail = sessionStorage.getItem('user-email');

    // The logged in user's id
    userID = sessionStorage.getItem('user-id');

    // Amount of users
    userCount = null;

    getUserCount() {
        let ref = db.ref('userids/');

        ref.on("value", function (snapshot) {
            appStore.userCount = snapshot.numChildren();
        })
    }

    // The logged in user's todos
    todos = null;

    // All of users todos keys
    allTodoKeys = null;

    // Total Amount of Todos In Databse
    todosCount = null;

    // The logged in status
    isLoggedIn = sessionStorage.getItem('isLoggedIn');

    // Function to fetch the todos from database
    getTodos() {
        let todosRef = db.ref('todos');

        todosRef.on('value', function (snapshot) {

            let data = [];

            snapshot.forEach(function (childSnapshot) {
                data.push(childSnapshot.val());
            });

            appStore.todosCount = data.length;

            // Filter Out todos from different users
            let filteredTodos = data.filter(todo => todo.uid === appStore.userID);

            // Only show todos from active page
            appStore.todos = filteredTodos.slice(appStore.paginationPages[0], appStore.paginationPages[1]);

            let pageArr = [];

            for (let i = 0; i < Math.ceil(filteredTodos.length / 6); i++) {
                pageArr.push(i + 1);
            }

            appStore.pageArr = pageArr;

            appStore.allTodoKeys = filteredTodos.map(todo => todo.key);
        });
    }

    // Active pagination Button
    activeBtn = sessionStorage.getItem('active-btn') ? parseInt(sessionStorage.getItem('active-btn')) : 1;

    // Amount of Paginations pages
    paginationPages = sessionStorage.getItem('page-start') ? [parseInt(sessionStorage.getItem('page-start')), parseInt(sessionStorage.getItem('page-end'))] : [0, 6];

    // An Array of pagination pages
    pageArr = null;

    // Action to change active pagination page
    changeActivePages(a) {

        // Set New Active Btn
        sessionStorage.setItem('active-btn', a)

        // Change Pagination Pages
        sessionStorage.setItem('page-start', (a - 1) * 6);
        sessionStorage.setItem('page-end', a * 6);

        window.location.reload();

        appStore.updateTodos();
    }

    // Action to update the todos when new pagination page is selected
    updateTodos() {

        appStore.todos = null;

        let todosRef = db.ref('todos');

        todosRef.on('value', function (snapshot) {
            let data = [];

            snapshot.forEach(function (childSnapshot) {
                data.push(childSnapshot.val());
            });

            appStore.todos = data
                .filter(todo => todo.uid === appStore.userID) // Filter Out todos from different users
                .slice(appStore.paginationPages[0], appStore.paginationPages[1]); // Only show todos from active page
        });
    }

    // Todo Modal Status (Whether its show or not)
    todoModalStatus = false;

    // Confirm Modal Status (Whether its show or not)
    confirmModalStatus = false;

    // Action to toggle todo modal status
    toggleTodoModalStatus() {
        appStore.todoModalStatus = !appStore.todoModalStatus;
    }

    // Action to toggle confirm modal status
    toggleConfirmModalStatus() {
        appStore.confirmModalStatus = !appStore.confirmModalStatus;
    }

    addTodo(title) {
        let todosRef = db.ref('todos/');

        let key = todosRef.push().key;

        let ref = db.ref(`todos/${key}`);

        ref.set({
            completed: false,
            id: uuidv4(),
            key,
            title,
            uid: appStore.userID
        }).then(() => {

            // Todo Added Successfully
            appStore.toggleTodoModalStatus();

        }).catch(err => {
            alert('There was an error adding your todo');
        })
    }

    // Action to clear all todos of current user
    clearAllTodos() {
        appStore.allTodoKeys.forEach(key => {
            db.ref(`todos/${key}`).remove();
        });

        appStore.toggleConfirmModalStatus();
    }

    delTodo(id) {
        let todo = appStore.todos.filter(todo => todo.id === id)[0];

        let ref = db.ref(`todos/${todo.key}`);

        ref.remove();
    }

    toggleCompleted(id, checked) {
        let todo = appStore.todos.filter(todo => todo.id === id)[0];

        let ref = db.ref(`todos/${todo.key}`);

        ref.set({
            completed: checked,
            id,
            key: todo.key,
            title: todo.title,
            uid: todo.uid
        });
    }
}

// Decorate Store
Store = decorate(Store, {
    userEmail: observable,
    userID: observable,
    userCount: observable,
    getUserCount: action,
    todos: observable,
    allTodoKeys: observable,
    todosCount: observable,
    isLoggedIn: observable,
    getTodos: action,
    activeBtn: observable,
    paginationPages: observable,
    pageArr: observable,
    changeActivePages: action,
    updateTodos: action,
    todoModalStatus: observable,
    confirmModalStatus: observable,
    toggleTodoModalStatus: action,
    toggleConfirmModalStatus: action,
    addTodo: action,
    clearAllTodos: action,
    delTodo: action,
    toggleCompleted: action
});

// Create a store
const appStore = new Store();

// Export store
export default appStore;