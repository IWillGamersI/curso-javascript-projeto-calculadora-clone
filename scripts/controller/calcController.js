class CalcController{

    constructor(){

        this._displayCalcEl = document.querySelector('#display')
        this._dateEl = document.querySelector('#data')
        this._timeEl= document.querySelector('#hora')
        this._currentDate
        this.initialize()
    }

    initialize(){      
        let agora = new Date()
        this._dateEl.innerHTML = agora.toLocaleDateString('pt-br')
        this._timeEl.innerHTML = agora.toLocaleTimeString('pt-br')
        
        
    }

    get displayTime(){
        return  this._timeEl.innerHTML
    }

    get displayDate(){
        return  this._dateEl.innerHTML
    }

    set displayTime(value){
        return  this._timeEl.innerHTML = value
    }

    set displayDate(value){
        return  this._dateEl.innerHTML = value
    }

    get displayCalc(){

        return this._displayCalcEl.innerHTML

    }

    set displayCalc(value){
        this._displayCalcEl.innerHTML = value
        
        
    }

    get currentDate(){
        return this._currentDate = new Date
    }

    set currentDate(value){
        this._currentDate = value
    }

}