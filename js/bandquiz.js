			
			//a folder where the results images live
			var imageFolder = "images/";
			
			//the file extensions used for the images
			//if you are sharing on facebook, pngs are recommended because facebook will resize the images
			var fileExt = ".png";
			
			//All member names will have spaces and periods removed from their names and used as the name of the results image
			//For example: Chelsey becomes /images/quizresults/Chelsey.jpg and Mr. King becomes /images/quizresults/MrKing.jpg
			
			
			//share on facebook
			
			//set this to true if you would like to activate the share on facebook link after the quiz is done
			var shareOnFB = true;
			
			var facebookAPPID = "XXXXXXX";
			
			//the domain of the site you are sharing, required for the image url
			//this must be registered with your facebook app if you have enabled sharing
			var shareDomain = "http://www.mybandpage.com/";
			
			//this is the url of the site you would like to share on FB, probably the page this quiz in on, but could be something else. Uses the domain from above
			var shareURL = "quiz";
			
			//the title of the share
			var shareTitle = "Which member of The Band are you?";
			
			//the message of the share will say "I got Chelsey!", if you would like a message below that, use this parameter, or leave it blank
			var addlMsg = "Find out which member of The Maneuver you are!";
			
			
			//Create an object that contains all of the members of the band each having a score of 0
			var members = {
				"Chelsey" : 0,
				"Mr. King" : 0,
				"Tino" : 0,
				"Ryan" : 0,
				"Derrick" : 0};
			
			
			//Create an array of all the questions, with answers for each member. The array keys are the questions as well as the band member names for easy formatting of questions
			var questions = {
				"What is your favorite movie?" : {
					"Chelsey" : "Kill Bill",
					"Mr. King" : "This is Spinal Tap",
					"Tino" : "Pulp Fiction",
					"Ryan" : "Return of the Jedi",
					"Derrick" : "Gangs of New York"
					},
				"Where do you go to buy funky threads?" : {
					"Chelsey" : "TopShop",
					"Mr. King" : "H & M ",
					"Tino" : "Back Alley Dumpsters",
					"Ryan" : "Wal-Mart",
					"Derrick" : "Winners"
					},
				"What is your go to snack before getting funky?" : {
					"Chelsey" : "Rice Crispy Square dunked in Hot Chocolate",
					"Mr. King" : "Bags and Bags of Candy",
					"Tino" : "Beer on an Empty Stomach",
					"Ryan" : "Rock Star Energy Drinks",
					"Derrick" : "Pizza by the Slice"
					},
				"What is the best booze for getting funky?" : {
					"Chelsey" : "Cold Craft Beer",
					"Mr. King" : "Fireball",
					"Tino" : "Jager Bombs",
					"Ryan" : "Labatt Wildcat 8 pack",
					"Derrick" : "Whiskey"
					},
				"What is your signature move once you hit the dancefloor?" : {
					"Chelsey" : "The Running Man",
					"Mr. King" : "The Jimmy Jams",
					"Tino" : "The Electric Slide",
					"Ryan" : "The Lazy Grandma",
					"Derrick" : "The Sprinkler"
					},
				"What is the best number of strings?" : {
					"Chelsey" : "0",
					"Mr. King" : "8",
					"Tino" : "Drums",
					"Ryan" : "5",
					"Derrick" : "6"
					}	,
				"How do you like to relax after getting funky?" : {
					"Chelsey" : "Get into PJs, fall asleep on floor",
					"Mr. King" : "Get in a hot tub with 3 sexy ladies",
					"Tino" : "Go skinny dipping",
					"Ryan" : "Ride an air mattress down a flight of stairs",
					"Derrick" : "Pass out and snore loudly"
					}				
				}
			
			//Nothing below here needs to be edited
			
			// an array for holding the values selected by the user
			var selectedValues = new Array();
			
			questionCount = 0;
			jQuery(document).ready(function(){
				questionsDiv = jQuery("#questions");
				
				//loop though the questions and add each one to the page
				for(question in questions){
					questionCount++;
					//create a div for each of the questions
					questionDiv = jQuery('<div/>', {
						id: 'question'+questionCount,
						class: 'question'
					});
					//add a header for each 
					questionDiv.append("<h2>"+question+"</h2>");
					
					//create a ul for the answers
					answerUL = jQuery('<ul/>');
					
					//loop through the answers and add each one to the 
					for(answer in questions[question]){
						answerUL.append("<li><span onclick='updateVote("+questionCount+",\""+answer+"\",this)'>"+questions[question][answer]+"</span>");
					}
					//randomizes the answers on the page
					answerUL.randomize("li");
					
					//adds the answers ul to the question div
					questionDiv.append(answerUL);
					
					//add the question div to the quiz container div
					questionsDiv.append(questionDiv);
				}
				
			});	
		
			function updateVote(selectedQuestion,answer,sender){
				//remove the selected class from all the answers for that question
				jQuery("#question"+selectedQuestion+" li span").removeClass("selected");
				
				//add the selected class to the answer that was chosen
				jQuery(sender).addClass("selected");
				
				//add the selected answer to the selected values array
				selectedValues[selectedQuestion] = answer;
				
				//reset the error messaging
				jQuery("#error").html("");
			}
			function Calculate(){
			
				//reset the error messaging
				jQuery("#error").html("");
				
				//reset all the scores for each member to 0
				for(member in members){
					members[member] = 0;
				}
				
				//loop through the selected values array and make sure each question was answered
				var allAnswered = true;
				for($i = 1;$i <= questionCount; $i++){
					//check if that question has a selected value
					if(typeof(selectedValues[$i]) != "undefined"){
						//add a point to the selected member
						members[selectedValues[$i]]++;
					} else {
						allAnswered = false;
					}
				}
				//if there is a blank question display an error message
				if(allAnswered == false){
					jQuery("#error").html("<p>Oops. You missed a question. Please go back up and answer it.</p>");
				} else {
				
					//check if there is a tie for the top score
					var highestMembers = new Array();
					var highestScore = 0;
					for(member in members){
						//check if this member has a higher score
						if(members[member] > highestScore){
						
							//clear out the old highest members
							highestMembers = new Array();
							
							//add this member to the highest score
							highestMembers.push(member);
							
							//make the highest score this members score
							highestScore = members[member];
							
						} else if(members[member] == highestScore){
							//add this member to the highest score
							highestMembers.push(member);
						}
					}
					if(highestMembers.length > 1){
						//randomize winner
						highestMembers = shuffleArray(highestMembers);
					} 					
					
					//get the highest scoring member as the selected member
					selectedMember = highestMembers[0];
					
					//replace any special characters for their filename
					memberFilename = selectedMember.replace(/ /g,"").replace(/\./g,"");
					
					//hide the questions and the calculate button
					jQuery("#questions").hide();
					jQuery("#calculate").hide();
					
					//show the results and load the results image
					jQuery("#results").show();
					jQuery("#memberSpan").text(selectedMember);
					jQuery("#memberImg").attr("src",imageFolder+memberFilename+fileExt);
					
					//scroll to the top of the page because the content is shorter now
					jQuery(window).scrollTop(jQuery("#results"));
					
					if(shareOnFB == true){
						jQuery("#fbLink").attr("href",shareHREF).show();
						
					}
				}
			}
			
			//function to share on facebook
			function facebookShare(){
				memberFilename = "Tino";
				selectedMember = "Tino";
				FB.ui(
				  {
					method: 'feed',
					name: shareTitle,
					link: shareDomain+shareURL,
					picture: shareDomain+imageFolder+memberFilename+fileExt,
					caption: 'I Got '+selectedMember,
					description: addlMsg
				  },
				  function(response) {
					if (response && response.post_id) {
					  alert('Post was published.');
					} else {
					  alert('Post was not published.');
					}
				  }
				);
			}
			
			
			//helper function to randomize DOM elements in jQuery
			(function($) {
			$.fn.randomize = function(childElem) {
			  return this.each(function() {
				  var $this = $(this);
				  var elems = $this.children(childElem);

				  elems.sort(function() { return (Math.round(Math.random())-0.5); });  

				  $this.remove(childElem);  

				  for(var i=0; i < elems.length; i++)
					$this.append(elems[i]);      

			  });    
			}
			})(jQuery);
			
			//helper function to randomize arrays
			function shuffleArray(array) {
				for (var i = array.length - 1; i > 0; i--) {
					var j = Math.floor(Math.random() * (i + 1));
					var temp = array[i];
					array[i] = array[j];
					array[j] = temp;
				}
				return array;
			}
			
			//reset the questions and variables if the want to do it again
			function reset(){
					jQuery(".question li span").removeClass("selected");
					jQuery("#questions").show();
					jQuery("#calculate").show();
					jQuery("#results").hide();
					//reset all the scores for each member to 0
					for(member in members){
						members[member] = 0;
					}
					//clear the selected values
					selectedValues = new Array();
				
			}