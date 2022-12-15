

**NFL Special Teams Data Visualization**

**Preview:**

<https://observablehq.com/d/29a945f48b8c39dc>


**Dataset:**

For this visualization, the 2022 Big Data Bowl is used which contains Next Gen Stats for all

2018-2020 Special Teams plays, which includes player tracking, play, game, player, and PFF

scouting data. Although, not all of the data is used in order to reduce unnecessary data and also

optimize the performance of the visualization.


The link to the data can be found at:

<https://www.kaggle.com/competitions/nfl-big-data-bowl-2022/data>


The datasets that are used are game, play, player, and tracking data - the PFF Scouting data is

not used as the visualization is not specifically meant to show detailed player statistics.

The values used from the game data are gameId, season, week, gameDate, homeTeamAbbr,

and visitorTeamAbbr. From the play data the values used are gameId, playId, and

playDescription. From the tracking data the values used are x, y, nflId, displayName,

jerseyNumber, position, team, frameId, gameId, and playId.


Due to the tracking data being extremely large (1.5 GB each tracking file), we will only use the

2020 tracking data. Since kaggle does not provide a direct download link to the data files, and

signing in is required to download the files - I had to download this data and find a place to

upload it, which was very difficult due to the file sizes. Once I was able to upload it to dropbox,

which was the ideal choice - I attempted to load the data through d3.csv, but it would be far too

large for observable so I had to further filter out the data outside of observable which I did by

simply filtering the data through a simple C++ program I made.



**Data Questions:**

The NFL competitiveness is extreme, with over 1,500 players - having any form of improvement

is necessary. With this visualization, players and coaches can utilize the ability to review games

with data that is taken on every player and ball for every tenth of a second. There’s no doubt

that players review plays prior to playing in order to further improve their game sense.

So with this visualization, **what player executed a play, how could he have executed it**

**better? What was the play of a team, and what was the outcome of it?** Are questions that

we can answer by reviewing the data with a 2D visualization that can be played even in

real-time. NFL plays are constantly evolving, and this is a way to further improve players by

allowing them to review previous data, and can also be used by coaches. It could also be used

by the average person to simply see what the outcome of a game or play was.



**Project Design:**

The visualization first began with a simple drawing of a field on a canvas, I didn’t want to overlay

an image on the canvas to show off the NFL field; so, instead I manually drew the field with

pre-determined line iterations, manually drawn alongside the yard indicators. Although this isn’t

the most aesthetic field, it offers a clean and simple layout that reduces cluttering by not having

too many markers. To further prevent cluttering, I minimize the marks used to only using a few

lines to draw the field, players paths, and points to plot the actual players on the field. I also

imported an image of the NFL logo which I resized within Observable and drew in the center of

the field. Drawing this logo did cause me some issues during the development of this

visualization as every time a new frame would be plotted, it would also have to redraw the logo

which I fixed by separating the drawing of the field and drawing of the data, which heavily

optimized the visualization.

The overall design is a UI which consists of a game selection drop-down, a play selector

drop-down, a frame box which accepts manual input or a slider which ranges from 1 to

[max\_frame], start/stop/reset, and a player path checkbox. The game selection drop-down takes

the original games data and filters it by Season 2020 Week 1, since the data size for tracking is

too large, it’s unnecessary to use the rest of the data to populate the list. The play selection

takes the current gameId which is selected by the user and filters the data by that specific

gameId in order to populate the plays list. The frame slider will take the selected gameId and

slice for the final frame in order to get the max\_frame which we then assign to the frame slider

to build the slider values [1, max_frame]. Start, pause, and reset buttons are built to be listened

for while drawing the data onto the field. Finally, the selected player path function was slightly

more work as it would cause large performance issues when constantly redrawing the same

plots, so it had to be slightly adjusted to work around that.

The actual visualization takes all of the user-selected data to draw the players in the selected

game, play, and frame. In order to reduce cluttering, I’ve separated the play summary (located

above the canvas drawing) as well as the tooltip when hovering over a player (shown below the

canvas). There was a lot of improvising that had to be done, which is why I decided to exclude

the tooltip and play summary from the drawings. This is because there was already a lot being

drawn onto the field, for user-ease I decided to separate them in order to prevent further

overlapping. The main issue would arise when drawing player paths, previously it would allow

for multiple player paths to be shown but this would look very unpleasant, especially during

tighter plays - so I’ve opted for an option to hide/show player paths as well as limiting the drawn

player paths to a singular player.

Ultimately, most of these changes came after my project presentation. Buttons, player paths,

drawings, and loops would be completely redesigned, added, and/or optimized. For example,

during my presentation I only had a single button “Play Real-Time” which would loop the desired

play from frame 1 to max\_frame, in real-time. When presenting my project I realized that this

isn’t an ideal button to have, so instead I split that singular button into three different buttons -

Start, Pause, and Reset. This would allow the user to use the buttons instead of relying on the

frame slider to pause the play since the frame slider does have error-checking built into it to stop

the loop when the frame is modified. Player paths would be added after my presentation as

Professor Koop mentioned it, and although I did previously have it - the visualization would

become very ugly with lines being drawn everywhere so I decided to come up with a better way

which would be to draw only a selected player’s path. The drawings and loops would also be

optimized after my presentation due to the player paths causing performance issues and

overlapping - the drawing would need to be layered in order to make it visually pleasing.



**Visualization Examples:**

During Season 2020, Week 1’s Houston Texans vs Kansas City Chiefs we review Play #2437

which is summarized as “B.Anger punts 42 yards to KC 10, Center-J.Weeks, fair catch by

M.Hardman.”. We can see the punt beginning at the 37 yard line and getting punted 42 yards.

From this play, we can visually see (both from the summary, and visualization) that the punt

wasn’t ideal and should’ve gone further. We can also see Antonio Hamilton running away from

the play to bring away a defender, but it wasn’t effective since Keion Crossen was still able to

make a small correction to his path to get to Mecole Hardman.


During Season 2020, Week 1’s Tampa Bay Buccaneers vs New Orleans Saints we review play

#1041 which is summarized as “B.Pinion punts 50 yards to NO 19, Center-Z.Triner. D.Harris to

NO 37 for 18 yards (J.Dean).”. We can see Bradley Pinion punting 50 yards which is then

caught by Deonte Harris and ran 18 yards. This is an ideal play to learn from, it’s a good punt

which is run a fair amount by Deonte Harris. Specific key points in this play are during frame 93

where Deonte Harris is able to avoid Jamel Dean and from frame 123 until the final frame, we

can see him outrunning six Buccaneers to reach the 18 yard line.

