/* it retrieves the todos if any from localStorage 
if there is no todo history it returns nothing*/
window.addEventListener('load', () => {
	todos = JSON.parse(localStorage.getItem('todos')) || [];

	// the nameInput and newToDoForm are reference from the html file
	const nameInput = document.querySelector('#name');
	const newTodoForm = document.querySelector('#new-todo-form');
    
	/*retrieves the user's name from the local storage(browsers storage)
	if there is no name history it return nothing*/
	const username = localStorage.getItem('username') || '';
    
	//it sets the name gotten from the storage as user name
	nameInput.value = username;
    
	/*Adds an event listener to update localStorage when the username changes
	e: Represents the event object. Here the (e) is just a variable name it can be change
    e.target: Refers to the element that triggered the event.
    e.target.value: Retrieves the current value of the element that triggered the event, 
      assuming it is an input field.*/
	nameInput.addEventListener('change', (e) => {
		localStorage.setItem('username', e.target.value);
	})
    
	/* this function adds an event listener for the new data input in the todo form for submission*/
	newTodoForm.addEventListener('submit', e => {
		e.preventDefault();
   
		
		/* the done property sets to false by default because the task is not done when it is been written
           the data of the content: e.target.elements.content.value, category: e.target.elements.category.value 
		   are taken from fthe input fields (content and category)
		*/
		const todo = {
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			done: false,
			createdAt: new Date().getTime()
		}
        /* the data gotten from const todo are then added to the todo list*/
		todos.push(todo);
 
		// Update localStorage with the new todos list
		localStorage.setItem('todos', JSON.stringify(todos));

		// Reset the form to blank when the task is submitted
		e.target.reset();

		// the new update list is displyed on the browser
		DisplayTodos()
	})
     
	//callls the function displayToDo to do its thing
	DisplayTodos()
})

function DisplayTodos () {
	const todoList = document.querySelector('#todo-list');
	todoList.innerHTML = "";
  
	// the .forEach() iteratesthrough each todo in the todos array
	todos.forEach(todo => {
		const todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');

		/*Create DOM elements for the todo item  */  
		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');
 
		/* Set attributes and classes for various elements the bubble 
		has 2 options that is why there is an if else statement used */
		input.type = 'checkbox';
		input.checked = todo.done;
		span.classList.add('bubble');
		if (todo.category == 'Personal') {
			span.classList.add('Personal');
		} else {
			span.classList.add('Education');
		}
		/* adding CSS classes to the DOM elements  */
		content.classList.add('todo-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

		/*innerHTML property is a way to change the content of an 
		HTML element using JavaScript*/
		content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

		/*here the far right elements are added to become child elements of the left elements
		edit becomes a child of actions   */
		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);
		todoList.appendChild(todoItem);

		// Adds 'done' class if the todo is marked as done
		if (todo.done) {
			todoItem.classList.add('done');
		}
		/* Adds an event listener for when checkbox changes to update todo status  
		JSON.stringify converts the the todo into a JSON string and then the result is 
		stored in the local storage
		the local storage only stores data as strings*/
		input.addEventListener('change', (e) => {
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));

			// Add or remove 'done' class based on the todo status
			if (todo.done) {
				todoItem.classList.add('done');
			} else {
				todoItem.classList.remove('done');
			}

			//calls for the diplay 
			DisplayTodos();

		})

		/* adding an event listener for the edit button event happens when clicked on */

		edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');

			 // Makes the input field editable by removing the readonly attribute
			input.removeAttribute('readonly');

			/*t means that it is currently selected for user input, 
			and any keyboard input or interactions will be directed to that element
			all focus goes to the edit button*/
			input.focus();

			/* the blur event listner is used when a user interacts with an input element(edit) then moves 
			to another element(not edit) so in my case when I tap on edit then tap on maybe add the categories
			the edit will covert to become read only again*/
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);

				//updates the content with the new value
				todo.content = e.target.value;
				//save updated todo to the local storage
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos()

			})
		})

		/*adds event listener for the delete button*/
		deleteButton.addEventListener('click', (e) => {

			//Filters out the current todo from the todos array
			todos = todos.filter(t => t != todo);

			//Saves the updated todos array to localStorage
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
		})

	})
}


/* a property that allows JavaScript sites and apps to save key-value pairs in a 
web browser with no expiration date. This means the data stored persists even after the 
user closes the browser or restarts the computer. That is why I can refresh and the data is not lost
because it is stored on the internet.  
Benefits are:
1. Faster loading times 
2. Smoother user experience because of a more personalized experience that stores user 
preferences and settings locally, allowing users to access these settings quickly and easily.

Disadvantages are:
1. Data is lost when the user clears their browser data.
2. It isn't secure and can be easily accessed.*/

