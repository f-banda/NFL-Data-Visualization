function _1(md){return(
md`# **🏈 CSCI 490/627 - NFL Data Visualization Project 🏈**`
)}

function _selectedGame(Inputs,dataGames){return(
Inputs.select(
  dataGames,
  { label: "Game:", format: x => "Week " + x.week + " | " + x.visitorTeamAbbr + " @ " + x.homeTeamAbbr + " | Season " + x.season }
)
)}

function _selectedPlayID(Inputs,dataPlays,selectedGame){return(
Inputs.select(
  dataPlays.filter((d) => d.gameId === selectedGame.gameId),
  { label: "Play #:", format: x => x.playId }
)
)}

function _frame(Inputs,max_frame){return(
Inputs.range([1, max_frame], { label: "Play Frame:", step: 1, value: 1 })
)}

function _playButton(Inputs){return(
Inputs.button([["Start", value => 0], ["Pause", value => 1], ["Reset", value => 2]], { value: -1} )
)}

function _drawBreadcrumbs(Inputs){return(
Inputs.toggle({label: "Selected Player Path", value: false})
)}

function _7(selectedPlayID,htl){return(
htl.html`<div><h1 style="padding-left: 160px; height: 100px;"><center>
  ${selectedPlayID.playDescription}
</center></h1></div>`
)}

function _output(d3,width,height,drawField)
{
  var div = d3.create("div")
  .style("width", `${width}px`)
  .style("height", `${height}px`)

  var canvasMap = div.append("canvas")
  .attr("id", "canvas-map")
  .attr("width", "961")
  .attr("height", "427.4")

  var svg = div.append("canvas")
    .append("text")
    .text("Text with the background")
    .attr("y", 120)
    .attr("x", 150)
    .attr("font-size", 26)
    .attr("font-family", "monospace")
    .attr("fill", "black");

  drawField(canvasMap.node());

  return div.node();
}


function _9(htl){return(
htl.html`<div><h1 id="toolTip" style="padding-left: 150px; height: 100px;"><center>
</center></h1></div>`
)}

function _dataGames(dataGames1){return(
dataGames1.filter((d) => d.season === "2020" && d.week === "1")
)}

function _dataGames1(d3){return(
d3.csv("https://gist.githubusercontent.com/f-banda/0a7448ddba470ee6009e8bbaf4751a34/raw/56d07b202921b591e8c2390048758c4b3fd3df7b/games.csv")
)}

function _dataPlays(d3){return(
d3.csv("https://gist.githubusercontent.com/f-banda/0a7448ddba470ee6009e8bbaf4751a34/raw/56d07b202921b591e8c2390048758c4b3fd3df7b/plays.csv")
)}

function _dataPlayers(d3){return(
d3.csv("https://gist.githubusercontent.com/f-banda/0a7448ddba470ee6009e8bbaf4751a34/raw/56d07b202921b591e8c2390048758c4b3fd3df7b/players.csv")
)}

function _dataTracking2020(d3){return(
d3.csv("https://dl.dropboxusercontent.com/s/0jvkqf9wnfjdlrf/dataTracking2020.csv?dl=1")
)}

