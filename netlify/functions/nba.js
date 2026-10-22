exports.handler = async (event) => {
  const kind = event.queryStringParameters?.kind || 'scoreboard';
  const id = event.queryStringParameters?.id || '';
  if (kind !== 'scoreboard' && (kind !== 'boxscore' || !/^\d{10}$/.test(id))) return {statusCode:400,body:'Invalid request'};
  const url = kind === 'scoreboard' ? 'https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json' : `https://cdn.nba.com/static/json/liveData/boxscore/boxscore_${id}.json`;
  try { const res = await fetch(url, {headers:{'User-Agent':'FantasyCourt/3.0'}}); if (!res.ok) throw Error(`NBA returned ${res.status}`); const body=await res.text(); return {statusCode:200,headers:{'Content-Type':'application/json','Cache-Control':'public, max-age=10','Access-Control-Allow-Origin':'*'},body}; }
  catch(e) {return {statusCode:502,headers:{'Content-Type':'application/json'},body:JSON.stringify({error:String(e)})};}
};
