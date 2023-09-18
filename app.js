import { serve } from "https://deno.land/std@0.171.0/http/server.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";

configure({
  views: `${Deno.cwd()}/views/`,
});

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const handleRequest = async (request) => {
  if (request.method === "POST") {
    console.log(request.headers.get("Content-Type"));
  }

  return new Response(await renderFile("index.eta"), responseDetails);
};

serve(handleRequest, { port: 7777 });