function _drawField(scale,d3,width,height,nfl_image,selectedID,drawBreadcrumbs,dataTracking2020,selectedGame,selectedPlayID,frame,$0){return(
function drawField(canvas) {
  var context = canvas.getContext('2d');

  context.clearRect(0, 0, canvas.width, canvas.height);
  
  context.fillStyle = "#4F7942";
  context.fillRect(0, 0, canvas.width, canvas.height);

  const lines = [
    [6,0,0, 6,80, 0],
    [12,0,0, 12,80, 0],
    [18,0,0, 18,80, 0],
    [24,0,0, 24,80, 0],
    [30,0,0, 30,80, 0],
    [36,0,0, 36,80, 0],
    [42,0,0, 42,80, 0],
    [48,0,0, 48,80, 0],
    [54,0,0, 54,80, 0],
    [60,0,0, 60,80, 0], // Middle
    [66,0,0, 66,80, 0],
    [72,0,0, 72,80, 0],
    [78,0,0, 78,80, 0],
    [84,0,0, 84,80, 0],
    [90,0,0, 90,80, 0],
    [96,0,0, 96,80, 0],
    [102,0,0, 102,80, 0],
    [108,0,0, 108,80, 0],
    [114,0,0, 114,80, 0],
    [120,0,0, 120,80, 0]
  ].map(l => l.map(c => c * scale))

  const outline = [
    [0,0,0, 120,0,0, 120,80,0, 0,80,0, 0,0,0],
  ].map(l => l.map(c => c * scale))

  const num = 50
  const centerRound = []
  const cercle = d3.range(num).forEach(i => {
  const angle = i * Math.PI * 2 / (num - 1);
  })
  
  lines.forEach(lineCoodrinates => {
    for(let i =0; i < lineCoodrinates.length; i += 3){
      context.beginPath();
      context.moveTo((width * (1-scale)/2) + (lineCoodrinates[i]* (width/120)), (height * (1-scale)/2) + (lineCoodrinates[i+1]* (height/80)));
      context.lineTo((width *(1-scale)/2) + (lineCoodrinates[(i+3)%lineCoodrinates.length]* (width/120)), (height   * (1-scale)/2) + (lineCoodrinates[(i+4)%lineCoodrinates.length]* (height/80)));
      context.lineWidth = 2;
      context.strokeStyle = 'white';
      context.stroke(); 
    }
  })

  outline.forEach(lineCoodrinates => {
    for(let i =0; i < lineCoodrinates.length; i += 3){
      context.beginPath();
      context.moveTo((width * (1-scale)/2) + (lineCoodrinates[i]* (width/120)), (height * (1-scale)/2) + (lineCoodrinates[i+1]* (height/80)));
      context.lineTo((width *(1-scale)/2) + (lineCoodrinates[(i+3)%lineCoodrinates.length]* (width/120)), (height   * (1-scale)/2) + (lineCoodrinates[(i+4)%lineCoodrinates.length]* (height/80)));
      context.lineWidth = 1;
      context.strokeStyle = 'black';
      context.stroke(); 
    }
  })
  context.fillStyle = "white";
  context.font = "bold 24px Arial";
  context.fillText("1 0", (canvas.width / 2) - 401, (canvas.height - 400));
  context.fillText("2 0", (canvas.width / 2) - 305, (canvas.height - 400));
  context.fillText("3 0", (canvas.width / 2) - 209, (canvas.height - 400));
  context.fillText("4 0", (canvas.width / 2) - 113, (canvas.height - 400));
  context.fillText("5 0", (canvas.width / 2) - 17, (canvas.height - 400));
  context.fillText("4 0", (canvas.width / 2) + 79, (canvas.height - 400));
  context.fillText("3 0", (canvas.width / 2) + 175, (canvas.height - 400));
  context.fillText("2 0", (canvas.width / 2) + 271, (canvas.height - 400));
  context.fillText("1 0", (canvas.width / 2) + 367, (canvas.height - 400));
  
  context.drawImage(nfl_image, (canvas.width / 2) - 50, (canvas.height / 2) - 50, 100, 100);

  var positions = [];

  if (selectedID[0] != -1 && drawBreadcrumbs == true)
  {
    var counter = 0;

            dataTracking2020.filter((d) => d.gameId === selectedGame.gameId && d.playId === selectedPlayID.playId && d.nflId == selectedID[0]).forEach(marker => {
              const centerX = marker.x*8;
              const centerY = marker.y*8;
              const radius = 10;

              if (counter == 0)
              {
                context.moveTo(centerX, centerY);
                counter++;
              }
              
              context.lineTo(centerX, centerY);
              context.strokeStyle = "white";
              })
    context.stroke();
  }
  
  dataTracking2020.filter((d) => d.gameId === selectedGame.gameId && d.playId === selectedPlayID.playId && d.frameId == frame).forEach(marker => {
    const centerX = marker.x*8;
    const centerY = marker.y*8;
    var radius = 10;
    var color = 'black';

    if(marker.team == "football")
    {
      color = '#7B3F00';
      radius = 6.5;
    }
    if(marker.team == "home")
    {
      color = 'blue';
      positions.push(marker);
    }
    if(marker.team == "away")
    {
      color = 'red'
      positions.push(marker);
    }
    
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = color;
    context.fill();
    context.lineWidth = 1.5;
    context.strokeStyle = 'white';
    context.stroke();
  })

  // Player selection

  canvas.addEventListener("click",function(event){
    var flag = false;
    
    
    if (drawBreadcrumbs == true)
    {
      positions.forEach(marker => {
      
          var dist_points = (marker.x*8 - event.offsetX) * (marker.x*8 - event.offsetX) + (marker.y*8 - event.offsetY) * (marker.y*8 - event.offsetY);
          
          if (dist_points < 100) {
            // Assign player
            selectedID[0] = marker.nflId;
            flag = true;
            
        }
      
      });

      if (flag == false)
      {
        selectedID[0] = -1;
      }

      $0.dispatchEvent(new CustomEvent("input"));
      
    }
    
  });

  // Tooltip

  canvas.addEventListener("mousemove",function(event){
    var flag = false;
    
    positions.forEach(marker => {
      
          var dist_points = (marker.x*8 - event.offsetX) * (marker.x*8 - event.offsetX) + (marker.y*8 - event.offsetY) * (marker.y*8 - event.offsetY);
          
          if (dist_points < 100) {
            document.getElementById("toolTip").innerHTML = marker.displayName + " #" + marker.jerseyNumber + " | Position: " + marker.position;
            flag = true;
        }
      
      });

    if(flag == false)
    {
      document.getElementById("toolTip").innerHTML = "";
    }
    
  });
  
}
)}

