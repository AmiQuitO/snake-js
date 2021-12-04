speed=500;
punkty=0;
level=0;
pozycja=[];
wys = 0;
szer = 0;
tyl= 0;
ostklaw = 0;
prawo1=setInterval('ruch(1)',speed);
lewo1=setInterval( 'ruch(-1)',speed);
gora1=setInterval( 'ruch(-szer)',speed);
dol1=setInterval(  'ruch(szer)',speed);

zatrzymaj();

function f(event){

	klawisz=event.keyCode;
	//prawo
	if(klawisz==39 && ostklaw != 37){
		ostklaw = 39;
		zatrzymaj();
		prawo1=setInterval('ruch(1)',speed);
	}
	//lewo
	if(klawisz==37 && ostklaw != 39){
		ostklaw = 37;
		zatrzymaj();
		lewo1=setInterval('ruch(-1)',speed);
	}
	//góra
	if(klawisz==38 && ostklaw != 40){
		ostklaw = 38;
		zatrzymaj();
		gora1=setInterval('ruch(-szer)',speed);
	}
	//dół
	if(klawisz==40 && ostklaw != 38){
		ostklaw = 40;
		zatrzymaj();
		dol1=setInterval('ruch(szer)',speed);
	}
}
function stworzplansze(){
	wys = parseInt(document.getElementById("wys").value);
	szer = parseInt(document.getElementById("szer").value);
	document.getElementById("kontener").innerHTML = "";

	for(i = 0; i < (wys*szer); i++){
		zajety = false;
		if(i%szer==0){
			document.getElementById("kontener").innerHTML += "<br />";
		}
		/*
		for(i = 0; i < pozycja.length; i++){
			if(pozycja[pozycja.length] == i){
				document.getElementById("kontener").innerHTML += "<img src='snakehead.jpg' class='a' />";
				zajety = true;
			}else if(pozycja[i] == i){
				document.getElementById("kontener").innerHTML += "<img src='snake.jpg' class='a' />";
				zajety = true;
			}
		}
		*/
		document.getElementById("kontener").innerHTML += "<img src='bialy.jpg' class='a' />";
	}
}
function losowaniepozycja(){
	pozycja[1] = Math.floor(((wys*szer)-2)*Math.random())+1;
	pozycja[0] = pozycja[1]--;
	tyl = pozycja[0]--;
	console.log(pozycja[pozycja.length-1]);
	document.images[pozycja[1]].src='snakehead.jpg';
	speed = (20 * ((szer*wys) / pozycja.length)) + 500;
}
function losowanie(){
	if (pozycja.length == (wys*szer))
		return;

	do{
		pozowoc=Math.floor(((wys*szer)-2)*Math.random())+1;
		czyok=0;
		for(i=0;i<=pozycja.length-1;i++){
			if(pozowoc==pozycja[i]){
				czyok++;
			}
		}
	}while(czyok>0);
	document.images[pozowoc].src='owoc.jpg';
}
function animacja(){
	console.log(czypunkt());
	if(!(tyl < 0)){
		document.images[tyl].src='bialy.jpg';
	}

	for(i = 0; i < pozycja.length; i++){
		if(i == pozycja.length-1){
			document.images[pozycja[i]].src='snakehead.jpg';
		}else{
			document.images[pozycja[i]].src='snake.jpg';
		}
	}

	if(pozycja[pozycja.length-1]==pozowoc){

		punkty++;
		document.getElementById('punkty').innerText='Punkty: '+punkty;
		losowanie();
		if(punkty%5==0){
			level+=1;
		}
		speed = (20 * ((szer*wys) / pozycja.length)) + 500;
		if(punkty>=(szer*wys)*0.6){
			setTimeout('wygrana()',50);
		}
		document.getElementById('level').innerText='Level: '+level;
		document.getElementById('speed').innerText='Predkosc: '+ parseInt((1/speed)*100000);
	}
}
function czypunkt(a){

	if((pozycja[pozycja.length-1]+a) == pozowoc){
		return true;
	}else{
		return false;
	}
}
function kolizja(a){
	for(i=1; i < pozycja.length-1; i++){
		if(pozycja[pozycja.length-1]+a == pozycja[i]){
			console.log("nie dziala");
			return true;
		}
	}
	return false;
}
function kolizjamapy(a){
	// 0 1 2
	// 3 4 5
	// 6 7 8
	
	if((pozycja[pozycja.length-1]) < 0 || ((pozycja[pozycja.length-1]) >= wys*szer)){
		return true;
	}
	if(a == 1 && (pozycja[pozycja.length-1]%szer==0)){
		return true;
	}else if(a == -1 && ((pozycja[pozycja.length-1]+1)%szer==0)){
		return true;
	}
	return false;
}

function ruch(kierunek)
{
	kierunek = parseInt(kierunek);
	if(kolizja(kierunek) == true){
		przegrana();
	}else{
		if(czypunkt(kierunek) == true){
			pozycja.push(pozycja[pozycja.length-1]+kierunek);
		}else{
			for(i = 0; i < pozycja.length; i++){
				if(i == 0){
					tyl=pozycja[0];
					pozycja[i]=pozycja[i+1];
				}
				if(i < pozycja.length-1){
					pozycja[i] = pozycja[i+1];
				}
				if(i == pozycja.length-1){
					pozycja[i] += kierunek;
				}
			}
		}
	}
	if(kolizjamapy(kierunek)){	
		przegrana();	
	}
	else{
		animacja();
	}
}

function przegrana(){

	zatrzymaj();
	window.alert('Koniec gry');
	window.location.reload();
}
function zatrzymaj(){

	clearInterval(prawo1);
	clearInterval(lewo1);
	clearInterval(gora1);
	clearInterval(dol1);
}
function wygrana(){
	
	zatrzymaj();
	window.alert('Gratulacje. \nZdobyłeś(-aś) '+punkty+' punktów');
	window.location.reload();
}