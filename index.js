/*location which will present input values*/var mainScreen= document.querySelector (".screen");
/*location to save first value*/var firstValueScreen= document.querySelector (".rememberFirstNumber");
/* location to save operator type*/var operatorValueScreen= document.querySelector (".rememberOperator");
/* location to save answer*/var SecondValueScreen= document.querySelector (".rememberSecondNumber");

//event listener for keyboard events. this function is used to save the keyboard keys that were pressed, assign a value and operator type to them (numbers will be assigned their own numeric value and the class number; keys that represent math operators will be assigned a value that will be used to recognize them later and the class operator) The value and class are then  used as parameters for a function which controls the variables declared abo 
document.addEventListener("keydown" , function(event){ 
    var buttonValue;
    var buttonClass; 
    var isButtonValueAString=isNaN(event.key);
/* if the key pressed is a specific character which doesnt qualify for other generalizations, it will be specifically assigned a class and operator */

//for example, unlike other non-number keys that are pressed and assigned a class of operator, "*" does not correspond to its key in the calculator (i.e., "X") and  therefore, if it is the key that is pressed, it is specifically assigned the value X such that the computer will interpret it as if X was pressed. 
    if  (event.key==="*") {
        buttonClass="operator";
        buttonValue="X";
        } 
// "C" is unique since if it is the key that is pressed,it will be asigned a class of its own, (i.e., restart), such that its operation will be much different than other buttons that add characters to the calculator. its value does correspond to the calculator values so its assigned value is itself
        else if (event.key==="C"){
        buttonClass="restart";
        buttonValue=event.key;
        }
// Escape is just another key  that is supposed to do the same function as C so if it is the key that is pressed, it will be assigned the same class as C but since its value (i.e., the string "Escape") does not correspond to C, it is assined the same value (i.e., "C")
        else if (event.key==="Escape") {
        buttonClass="restart";
        buttonValue="C";
        }
// Backspace is a key that needs to be treated like an operator but it does not correspond to any keys in the calculator so if it is the key that is pressed,it is assined a special value but the class operator       
        else if(event.key==="Backspace") {
        buttonClass="operator";
        buttonValue="<";
        } 
// "=" is unique since if it is the key that is pressed,it will be asigned a class of its own (i.e., equal) such that its operation will be much different than other buttons that add characters to the calculator. its value does correspond to the calculator values so its assigned value is itself      
        else if (event.key==="=") {
        buttonClass="equal";
        buttonValue=event.key;
        } 
// Enter is just another key  that is supposed to do the same function as "=" so if it is the key that is pressed, it will be assigned the same class (i.e., equal) but since its value ("Enter") does not correspond to =, it is instead assined the same value (i.e., "=")
        else if (event.key==="Enter") {
        buttonClass="equal";
        buttonValue=event.key;
        } 
// if the button that is pressed is not a special case and it contains a string(!), it will be assigned the class operator and its own vale (e.g., if "/" is pressed its value is "/") 
        else if (isButtonValueAString===true) {
        buttonClass="operator";
        buttonValue=event.key;
        }
// if however, the button that is pressed is neither a special case nor does it contain a string, it has to be a number and it will therefore be assigned the class "number" and its own value 
        else {
        buttonClass="number";
        buttonValue=Number(event.key);
    }
// if and only if, the button values (i.e., the values that were deterimed before) correspond to the following values, the function showAlert2 will run with the buttons class and value as parameters
      if (buttonValue===1 || buttonValue===2 || buttonValue===3 || buttonValue===4 || buttonValue===5 || buttonValue===6 || buttonValue===7 || buttonValue===8 || buttonValue===9 || buttonValue===0 || buttonValue==="X" || event.key==="*" || event.key==="Backspace" || event.key==="^" || buttonValue==="/" || buttonValue==="%" || buttonValue==="C" || buttonValue==="." || buttonValue==="=" || buttonValue==="+" || buttonValue==="-" || buttonValue==="Escape" || buttonValue==="Enter" ) {
        showAlert2(buttonClass, buttonValue)
    }
    })


