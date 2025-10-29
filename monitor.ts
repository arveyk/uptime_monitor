import { APIGatewayProxyEvent, APIGatewayProxyResultV2, Handler }  from "aws-lamda";


export  notionNotificationMonitor: Handler = async  (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResultV2> => {
  console.log(event);

  return {
    status: 200,
    body: "Whaddap from Notion Notifs"
  }
}
