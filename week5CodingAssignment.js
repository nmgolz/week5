// creating a class to hold something in this case a new piece of gear for some use.
class Gear {
    constructor(name, placement, use) {
        this.name = name;
        this.placement = placement;
        this.use = use;
    
    }
    // this describes the piece of gear created in an instance
    describe(){
        return `${this.name} is ${this.placement} for ${this.use}.`;
    }
}


// create a second class that relates to the first class in this case a new packing list.
class PackingList {
    constructor(name){
        this.name = name;
        this.gearList = [];
    }
    // this is adding and instance of gear to the new packing list from the Gear class
    addGear(gear) {
        if (gear instanceof Gear){
            this.gearList.push(gear);
        } else {
            throw new Error(`You can only add and instance of Gear. Argument is not gear: ${gear}`);
        }
    }
    // this describes how many items of gear are in the list. 
    describe() {
        return `${this.name} has ${this.gearList.length} items of gear.`;
    }
}


// create a menu function or program that is interactable and has one or two variables.
// this is the menu function that holds the code that is interactable to create packing lists and add or remove gear
//  from said list
class Menu {
    constructor(){
        this.packingLists = [];
        this.selectedList = null;
    }
    // this is the start function that loops through a menu as long as the selection is not 0, 0 will exit the menu
    start(){
        let selection = this.showMainMenuOptions();

        while (selection != 0){
            switch(selection){
                case '1' :
                    this.viewList();
                    break;
                case '2' :
                    this.createList();
                    break;
                case '3' :
                    this.viewAllLists();
                    break;
                default :
                    selection = 0; // this makes it so if anything other than 1, 2, 3, or 4 are selected it will exit the menu
            }
            selection = this.showMainMenuOptions();
        }
        // this alerts the use that they have left the menu after selecting 0
        alert('Leaving Menu. Goodbye!')
    }

    showMainMenuOptions(){
        return prompt(`
            0) Exit
            1) View List
            2) Create New List
            3) View All Lists
        `); // this is the function that first starts when the menu starts showing the options that the user can select
    }

    showListMenuOptions(listDetails){// after selecting a list this allows you to interact with said list
        return prompt(`
            0: Exit
            1: Add Gear to List
            2: Remove Gear From List
            _____________________________
            ${listDetails} 
        `);// ^ shows what is in the list we are interacting with
    }

    showListSelectionOptions(){
        let listString = '';
        for (let i =0; i < this.packingLists.length; i++){
            listString += i +': ' + this.packingLists[i].name + '\n'; // this adds all the lists into another list and numbers
        }                                                              // them by the index into the listSting variable
        return listString;
    }

    viewAllLists(){ // this allows the user to view all of the previously created lists 
        let listString = '';
        for (let i =0; i < this.packingLists.length; i++){
            listString += i +': ' + this.packingLists[i].name + '\n'; // this adds all the lists into another list and numbers
        }                                                              // them by the index into the listSting variable
        alert(listString); // this shows the new listSting variable to the user.
    }

    createList(){ // this method allows the user to create a new Packing list
        let name = prompt('Create New Packing List:'); // allows the user to input a custom name for the packing list
        this.packingLists.push(new PackingList(name));// pushes the new name to the packingLists array using the PackingList class
    }

    viewList(){// i cant seem to get the list of packing lists to show up on the selection screen 
        let id = prompt('Select the id of the desired list:' + '\n' + this.showListSelectionOptions());
        if (id > -1 && id < this.packingLists.length){ // this validates the input of the user and helps prevent crashing or errors.
            this.selectedList = this.packingLists[id]; // changes selectedList from null to the input the user chose.
            let identifier = 'List: ' + this.selectedList.name + '\n';

            for (let i = 0; i < this.selectedList.gearList.length; i++){ // loops through the selected list and prints what is in it
                identifier += i + ': ' + this.selectedList.gearList[i].name + ', ' + this.selectedList.gearList[i].placement 
                  + ', ' + this.selectedList.gearList[i].use + '\n'; 
            } // prints the gear in the the list and show where and how it is used

            let selection = this.showListMenuOptions(identifier);
            switch(selection){
                case '1' :
                    this.addGear();
                    break;
                case '2':
                    this.removeGear();
            }
        }
    }

    addGear(){ // adds gear to the selected list.
        let name = prompt('Enter Gear to add to the list -');
        let placement = prompt('Where does this gear belong ie:(truck, backpack, worn, etc...)');
        let use = prompt('what is this gear used for ie:(backcountry, hiking, hunting, etc...)');
        this.selectedList.gearList.push(new Gear(name, placement, use));
    }

    removeGear(){
        let id = prompt('Select the id of the gear to remove from the list:');
        if (id > -1 && id < this.selectedList.gearList.length){
            this.selectedList.gearList.splice(id, 1);
        }

    }
}

let menu = new Menu();
menu.start();

