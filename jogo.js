// musica

var song
var songPlay
var songShoot
var songJump
var songWin

// imagens

var imgBlocoChao
var imgBlocoMad
var imgBlocoSad
var imgBlocoFundo
var blockerMadVoador
var imgBoss
var imgChao
var personagem
var nuvem

// ---

var x = 100;
var y = 300;
var rectx = 500
var rectx2 = 350
var nuvemx1 = 550
var nuvemx2 = 830
var d = 0
var dia = 3
var pulo = false
var up = 20
var down = 0
var gameplay = false
var recorde = 0
var dificuldade = 0

// bonus devagar

var maisDevagar = 0
var iconeMaisDevagar = false
var avanco = 0
var devagar = false
var contaTempoDevagar = 0

// variaveis tiro

var tiroPositionY = [0, 0, 0, 0, 0, 0, 0]
var tiroPositionX = [0, 0, 0, 0, 0, 0, 0]
var indice = 0
var tiro1 = false
var tiro2 = false
var tiro3 = false
var tiro4 = false
var tiro5 = false
var tiro6 = false
var tiro7 = false
var tiro8 = false
var tiro9 = false
var tiro10 = false
var tiro11 = false
var intervaloEntreTiros = 0
var podeAtirar = true

var fase = 1

// enemies

var inimigInterval = 0
var inimigPositionY = [0, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500]
var inimigPositionX = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var indiceInimig = 0
var inimig1 = false
var inimig2 = false
var inimig3 = false
var inimig4 = false
var inimig5 = false
var inimig6 = false
var inimig7 = false
var inimig8 = false
var inimig9 = false
var maisInimigos = false
var dificil = 200

// variaveis boss

var bossX = 520
var bossY = 0
var lifeBoss = 250

// variaveis de status do jogo

var gameWin = false
var menu = true
var encerramento = 0
var proximaFase = false

function preload(){

  // sons

  song = loadSound('audio/awesomeness.wav')
  song.setVolume(0.1)
  songPlay = loadSound('audio/journey.mp3')
  songPlay.setVolume(0.1)
  songShoot = loadSound('audio/SHOOT001.mp3')
  songShoot.setVolume(0.1)
  songJump = loadSound('audio/SFX_Jump_05.wav')
  songJump.setVolume(0.1)
  songWin = loadSound('audio/indestructible.mp3')

  // imagens

  imgBlocoChao = loadImage('img/blockerPequeno.png')
  imgBlocoMad = loadImage('img/blockerMad.png')
  imgBlocoSad = loadImage('img/blockerSad.png')
  imgBlocoFundo = loadImage('img/snailShell.png')
  imgBoss = loadImage('img/boss.png')
  imgChao = loadImage('img/chaoFase1.png')
  blockerMadVoador = loadImage('img/blockerMadVoador.png')
  personagem = loadImage('img/ball.png')
  nuvem = loadImage('img/nuvem.png')

}

function setup() {
  createCanvas(512, 512);
  song.setVolume(0.1)
  song.loop()
}

