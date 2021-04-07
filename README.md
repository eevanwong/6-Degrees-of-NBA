# Six Degrees of NBA

Six Degrees of NBA showcases that players are interconnected no matter what decade and team they play in, from Michael Jordan to Kyle Lowry to Lebron James. This project was inspired by Emily Louie's [Six Degrees of Spotify](https://github.com/emilyslouie/six-degrees) and Fanatics.com's [Social Network of the NBA](http://content.fanatics.com/six-degrees-nba/).

Data used for this site was all [web scraped](https://github.com/eevanwong/Basketball-Reference-Scraper) from basketball-reference.com using Puppeteer as of March 2021. Site was created with React, Node/Express, and Neo4j.

At the moment, I am trying to find a reasonable hosting platform for a neo4j database; however, many are very complex, or too expensive in comparison to the small size of this database ( < 1GB). You can (if you'd like) check out the frontend which is connected to the server; however, at the moment, the database is confined to my own local machine.

## Inspiration

The Six Degree's of Seperation was a super interesting concept to me. There were a multitude of different ways I could go about it. With basketball being a growing interest, I had thought how I could show connections between different NBA players and how it would be able to find connections between the most unlikely of players.

While I was researching this topic, I had come across fanatics.com's own version of this. However, they did not go in depth in how each of the players were connected, in regards to which year they played on in which team.

## Design

I had designed some components on figma before I started any developing to get a feel for what I was going to be working on. I based the design off of my favourite team's website, the [Miami Heat](https://www.nba.com/heat/home).

![image](https://user-images.githubusercontent.com/71536798/113767102-40e30480-96ec-11eb-9f37-54c29ab64f9d.png)

Once they inputted their players, it would either display the results or result in no connection.

![image](https://user-images.githubusercontent.com/71536798/113770122-c4522500-96ef-11eb-8978-27df02db4082.png)

![image](https://user-images.githubusercontent.com/71536798/113769744-53ab0880-96ef-11eb-99d4-0c23c75fe032.png)

## Scraping Player Names and Team Info with Puppeteer

After I had a decent idea of the project I was going to make, I needed to question myself on the specifics. Will I do only active players? Will I do players from the past x number of years? How do I determine which team they were on? How do I grab pictures?

I had realized that APIs were inadequate, as they would only hold the active players in the current season. Furthermore, they often would not hold a player's previous info (i.e previous teams) and would not have pics of inactive players.

Through fanatics.com website, they had described that they had gotten all of their information from [basketball-reference.com](https://www.basketball-reference.com/). Looking through the website, I was super excited. From headshots to previous teams, they had everything I needed. Thus, I began working on a web scraper that would grab all of the players on all of the teams.

With Puppeteer, I grabbed all the links of each team, then went through all past iterations of each teams and accounted for each player. I stored all of the players in each team in each season as an object like so:

```{
  "ATL-2021": [
    "John Collins",
    "Kevin Huerter",
    "Solomon Hill",
    "Trae Young",
    "Clint Capela",
    "Danilo Gallinari",
    "Tony Snell",
    "Brandon Goodwin",
    "Cam Reddish",
    "Onyeka Okongwu",
    "Bruno Fernando",
    "Bogdan Bogdanović",
    "Skylar Mays",
    "De'Andre Hunter",
    "Nathan Knight",
    "Lou Williams",
    "Kris Dunn",
    "Rajon Rondo"
  ] ...
```

I counted trades as automatically being a part of the team. If 2 players were traded for each other, they counted as having played together on both teams. For example, although Lou Williams was traded from the Clippers for Rajon Rondo, they are still on the same team.

## Working with NERN Stack

I wanted to program with what I was comfortable with. I was familiar with React and Node/Express from previous projects but Neo4j was a mystery for me. From Emily's documentation of her project, she noted that SQL took way too long to find the shortest path and neo4j was very simplistic and made for this type of project. Upon my own research with this, I can agree with this statement.

With so many relationships, the complexity and length of sql queries increase drastically. This is in contrast to Neo4j, where writing all of the players and connections to teams was done with this cypher query:

`match (m:Team {name: $Team}) MERGE (n:Player {name: $name}) CREATE (n)-[:PLAYED_ON]->(m)`

and querying it from the backend was as simple as:

`match (m:Player {name: $Player1 }), (n:Player {name: $Player2 }), p=shortestPath((m)-[*..6]-(n)) return p`

It was very interesting to see the nodes of all the different players and how they connect

![image](https://user-images.githubusercontent.com/71536798/113791354-6fbfa180-9711-11eb-8abc-74791e8bf501.png)

> Here's how the past 29 Atlanta Hawks (2021-1982) teams are interconnected

In terms of getting the information, I used axios for post and get requests from frontend to server, which communicated with the database.

## Issues along the way

I encoutered many issues that I hadn't considered until I encountered them head on.

The biggest issue was hosting. I have been searching for ways to host but it's very infuriating to be met with very complex systems (Google Cloud Platform gave me a headache) for such a relatively small database. I've still been searching for alternatives.

There were a lot of things that required finetuning. For example, as I was getting past players and teams from the past 38 years, I encountered a lot of teams that I didn't recognize because they were teams that rebranded into newer teams. The names were different which caused slight altercations in the frontend.

While I was testing, a big problem was that I often had to search up names to figure out how to spell them correctly. This was fixed by utilizing react-select and react-window to make an efficient search bar with all of the names to make searching quick and easy.

## Final Results

Video of usage (no sound)

https://user-images.githubusercontent.com/71536798/113791069-d2fd0400-9710-11eb-8b34-7d8490bdc24c.mp4

Pictures

![image](https://user-images.githubusercontent.com/71536798/113791178-15264580-9711-11eb-8167-88508928979c.png)

![image](https://user-images.githubusercontent.com/71536798/113791486-c331ef80-9711-11eb-8cc8-c07502af46b5.png)

![image](https://user-images.githubusercontent.com/71536798/113791142-017adf00-9711-11eb-89ca-82fe7598d542.png)

## Future Updates

1. Hosting so that users can actually try it out for themselves.

2. Add legacy pictures to showcase older brands that were rebranded.
