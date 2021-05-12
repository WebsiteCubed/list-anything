const createForm = document.getElementById('create-form');
const listElement = document.getElementById('list');
let messageElement = document.createElement('div');


class Item {
    constructor(){
        this.items = [];
    }

    getAll(){
        if (localStorage.getItem('itemIndex') != null){
            this.items = JSON.parse(localStorage.getItem('itemIndex'));
            let formattedItems = this.items.join('');
            listElement.innerHTML = formattedItems;

            item.delete();
            return
        }
        listElement.innerText = 'There are no items to show.';

    }

    save(){
        createForm.addEventListener('submit', (e)=> {
            e.preventDefault();
            const input = document.getElementById('create-input');
            if (input.value.trim() !== ''){
                if (messageElement.innerText !== ''){
                    messageElement.innerText = '';
                }
                this.items.push('<div class="list-item">'+input.value.trim()+'<span class="delete-icon">✘</span></div>');
                localStorage.setItem('itemIndex', JSON.stringify(this.items));
               
                input.value = '';
                this.getAll()

                createForm.appendChild(messageElement);
                messageElement.innerText = 'List item created!';
                messageElement.style.color = 'green';
                messageElement.style.paddingTop = '5px';
                return
            }
            createForm.appendChild(messageElement);
            messageElement.innerText = 'Field cannot be empty.';
            messageElement.style.color = 'red';
            messageElement.style.paddingTop = '5px';
        });
    }

    delete(){
        const deleteIcons = document.querySelectorAll('.delete-icon');

        for(let i = 0; i < deleteIcons.length; i++){
            deleteIcons[i].addEventListener('click', (e)=>{
                e.preventDefault();
                
                const item = '<div class="list-item">'+e.target.parentNode.innerHTML+'</div>';
                const index = this.items.indexOf(item);

                if (index > -1) {
                    this.items.splice(index, 1);
                    localStorage.setItem('itemIndex', JSON.stringify(this.items));
                }
                this.getAll();
                createForm.appendChild(messageElement);
                messageElement.innerText = 'List item deleted successfully.';
                messageElement.style.color = 'green';
                messageElement.style.paddingTop = '5px';

                if (this.items.length == 0){
                    delete localStorage.itemIndex;
                } 
                this.getAll();
            });
        }
    }
}

let item = new Item();
item.getAll();
item.save();

