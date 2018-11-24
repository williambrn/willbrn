var yP = 730;
var raioP = 50

var vX = []; // obstaculo
var vY = [];
var vV = [];
var vTam = [];    

var bX = [] // bonus
var bY = []

var contagemV = 3;
var colisao = false;
var vida = "Vida: "

var tela = 1; 
var tempo = 0;
var nivel = 1; 
var barreiraDeTempo = 10;
var qt = 150;

function setup() {
  createCanvas(windowWidth, 800);
  background(112,219,219); // cor
  frameRate(120)
  
  for (i = 0; i < qt; i++) {
    vX[i] = (0,width);
    vY[i] = (0,height);
    vV[i] = 5+random(0,10)/10; 
    vTam[i] = random(20,22);
    bX[i] = (0,width);
    bY[i] = (0,height); 
  }   
}

function draw() {
    if ( tela == 1) {
        background(0);
        textSize(120); 
        fill(50,50,205);
        text(" Cai Cai Balão", (windowWidth/2)-400, 400);
        textSize(70);
        text(" Pressione Enter", (windowWidth/2)-300, 700);
        if (keyIsDown(ENTER) ) {
           tela = 2;  
        } 
    }

if ( tela == 2) {
  background(112,219,219);
    // NIVEL
    if(Math.floor(tempo/60)>=barreiraDeTempo) {
        nivel=nivel+1;
        barreiraDeTempo = barreiraDeTempo + 10; 
    }
    for(i=0;i<qt;i++){
        if(nivel == 2){
            vV[i] = 8+random(0,10)/10;
        }
        if(nivel == 3){
            vV[i] = 11+random(0,10)/10;
        }
        if(nivel == 4){
            // não conseguimos mudar a quantidade de objetos (var qt)  :(
            vV[i] = 14+random(0,10)/10;   // tem que ser bom!
        }
        if(nivel == 5) {
            vV[i] = 18+random(0,10)/10;   // danger!  ...provisório...
        }
    }
    
  // movimentacao do objeto 
  for(i = 0; i < qt; i++) { 
    vY[i] = vY[i] + vV[i]; 
    bY[i] = bY[i] + vV[i]; 
    if (vY[i] > height) {
      vX[i] = random(0,width);
      vY[i] = -random(0,height);		  
    }
    if(bY[i] > height){
    bX[i] = random(0,width);
    bY[i] = -random(0,height); 
    }
  }

  // cenario: formato e cores
  fill(255,69,0)
  ellipse(mouseX, yP, raioP, raioP);
  noFill()
  fill(0,0,255)
  for(i = 0; i < qt; i++) {
    rect(vX[i] - (vTam[i] / 2),vY[i] - (vTam[i] / 2),vTam[i],vTam[i])
        if(dist(mouseX,yP, vX[i], vY[i] )< (raioP + vTam[i]) - 35 ){
            if(colisao == false) { 
            contagemV-=1;
                if(contagemV < 1){
                    vida = "Game Over"
                    contagemV = ""   
                }      
                colisao = true; 
                vX[i] = random(0,width);
                vY[i] = -random(800); 
            }
        }
        else {
          colisao = false;  
       }
    }

  noFill()
  fill(230, 0, 92)
  // bonus: +vida
  for(i = 0; i < qt/200; i++) {
    if(contagemV >=1){
    rect(bX[i] - (vTam[i] / 2),bY[i] - (vTam[i] / 2),vTam[i],vTam[i])
      if(dist(mouseX,yP, bX[i], bY[i] )< (raioP + vTam[i]) - 35 ){  // colisao
        if(colisao == false) 
           contagemV+=1;
            if(contagemV < 1){
            vida = "Game Over"
            contagemV = "" 
            }      
            colisao = true; 
            bX[i] = random(0,width);
            bY[i] = -random(800); 
      }
      else {
        colisao = false;  
     }
    }
  }

  noStroke()
  stroke(34, 139,34)
  strokeWeight(50)
  line(0, 780,windowWidth, 780)
  noStroke()

  if(contagemV >=1){
    tempo++
  }

  // informacoes do jogo
  textSize(40); 
  fill(255); 
  text("Tempo: " + (Math.floor(tempo/60)) + " Segundos" , 400, 50);
  text(vida + contagemV,480, 90 )
  text("Nível: " +nivel, 1100,50 )
  if(contagemV < 1){
      tela = 3
  }
  
}
if(tela ==3 ){
    background(0);
    textSize(32); 
    fill(135,206,235);
    text("Tempo: " + (Math.floor(tempo/60)) + " Segundos" , 400, 50);
    text("Nível: " +nivel, 1100,50 )
    textSize(80); 
    text("Game Over", 700, 260);
    if (keyIsDown(ENTER) ) {
        tela = 2;
        vida = 3;
        tempo = 0;
        nivel = 1;
    }
  }
}


// fails: aumentar qt com o nivel; reiniciar o game na tela 3
