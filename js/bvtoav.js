var table='fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF';
var tr= new Array();
function range(n){
	var arr=new Array();
	for(i=0;i<n;i++){
		arr[i]=[i];
	}
	return arr;
}
function list(str){
	return str.split()
}
for (i in range(58)) {
	tr[table[i]]=i;
}
var s=[11,10,3,8,4,6];
var xor=177451812;
var add=8728348608;

function dec(x) {
	var r=0;
	for (i in range(6)) {
		r+=tr[x[s[i]]] * 58 ** i;
	}
	return (r-add)^xor;
	}
function enc(x) {
	var x=(x^xor)+add;
	var r=list('BV1  4 1 7  ');
	for (i in range(6)) {
		r[s[i]]=table[Math.floor( x,58 ** i % 58 )];
	return ''.join(r);
	}
}
//源代码来自知乎@mcfx
//我已经改编为js代码