// this function controls what happens to the calculator visible and invisible values by mouse clicks on buttons only. this function is called via the HTML code with the button object itself as a parameter (called element)
function showAlert(element){


//if the class of the HTML button that was pressed via the onclick attribute is restart, the function will set all the fields to being empty. this serves as a reset
    if (element.className==="restart") {
        mainScreen.textContent=""
        firstValueScreen.textContent=""
        operatorValueScreen.textContent=""
        SecondValueScreen.textContent=""
    }

// if the class of the button pressed is not "restart" the following list of conditionals is applied instead of the above "if statement" 
    else {

// if a button with a class "number" was pressed while nothing else is on the screen, the calculator will only display the value of that number  
        if (element.className==="number" && mainScreen.textContent.length===0) {
            mainScreen.textContent=element.innerHTML
        } 

// similar to the above conditional, if a button with a class "number" was pressed but the calculator screen already contains some value that is not numeric,, the calculator will only display the value of that number. this ensures that the numbers pressed after an operator will not be appended near that operator
        else if (element.className==="number" && isNaN (mainScreen.textContent)===true){
            mainScreen.textContent=element.innerHTML
        } 

// if a button with a class number was pressed but the calculator has the value of the previous answer saved on the secondValuescreen, the value of the saved operator and the answer will be reset. In addition, the calculator screen will display only that number. this ensures that if a calculation was already made, and a new number is being typed, the calculator will behave as if a completely new operation is being done and everything will be reset. 
        else if (element.className==="number" && SecondValueScreen.textContent.length!==0){
            operatorValueScreen.textContent=""
            SecondValueScreen.textContent=""
            mainScreen.textContent=element.innerHTML
        } 

//if a button with a class number was pressed but the calculator screen is not empty, the value of the new number will be appended. this allows to write multi-number values. it is important that this conditional comes after the previous 3 because the calculator needs to make sure that the calculator screen display is not empty or needs to be empty reset before it appends numbers to the value already on the screen
        else if (element.className==="number" && mainScreen.textContent.length!==0) {
            mainScreen.textContent=mainScreen.textContent+ element.innerHTML
        } 
// if a button with a class "operator" is pressed and the main screen contains a value that is numeric, it first saves the value on the screen into "firstValueScreen" which represents the HTML div :"rememberFirstNumber" then changes the screen content to its own value, and then saves that value into "operatorValueScreen" which represents the HTML div :"rememberOperator". this allows to save the value of the number before the operator, to  display on the screen what operator was pressed, and then to save that operator. finally, the secondValueScreen is set to empty because 2 conditionals ago we said that if any values are found in this box the operatorValue screen will be reset. Therefore, if this the secondValue screen was not emptied in this case, and a person would start typing a number, the operator wouldnt be saved.
        else if (element.className==="operator" && isNaN (mainScreen.textContent)===false) {
            firstValueScreen.textContent= mainScreen.textContent

            mainScreen.textContent= element.innerHTML

            operatorValueScreen.textContent=element.innerHTML
            SecondValueScreen.textContent= ""
        } 
        

// if a button with class operator is pressed and the conditional above is not met, both the calclator screen and the operatorValueScreen (which is a variable that represents the HTML divrememberOperator) will only contain the operator value. this way we both show what operator is used and save it 
        else if (element.className==="operator") {
            mainScreen.textContent=element.innerHTML;

            operatorValueScreen.textContent= element.innerHTML

            SecondValueScreen.textContent= ""

        }


// finally, if a button with class "equal" was pressed, the value on the screen just before will be saved in SecondValueScreen (which represents the HTML element rememberSecondNumber), and be assigned to var num2. anything previously saved into the firstValueScreen will be saved as var num1 and anything previously saved as an operator will now be saved as operator. a function solution is called with num1, num2, and operator as parameters, uses these values to calculate a new number and then returns this number to be saved in var solution. the contents of the main screen are then set to be the solution value which allows us to see the answer. moreover, the solution is also saved in the first value such that if an operator is pressed while the solution is on the screen, the solution will be saved as the number that the operation will be done on or num1.
        else if (element.className==="equal") {
            SecondValueScreen.textContent=mainScreen.textContent

            var num1= Number(firstValueScreen.textContent);
            var num2= Number(SecondValueScreen.textContent);
            var operator= operatorValueScreen.textContent;

            var solution= calculator (num1, num2, operator)

            mainScreen.textContent=solution

            firstValueScreen.textContent=solution

              
        }
    }
}

