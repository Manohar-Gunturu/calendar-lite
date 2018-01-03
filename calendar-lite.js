class CalendarLite extends Polymer.GestureEventListeners(Polymer.Element){
	
	static get is() { return 'calendar-lite'; }
      
	  static get properties() {
	    return {
			date: {
			  type: Date,
			  value: new Date()
			},
			currentMonth: {
				type: Number
			  },
			 minDate: {
			  type: Date,
			  value: null
			},
			maxDate: {
			  type: Date,
			  value: null
			},
			disabledDays:{
			  type:Array,
			  value:[]	
			},
			currentYear: {
			  type: Number
			},
			mainColor:{
			  type: String,
			  value: null
			},
			multiSelect:{
			   type:Object,
			   value:null
			},
			days:{
			  type:Array
			},
			separator:{
			  type:Array,
			  value:[0,1,2,3,4,5]
			},
			disabledWeekDay:{
			  type:Array,
			  value:[]	
			}
	  }


	  }	  
	
	  static get observers() {
        return [
        '_populate(date)'
		]
	  }
	
	constructor() {
		super();
		this.is =  'calendar-lite';
		this.days_names = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
		this.months_names = ['Jan','Feb','Mar','April','May','June','July','Aug','Sep','Oct','Nov','Dec'];
		// temp variables used in logic to generate calendar
		this.current_page = '';
	  
	  this.multiple = [];
	  this.tmpDate = null;
	  this.cf = null;
	  this.tmpObject=null;  
	}
	
	//to get number of days in a month 
   monthDays(date){
		 return (new Date(date.getFullYear(), date.getMonth()+1, 0)).getDate();	
   }

   ready() {
      super.ready(); // for 2.0 class-based elements only

	  // generate 6 x 7 table so each cell is a date and each row is a week 
	  // it just works on the logic of how a wall calendar looks like.
	  this.generateTable();
      this._animationEvent = this._whichAnimationEnd();

	  // in multiple date selection - insert today date if it in not in the disabled days list	
	  if(!this.isDisabled(this.date.getDate())){
		this.multiple.push(this.date.getDate()+","+this.date.getMonth()+","+this.date.getFullYear());
	  }
	  
      this.currentYear = this.date.getFullYear();
      this.currentMonth = this.date.getMonth();  
	  
	  //update header color if set
	  if(this.mainColor != null){
         this.customStyle['--my-elem-primary'] = this.mainColor;
         this.updateStyles();
      }
	  
	  //push into years list
	  var tmpArray = [];
	  if(this.maxDate != null && this.minDate != null){
          this._generateYears((this.minDate).getFullYear(),(this.maxDate).getFullYear())   
	  } else{
		  this._generateYears(this.currentYear-101, this.currentYear+30 ,tmpArray)
	  }
     //discard tmpArray
     tmpArray = null;
  }
  
  _getUpdated(d,type){
    if(type == 'year'){
       return this.date.getFullYear();
    }else if(type == 'month'){
       return this.months_names[this.date.getMonth()];
    }
    else if(type == 'day'){
       return this.days_names[this.date.getDay()]
    }else if(type == 'date'){
       return this.date.getDate();
    }else{
      //some thing weird
    }
  }
  
  generateTable(){

      
	  //create tmpDate from starting of this month  
      this.tmpDate = new Date(this.currentYear,this.currentMonth,1);
	  
	  //tmpArray contains 6x7(42) items 
	  var tmpArray = [];
	  this.cf = 0;
	  //fill with empty cells	  
      for(var i=0;i<this.tmpDate.getDay();i++){
        tmpArray.push({text:"",isDisabled:false,i:this.cf++});
      }
	  
	  //fill days and check disable dates
      for(var i=1;i<=this.monthDays(this.tmpDate);i++){
        this.tmpDate.setDate(i);
        if(this.isDisabled(i)){
          tmpArray.push({text:i,isDisabled:true,i:this.cf++});
        }else{
          tmpArray.push({text:i,isDisabled:false,i:this.cf++});
        }
         
      }
	  //fill remaining empty cells
      this.cf = (tmpArray.length>35)?(42-(tmpArray.length)):(34-(tmpArray.length));
      for(var j=0;j<=this.cf;j++){
        tmpArray.push({text:""});
      }     
      this.days = tmpArray;
      tmpArray = null;
    }
    
	isDisabled(i){
			return ( (this.minDate != null && this.tmpDate<=this.minDate) || 
			(this.maxDate != null && this.tmpDate>=this.maxDate) || 
			this.disabledWeekDay.indexOf(this.days_names[(this.tmpDate).getDay()]) != -1 || 
			(this.disabledDays).indexOf(i) != -1 )
	}
	
	_getDayClass(s,d){
      
	  if(this.isDisabled(this.date.getDate())){
		  return "dateSticker";
	  }
	  
	  if(this.multiSelect != null){
         if(this.multiple.indexOf(s+","+this.currentMonth+","+this.currentYear) > -1){
             return "dateSticker  selected";
         }
      }
	  
      if(this.date.getDate() == s && this.date.getMonth() == this.currentMonth && this.date.getFullYear()== this.currentYear){
         return "dateSticker selected"; 
      }
	  return "dateSticker";
    }
    _setDate(e){
      var target = e.target;
      var f = e.model.day;    
      if(f.text != "" && !e.model.day.isDisabled){
        
        if(this.multiSelect != null){
        if(this.multiSelect.consequent){
          this.multiple = [];
          this.cf = f.i;
          this.multiple.push(f.text+","+this.currentMonth+","+this.currentYear)
          for(var j=1;this.multiple.length<(this.multiSelect.max);j++){
            this.tmpDate = new Date(this.currentYear,this.currentMonth,f.text+j);
            if((this.minDate != null && this.tmpDate<=this.minDate) || (this.maxDate != null && this.tmpDate>=this.maxDate) || this.disabledWeekDay.indexOf(this.days_names[(this.tmpDate).getDay()]) != -1 || (this.disabledDays).indexOf(this.tmpDate.getDate()) != -1){
            }else{
               this.multiple.push(this.tmpDate.getDate()+","+this.tmpDate.getMonth()+","+this.tmpDate.getFullYear()); 
            }
          }
        }else{        
           this.cf = this.multiple.indexOf(f.text+","+this.currentMonth+","+this.currentYear);
           if(this.cf < 0)
            {
              this.multiple.push(f.text+","+this.currentMonth+","+this.currentYear);
            }else{
              target.classList.remove('selected')
              this.multiple.splice(this.cf,1);
              this.triggerEvent('multiselect',this.multiple);
              return;
            } 
          if(this.multiple.length > this.multiSelect.max){
              this.multiple.shift();
           }             
        }
        this.triggerEvent('multiselect',this.multiple);        
       }
         this.date = new Date(this.currentYear,this.currentMonth,f.text);      
         this.set('date', this.date);
        
       }     
    }
   
    triggerEvent(e,data){
		var event = new CustomEvent( e, { detail: { dates: data } } );
	    this.dispatchEvent(event);   
    }
   
    _setYear(e){
      this.currentYear = e.model.item;
      this.generateTable();
      this.separator = [0,1,2,3,4,5];
      current_page = 'calendarContent';
      this.pagination();
    }
    _setMonth(e){
      this.currentMonth = this.months_names.indexOf(e.model.item); 
      this.generateTable();
      this.separator = [0,1,2,3,4,5];
      current_page = 'calendarContent';
      this.pagination();
    }
   
	_show(e){
	     current_page = e.target.attributes.type.value; 
		 this.pagination();
	}
	
    pagination(){
        var pages = Polymer.dom(this.root).querySelectorAll('.page');
		for(var i = 0;i<pages.length;i++){
		     pages[i].style.display = 'none';
		}       
        tmpObject =  this.$$('#'+current_page);
        tmpObject.style.display = 'block';
        tmpObject.classList.add('scale-up'); 
        this._once(this._animationEvent, ()=>{
           (tmpObject).classList.remove('scale-up')     
        }, tmpObject);  

        pages = null;
    }
	
    _generateYears(min,max,tmpArray){
	     for(var i=min;i<=max;i++){
		    tmpArray.push(i);
		  }
       this.years  = tmpArray; 				  
	}
	
	_populate(date){      
	    this.currentMonth = date.getMonth();
		this.currentYear = date.getFullYear();
		this.dispatchEvent(new CustomEvent('date-change', { detail : { date: this.date } } ));
	}
	
	dateFormat(date){
	    if(this.date){
			return (this.days_names[(this.date).getDay()])	 
		 }
	}
	 
    monthFormat(){
     return this.months_names[this.currentMonth]
    } 
    yearFormat(){
      return this.currentYear;
    }
	
	_swipeNextMonth(){
     this.$.mainContent.classList.add('slide-right') ; 
     this._once(this._animationEvent, ()=> {
       this.$.mainContent.classList.remove('slide-right')     
     },this.$.mainContent);  
      this.changeView(1);
	}
    
	changeView(x){	    
		 var tmp = new Date(this.currentYear,this.currentMonth,1);
		 tmp.setMonth(this.currentMonth+x);
		 this.currentMonth = tmp.getMonth();
		 this.currentYear = tmp.getFullYear();
		 this.dispatchEvent(new CustomEvent('month-change', { detail : { date: this.tmpDate } } ) );
		 this.generateTable();
		 this.separator = [0,1,2,3,4,5];
	 }
	
	_once(eventName, callback, node) {
        function onceCallback() {
          node.removeEventListener(eventName, onceCallback);
          callback();
        }
        node.addEventListener(eventName, onceCallback);
    }
	
	_swipePrevMonth(){

      this.$.mainContent.classList.add('slide-left') ; 
       this._once(this._animationEvent, ()=> {
       this.$.mainContent.classList.remove('slide-left')     
      }, this.$.mainContent);  
     this.changeView(-1);
 
	 }
	 
	 _getDays(row){
	   return ((this.days).slice(row*7,(row*7)+7))
	 }
    
	_whichAnimationEnd() {
        var animations = {
          'WebkitTransition' : 'webkitAnimationEnd',
          'MozTransition'    : 'animationend',
          'OTransition'      : 'oanimationend  oAnimationEnd ',
          'transition'       : 'animationend'
        };

        for (var t in animations) {
          if (this.style[t] !== undefined){
            return animations[t];
          }
        }
    }  
}

window.customElements.define(CalendarLite.is, CalendarLite);