function _max_frame(dataTracking2020,selectedGame,selectedPlayID){return(
dataTracking2020.filter((d) => d.gameId === selectedGame.gameId && d.playId === selectedPlayID.playId).slice(-1)[0].frameId
)}

function* _progress(playButton,$0,$1,max_frame,Promises)
{
  playButton;

  if ($0.value == 0)
  {
    $0.value = -1;
    var start = $1.value;
    $1.dispatchEvent(new CustomEvent("input"));
    
    while(start < max_frame)
      {
        if($1.value != start || $0.value == 1)
        {
          break;
        }
        
        yield Promises.delay(100);
        start++;
        ++$1.value;
        $1.dispatchEvent(new CustomEvent("input"));
      }
  }

  if ($0.value == 2)
        {
          $1.value = 1;
          $1.dispatchEvent(new CustomEvent("input"));
        }
  
}


function _selectedID(){return(
[-1]
)}

function _height(){return(
426.4
)}

function _width(){return(
960
)}

function _scale(){return(
1
)}

function _22(nfl_image){return(
nfl_image.src = 'https://loodibee.com/wp-content/uploads/nfl-league-logo.png'
)}

function _nfl_image(){return(
new Image()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof selectedGame")).define("viewof selectedGame", ["Inputs","dataGames"], _selectedGame);
  main.variable(observer("selectedGame")).define("selectedGame", ["Generators", "viewof selectedGame"], (G, _) => G.input(_));
  main.variable(observer("viewof selectedPlayID")).define("viewof selectedPlayID", ["Inputs","dataPlays","selectedGame"], _selectedPlayID);
  main.variable(observer("selectedPlayID")).define("selectedPlayID", ["Generators", "viewof selectedPlayID"], (G, _) => G.input(_));
  main.variable(observer("viewof frame")).define("viewof frame", ["Inputs","max_frame"], _frame);
  main.variable(observer("frame")).define("frame", ["Generators", "viewof frame"], (G, _) => G.input(_));
  main.variable(observer("viewof playButton")).define("viewof playButton", ["Inputs"], _playButton);
  main.variable(observer("playButton")).define("playButton", ["Generators", "viewof playButton"], (G, _) => G.input(_));
  main.variable(observer("viewof drawBreadcrumbs")).define("viewof drawBreadcrumbs", ["Inputs"], _drawBreadcrumbs);
  main.variable(observer("drawBreadcrumbs")).define("drawBreadcrumbs", ["Generators", "viewof drawBreadcrumbs"], (G, _) => G.input(_));
  main.variable(observer()).define(["selectedPlayID","htl"], _7);
  main.variable(observer("output")).define("output", ["d3","width","height","drawField"], _output);
  main.variable(observer()).define(["htl"], _9);
  main.variable(observer("dataGames")).define("dataGames", ["dataGames1"], _dataGames);
  main.variable(observer("dataGames1")).define("dataGames1", ["d3"], _dataGames1);
  main.variable(observer("dataPlays")).define("dataPlays", ["d3"], _dataPlays);
  main.variable(observer("dataPlayers")).define("dataPlayers", ["d3"], _dataPlayers);
  main.variable(observer("dataTracking2020")).define("dataTracking2020", ["d3"], _dataTracking2020);
  main.variable(observer("drawField")).define("drawField", ["scale","d3","width","height","nfl_image","selectedID","drawBreadcrumbs","dataTracking2020","selectedGame","selectedPlayID","frame","viewof frame"], _drawField);
  main.variable(observer("max_frame")).define("max_frame", ["dataTracking2020","selectedGame","selectedPlayID"], _max_frame);
  main.variable(observer("progress")).define("progress", ["playButton","viewof playButton","viewof frame","max_frame","Promises"], _progress);
  main.variable(observer("selectedID")).define("selectedID", _selectedID);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("width")).define("width", _width);
  main.variable(observer("scale")).define("scale", _scale);
  main.variable(observer()).define(["nfl_image"], _22);
  main.variable(observer("nfl_image")).define("nfl_image", _nfl_image);
  return main;
}
