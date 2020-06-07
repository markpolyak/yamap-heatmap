function deleteExcessPoints(array) {

	let arraySort = new Array;

	array.forEach(function(item) {
		if (item.z !== undefined) {
			arraySort.push(item)
		}
	});

	return arraySort;
}

function sortZPoints(array) {  

    let arraySort = Array([],[],[],[],[],[],[],[],[],[]);

		for (let i = 0; i < array.length; i++) {

			if (array[i].z >= 0 && array[i].z < 6){
				arraySort[0].push(array[i]);
			}
			else if (array[i].z >= 6 && array[i].z < 10){
				arraySort[1].push(array[i]);
			}
			else if (array[i].z >= 10 && array[i].z < 15){
				arraySort[2].push(array[i]);
			}
			else if (array[i].z >= 15 && array[i].z < 18){
				arraySort[3].push(array[i]);
			}
			else if (array[i].z >= 18 && array[i].z < 21){
				arraySort[4].push(array[i]);
			}
			else if (array[i].z >= 21 && array[i].z < 24){
				arraySort[5].push(array[i]);
			}
			else if (array[i].z >= 24 && array[i].z < 27){
				arraySort[6].push(array[i]);
			}
			else if (array[i].z >= 27 && array[i].z < 30){
				arraySort[7].push(array[i]);
			}
			else if (array[i].z >= 30 && array[i].z < 32){
				arraySort[8].push(array[i]);
			}
			else if (array[i].z >= 32){
				arraySort[9].push(array[i]);
			}
		}	

	return arraySort;
}

function findingNeighbor(x1, x2, y1, y2){

	let doubleStep = step * 2;

	let x = 0;
	let y = 0;
	let l = 0;

		x = Math.pow((Math.round((x2 - x1) * 1000000) / 1000000), 2);
		y = Math.pow((Math.round((y2 - y1) * 1000000) / 1000000), 2);

		l = Math.sqrt(x + y);

		if (l < doubleStep){
			return true;
		}
		else{
			return false;
		}
}

function deleteExcessPointsTwo(array) {

	let arraySort = new Array;

	array.forEach(function(item) {
		if (item !== undefined) {
			arraySort.push(item)
		}
	});

	return(arraySort);
}

function createsArraysNeighbors(array){

	let arraySort = new Array;

	for (let i = 0; i < array.length; i++) {

		let arrayResidue = array[i];
		let arrayAreas = new Array;;

		while (arrayResidue.length != 0){

			let arrayNeighbors = new Array;

			arrayNeighbors.push(arrayResidue[0]);
			arrayResidue.shift();

			for (let l = 0; l < arrayNeighbors.length; l++) {
				
				for (let j = 0; j < arrayResidue.length; j++) {
						
				let z = findingNeighbor(arrayNeighbors[l].x, arrayResidue[j].x, arrayNeighbors[l].y, arrayResidue[j].y);

				if (z == true){
						arrayNeighbors.push(arrayResidue[j]);
						arrayResidue[j] = undefined;
					}
				else{
					continue;
					}		

				}

				arrayResidue = deleteExcessPointsTwo(arrayResidue);

			}

			arrayAreas.push(arrayNeighbors);

		}

	arraySort.push(arrayAreas);

	}

	return arraySort;

}

const getNewCoordinate = (point1, point2, point3, t) => Math.floor((Math.pow((1-t), 2)*point1+2*(1-t)*t*point2+Math.pow(t, 2)*point3)*1000000)/1000000;

function bezierСurves(array1, array2, array3) {

	let newArray = new Array;
	newArray.unshift(array1);

		for (let t = 1; t <= 9; t++) {
	
			let objectXY = new Object();

			objectXY.x = getNewCoordinate(array1.x, array2.x, array3.x, t / 10);	
			objectXY.y = getNewCoordinate(array1.y, array2.y, array3.y, t / 10);	

			newArray.push(objectXY);

		}

	return newArray;
}


function smoothedCorners(array) {

	let newArray = new Array;

	for (let i = 0; i < array.length; i=i+2) {

		if (array[i+1] === undefined) {
			break;
		}

		let arrayWithSmoothCorners = bezierСurves(array[i], array[i+1], (array[i+2] = array[i+2] === undefined
			? array[0]
			: array[i+2]));

		newArray = newArray.concat(arrayWithSmoothCorners);

		i = (array[i+1] === undefined || array[i+2] === undefined) ? array.length : i;
	}

	newArray.push(newArray[0]);
	
	return newArray;

}

const getMiddlePoint = (firstPoint, secondPoint) => ((firstPoint + secondPoint) / 2);

function mergingArrays(array1, array2) {

	let newArray = new Array;

		for (let i = 0; i < array1.length; i++) {

			newArray.push(array1[i]);
			newArray.push(array2[i]);

		}

	newArray.pop();

	return newArray;
}

