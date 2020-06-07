//Выборка хлорофилла за май 1982 года
let inputPoints = [[59.9783333333333, 30.2166666666667, 2.04999995200000],
					[59.8883333333333, 30.2183333333333, 9.60000038100000],
					[59.8850000000000, 30.1666666666667, 11.2500000000000],
					[59.9166666666667, 30.2633333333333, 2.60444400000000], 
					[59.9083333333333, 29.9366666666667, 13.8000001900000], 
					[59.9900000000000, 29.8583333333333, 13.8999996200000], 
					[59.9583333333333, 29.7966666666667, 15.6999998100000], 
					[59.9366666666667, 29.7883333333333, 6.30999994300000], 
					[60, 29.9383333333333, 12.5000000000000], 
					[59.9383333333333, 30.1283333333333, 15.4200000800000], 
					[59.9016666666667, 30.0866666666667, 35.2000007600000]];
//Выборка хлорофилла за июль 1982 года
// let inputPoints = [[60.0833333333333, 29.4333333333333, 1.24000000000000], 
// 					[59.9766666666667, 29.6150000000000, 3.31999993300000], 
// 					[60.0833333333333, 29.7283333333333, 9.19999980900000], 
// 					[60.0666666666667, 29.1333333333333, 6.59999990500000], 
// 					[59.9600000000000, 29.9816666666667, 10.6499996200000], 
// 					[59.9900000000000, 29.8583333333333, 8.89999961900000], 
// 					[59.9583333333333, 29.7966666666667, 8.07999992400000], 
// 					[59.9366666666667, 29.7883333333333, 8.72999954200000], 
// 					[60, 29.9383333333333, 4.61999988600000], 
// 					[59.9383333333333, 30.1283333333333, 6.07999992400000], 
// 					[59.9016666666667, 30.0866666666667, 20], 
// 					[59.8850000000000, 30.1666666666667, 11.9300003100000], 
// 					[59.9783333333333, 30.2166666666667, 0.899999976000000], 
// 					[59.9666666666667, 30.2183333333333, 0.0500000010000000], 
// 					[59.8883333333333, 30.2183333333333, 2.67000007600000], 
// 					[59.9166666666667, 30.2633333333333, 18.4200000000000], 
// 					[60.1150000000000, 29.8733333333333, 0.0200000000000000]];

let extraPoints = [[59.927846, 29.742734],
					[59.887379, 29.915501],
					[59.863686, 30.106464],
					[59.982186, 30.192158],
					[60.006082, 29.988780], 
					[60.001482, 29.719345],
					[60.021924, 29.757453], 
					[59.935084, 29.678639],
					[59.903343, 29.833588],
					[59.864999, 30.011901],
					[59.867109, 30.149713],
					[59.946487, 30.191551], 
					[59.991410, 30.096890],
					[60.029890, 29.866728], 
					[59.967986, 29.682707], 
					[60.036525, 29.955904],
					[59.909351, 30.204926]];

function extrapolation(){
	for (let i = 0; i < extraPoints.length; i++) {
		let lengthVector = [];
		let drob = 0;
		let sum = 0; 
		let sumLengthVector = 0;

		for (let j = 0; j < inputPoints.length; j++) {
			lengthVector[j] = Math.sqrt(Math.pow((inputPoints[j][0] - extraPoints[i][0]), 2) + Math.pow((inputPoints[j][1] - extraPoints[i][1]), 2));
			sumLengthVector += 1 / lengthVector[j];
		}
		for (let k = 0; k < inputPoints.length; k++) {
			drob = inputPoints[k][2] / (lengthVector[k] * sumLengthVector);
			sum += drob;
		}
		extraPoints[i].push(sum);
	}
}

extrapolation();
let points = inputPoints.concat(extraPoints);
let delaunay = new Delaunator(points);

let angularPoints = [{x: 59.860659, y: 29.672040}, {x: 59.860659, y: 30.260009}, {x: 60.037035, y: 30.260009}, {x: 60.037035, y: 29.672040}];
const SUM_STEPS_X = 100;

