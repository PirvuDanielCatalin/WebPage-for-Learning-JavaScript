window.onload=Start;
function Start()
{
	var color=sessionStorage.getItem("color");
	if(color!=null)
		document.querySelector("body").style.background= color;
	
	InitDescriere();
	ClassChange();
	Meniu();
	CanvasUse();
	SVGUse();
    Footer();
	var color="rgb("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+")";
	setTimeout(function(){document.querySelector("body").style.background= color;},10000);
	sessionStorage.setItem("color",color);
}

function InitDescriere()
{
	var x=document.getElementById("Descriere");//Sectiunea
	var d=x.querySelector("div");
	var t=x.querySelector("img"); //Imaginea

	t.draggable="true";
	t.id="DragTarget";
	
	Events();
}

function Events()
{

	document.addEventListener("dragstart", 
		function(event) 
		{
    	// The dataTransfer.setData() method sets the data type and the value of the dragged data
    	event.dataTransfer.setData("Text", event.target.id);
    	event.target.style.opacity = "0.2";
    }
    );

	document.addEventListener("dragend", 
		function(event) 
		{
			event.target.style.opacity = "1";
		}
		);

	document.addEventListener("dragenter", 
		function(event) 
		{
			if (event.target.id == "div1" || event.target.id == "div2")  
			{
				event.target.style.border = "dotted red";
			}
		}
		);

	//Pentru a putea efectua drop-ul ce in mod normal este dezactivat trebuie sa prevenim asta
	document.addEventListener("dragover", function(event) {event.preventDefault();} );

	document.addEventListener("dragleave", 
		function(event) 
		{
			if ( event.target.id == "div1" || event.target.id == "div2"  ) {
				event.target.style.border = "";
			}
		}
		);

	document.addEventListener("drop", 
		function(event) 
		{
			event.preventDefault();
			if ( event.target.id == "div1" || event.target.id == "div2" ) 
			{
				event.target.style.border = "";
				var data = event.dataTransfer.getData("Text");
				event.target.appendChild(document.getElementById(data));
			}
		}
		);
}

function Meniu()
{
	var meniu=document.querySelector("nav").querySelectorAll("input");

	meniu[0].addEventListener("click",function(){ document.location=document.location.toString().split('#')[0]+'#Descriere'; },true);
	meniu[1].addEventListener("click",function(){ document.location=document.location.toString().split('#')[0]+'#Divs'; },true);
	meniu[2].addEventListener("click",function(){ document.location=document.location.toString().split('#')[0]+'#Divs'; },true);
	meniu[3].addEventListener("click",function(){ document.location=document.location.toString().split('#')[0]+'#Drawings'; },true);
	meniu[4].addEventListener("click",function(){ document.location=document.location.toString().split('#')[0]+'#Drawings'; },true);
	
	//meniu[meniu.length-1].onclick=function(){alert("fdfd");};
	meniu[meniu.length-1].addEventListener("click",Ora,true);
}

function Ora()
{
	document.getElementById("Ora").style.display="inline";
	var v = setInterval( 
		function()
		{ 
			var d = new Date();
			var t = d.toLocaleTimeString();
			document.getElementById("Ora").innerHTML = t;
		}
		, 1000);
}

function ClassChange()
{
	var divs=document.querySelector("#ClassChange").querySelectorAll("div");

	for (var i = 0; i < divs.length; i++) 
		Opacitate(divs[i]);

	var table=document.querySelector(".Tabel");
	var inputs=table.querySelectorAll("input");
	inputs[0].onclick=Add;
	inputs[1].onclick=Remove;
	table.querySelector("table").onclick=function(){table.className="Sondaj";};
	table.querySelector("table").ondblclick=function(){table.className="Tabel";};

	var sondaj=document.querySelector(".Sondaj");
	sondaj.querySelector("h2").onclick=function(){sondaj.className="Tabel";};
	sondaj.querySelector("h2").ondblclick=function(){sondaj.className="Sondaj";};
}

function Opacitate(x)
{
	x.style.opacity="0.1";
	var value=window.getComputedStyle(x,null).getPropertyValue("opacity");
	x.addEventListener("mouseover", function(){x.style.opacity="1";});
	x.addEventListener("mouseout", function(){x.style.opacity=value;});
}

function Add()
{
	var tab=document.querySelector("table");
	var newRow=document.createElement("tr");

	var cars = ["Tehnici Web", "^_^"];

	cars.forEach(
		function(m)
		{
			var x=document.createElement("td");
			var y=document.createTextNode(m);
			x.appendChild(y);
			newRow.appendChild(x);
		})
	tab.appendChild(newRow);
}