function arrayAddMiddlePointsToArray(array) {

	console.log('fdsf', array);

	let arrayWithMiddlePoints = new Array;

	for (let i = 0; i < array.length - 1; i++){
		
		let newPoint = new Object();

		newPoint.x = getMiddlePoint(array[i].x, array[i+1].x);
		newPoint.y = getMiddlePoint(array[i].y, array[i+1].y);
		newPoint.z = array[0].z;

		arrayWithMiddlePoints.push(newPoint)
	}

	return mergingArrays(array, arrayWithMiddlePoints);
}

const transformArray = (array) => {

	array.pop();
	array.unshift(array.pop())

	return array;
} 

function getSmoothedCorners(array) {

	if (array.length >= 3) {
		let newArray = transformArray(array);
		newArray = smoothedCorners(newArray);
		return newArray;
	}
	
	return array;
}

function findingMinimumCoordinate(array) {

	let yMin = 0;
	let xMin = 0;

	for (i = 0; i < array.length; i++) {

		if (array[i].y >= array[0].y) continue;
		else {
			yMin = array[0];
            array[0] = array[i];
            array[i] = yMin;
		}
	};

	for (i = 0; i < array.length; i++) {

		if (array[i].x >= array[0].x) continue;
		else {
			xMin = array[0];
            array[0] = array[i];
            array[i] = xMin;
		}
	};

return array;

}

function arrangesPointsWithIdenticalCoordinates(array) {

	let t = 0;

	for (let i = 1; i < array.length; i++) {
		
		if (array[i - 1].x != array[i].x && array[i - 1].y != array[i].y) continue;
		else if (array[i - 1].x == array[i].x){
			if (array[i - 1].y < array[i].y) continue;
			else{
				t = array[i - 1];
				array[i - 1] = array[i];
				array[i] = t;
			}
		}

			else if (array[i - 1].y == array[i].y){
				if (array[i - 1].x < array[i].x) continue;
				else{
					t = array[i - 1];
					array[i - 1] = array[i];
					array[i] = t;
				}
			}

	}

return array;

}

function sortsByDegreeLeftism(array) {

	let p = array[0];
	let t = 0;

	for (j = 1; j < array.length; j++) {

		t = 0;
		
		for (i = 1; i < array.length - 1; i++) {
			
				let a = array[i];
				let b = array[i + 1];

					let y = (( b.y - a.y ) * ( p.x - a.x ) - ( b.x - a.x ) * ( p.y - a.y ));

					if (y <= 0) continue;
					
					else {
							array[i] = b;
							array[i + 1] = a;
							t++;
						}
		}	

		if (t == 0) break;
	}

return array;

}

function cutsOffCorners(array) {
	
	for (r = 2; r < array.length; r++) {

		for (i = 2; i < array.length; i++) {
			
				let a = array[i - 2]
				let b = array[i - 1];
				let c = array[i];

					for (let j = 1; j < array.length; j++) {
						
						if(a == undefined){
							a = array[i - 2 - j];
						}
						else break;
						}

						let y = (( c.y - b.y ) * ( a.x - b.x ) - ( c.x - b.x ) * ( a.y - b.y ));

						if (y < 0) continue;
						
						else {
								array[i - 1] = undefined;
							}
						
		}

		array = deleteExcessPointsTwo(array);

	}

return array;

}

function convectsArray(array){

		let convertedPointsArr = array.map(function (point) { 
			return [point.x, point.y];
		} );

		return convertedPointsArr;

}

function goGreham(array) {

	for (let i = 0; i < array.length; i++) {

		let x = array[i];
		
		for (let j = 0; j < x.length; j++) {
		
			x[j] = findingMinimumCoordinate(x[j]);
			x[j] = arrangesPointsWithIdenticalCoordinates(x[j]);
			x[j] = sortsByDegreeLeftism(x[j]);
			x[j] = cutsOffCorners(x[j]);
			x[j] = arrayAddMiddlePointsToArray(x[j]);
			x[j] = getSmoothedCorners(x[j]);
			x[j] = convectsArray(x[j]);

		}

		array[i] = x;
	}

	return array;
}

function run(array){ 

	ymaps.ready(paint);

		function paint() {
		let myMap = new ymaps.Map("map", {
			center: [59.953929, 29.934751],
			zoom: 11
		}, {
			searchControlProvider: 'yandex#search'
		});

    	for (let i = 0; i < array.length; i++) {

			let myGeoObject = new ymaps.GeoObject({
			geometry: {
				type: "Polygon",
				coordinates: 
					array[i]
				,
				fillRule: "nonZero"
			},
			properties:{
				balloonContent: ""
			}
			}, {
				fillColor: '#049519',
				fillOpacity: 0.1,
				strokeColor: '#fff',
				stroke: false,
			});
    	myMap.geoObjects.add(myGeoObject);
		}

		}
}

let x = 0;

function go (){

	x = deleteExcessPoints(grid);
	x = sortZPoints(x);
	x = createsArraysNeighbors(x);
	x = goGreham(x);

	run(x);
}

go();

