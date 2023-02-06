let loc = 0;
let score = 0;
let miss = 0;
let words = ["とりあえず、これらの疑問を持って、我々はを念入りに考えましょう。","しかし、こうした件は全部が重要ではない。","もっと重要なのは、 なんのことで発生したのか。","この方面から考えるなら、私からすると、 こうであれば、 一体どんな存在なのかをきっちりわかるのが全ての問題の解くキーとなります。","昔マーフィーはこう言ったことがある、貴方は他人の責任をとる必要はない。貴方が他人に対して負っていることといえば、それは愛と善意だ。こうした中、私の疑問が解けました。","そうだとすると、 私からすると、 こうであれば。","私にとって、 一体どんな存在なのかをきっちりわかるのが全ての問題の解くキーとなります。","一般論を述べると、問題のコツをマスターすれば、残りは全て刃を迎えて解くと思われます。","昔勝海舟は不意にこう言いました、おこないはおれのもの、批判は他人のもの、おれの知ったことじゃない。それによって私は啓発されました。"," 誰もご存知の通り、意義さえあれば、慎重に考えざるを得ない。","そうだとすると、 こうした困難な選択肢に向き合って、私は思いを巡らせ、居ても立っても居られないのです。","もし平日に現れるとしたら、我々はそれが現れたと言う事実を考えなくてはいけないです。"];
let Romes = ["toriaezu,koreranogimonwomotte,warewarehanenirinikangaemasyou.","sikasi,kousitakenhazenbugazyuuyoudehanai.","mottozyuuyounanoha,nannokotodehasseisitanoka.","konohoumenkarakangaerunara,watasikarasuruto,koudeareba,ittaidonnasonzainanokawokittiriwakarunogasubetenomondainotokuki-tonarimasu.","mukasima-fi-hakouittakotogaaru,anatahataninnosekininwotoruhituyouhanai.anatagataninnitaisiteotteirukototoieba,sorehaaitozenida.kousitanaka,watasinogimongatokemasita.","soudatosuruto,watasikarasuruto,koudeareba.","watasinitotte,ittaidonnasonzainanokawokittiriwakarunogasubetenomondainotokuki-tonarimasu.","ippanronwonoberuto,mondainokotuwomasuta-sureba,nokorihasubetehawomukaetetokutoomowaremasu.","mukasikatukaisyuuhahuinikouiimasita,okonaihaorenomono,hihanhataninnomono,orenosittakotozyanai.soreniyottewatasihakeihatusaremasita.","daremogozonzinotouri,igisaeareba,sintyounikangaezaruwoenai.","soudatosuruto,kousitakonnannasentakusinimukiatte,watasihaomoiwomegurase,itemotattemoirarenainodesu.","mosiheizituniarawarerutositara,warewarehasoregaarawaretatoiuzizituwokangaenakutehaikenaidesu."];
let word;
var count = 0;
var point = [];
var a="";
var aText="";
var bar = '<font color="orange" id="bar">|</font>';
var str="";
let random = [];
let kanamoji;
let Rome;
var PassSec = 30;
var timeCount;
var TypeKey = 0;
var TypeScore = 0;
var ACCScore = 0;


const Button = document.getElementById("startbutton");
let Word = document.getElementById("word");
const Score = document.getElementById("score");
const Miss = document.getElementById("MissType");
let Text = document.getElementById("rome");
const Delete = document.getElementById("delete");
const Time = document.getElementById("time");
const KPM = document.getElementById("kpmScore");
const ACC = document.getElementById("accScore");
const RES = document.getElementById("restart");

function Random(){
  var a = words.length-1;
  for(var i = 0; i < a; i++){
  while(true){
    var tmp = Math.floor(Math.random()*(a - 0 + 1)) + 0;
    if(!random.includes(tmp)){
      random.push(tmp);
      break;
    }
  }
  }
}

window.onload = function(){
  TypeScore = 0;
  ACCScore = 0;
  timeCount = 0;
  Random();
  Rome = Romes[random[count]];
  Word.textContent = words[random[count]]; 
  Text.innerHTML = Rome;
}

function SetTime(time){
  PassSec = time;
  Time.textContent = time;
}

function Countdown(){
  var dt = new Date();
  var endDt = new Date(dt.getTime() + PassSec * 1000);
  
  var cnt = PassSec;
  var id = setInterval(function(){
    cnt--;
    Time.textContent = cnt;
    dt = new Date();
    if(cnt == 0)
    {
      clearInterval(id);
      window.removeEventListener("keydown", keydownEvent);
      TypeScore = (TypeKey / PassSec) * 60;
      ACCScore = Math.trunc(((TypeKey - miss) / TypeKey) * 100);
      KPM.textContent = TypeScore;
      Miss.textContent = miss;
      ACC.textContent = ACCScore + "%";
      RES.textContent = "ここを押してリスタート";   
    }
  },1000);
}

function TrueTextupdate(){
  let cText;
  cText = Rome.charAt(loc);
  aText = '<font color="white">'+cText+'</font>';
  Text.innerHTML = a + aText + bar + Rome.substring(loc+1);
  a += aText;
  point[loc]=1;
}

function FalseTextupdate(){
  let cText;
  cText = Rome.charAt(loc);
  aText = '<font color="red">'+cText+'</font>';
  Text.innerHTML = a + aText + bar + Rome.substring(loc+1);
  a += aText;
  point[loc]=0;
}

function deleteText(){
  let cText;
  cText = Rome.charAt(loc);
  aText = '<font color="">'+cText+'</font>';
  if(point[loc]==1){
    str = a.slice(0,-28);
  }if(point[loc]==0){
    str = a.slice(0,-26);
  }
  a = str;
  Text.innerHTML = a + bar + aText + Rome.substring(loc+1);
  point.pop();
}

window.addEventListener("keydown", keydownEvent); 
  
function keydownEvent(e){
  
  if(timeCount == 0){
    Countdown();
    timeCount = 1;
  }
  if(loc === Rome.length-1){
      count++;
      loc = -1;
      Rome = Romes[random[count]];
      Word.innerHTML = words[random[count]]; 
      Text.textContent = Rome;
      a = "";
  }
  if(e.key === Rome[loc]){ 
    
    TrueTextupdate(); 
    loc++;
    TypeKey++;
  }
  else if(e.keyCode === 8){
    if(loc>0){
    loc--;
    }
    deleteText();
  }else{
    FalseTextupdate();
    loc++;
    miss++;
    TypeKey++;
  }
}
