class CalcController{

    constructor(){

        //nosso ultimo operador
        this._lastOperator = ''

        //nosso ultimo numero
        this._lastNumber = ''

        //array da operação
        this._operation = []
        //definindo o local da aplicação
        this._locale = 'pt-br'
        //pegando o elemento diplay que é atela da calculadora
        this._displayCalcEl = document.querySelector('#display')
        //pegando o elemento da Data
        this._dateEl = document.querySelector('#data')
        //pegando o elemento da hora
        this._timeEl= document.querySelector('#hora')
        //Metodo data e hora
        this._currentDate
        //metodo de inicializar o sistema
        this.initialize()
        //metodo para os eventos dos botões
        this.initButtonsEvents()
    }

    //inicializa o sistema
    initialize(){      
        //pega o elemento data e hora
        this.setDisplayDateTime()
        //atualiza a data e hora a cada segundo
        setInterval(() => {
            this.setDisplayDateTime()
        },1000)

        this.setLastOperation()
        
    }

    //criando evendo mouse para percarrer um array
    addEventListenerAll(element, events, func){
        //defindo que a CHAVE para se criar um array é o ESPAÇO
        events.split(' ').forEach(ev => {
            element.addEventListener(ev,func,false)
        })

    }

    //limpa todo array
    clearAll(){

        this._operation = []
        this._lastNumber = ''
        this._lastOperator = ''

        this.setLastNumberToDisplay()
        
    }

    //limpa a ultima entrada
    clearEntry(){
        this._operation.pop()
        this.setLastNumberToDisplay()
    }

    //metodo pegando ultimo  numero array
    getLastOperation(){
       return this._operation[this._operation.length - 1]

    }
    //metodo pra substituir o ultimo index array, para conctenar um numero
    setLastOperation(value){
        return this._operation[this._operation.length - 1] = value
    }
    //metodo para verificar se o ultimo item adicionado no array é diferente de numero 
    isOperator(value){
        return (['+','-','*','/','%'].indexOf(value) > -1)
    }

    //responsavel por acionar no array e verifica se tem mais de 3 elementos
    pushOperation(value){
        this._operation.push(value)

        if(this._operation.length > 3){            
            this.calc()            
        }

    }

    //faz um eval da operação
    getResult(){

        return eval(this._operation.join(""))
    }

    calc(){

        let last = ''

        this._lastOperator = this.getLastItem()

        if(this._operation.length < 3){
            let firstItem = this._operation[0]
            this._operation = [firstItem,this._lastOperator,this._lastNumber]
        }

        if(this._operation.length > 3){
            last = this._operation.pop()
            this._lastNumber = this.getResult()

        }else if(this._operation.length == 3){            
            this._lastNumber = this.getLastItem(false)
        }
        
        let result = this.getResult()


        if(last == '%'){

            result/= 100

            this._operation = [result]

        }else{        

            this._operation = [result]

            if(last)this._operation.push(last)

        }

        
        //atualizar display
        this.setLastNumberToDisplay()

       

    }

    getLastItem(isOperator = true){

        let lastItem
        
        
        for(let i = this._operation.length-1; i >= 0;i--){

            
            if(this.isOperator(this._operation[i]) == isOperator){
                lastItem = this._operation[i]
                break
            }
            
           
        }

        if(!lastItem){
            lastItem = (isOperator) ? this._lastOperator : this._lastNumber
        }
        return lastItem
    }

    setLastNumberToDisplay(){

        let lastNumber = this.getLastItem(false)

        if(!lastNumber) lastNumber = 0

        this.displayCalc = lastNumber
    }


    //adicona valor
    addOperation(value){

        

        if(isNaN(this.getLastOperation())){

            if(this.isOperator(value)){
                //trocar o oprador - pegando o ultimo item do array e trocando
                this.setLastOperation(value) 

            }else{
                
                this.pushOperation(value)    
                //atualizar display
                this.setLastNumberToDisplay()            
               
            }
            
        }else{

            if(this.isOperator(value)){

                this.pushOperation(value)

            }else{

                let newValue = this.getLastOperation().toString() + value.toString() 
                this.setLastOperation(newValue)

                //atualizar display
                this.setLastNumberToDisplay()

            }
            
        }   
        
        
    }
    //informa erro
    setError(){
        this.displayCalc = 'Error'
    }

    //trantando o ponto da calculadora
    addDot(){
        let lastOperation = this.getLastOperation()

        if(typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return
        
        if(this.isOperator(lastOperation) || !lastOperation){
            this.pushOperation('0.')
        }else{
            this.setLastOperation(lastOperation.toString()+'.')
        }

        this.setLastNumberToDisplay()

        console.log(lastOperation)
    }

    //verificando qual botão foi apertado e aplicaa  condição
    execBtn(value){

        switch(value){

            case 'ac':
               this.clearAll()
                break;

            case 'ce':
                this.clearEntry()
                break;

            case 'soma':
                this.addOperation('+')
                break;

            case 'subtracao':
                this.addOperation('-')
                break;

            case 'multiplicacao':
                this.addOperation('*')
                break;

            case 'divisao':
                this.addOperation('/')
                break;

            case 'porcento':
                this.addOperation('%')
                break;
            
            case 'ponto':
                this.addDot()
                break;

            case 'igual':
                this.calc()
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value))
                break;
            
            default:
                this.setError()
                break;



        }
    }


    initButtonsEvents(){
        let buttons = document.querySelectorAll('#buttons > g, #parts > g')

        buttons.forEach((btn,index) =>{
            this.addEventListenerAll(btn,'click drag', e=>{
                let textBtn = btn.className.baseVal.replace('btn-','')
                this.execBtn(textBtn)
                
            })

            this.addEventListenerAll(btn, 'mouseover mousedown mouseup', e =>{
                btn.style.cursor = 'pointer'
            })
        })

        
    }

    
    //metodo de data e hora
    setDisplayDateTime(){

        this.displayDate = this.currentDate.toLocaleTimeString(this._locale)

        this.displayTime = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        })
       
    }

    //pegando a Hora
    get displayTime(){
        return  this._timeEl.innerHTML
    }
    //Aplicando a Hora
    set displayTime(value){
        return  this._timeEl.innerHTML = value
    }

    //Pegando a Data
    get displayDate(){
        return  this._dateEl.innerHTML
    }    
    //Aplicando a Data 
    set displayDate(value){
        return  this._dateEl.innerHTML = value
    }

    //Pegando o Display
    get displayCalc(){
        return this._displayCalcEl.innerHTML
    }
    //Aplicando no Display
    set displayCalc(value){
        this._displayCalcEl.innerHTML = value
    }

    //Pegando a Data e Hora
    get currentDate(){
        return this._currentDate = new Date
    }
    //Aplicando Data e Hora
    set currentDate(value){
        this._currentDate = value
    }

}