function draw() {
  background(135, 206, 235);
  
  // menu

  if(menu){
    songPlay.stop()
    background(0, 255, 170);
    noFill()
    stroke(255)
    rect(10,10,492,492)
    fill(138, 43, 226)
    rect(65, 100, 400, 220)
    rect(203, 367, 65, 35)
    fill(255)
    noStroke()
    textSize(25)
    text('Bem-vindo ao NoConnection 2.0', 80, 60)
    textSize(18)
    text('Tutorial:', 225, 140)
    textSize(14)
    text('Use as setas para se mover', 175, 180)
    text('<- Direita    -> Esquerda    ^ Pular', 155, 205)
    text('Não tenha medo da esfera flutuante,', 140, 240)
    text('o máximo que ela pode fazer é alterar o tempo...', 120, 258)
    text('Ultimo conselho: não encoste nos quadrados. Boa sorte!', 90, 290)
    textSize(16)
    text('Pressione   ENTER   para iniciar o jogo', 125,390)
    textSize(13)
    if(keyIsDown(ENTER)){
      songPlay.loop()
      menu = false
      gameplay = true
      songWin.stop()
    }
  }

  // jogo rodando

  if(gameplay && menu == false){
    
    songWin.stop()
    song.stop()

    stroke(0)

    // -----------------------------------------------------------------------------------------------------------------------------
    // fase 1
    // -----------------------------------------------------------------------------------------------------------------------------

    if(fase == 1){

      //cenario

      image(imgChao, 0, 325)

      if(nuvemx1 > -100){
        nuvemx1 -= 1
      } else {
        nuvemx1 = 550
      }

      if(nuvemx2 > -100){
        nuvemx2 -= 1
      } else {
        nuvemx2 = 830
      }

      image(nuvem, nuvemx1, 80)
      image(nuvem, nuvemx2, 140)

      // bonus para ir mais devagar, bolinha laranja que desacelera o tempo

      maisDevagar++ // contador de tempo

      if(maisDevagar == 2000) {
        iconeMaisDevagar = true
      }

      // renderizar bolinha

      if(iconeMaisDevagar == true){
        avanco+= 4
        noStroke()
        fill(255, 153, 0)
        ellipse(530 - avanco, 200, 20, 20)
        fill(255)
        stroke(0)
        if(avanco >= 530){
          iconeMaisDevagar = false
        }
      }

      // detectar colisão com p5.collide2d.js

      if(collideCircleCircle(530 - avanco, 200, 20, x, y, 50) && iconeMaisDevagar == true){
        devagar = true
        iconeMaisDevagar = false
          avanco = 0
      }

      if(devagar){
        contaTempoDevagar++
        dificuldade = 0.4
        if(contaTempoDevagar >= 300){
          devagar = false
          contaTempoDevagar = 0
          dificuldade = 0.7
        }
      }

      // mover quadrado do cenário

      if(rectx2 > -25){
        rectx2 -= 1
      } else {
        rectx2 = 512
      }

      // controles

      if (keyIsDown(LEFT_ARROW) && x > 40){
        x-=5
        d-=0.1
      }

      if (keyIsDown(RIGHT_ARROW) && x < 480){
        x+=5
        d+=0.5
      }

      if (keyIsDown(UP_ARROW) && pulo == false){
        songJump.play()
        pulo = true
      }

      // pulo

      if(pulo == true){
        if(up >= 0){
          y -= up
          up--
        } else if(down <= 20){
          y += down
          down++
        } else {
          up = 20
          down = 0
          pulo = false
        }
      }

      // aumentar a dificuldade
      
      if(rectx > -50){
        rectx -= 4 + dificuldade * 10
      } else {
        rectx = 512
        dia++
      }

      d += .15 + dificuldade

      if(d > 1000){
        proximaFase = true
        rectx = 5000
      } else if(d > 800){
        dificuldade = 1
      } else if(d > 700){
        dificuldade = 0.9
      } else if(d > 650){
        dificuldade = 0.7
      } else if(d > 600){
        dificuldade = 0.5
      } else if(d > 525){
        dificuldade = 0.4
      } else if(d > 450){
        dificuldade = 0.3
      } else if(d > 350){
        dificuldade = 0.2
      } else if(d > 250){
        dificuldade = 0.125
      } else if(d > 150){
        dificuldade = 0.08
      } else if(d > 50){
        dificuldade = 0.05
      }

      // colisão com o quadrado do chão

      if(dist(x, y, rectx + 25, 300) < 50){
        gameplay = false
        if(d > recorde){
          recorde = d.toFixed(0)
        }
      }

      // elementos informativos

      noStroke()
      fill(0)

      text('Fase ' + fase + ': 1km!', 50, 50)

      text("Distância percorrida: " + d.toFixed(0) + "m", 325, 470)

      text('Recorde: '+ recorde + "m", 50, 470)

      stroke(0)
        
      //cenario

      stroke(0)
      fill(255)

      image(imgBlocoChao, rectx2, 300)

      image(imgBlocoMad, rectx -2 , 274)
      
      noStroke()
      fill(255, 40, 40)
      ellipse(x, y, 50, 50);
      if(pulo && (up > 10 || down > 10)){ // animação da bola no momento do pulo
        ellipse(x, y, 50, 60);
      }

      stroke(0)
      fill(255)
      line(0, 325, 512, 325)

      //proxima fase

    }

// --------------------------------------------------------------------------------------------------------------------------
// fase 2
// --------------------------------------------------------------------------------------------------------------------------


    if(fase == 2){

      // cenário

      image(imgBlocoChao, rectx2, 300) 
      image(imgChao, 0, 325)

      if(nuvemx1 > -100){
        nuvemx1 -= 1
      } else {
        nuvemx1 = 550
      }

      if(nuvemx2 > -100){
        nuvemx2 -= 1
      } else {
        nuvemx2 = 830
      }

      image(nuvem, nuvemx1, 80)
      image(nuvem, nuvemx2, 140)

      // inimigos

      inimigInterval+=2 // contador de tempo dos inimigos

      // alternador de inimigos

      if(inimigInterval % 250 == 0){
        inimigInterval = 0
        indiceInimig++
        inimigPositionX[indiceInimig] = 530
        inimigPositionY[indiceInimig] = Math.floor(Math.random() * (200 - 80 + 1)) + 80
        switch(indiceInimig){
          case 1: 
            inimig1 = true
            break
          case 2: 
            inimig2 = true
            break
          case 3: 
            inimig3 = true
            break
          case 4: 
            inimig4 = true
            break
          case 5: 
            inimig5 = true
            break
          case 6: 
            inimig6 = true
            break
          case 7: 
            inimig7 = true
            break
          case 8: 
            inimig8 = true
            break
          case 9: 
            inimig9 = true
            break
        }

        if(indiceInimig == 9){
          indiceInimig = 0
        }
      }

      // colisão inimigos x tiros

      function morreu(indice){      
        if(collideRectRect(inimigPositionX[indice], inimigPositionY[indice], 30, 30, tiroPositionX[1], tiroPositionY[1], 7, 10)){
          tiro1 = false
          inimigPositionY[indice] = 700
          tiroPositionY[1] = 900
        } else if(collideRectRect(inimigPositionX[indice], inimigPositionY[indice], 30, 30, tiroPositionX[2], tiroPositionY[2], 7, 10)){
          tiro2 = false
          inimigPositionY[indice] = 700
          tiroPositionY[2] = 900
        } else if(collideRectRect(inimigPositionX[indice], inimigPositionY[indice], 30, 30, tiroPositionX[3], tiroPositionY[3], 7, 10)){
          tiro3 = false
          inimigPositionY[indice] = 700
          tiroPositionY[3] = 900
        } else if(collideRectRect(inimigPositionX[indice], inimigPositionY[indice], 30, 30, tiroPositionX[4], tiroPositionY[4], 7, 10)){
          tiro4 = false
          inimigPositionY[indice] = 700
          tiroPositionY[4] = 900
        } else if(collideRectRect(inimigPositionX[indice], inimigPositionY[indice], 30, 30, tiroPositionX[5], tiroPositionY[5], 7, 10)){
          tiro5 = false
          inimigPositionY[indice] = 700
          tiroPositionY[5] = 900
        } else if(collideRectRect(inimigPositionX[indice], inimigPositionY[indice], 30, 30, tiroPositionX[6], tiroPositionY[6], 7, 10)){
          tiro6 = false
          inimigPositionY[indice] = 700
          tiroPositionY[6] = 900
        } else if(collideRectRect(inimigPositionX[indice], inimigPositionY[indice], 30, 30, tiroPositionX[7], tiroPositionY[7], 7, 10)){
          tiro7 = false
          inimigPositionY[indice] = 700
          tiroPositionY[7] = 900
        } else if(collideRectRect(inimigPositionX[indice], inimigPositionY[indice], 30, 30, tiroPositionX[8], tiroPositionY[8], 7, 10)){
          tiro8 = false
          inimigPositionY[indice] = 700
          tiroPositionY[8] = 900
        } else if(collideRectRect(inimigPositionX[indice], inimigPositionY[indice], 30, 30, tiroPositionX[9], tiroPositionY[9], 7, 10)){
          tiro9 = false
          inimigPositionY[indice] = 700
          tiroPositionY[9] = 900
        } else if(collideRectRect(inimigPositionX[indice], inimigPositionY[indice], 30, 30, tiroPositionX[10], tiroPositionY[10], 7, 10)){
          tiro10 = false
          inimigPositionY[indice] = 700
          tiroPositionY[10] = 900
        } else if(collideRectRect(inimigPositionX[indice], inimigPositionY[indice], 30, 30, tiroPositionX[11], tiroPositionY[11], 7, 10)){
          tiro11 = false
          inimigPositionY[indice] = 700
          tiroPositionY[11] = 900
        }
      }

      // verificar se colidiu com o jogador

      function bateuNoEnemy(indice){
        if(collideRectCircle(inimigPositionX[indice], inimigPositionY[indice], 30, 30, x, y, 50, 50)){
          gameplay = false
          if(d > recorde){
            recorde = d.toFixed(0)
          }
        }
      }

      // spawn inimigos

      function spawnEnemy(indice) {
        rect(inimigPositionX[indice], inimigPositionY[indice], 28, 28)
        image(blockerMadVoador, inimigPositionX[indice]-2, inimigPositionY[indice]-2)
        inimigPositionX[indice] -= 3
        bateuNoEnemy(indice)
      }

      // renderizar inimigos

      if(inimig1){
        spawnEnemy(1)
        morreu(1)
      }

      if(inimig2){
        spawnEnemy(2)
        morreu(2)
      }

      if(inimig3){
        spawnEnemy(3)
        morreu(3)
      }

      if(inimig4){
        spawnEnemy(4)
        morreu(4)
      }

      if(inimig5){
        spawnEnemy(5)
        morreu(5)
      }

      if(inimig6){
        spawnEnemy(6)
        morreu(6)
      }

      if(inimig7){
        spawnEnemy(7)
        morreu(7)
      }

      if(inimig8){
        spawnEnemy(8)
        morreu(8)
      }

      if(inimig9){
        spawnEnemy(9)
        morreu(9)
      }

      // bonus devagar

      maisDevagar++

      if(maisDevagar == 2000) {
        iconeMaisDevagar = true
      }

      if(iconeMaisDevagar == true){
        avanco+= 4
        ellipse(530 - avanco, 200, 20, 20)
        if(avanco >= 530){
          iconeMaisDevagar = false
        }
      }

      if(collideCircleCircle(530 - avanco, 200, 20, x, y, 50) && iconeMaisDevagar == true){
        devagar = true
        iconeMaisDevagar = false
          avanco = 0
      }

      if(devagar){
        contaTempoDevagar++
        dificuldade = 0.4
        if(contaTempoDevagar >= 200){
          devagar = false
          contaTempoDevagar = 0
          dificuldade = 0.7
        }
      }

      //tiros 

      // algoritmo para garantir que exista um intervalo entre os tiros

      if(intervaloEntreTiros > 0 && intervaloEntreTiros < 10){
        intervaloEntreTiros++
        podeAtirar = false
      } else {
        intervaloEntreTiros = 0
        podeAtirar = true
      }

      // alternador de tiros

      if(keyIsDown(CONTROL) && podeAtirar == true){
        songShoot.play()
        intervaloEntreTiros = 1
        indice++
        tiroPositionX[indice] = x
        tiroPositionY[indice] = y
        switch(indice){
          case 1: 
            tiro1 = true
            tiro2 = false
            break
          case 2: 
            tiro2 = true
            tiro3 = false
            break
          case 3: 
            tiro3 = true
            tiro4 = false
            break
          case 4: 
            tiro4 = true
            tiro5 = false
            break
          case 5: 
            tiro5 = true
            tiro6 = false
            break
          case 6: 
            tiro6 = true
            tiro7 = false
            break
          case 7: 
            tiro7 = true
            tiro8 = false
            break
          case 8: 
            tiro8 = true
            tiro9 = false
            break
          case 9: 
            tiro9 = true
            tiro10 = false
            break
          case 10: 
            tiro10 = true
            tiro11 = false
            break
          case 11: 
            tiro11 = true
            tiro1 = false
            break
        }

        if(indice == 11){
          indice = 0
        }
      }

      // spawn tiro

      function spawnTiro(indice){
        fill(255, 255, 0)
        noStroke()
        rect(tiroPositionX[indice], tiroPositionY[indice], 10, 7)
        tiroPositionX[indice] += 5
      }

      if(tiro1 ){
       spawnTiro(1)
      }

      if(tiro2){
        spawnTiro(2)
      }

      if(tiro3){
        spawnTiro(3)
      }

      if(tiro4){
        spawnTiro(4)
      }

      if(tiro5){
        spawnTiro(5)
      }

      if(tiro6){
        spawnTiro(6)
      }

      if(tiro7){
        spawnTiro(7)
      }

      if(tiro8){
        spawnTiro(8)
      }

      if(tiro9){
        spawnTiro(9)
      }

      if(tiro10){
        spawnTiro(10)
      }

      if(tiro11){
        spawnTiro(11)
      }

      // mover quadrado do cenário

      if(rectx2 > -25){
        rectx2 -= 1
      } else {
        rectx2 = 512
      }

      // controles

      if (keyIsDown(LEFT_ARROW) && x > 40){
        x-=5
        d-=0.1
      }

      if (keyIsDown(RIGHT_ARROW) && x < 480){
        x+=5
        d+=0.5
      }

      if (keyIsDown(UP_ARROW) && pulo == false){
        songJump.play()
        pulo = true
      }

      // pulo

      if(pulo == true){
        if(up >= 0){
          y -= up
          up--
        } else if(down <= 20){
          y += down
          down++
        } else {
          up = 20
          down = 0
          pulo = false
        }
      }

      // aumentar a dificuldade
      
      if(rectx > -50){
        rectx -= 4 + dificuldade * 10
      } else {
        rectx = 512
        dia++
      }

      d += .15 + dificuldade

      if(d > 700){
        proximaFase = true
        rectx = 5000
      } else if(d > 650){
        dificuldade = 0.7
      } else if(d > 600){
        dificuldade = 0.5
      } else if(d > 525){
        dificuldade = 0.4
      } else if(d > 450){
        dificuldade = 0.3
      } else if(d > 350){
        dificuldade = 0.2
      } else if(d > 250){
        dificuldade = 0.125
      } else if(d > 150){
        dificuldade = 0.08
      } else if(d > 50){
        dificuldade = 0.05
      }

      // colisão

      if(dist(x, y, rectx + 25, 300) < 50){
        gameplay = false
        if(d > recorde){
          recorde = d.toFixed(0)
        }
      }

      noStroke()
      fill(0)


      text('Fase ' + fase + ': quadradinhos!! Ainda bem que você tem o CTRL... (700m)', 50, 50)

      text("Distância percorrida: " + d.toFixed(0) + "m", 325, 470)

      text('Recorde: '+ recorde + "m", 50, 470)

      stroke(0)
        
      //cenario


      image(imgBlocoMad, rectx -2 , 274)

      stroke(0)
      fill(255)
      
      
      // rect(rectx, 275, 50, 50)
      
      noStroke()
      fill(255, 40, 40)
      
      ellipse(x, y, 50, 50);
      if(pulo && (up > 10 || down > 10)){
        ellipse(x, y, 50, 60);
      }

      fill(255)
      stroke(0)
      line(0, 325, 512, 325)

      //proxima fase
    }

// ---------------------------------------------------------------------------------------------------------------------------
// fase 3
// ---------------------------------------------------------------------------------------------------------------------------

    if(fase == 3){

      // cenário

      image(imgBlocoChao, rectx2, 300) 
      image(imgChao, 0, 325)

      if(nuvemx1 > -100){
        nuvemx1 -= 1
      } else {
        nuvemx1 = 550
      }

      if(nuvemx2 > -100){
        nuvemx2 -= 1
      } else {
        nuvemx2 = 830
      }

      image(nuvem, nuvemx1, 80)
      image(nuvem, nuvemx2, 140)

      noStroke()
      fill(0) 

      // inimigos

      inimigInterval += 2

      if(inimigInterval % dificil == 0){
        inimigInterval = 0
        indiceInimig++
        inimigPositionX[indiceInimig] = 530
        inimigPositionY[indiceInimig] = Math.floor(Math.random() * (280 - 150 + 1)) + 150
        switch(indiceInimig){
          case 1: 
            inimig1 = true
            break
          case 2: 
            inimig2 = true
            break
          case 3: 
            inimig3 = true
            break
          case 4: 
            inimig4 = true
            break
          case 5: 
            inimig5 = true
            break
          case 6: 
            inimig6 = true
            break
          case 7: 
            inimig7 = true
            break
          case 8: 
            inimig8 = true
            break
          case 9: 
            inimig9 = true
            break
        }

        if(indiceInimig == 9){
          indiceInimig = 0
        }
      }

      // colisão inimigos x tiros

      function morreu(indice){      
        if(collideRectRect(inimigPositionX[indice], inimigPositionY[indice], 30, 30, tiroPositionX[1], tiroPositionY[1], 7, 10)){
          tiro1 = false
          inimigPositionY[indice] = 700
          tiroPositionY[1] = 900
        } else if(collideRectRect(inimigPositionX[indice], inimigPositionY[indice], 30, 30, tiroPositionX[2], tiroPositionY[2], 7, 10)){
          tiro2 = false
          inimigPositionY[indice] = 700
          tiroPositionY[2] = 900
        } else if(collideRectRect(inimigPositionX[indice], inimigPositionY[indice], 30, 30, tiroPositionX[3], tiroPositionY[3], 7, 10)){
          tiro3 = false
          inimigPositionY[indice] = 700
          tiroPositionY[3] = 900
        } else if(collideRectRect(inimigPositionX[indice], inimigPositionY[indice], 30, 30, tiroPositionX[4], tiroPositionY[4], 7, 10)){
          tiro4 = false
          inimigPositionY[indice] = 700
          tiroPositionY[4] = 900
        } else if(collideRectRect(inimigPositionX[indice], inimigPositionY[indice], 30, 30, tiroPositionX[5], tiroPositionY[5], 7, 10)){
          tiro5 = false
          inimigPositionY[indice] = 700
          tiroPositionY[5] = 900
        } else if(collideRectRect(inimigPositionX[indice], inimigPositionY[indice], 30, 30, tiroPositionX[6], tiroPositionY[6], 7, 10)){
          tiro6 = false
          inimigPositionY[indice] = 700
          tiroPositionY[6] = 900
        } else if(collideRectRect(inimigPositionX[indice], inimigPositionY[indice], 30, 30, tiroPositionX[7], tiroPositionY[7], 7, 10)){
          tiro7 = false
          inimigPositionY[indice] = 700
          tiroPositionY[7] = 900
        } else if(collideRectRect(inimigPositionX[indice], inimigPositionY[indice], 30, 30, tiroPositionX[8], tiroPositionY[8], 7, 10)){
          tiro8 = false
          inimigPositionY[indice] = 700
          tiroPositionY[8] = 900
        } else if(collideRectRect(inimigPositionX[indice], inimigPositionY[indice], 30, 30, tiroPositionX[9], tiroPositionY[9], 7, 10)){
          tiro9 = false
          inimigPositionY[indice] = 700
          tiroPositionY[9] = 900
        } else if(collideRectRect(inimigPositionX[indice], inimigPositionY[indice], 30, 30, tiroPositionX[10], tiroPositionY[10], 7, 10)){
          tiro10 = false
          inimigPositionY[indice] = 700
          tiroPositionY[10] = 900
        } else if(collideRectRect(inimigPositionX[indice], inimigPositionY[indice], 30, 30, tiroPositionX[11], tiroPositionY[11], 7, 10)){
          tiro11 = false
          inimigPositionY[indice] = 700
          tiroPositionY[11] = 900
        }
      }

      // verificar se colidiu com o jogador

      function bateuNoEnemy(indice){
        if(collideRectCircle(inimigPositionX[indice], inimigPositionY[indice], 30, 30, x, y, 50, 50)){
          gameplay = false
          if(d > recorde){
            recorde = d.toFixed(0)
          }
        }
      }

      // life boss

      function atingiuOBoss(){ // detectar se o boss foi atingido
        if(collideRectRect(bossX, bossY, 50, 325, tiroPositionX[1], tiroPositionY[1], 7, 10)){
          tiro1 = false
          lifeBoss -= 4
          tiroPositionY[1] = 900
        } else if(collideRectRect(bossX, bossY, 50, 325, tiroPositionX[2], tiroPositionY[2], 7, 10)){
          tiro2 = false
          lifeBoss -= 4
          tiroPositionY[2] = 900
        } else if(collideRectRect(bossX, bossY, 50, 325, tiroPositionX[3], tiroPositionY[3], 7, 10)){
          tiro3 = false
          lifeBoss -= 4
          tiroPositionY[3] = 900
        } else if(collideRectRect(bossX, bossY, 50, 325, tiroPositionX[4], tiroPositionY[4], 7, 10)){
          tiro4 = false
          lifeBoss -= 4
          tiroPositionY[4] = 900
        } else if(collideRectRect(bossX, bossY, 50, 325, tiroPositionX[5], tiroPositionY[5], 7, 10)){
          tiro5 = false
          lifeBoss -= 4
          tiroPositionY[5] = 900
        } else if(collideRectRect(bossX, bossY, 50, 325, tiroPositionX[6], tiroPositionY[6], 7, 10)){
          tiro6 = false
          lifeBoss -= 4
          tiroPositionY[6] = 900
        } else if(collideRectRect(bossX, bossY, 50, 325, tiroPositionX[7], tiroPositionY[7], 7, 10)){
          tiro7 = false
          lifeBoss -= 4
          tiroPositionY[7] = 900
        } else if(collideRectRect(bossX, bossY, 50, 325, tiroPositionX[8], tiroPositionY[8], 7, 10)){
          tiro8 = false
          lifeBoss -= 4
          tiroPositionY[8] = 900
        } else if(collideRectRect(bossX, bossY, 50, 325, tiroPositionX[9], tiroPositionY[9], 7, 10)){
          tiro9 = false
          lifeBoss -= 4
          tiroPositionY[9] = 900
        } else if(collideRectRect(bossX, bossY, 50, 325, tiroPositionX[10], tiroPositionY[10], 7, 10)){
          tiro10 = false
          lifeBoss -= 4
          tiroPositionY[10] = 900
        } else if(collideRectRect(bossX, bossY, 50, 325, tiroPositionX[11], tiroPositionY[11], 7, 10)){
          tiro11 = false
          lifeBoss -= 4
          tiroPositionY[11] = 900
        }
      }

      // spawn boss

      function spawnBoss(){
        // rect(bossX, bossY, 100, 325)
        image(imgBoss, bossX, 25)
        bossX -= 0.3
      }

      if(lifeBoss <= 2){ // detectar se o boss morreu
        gameWin = true
      }

      // algoritmo para que o boss nasça na hora correta, e com a animação no tempo correto

      if(d > 600 && d < 680){
        spawnBoss()
      } else if(d >= 680){
        atingiuOBoss()
        image(imgBoss, bossX, 25)
        fill(255, 10, 10)
        rect(131, 400, lifeBoss, 10)
      }

      // spawn inimigos

      function spawnEnemy(indice) {
        // rect(inimigPositionX[indice], inimigPositionY[indice], 28, 28)
        if(d < 500){
          image(blockerMadVoador, inimigPositionX[indice]-2, inimigPositionY[indice]-2)
        }
        if(d > 1000){
          inimigInterval = 0
          inimigPositionX[indice] = 5000
        } else if(d > 700){
          inimigPositionX[indice] -= 7
          image(blockerMadVoador, inimigPositionX[indice]-2, inimigPositionY[indice]-2)
        } else if(d > 500){
          inimigPositionX[indice] -= 7
          inimigInterval = 0
          inimigPositionX[indice] = 5000
          dificil = 70
        } else if(d > 400) {
          inimigPositionX[indice] -= 6
        } else if(d > 300) {
          dificil = 100
          inimigPositionX[indice] -= 5
        } else if(d > 200) {
          inimigPositionX[indice] -= 4
        } else if(d > 100) {
          inimigPositionX[indice] -= 3.5
        } else {
          inimigPositionX[indice] -= 3
        }
        bateuNoEnemy(indice)
      }

      if(inimig1){
        spawnEnemy(1)
        morreu(1)
      }

      if(inimig2){
        spawnEnemy(2)
        morreu(2)
      }

      if(inimig3){
        spawnEnemy(3)
        morreu(3)
      }

      if(inimig4){
        spawnEnemy(4)
        morreu(4)
      }

      if(inimig5){
        spawnEnemy(5)
        morreu(5)
      }

      if(inimig6){
        spawnEnemy(6)
        morreu(6)
      }

      if(inimig7){
        spawnEnemy(7)
        morreu(7)
      }

      if(inimig8){
        spawnEnemy(8)
        morreu(8)
      }

      if(inimig9){
        spawnEnemy(9)
        morreu(9)
      }

      //tiros 

      if(intervaloEntreTiros > 0 && intervaloEntreTiros < 10){
        intervaloEntreTiros++
        podeAtirar = false
      } else {
        intervaloEntreTiros = 0
        podeAtirar = true
      }

      if(keyIsDown(CONTROL) && podeAtirar == true){
        songShoot.play()
        intervaloEntreTiros = 1
        indice++
        tiroPositionX[indice] = x
        tiroPositionY[indice] = y
        switch(indice){
          case 1: 
            tiro1 = true
            tiro2 = false
            break
          case 2: 
            tiro2 = true
            tiro3 = false
            break
          case 3: 
            tiro3 = true
            tiro4 = false
            break
          case 4: 
            tiro4 = true
            tiro5 = false
            break
          case 5: 
            tiro5 = true
            tiro6 = false
            break
          case 6: 
            tiro6 = true
            tiro7 = false
            break
          case 7: 
            tiro7 = true
            tiro8 = false
            break
          case 8: 
            tiro8 = true
            tiro9 = false
            break
          case 9: 
            tiro9 = true
            tiro10 = false
            break
          case 10: 
            tiro10 = true
            tiro11 = false
            break
          case 11: 
            tiro11 = true
            tiro1 = false
            break
        }

        if(indice == 11){
          indice = 0
        }
      }

      // spawn tiro

      function spawnTiro(indice){
        fill(255, 255, 0)
        noStroke()
        rect(tiroPositionX[indice], tiroPositionY[indice], 10, 7)
        tiroPositionX[indice] += 5
      }

      if(tiro1 ){
       spawnTiro(1)
      }

      if(tiro2){
        spawnTiro(2)
      }

      if(tiro3){
        spawnTiro(3)
      }

      if(tiro4){
        spawnTiro(4)
      }

      if(tiro5){
        spawnTiro(5)
      }

      if(tiro6){
        spawnTiro(6)
      }

      if(tiro7){
        spawnTiro(7)
      }

      if(tiro8){
        spawnTiro(8)
      }

      if(tiro9){
        spawnTiro(9)
      }

      if(tiro10){
        spawnTiro(10)
      }

      if(tiro11){
        spawnTiro(11)
      }

      // mover quadrado

      if(rectx2 > -25){
        rectx2 -= 1
      } else {
        rectx2 = 512
      }

      // controles

      if (keyIsDown(LEFT_ARROW) && x > 40){
        x-=5
        d-=0.1
      }

      if (keyIsDown(RIGHT_ARROW) && x < 480){
        x+=5
        d+=0.5
      }

      if (keyIsDown(UP_ARROW) && pulo == false){
        songJump.play()
        pulo = true
      }

      // pulo

      if(pulo == true){
        if(up >= 0){
          y -= up
          up--
        } else if(down <= 20){
          y += down
          down++
        } else {
          up = 20
          down = 0
          pulo = false
        }
      }

      // aumentar a dificuldade
    	
      if(rectx > -50){
        rectx -= 4 + dificuldade * 10
      } else {
        rectx = 512
        dia++
      }

      d += .15 + dificuldade

      if(d > 525){
        dificuldade = 0.3
      } else if(d > 450){
        dificuldade = 0.2
      } else if(d > 250){
        dificuldade = 0.125
      } else if(d > 150){
        dificuldade = 0.08
      } else if(d > 50){
        dificuldade = 0.05
      }

      // colisão

      if(d < 500 && dist(x, y, rectx + 25, 300) < 50){
        gameplay = false
        if(d > recorde){
          recorde = d.toFixed(0)
        }
      }
      //jogador 

      ellipse(x, y, 50, 50);

      noStroke()
      fill(0)


      text('Fase ' + fase + ': cuidado com o Boss!', 50, 50)

      text("Distância percorrida: " + d.toFixed(0) + "m", 325, 470)

      text('Recorde: '+ recorde + "m", 50, 470)

      stroke(0)
        
      //cenario

      if(d < 500){
        image(imgBlocoMad, rectx - 2 , 274)
      }

      stroke(0)
      fill(255)
      
      
      // rect(rectx, 275, 50, 50)
      
      noStroke()
      fill(255, 40, 40)
      
      ellipse(x, y, 50, 50);
      if(pulo && (up > 10 || down > 10)){
        ellipse(x, y, 50, 60);
      }

      fill(255)
      stroke(0)
      line(0, 325, 512, 325)

      //proxima fase
    }

    // gameOver -----------------------------------------------------------------------------------------------------

  } else if(gameWin == false && menu == false) {

    // cenário

    image(imgBlocoChao, rectx2, 300) 
    image(imgChao, 0, 325)

    if(nuvemx1 > -100){
      nuvemx1 -= 1
    } else {
      nuvemx1 = 550
    }

    if(nuvemx2 > -100){
      nuvemx2 -= 1
    } else {
      nuvemx2 = 830
    }

    image(nuvem, nuvemx1, 80)
    image(nuvem, nuvemx2, 140)

    noStroke()
    fill(0)

    text('Fase ' + fase, 50, 50)
    text("Distância percorrida: " + d.toFixed(0) + "m", 325, 470)
    text('Recorde: '+ recorde + "m", 50, 470)
    
    //cenario

    stroke(0)
    fill(255)
    // rect(rectx2, 300,25, 25)
    image(imgBlocoChao, rectx2, 300)

    if(fase < 3 && d < 500){
      image(imgBlocoMad, rectx -2 , 274)
    }
    
    noStroke()
    fill(255, 40, 40)
    ellipse(x, y, 50, 50);

    noStroke()
    fill(0)
    text("Fim de jogo!", 220, 220)
    text("Pressione ENTER para jogar novamente", 150, 250)
    stroke(0)
    line(0, 325, 512, 325)

    lifeBoss = 250

    menu = false
  }

  // Ganhou ------------------------------------------------------------------------------------------------------

  if(gameWin){
    encerramento++
    if(encerramento > 20){
      fill(0, 255, 170)
      rect(0,-1,512,513)
      fill(138, 43, 226)
      rect(160, 378, 65, 35)
      noFill()
      stroke(255)
      rect(10, 10, 492, 492)
      noStroke()
      fill(255)
      textSize(30)
      text('Parabéns, você ganhou!!', 87, 200)
      textSize(16)
      text('Pressione   ENTER   para jogar novamente!', 80, 400)

      if(keyIsDown(ENTER)){ // reset das variáveis
        menu = true
        gameplay = false
        gameWin = false
        encerramento = 0
        x = 100;
        y = 300;
        rectx = 500
        rectx2 = 350
        d = 0
        dia = 3
        pulo = false
        up = 20
        down = 0
        gameplay = false
        dificuldade = 0
        velPulo = 1

        // bonus devagar

        maisDevagar = 0
        iconeMaisDevagar = false
        avanco = 0
        devagar = false
        contaTempoDevagar = 0

        // variaveis tiro

        tiroPositionY = [0, 0, 0, 0, 0, 0, 0]
        tiroPositionX = [0, 0, 0, 0, 0, 0, 0]
        indice = 0
        tiro1 = false
        tiro2 = false
        tiro3 = false
        tiro4 = false
        tiro5 = false
        tiro6 = false
        tiro7 = false
        tiro8 = false
        tiro9 = false
        tiro10 = false
        tiro11 = false
        intervaloEntreTiros = 0
        podeAtirar = true

        // enemies

        inimigInterval = 0
        inimigPositionY = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        inimigPositionX = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        indiceInimig = 0
        inimig1 = false
        inimig2 = false
        inimig3 = false
        inimig4 = false
        inimig5 = false
        inimig6 = false
        inimig7 = false
        inimig8 = false
        inimig9 = false
        maisInimigos = false
        dificil = 200

        // variaveis boss

        bossX = 520
        bossY = 0
        lifeBoss = 250

        menu = true
        proximaFase = false
        gameWin = false
        encerramento = 0
        fase = 1
      }
    }
  }

  // próxima fase --------------------------------------------------------------------------------------------------

  if(proximaFase){
    songJump.stop()
    songShoot.stop()
    encerramento++ // contador de tempo para suavizar a transição

    if (encerramento > 20) {
      fill(0, 255, 170)
      rect(0,-1,512,513)
      fill(138, 43, 226)
      rect(160, 378, 65, 35)
      noFill()
      stroke(255)
      rect(10, 10, 492, 492)
      noStroke()
      fill(255)
      textSize(60)
      text('Muito bem!!', 105, 200)
      textSize(16)
      text('Pressione   ENTER   para ir para a próxima fase', 81, 400)

      if(keyIsDown(ENTER)){ // reset das variáveis
        x = 100;
        y = 300;
        rectx = 500
        rectx2 = 350
        d = 0
        dia = 3
        pulo = false
        up = 20
        down = 0
        gameplay = false
        dificuldade = 0
        velPulo = 1

        // bonus devagar

        maisDevagar = 0
        iconeMaisDevagar = false
        avanco = 0
        devagar = false
        contaTempoDevagar = 0

        // variaveis tiro

        tiroPositionY = [0, 0, 0, 0, 0, 0, 0]
        tiroPositionX = [0, 0, 0, 0, 0, 0, 0]
        indice = 0
        tiro1 = false
        tiro2 = false
        tiro3 = false
        tiro4 = false
        tiro5 = false
        tiro6 = false
        tiro7 = false
        tiro8 = false
        tiro9 = false
        tiro10 = false
        tiro11 = false
        intervaloEntreTiros = 0
        podeAtirar = true

        // enemies

        inimigInterval = 0
        inimigPositionY = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        inimigPositionX = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        indiceInimig = 0
        inimig1 = false
        inimig2 = false
        inimig3 = false
        inimig4 = false
        inimig5 = false
        inimig6 = false
        inimig7 = false
        inimig8 = false
        inimig9 = false
        maisInimigos = false
        dificil = 200

        // variaveis boss

        bossX = 520
        bossY = 0
        lifeBoss = 250

        menu = true
        proximaFase = false
        gameWin = false
        encerramento = 0
        fase++
      }
    }
  }

  // restart -------------------------------------------------------------------------------------------------------
  
  if(keyIsDown(ENTER) && gameplay == false && gameWin == false && menu == false){
    x = 100;
    y = 300;
    rectx = 500
    rectx2 = 350
    d = 0
    dia = 3
    pulo = false
    up = 20
    down = 0
    gameplay = false
    dificuldade = 0
    velPulo = 1

    // bonus devagar

    maisDevagar = 0
    iconeMaisDevagar = false
    avanco = 0
    devagar = false
    contaTempoDevagar = 0

    // variaveis tiro

    tiroPositionY = [0, 0, 0, 0, 0, 0, 0]
    tiroPositionX = [0, 0, 0, 0, 0, 0, 0]
    indice = 0
    tiro1 = false
    tiro2 = false
    tiro3 = false
    tiro4 = false
    tiro5 = false
    tiro6 = false
    tiro7 = false
    tiro8 = false
    tiro9 = false
    tiro10 = false
    tiro11 = false
    intervaloEntreTiros = 0
    podeAtirar = true

    // enemies

    inimigInterval = 0
    inimigPositionY = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    inimigPositionX = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    indiceInimig = 0
    inimig1 = false
    inimig2 = false
    inimig3 = false
    inimig4 = false
    inimig5 = false
    inimig6 = false
    inimig7 = false
    inimig8 = false
    inimig9 = false
    maisInimigos = false
    dificil = 200

    // variaveis boss

    bossX = 520
    bossY = 0
    lifeBoss = 250

    menu = true
    proximaFase = false
    gameWin = false
    encerramento = 0
  }
}