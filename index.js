const html = `<!DOCTYPE html>
<body>
  <h1 align="center">Seems like you are lost!</h1>
</body>`;

 async function gatherResponse(response) {
   const { headers } = response;
   const contentType = headers.get('content-type') || '';
   if (contentType.includes('application/json')) {
     return JSON.stringify(await response.json());
   } else if (contentType.includes('application/text')) {
     return response.text();
   } else if (contentType.includes('text/html')) {
     return response.text();
   } else {
     return response.text();
   }
 }
 
 async function handleRequest({request}) {
   const init = {
     headers: {
       'content-type': 'text/html;charset=UTF-8',
     },
   };
   
   const url = new URL(request.url)
   if((url.pathname).length<10) return new Response(html, init);
   
   url.hostname = 'my.spline.design'

   const response = await fetch(url.href, init);
   const ogResults = await gatherResponse(response);
   const results = ogResults.replace('class="spline-watermark"', 'class="spline-water"');

   return new Response(results, init);
 }
 
 addEventListener('fetch', event => {
   return event.respondWith(handleRequest(event));
 });