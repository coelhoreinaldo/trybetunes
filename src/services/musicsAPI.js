const getMusics = async (id) => {
  const request = await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song`, { method: 'POST', headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: id });
  // const request = await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song`);
  const requestJson = await request.json();
  return requestJson.results;
};

export default getMusics;
