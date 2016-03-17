var person = {
	name: 'Amar',
	height: 6
};

function updatePerson (obj) {
	// obj = {
	// 	name: 'Amar',
	// 	height: 5
	// };
	obj.height=7

} 
updatePerson(person);
console.log(person);


var grades = [15, 77];

function addGrades (gradessArr) {

	//gradessArr= [66]; // it will act as new variable
	gradessArr.push(99);

}

addGrades(grades);
console.log(grades);
