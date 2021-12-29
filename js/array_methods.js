const peopleName = ["ivan", "ann", "mdcdcndcnd", "xertyir"];
const short = peopleName.filter(item => item.length === 4);

const answers = ["IvAn", "ANNA", "TyjvOIR", "Ejj8329jnfcsl09wkdWE"];
const newAnswer = answers.map(item => item.toUpperCase());

const arr = [4, 90, 23, 1212];
console.log(arr.every(function (item) {
   return typeof(item) === "number";
}));

const result = arr.reduce(function (sum, current) {
   return sum + current;
}, 10000);

console.log(result);

const servak = {
   ivan: "person",
   ann: "person",
   rabbit: "animal",
   bird: "animal"
};

const servakArr = Object.entries(servak)
.filter(item => item[1] === "person")
.map(item => item[0])
.map(item => item.toUpperCase())
.sort();
console.log(servakArr);