function Remove()
{
	var tab=document.querySelector("table");
	var lastRow=tab.querySelectorAll("tr");
	tab.removeChild(lastRow[lastRow.length-1]);
}

function CanvasUse()
{
	var canvas=document.getElementById("Canvas");
	var ctx=canvas.getContext("2d");

	ctx.font="28px Tahoma";
	
	let i=0;
	var interval=new Array(4);
	text=[" ... Scoala"," ... Liceul"," ... Bac-ul"," ... Examenele"];
	var terminat=0
	
	for(let j=0;j<text.length;j++)
	{
		interval[j] = setInterval( 
			function()
			{  
				if(j==0)
					ctx.clearRect(0, 0, canvas.width, canvas.height);

				if(i==canvas.width)
				{
					terminat=1;
					clearInterval(interval[0]);
					clearInterval(interval[1]);
					clearInterval(interval[2]);
					clearInterval(interval[3]);

					ctx.clearRect(0, 0, canvas.width, canvas.height);
					alert("S-au dus! ^_^");
					
					//ctx.strokeText(text[0],i,30*0);
					//ctx.strokeText(text[1],i,canvas.height-30*1);
					//ctx.strokeText(text[2],i,canvas.height-30*2);
					//ctx.strokeText(text[3],i,canvas.height-30*3);

				}
				else
				{
					ctx.strokeText(text[j],i,30*(j+1));
					i += 1;
				}

			},100);

	}
}

function SVGUse()
{
	var svg=document.getElementById("SVG");
 	var animation=svg.querySelector("text").querySelector("animateTransform");
 	var text=svg.querySelector("text");

 	text.setAttribute("x",200);
 	text.setAttribute("y",200);

 	var coordx=text.getAttribute("x");
 	var coordy=text.getAttribute("y");
 
	animation.setAttribute("from", "0 "  +coordx+" "+coordy);
	animation.setAttribute("to"  , "360 "+coordx+" "+coordy);

	svg.onclick=function(ev)
				{ 

					text.setAttribute("x",Math.floor(ev.offsetX%500));
 					text.setAttribute("y",Math.floor(ev.offsetY%412));
					
					coordx=text.getAttribute("x");
 					coordy=text.getAttribute("y");
 
					animation.setAttribute("from", "0 "  +coordx+" "+coordy);
					animation.setAttribute("to"  , "360 "+coordx+" "+coordy);
					
				}
	window.addEventListener("keyup",function(ev)
					{
						var key=ev.keyCode;
						if(key==37) //Left Key
						{
							text.setAttribute("x",text.getAttribute("x") -30);
							text.setAttribute("y",text.getAttribute("y"));

							coordx=text.getAttribute("x");
							coordy=text.getAttribute("y");

							animation.setAttribute("from", "0 "  +coordx+" "+coordy);
							animation.setAttribute("to"  , "360 "+coordx+" "+coordy);
						}
						else
						if(key==38) //Up key
						{
							text.setAttribute("x",text.getAttribute("x"));
							text.setAttribute("y",text.getAttribute("y") -30);
							
							coordx=text.getAttribute("x");
							coordy=text.getAttribute("y");
							
							animation.setAttribute("from", "0 "  +coordx+" "+coordy);
							animation.setAttribute("to"  , "360 "+coordx+" "+coordy);
						}
						else
						if(key==39) //Right key
						{
							text.setAttribute("x",text.getAttribute("x") +30);
							text.setAttribute("y",text.getAttribute("y"));
							
							coordx=text.getAttribute("x");
							coordy=text.getAttribute("y");
							
							animation.setAttribute("from", "0 "  +coordx+" "+coordy);
							animation.setAttribute("to"  , "360 "+coordx+" "+coordy);
						}
						else
						if(key==40) //Down key
						{
							text.setAttribute("x",text.getAttribute("x"));
							text.setAttribute("y",text.getAttribute("y") +30);
							
							coordx=text.getAttribute("x");
							coordy=text.getAttribute("y");
							
							animation.setAttribute("from", "0 "  +coordx+" "+coordy);
							animation.setAttribute("to"  , "360 "+coordx+" "+coordy);
						}
					},true);
	
}

function Footer()
{
    var persoana=
    {
        nume:"Pirvu",
        prenume:"Daniel-Catalin"
    };
    var p=document.getElementById("footer");
   // p.onclick=function(){alert("erer");};
    p.innerHTML+=persoana.nume+" "+persoana.prenume;
}