// this function controls what happens to the calculator visible and invisible values by keyboard presses only. this function is called via an event listener with the which specifies the keyboard button's class name and value as parameters for this function
function showAlert2(elementclassName, elementinnerHTML){
    
//if the class of the keyboard button is restart, the function will set all the fields to being empty. this serves as a reset
    if (elementclassName==="restart") {
        mainScreen.textContent=""
        firstValueScreen.textContent=""
        operatorValueScreen.textContent=""
        SecondValueScreen.textContent=""
    } 
    
// if the button pressed is the delete button, the last value of the number on the screen will be deleted
    else if ( elementinnerHTML==="<") {mainScreen.textContent=mainScreen.textContent.slice(0,-1)} 
    
// if the button pressed is not restart or delete, the following list of conditionals is applied instead of the above "if statements" 
    else {

// if a button with a class "number" was pressed while nothing else is on the screen, the calculator will only display the value of that number 
        if (elementclassName==="number" && mainScreen.textContent.length===0) {
            mainScreen.textContent=elementinnerHTML
        } 
        
// similar to the above conditional, if a button with a class "number" was pressed the calculator will only display the value of that number. However this contitional only runs if the calculator screen contains some value that is not numeric. This ensures that the numbers pressed after an operator will not be appended after that operator
        else if (elementclassName==="number" && isNaN (mainScreen.textContent)===true){
            mainScreen.textContent=elementinnerHTML
        } 
        
// if a button with a class number was pressed but the calculator has the value of the previous answer saved on the secondValuescreen, the value of the saved operator and the answer will be reset. In addition, the calculator screen will display only that number. this ensures that if a calculation was already made, and a new number is being typed, the calculator will behave as if a completely new operation is being done and everything will be reset.
        else if (elementclassName==="number" && SecondValueScreen.textContent.length!==0){
            operatorValueScreen.textContent=""
            SecondValueScreen.textContent=""
            mainScreen.textContent=elementinnerHTML
        } 
        
//if a button with a class number was pressed but the calculator screen is not empty, the value of the new number will be appended. this allows to write multi-number values. it is important that this conditional comes after the previous 3 because the calculator needs to make sure that the calculator screen display is not empty or needs to be empty reset before it appends numbers to the value already on the screen
        else if (elementclassName==="number" && mainScreen.textContent.length!==0) {
            mainScreen.textContent=mainScreen.textContent+ elementinnerHTML
        } 
        
// if a button with a class "operator" is pressed and the main screen contains a value that is numeric, it first saves the value on the screen into "firstValueScreen" which represents the HTML div :"rememberFirstNumber" then changes the screen content to its own value, and then saves that value into "operatorValueScreen" which represents the HTML div :"rememberOperator". this allows to save the value of the number before the operator, to  display on the screen what operator was pressed, and then to save that operator. finally, the secondValueScreen is set to empty because 2 conditionals ago we said that if any values are found in this box the operatorValue screen will be reset. Therefore, if this the secondValue screen was not emptied in this case, and a person would start typing a number, the operator wouldnt be saved.
        else if (elementclassName==="operator" && isNaN (mainScreen.textContent)===false) {
            firstValueScreen.textContent= mainScreen.textContent

            mainScreen.textContent= elementinnerHTML

            operatorValueScreen.textContent=elementinnerHTML
            SecondValueScreen.textContent= ""
        } 
        
// if a button with class operator is pressed and the conditional above is not met, both the calclator screen and the operatorValueScreen (which is a variable that represents the HTML divrememberOperator) will only contain the operator value. this way we both show what operator is used and save it 
        else if (elementclassName==="operator") {
            mainScreen.textContent=elementinnerHTML;

            operatorValueScreen.textContent= elementinnerHTML
            SecondValueScreen.textContent= ""

        } 
        
// finally, if a button with class "equal" was pressed, the value on the screen just before will be saved in SecondValueScreen (which represents the HTML element rememberSecondNumber), and be assigned to var num2. anything previously saved into the firstValueScreen will be saved as var num1 and anything previously saved as an operator will now be saved as operator. a function solution is called with num1, num2, and operator as parameters, uses these values to calculate a new number and then returns this number to be saved in var solution. the contents of the main screen are then set to be the solution value which allows us to see the answer. moreover, the solution is also saved in the first value such that if an operator is pressed while the solution is on the screen, the solution will be saved as the number that the operation will be done on or num1.  
        else if (elementclassName==="equal") {
            SecondValueScreen.textContent=mainScreen.textContent

            var num1= Number(firstValueScreen.textContent);
            var num2= Number(SecondValueScreen.textContent);
            var operator= operatorValueScreen.textContent;

            var solution= calculator (num1, num2, operator)

            mainScreen.textContent=solution

            firstValueScreen.textContent=solution;

            
        }
    }

}

// this function is called within th other functions. it essentially takes 2 numbers an a string as parameters. the string is the key used in a switch operation such that different strings represent different operators which lead to cases with different calculations. the return value depends on the case that was chosen which depends on the operator input and it gives a value after conduction a calculation
function calculator (num1, num2, operator) {
    switch (operator) {
        case "/" :
            return num1/num2;
        case "X" :
            return num1*num2;
        case "+" :
            
            return num1+num2;
        case "-" :
            
            return num1-num2;
        case "%" :
            
            return ((num1/num2)*100);
        case "^" :
            
            return (num1**num2);
    
        default:
        
    }
}