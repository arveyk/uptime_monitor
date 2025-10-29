// import { APIGatewayProxyEvent, APIGatewayProxyResultV2, Handler }  from "aws-lambda";


//export  const notionNotificationMonitor: Handler = async function handler (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResultV2> {
//
export notionNotificationMonitor = async (event, context) => {
  console.log("event", event);
  return {
    status: 200,
    body: "Whaddap from Notion Notifs"
  }
}
