import { serve } from "./deps.js";
import { renderFile } from "/deps.js";

const PORT = 7777;

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const data = {
  visits: 0,
};

const handleRequest = async (request) => {
  const url = new URL(request.url);

  if (url.pathname === "/visits") {
    data.visits++;
    return new Response(
      await renderFile(`${Deno.cwd()}/views/visits.eta`, data),
      responseDetails
    );
  }

  if (url.pathname === "/meaning") {
    return new Response(
      "Seeking truths beyond meaning of life, you will find 43.",
      responseDetails
    );
  }

  return new Response("Nothing here yet.", responseDetails);
};

const server = serve({ port: PORT });

console.log(`Server is running on http://localhost:${PORT}/`);

for await (const request of server) {
  const response = await handleRequest(request);
  request.respond(response);
}