let wayX = Math.round((angularPoints[2].x - angularPoints[0].x) * 1000000) / 1000000;
let step = Math.round((wayX / SUM_STEPS_X) * 1000000) / 1000000; /*Шаг сетки*/

let wayY = Math.round((angularPoints[1].y - angularPoints[0].y) * 1000000) / 1000000;
const SUM_STEPS_Y = Math.round((wayY / step) * 1) / 1;

let grid = new Array;
grid.push({x: angularPoints[0].x, y: angularPoints[0].y, z: undefined});
function createGrid() {
	let x0 = angularPoints[0].x;
	let y0 = angularPoints[0].y
	for (let i = 0; i <= SUM_STEPS_X; i++) {		
			for (let j = 1; j <= SUM_STEPS_Y; j++) {
				grid.push({x: x0, y: Math.round((grid[j - 1].y + step) * 1000000) / 1000000, z: undefined});
			}
				if (i == SUM_STEPS_X) { 					
					break;
				}
				else{
					x0 = Math.round((x0 + step) * 1000000) / 1000000;
					grid.push({x: x0, y: y0, z: undefined});
				}
	}
}

createGrid();

let coordinates=[];		
for (let i = 0; i < delaunay.triangles.length; i++) {
	for (let j = 0; j < points.length; j++) {
		if (delaunay.triangles[i] == j){
			let vertex = {};
			vertex.x = points[j][0];
			vertex.y = points[j][1];
			vertex.z = points[j][2];
			coordinates[i] = vertex;
		}
	}
}

let trian=[];	
for (let i = 0; i < coordinates.length; i += 3) {
	let temp = [];
	for (let j = 0; j < 3; j++) {
		temp.push(coordinates[i + j]);
	}
	trian.push(temp);
}

for (let i = 0; i < trian.length; i++) {
	let coefficient = {};
	coefficient.a = (trian[i][1].y - trian[i][0].y) * (trian[i][2].z - trian[i][0].z) - (trian[i][2].y - trian[i][0].y) * (trian[i][1].z - trian[i][0].z);
	coefficient.b = (trian[i][2].x - trian[i][0].x) * (trian[i][1].z - trian[i][0].z) - (trian[i][1].x - trian[i][0].x) * (trian[i][2].z - trian[i][0].z);
	coefficient.c = (trian[i][1].x - trian[i][0].x) * (trian[i][2].y - trian[i][0].y) - (trian[i][2].x - trian[i][0].x) * (trian[i][1].y - trian[i][0].y);
	coefficient.d = (trian[i][2].z - trian[i][0].z) * (trian[i][0].y * trian[i][1].x - trian[i][0].x * trian[i][1].y) + (trian[i][2].y - trian[i][0].y) * (trian[i][0].x * trian[i][1].z - trian[i][0].z * trian[i][1].x) + (trian[i][2].x - trian[i][0].x) * (trian[i][0].z * trian[i][1].y - trian[i][0].y * trian[i][1].z);

	trian[i].push(coefficient);
}

for (let i = 0; i < grid.length; i++) {
	for (let j = 0; j < trian.length; j++) {
		if (сheckPointTriangle(trian[j][0], trian[j][1], trian[j][2], grid[i]) == true){
			grid[i].z = findCoordinatesZ(trian[j][3], grid[i]);
			break;
		}	
	}
}

function сheckPointTriangle(a, b, c, p) {
	let k, m, n;
	k = (a.x - p.x) * (b.y - a.y) - (b.x - a.x) * (a.y - p.y);
	m = (b.x - p.x) * (c.y - b.y) - (c.x - b.x) * (b.y - p.y);
	n = (c.x - p.x) * (a.y - c.y) - (a.x - c.x) * (c.y - p.y);
	return ((k >= 0 && m >= 0 && n >= 0) || (k <= 0 && m <= 0 && n <= 0) ? true : false);
}

function findCoordinatesZ(coefficients, p){
	let pointZ = (-(coefficients.a * p.x + coefficients.b * p.y + coefficients.d)/coefficients.c);
	if (pointZ == -0){
		pointZ = 0;
	}
	return pointZ;
}