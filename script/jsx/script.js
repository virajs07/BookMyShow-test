(function () {
		
	/**
	 * This is the main element where react's code is plugged in
	 */
	var $el = document.getElementById('main-content');

	/**
	 * This is the predefined array which is matched with user input to check for duplicate and unique numbers
	 */
	var existingArray = [1,2,3,4,5,6,7];
	
	/**
	 * This is the style for input tag where using which user gives an input
	 */
	var inputStyle = {
		width : '600px',
		height : '40px',
		lineHeight : '40px',
		fontSize : '32px',
		margin : '90px auto 0'
	}
		
	var diffArrayElements, commonArrayElements, errorMessage = "";;
	
	/**
	 * This method is used to sort the given numbers numerically.
	 * It is to be passed as a callback to the javascript's sort method which sorts alphabetically 
	 */
	function customSort(a,b){
		return a-b;
	}
	
	/**
	 * This method will find out the common elements in two arrays
	 * @param {Array} array
	 * @return {Array} elements which are common to the two arrays
	 * 
	 * Example:
	 * [1,2,3,4,5].intersection([2,7,3,10]) ---> [2,3]
	 * [100,7,10,30,5].intersection([20,7,30,100,1000]) ---> [100,7,30]
	 */
	Array.prototype.intersection = function(array) {
		var tempArray = [];

		tempArray = this.filter(function(n) {
		    return array.indexOf(n) != -1;
		});

		return tempArray;
	};
	
	/**
	 * This method will find the difference of the two arrays.
	 * @param {Array} array
	 * @return {Array} elements which are unique in both arrays. So it will not include the common elements
	 * Example:
	 * [1,2,3,4,5].difference([2,7,3,10]) ---> [1, 4, 5]
	 * [100,7,10,30,5].difference([20,7,30,100,1000]) ---> [10,5]
	 */
	Array.prototype.difference = function(array) {
		var tempArray = [];

		tempArray = this.filter(function(n) {
		    return array.indexOf(n) == -1;
		});

		return tempArray;
	};
	/**
	 * This is the method which processes the user input and returns a sorted array of numbers which the user has entered 
	 *  @return {Array} sorted user input array
	 * 
	 * Example:
	 * "6000,7000,6998-7005".getArray() ---> [6000,6998,6999,7000,7001,7002,7003,7004,7005]
	 * "6000,7000,8000".getArray() ---> [6000,7000,8000]
	 */
	String.prototype.getArray = function() {
		var tempArray = this.split(',')
		var finalArray = [];
		var number;
		var startIndex, endIndex;
		var tempArrayforRange;

		tempArray.forEach( function (val, key) {
			if (val.indexOf('-') != -1) {
				tempArrayforRange = val.split('-').sort(customSort);
				
				startIndex = parseInt(tempArrayforRange[0]);
				endIndex   = parseInt(tempArrayforRange[1]);

				for (var i = startIndex; i <= endIndex; i++) {
					if ((! isNaN(number = parseInt(i))) && finalArray.indexOf(number) === -1) {
						finalArray.push(number);
					}
				};
			}
			else if ((! isNaN(number = parseInt(val))) && finalArray.indexOf(number) === -1) {
				finalArray.push(number);
			}
			number = undefined;
		});
		return finalArray.sort(customSort);
	};
	/**
	* This is the React component for creating notifications.
	*/
	var NotificationItem = React.createClass({
		getInitialState:function(){
			return{
				differentElements:"",
				sameElements:"",
				diffStyle:{display:"none"},
				sameStyle:{display:"none"},
				errorStyle:{display:"none"}				
			}
		},
		showNotification:function(){
			this.state.differentElements  ="";
			this.state.sameElements ="";
			
			if(this.props.diff && this.props.diff.length>0){
				this.state.differentElements = this.state.differentElements + this.props.diff; 		
				this.state.diffStyle.display = "block";
			}
			else{
				this.state.diffStyle.display ="none";
			}
			if(this.props.common && this.props.common.length>0){
				this.state.sameElements = this.state.sameElements +this.props.common;
				this.state.sameStyle.display = "block";
			}
			else{
				this.state.sameStyle.display = "none";
			}
			if(this.props.error!=""){
				this.state.errorStyle.display = "block";
			}
			else{
				this.state.errorStyle.display = "none";
			}
		},
		render : function () {
			this.showNotification();
			return (
				<div>
					<div className="alert-box error" style={this.state.sameStyle}><span>Duplicate Elements: </span>{this.state.sameElements}</div>
					<div className="alert-box success" style={this.state.diffStyle}><span>Unique Elements: </span>{this.state.differentElements}</div>
					<div className="alert-box error" style={this.state.errorStyle}><span>Error: </span>{this.props.error}</div>
				</div>
			);
		}
	});

	/**
	* This is the React component for creating the input field
	*/
	var InputField = React.createClass({
	/**
	* This is the process function which is executed on every keypress but only if enter is pressed then the processing will take place
	* @param{Object} e has the key object which triggered the event
	*/
		process : function(e) {
			if (e.keyCode === 13) { 
				errorMessage = "";
				commonArrayElements = [],
				diffArrayElements= []
				var input = e.target.value;
				var inputArray = input.getArray();

				if (inputArray.length === 0) { 
					errorMessage='Please type a valid input';
					React.render(<Application error={errorMessage}/>,$el);
					return this;
			 };

				commonArrayElements = existingArray.intersection(inputArray).join(',')
				diffArrayElements = inputArray.difference(existingArray).join(',')
				
				React.render(
					<Application  diff={diffArrayElements} common={commonArrayElements} error={errorMessage}/>,
					$el
				);
				
			};
			return this;
		},

		render : function () {
			return (
					<input type="text" id="inputRange" style={inputStyle} placeholder="1,2,6-8..." onKeyDown={this.process} />
			);
		}
	});

	/**
	 * This is the application component which has notification item and input field
	 */
	var Application = React.createClass({
		render : function () {
			return (
				<div id="application">
					<NotificationItem diff={diffArrayElements} common={commonArrayElements} error={errorMessage}/>
					<InputField />
				</div>
			);
		}
	});

	/**
	 * This will render the application component
	 */
	React.render(
		<Application  diff={diffArrayElements} common={commonArrayElements} error={errorMessage}/>,
		$el
	);

})();
