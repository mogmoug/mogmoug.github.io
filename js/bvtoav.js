table="fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF";
tr={};
for(i = 0;i < 58;i++){
    tr[table[i]]=i;
};

s=[11,10,3,8,4,6];
xor=177451812;
add=8728348608;

function dec(x){
	r=0;
	for(i = 0;i<6;i++){
		r+=tr[x[s[i]]]*58**i;
	}
	return (r-add)^xor;
};
	

function enc(x){
	x=(x^xor)+add;
	r=list('BV1  4 1 7  ');
	for(i = 0;i<6;i++){
		r[s[i]]=table[Math.floor(x/58**i%58)];
	}
	return ''.join(r)
};
//源代码来自知乎@mcfx
//我已经改编为js代码
