var bg, bgImg;
var playerP, playerImgP, playerImgA, playerA;
var lixo0, lixo1,lixo2,lixo3, lixo0Img, lixo1Img, lixo2Img, lixo3Img;
var score = 0;

//AULA 48 - variáveis da aula
var btVoltar, btVoltarImg,sombt, pegarItem


function preload(){

  bgImg = loadImage("assets/bg.png");

  playerImgP = loadImage("assets/MENINA ANDANDO/MA1.png")

  playerImgA = loadAnimation(
    "assets/MENINA ANDANDO/MA2.png",
    "assets/MENINA ANDANDO/MA3.png", 
    "assets/MENINA ANDANDO/MA4.png",
  );

  lixo0Img = loadImage ("assets/LIXOS/lixo0.jpg")
  lixo1Img = loadImage ("assets/LIXOS/lixo1.jpg")
  lixo2Img = loadImage ("assets/LIXOS/lixo2.jpg")
  lixo3Img = loadImage ("assets/LIXOS/lixo3.jpg")

  balaoFalaImg0 = loadImage("assets/BALAO_FALA/balãoFala0.png")
  balaoFalaImg1 = loadImage("assets/BALAO_FALA/balãoFala1.png")

  //AULA 48 - Pre Carregamento da Imagem
 btVoltarImg= loadImage("assets/MENU_INICIAR/btvoltar.png")
  //AULA 48 - Pre Carregamento de Som
  pegarItem =  loadSound("audio/pegarItem.mp3")
  sompulo = loadSound("audio/sombt.wav")
  
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  bg = createSprite(displayWidth/2,displayHeight/2,20,20)
  bg.addImage(bgImg)
  bg.scale = 2.9
  
  playerP = createSprite(displayWidth-1500, displayHeight-300,50, 50);
  playerP.addImage("stopped", playerImgP)
  playerP.scale = 0.8

  playerA = createSprite(displayWidth-1500, displayHeight-300,50, 50);
  playerA.addAnimation("walking",playerImgA)
  playerA.scale = 0.8
  playerA.visible = false; 

  lixo0 = createSprite(displayWidth-1000, displayHeight-300,50, 50);
  lixo0.addImage(lixo0Img)
  lixo0.scale = 0.2

  lixo1 = createSprite(displayWidth-800, displayHeight-300,50, 50);
  lixo1.addImage(lixo1Img)
  lixo1.scale = 0.2

  lixo2 = createSprite(displayWidth-550, displayHeight-300,50, 50);
  lixo2.addImage(lixo2Img)
  lixo2.scale = 0.2

  lixo3 = createSprite(displayWidth-300, displayHeight-300,50, 50);
  lixo3.addImage(lixo3Img)
  lixo3.scale = 0.2

  setTimeout(function() {
  balaoFala0 = createSprite(displayWidth-200, displayHeight-750,50, 50);
  balaoFala0.addImage(balaoFalaImg0)
  balaoFala0.scale = 1
  }, 2000); 
  
  balaoFala1 = createSprite(displayWidth-200, displayHeight-750,50, 50);
  balaoFala1.addImage(balaoFalaImg1)
  balaoFala1.scale = 1
  balaoFala1.visible = false

  //AULA 48 - SPRITE DO BOTÃO VOLTAR
  btVoltar = createSprite(displayWidth -1500, displayHeight -750,50,50)
  btVoltar.addImage(btVoltarImg)
  btVoltar.scale = 0.03
  //AULA 48 - Bloco para criar Sprite de piso
  bloco= createSprite( 500,650,150,20)
  bloco.shapeColor = "green"

  edges = createEdgeSprites();
  
}

function draw() {
  background(0); 

  if(keyDown("LEFT_ARROW")||touches.length>0){

    playerP.x = playerP.x - 30

    playerA.visible = true;
    playerP.visible = false;

    playerA.mirrorX(-1)
    playerP.mirrorX(-1)
    
  }else{
   
    playerA.visible = false;
    playerP.visible = true;

    playerA.x = playerP.x;
    playerA.y = playerP.y;
  }

  if(keyDown("RIGHT_ARROW")||touches.length>0){
   
    playerP.x = playerP.x + 30;

    playerA.visible = true;
    playerP.visible = false;

    playerA.mirrorX(1)
    playerP.mirrorX(1)
    
  }else{
    playerA.x = playerP.x
    playerA.y = playerP.y;
  }

  if(keyWentDown("space") ){
    playerP.y = 400;

    //AULA 48 - Som de pulo
    sompulo.play()
  }
  playerP.velocityY = playerP.velocityY + 0.5;

  playerP.collide(edges)
  playerP.collide(bloco)

  if(playerA.isTouching(lixo0)|| playerP.isTouching(lixo0)){
    lixo0.destroy();
    score = score + 1

    //AULA 48 - Inserção de som
    pegarItem.play()
  }

  if(playerA.isTouching(lixo1)|| playerP.isTouching(lixo1)){
    lixo1.destroy();
    score = score + 1

    //AULA 48 - Inserção de som
    pegarItem.play()
  }

  if(playerA.isTouching(lixo2)|| playerP.isTouching(lixo2)){
    lixo2.destroy();
    score = score + 1

    //AULA 48 - Inserção de som
    pegarItem.play()
  }

  if(playerA.isTouching(lixo3)|| playerP.isTouching(lixo3)){
    lixo3.destroy();
    score = score + 1

    //AULA 48 - Inserção de som
    pegarItem.play()
  }
  //AULA 48 - Troca de Tela para o Menu
  
  if(mousePressedOver(btVoltar)){
    window.location = "menu.html"
  }
  
  
  drawSprites();
    
  textSize(30)
  fill("black")
  text("pontos: " + score, 50, 50);
  
  if(score == 4){
    balaoFala0.visible = false;
    balaoFala1.visible = true;    
  }
 
}

//AULA 48 - Ir para a tela do Jogo
function irParaJogo() {
  window.location = "index.html"
}

//AULA 48 - DECOMPOSIÇÃO DO JOGO
/*
1 - Criar uma tela de Menu
2 - Fazer transição de Tela (ida e volta)
3 - Inserção de Som para pegar os objetos e de pulo
4 - Criar bloco para subir
5 - Inserir no gitHUb
*/

//AULA 47 - DECOMPOSIÇÃO DO JOGO
/*
1 - Inserir Pontuação
2 - Balão de fala
3 - Inserir imagens dos lixos
4 - Fazer a pontuação funcionar ao player tocar no lixo
5 - Transição de troca de balão de fala
6 - hospedar no github
*/

//AULA 46 - DECOMPOSIÇÃO DO JOGO
/*
1 - Inserir Personagem
2 - Criar movimentação de: pulo e andar (esquerda/direita)
3 - Espelhamento de movimento
4 - Bloqueio de Paredes da tela
5 - Hospedar no github
*/

//AULA 45 - DECOMPOSIÇÃO DO JOGO
/*
1 - Mudar background
2 - Colocar imagem da natureza
3 - Baixar imagem da natureza suja
4 - Baixar imagem de lixo
5 - Hospedar no github
*/



