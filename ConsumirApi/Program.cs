// See https://aka.ms/new-console-template for more information
using Mandrill;
using Mandrill.Models;
using Mandrill.Requests.Messages;
using Newtonsoft.Json;
using System.Net;
using System.Net.Mail;
using System.Text;

//Console.WriteLine("Hello, World!");
var url = @"https://localhost:7109/Api/Lectura/insert";
var random = new Random(10);
for (int i = 0; i < 30; i++)
{

    var number = random.Next(0, 30);
    var request = new HttpRequestMessage(HttpMethod.Post, url)
    {
        Content = new StringContent(JsonConvert.SerializeObject(
        new
        {
            IdVariable = "ce41aa67-939b-4690-80cf-8400dff8bcd8",
            IdDispositivo = "33899540-34d3-4e3c-9fe4-0ab837773047",
            ValorLeido = number
        }), Encoding.UTF8, "application/json")
    };

    var httpClient = new HttpClient();
    httpClient.Send(request);
    Thread.Sleep(10000);
}

//var credentials = new EmailApiCredentials
//{
//    Id_EmailApiCredentials = Guid.NewGuid(),
//    ApiKey = "870d7f32-d9ed-47c3-8bb4-d826e268dccb",
//    UserName = "parrado.andresb@gmail.com"
//};

//var resultToken = await Token(credentials);

//if(resultToken != null)
//{
//    credentials.Token = resultToken.access_token;
//    SendMail(credentials);
//}

//async void SendMail(EmailApiCredentials credentials)
//{
//    try
//    {
//        var client = new HttpClient();
//        var emailBody = new Email
//        {
//            email = "parrado.andresb@gmail.com",
//            id_sender_email = 1,
//            date_planned = null,
//            activate_statistics = true,
//            subject = "PruebasAlerta",
//            reply_to = null,
//            body_html = "<html><body>hola</body></html>",
//            unsubscription_link = true
//        };

//        var json = JsonConvert.SerializeObject(emailBody);
//        var data = new StringContent(json, Encoding.UTF8, "application/json");
//        client.DefaultRequestHeaders.Add("authorization", String.Format("Bearer {0}", credentials.Token));
//        var response = client.PostAsync("https://api.mailpro.com/v3/send/mail", data);
//        var body = response.Result.Content.ReadAsStringAsync();
//        Console.WriteLine(body.Result);
//    }
//    catch (Exception)
//    {

//        throw;
//    }
//}

//async Task<responseApi> Token(EmailApiCredentials credentials)
//{
//    try
//    {
//        var client = new HttpClient();
//        var request = new HttpRequestMessage
//        {
//            Method = HttpMethod.Post,
//            RequestUri = new Uri("https://api.mailpro.com/v3/token"),
//            Headers = {
//            { "accept", "application/json"}
//            },
//            Content = new FormUrlEncodedContent(new Dictionary<string, string> {
//            { "grant_type", "password"},
//            { "username", credentials.UserName},
//            { "password", credentials.ApiKey}
//            })
//        };
//        var response = client.Send(request);
//        response.EnsureSuccessStatusCode();
//        var body = await response.Content.ReadAsStringAsync();
//        var responseJson = JsonConvert.DeserializeObject<responseApi>(body);
//        return responseJson;

//    }
//    catch (Exception)
//    {

//        return null;
//    }
//}

//class responseApi
//{
//    public string access_token { get; set; }
//}

//class Email
//{
//    public string email { get; set; }
//    public int id_sender_email { get; set; }
//    public string id_contact { get; set; }
//    public int id_message { get; set; }
//    public string body_html { get; set; }
//    public bool unsubscription_link { get; set; }
//    public string link_alignment { get; set; }
//    public bool top_link { get; set; }
//    public string date_planned { get; set; }
//    public bool activate_statistics { get; set; }
//    public string subject { get; set; }
//    public string reply_to { get; set; }

//}

//class EmailApiCredentials
//{
//    public Guid Id_EmailApiCredentials { get; set; }
//    public string UserName { get; set; }
//    public string ApiKey { get; set; }
//    public string Token { get; set; }
//}

////url to send data to
//string apiUrl = "https://mandrillapp.com/api/1.0/messages/send-template.json";

////account api key needed to send email
////created at: https://mandrillapp.com/settings
//string mandrillKey = "3AO5lVN29P4JsmttZ0cqaQ";

////name of the email template created in mandrill
//string mandrillTemplateId = "my-test-01";

////list of emails to send the email to
//List<string> toEmails = new List<string>();
//toEmails.Add("parrado.andresb@gmail.com");

////list of to names for emails above
//List<string> toNames = new List<string>();
//toNames.Add("Mr. Example");


//dynamic sendParams = new System.Dynamic.ExpandoObject();
//sendParams.key = mandrillKey;
//sendParams.template_name = mandrillTemplateId;
//sendParams.template_content = new List<dynamic>();

//sendParams.message = new System.Dynamic.ExpandoObject();
//sendParams.message.to = new List<dynamic>();

////to emails
//for (int x = 0; x < toEmails.Count; x++)
//{
//	sendParams.message.to.Add(new System.Dynamic.ExpandoObject());
//	sendParams.message.to[x].email = toEmails[x];
//}

////to names - in same order as to emails    
//for (int x = 0; x < toNames.Count; x++)
//{
//	//dont add if email wasnt added
//	if (toEmails.Count >= x + 1)
//	{
//		sendParams.message.to[x].name = toNames[x];
//	}
//}

////additional mandrill options
//sendParams.message.track_opens = true;
////sendParams.message.track_clicks = true;

////create replacement values object to merge in
//sendParams.message.global_merge_vars = new List<dynamic>();

//int counter = 0;


////json send parameters
//string jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(sendParams);

////create web client to post data
//var request = new System.Net.WebClient();

////set content type to json since we are posting json data
//request.Headers[HttpRequestHeader.ContentType] = "application/json";

////post json data and get the response
//string responseString = request.UploadString(apiUrl, jsonString);

////read the results
//bool success = false;

//if (!string.IsNullOrWhiteSpace(responseString))
//{
//	dynamic resultObj = Newtonsoft.Json.JsonConvert.DeserializeObject(responseString);
//	if (resultObj != null)
//	{
//		if (resultObj[0] != null)
//		{
//			if (resultObj[0].status == "sent")
//			{
//				success = true;
//			}
//		}
//	}
//}

//var clientSmpt = GestorCorreo();
//var pathHtml = @"C:\Users\caoti\Downloads\HTML TEMPLATE.html";
//var templateHtml = GetTemplateHtml(pathHtml);
//var htmlSend = ReplateTextAlerta(templateHtml, "Alerta no se ha recibido informacion recientente");
//EnviarCorreo(
//    "caotic005@hotmail.com",
//    "PruebaEnvio",
//    htmlSend,
//    clientSmpt
//    );
//SmtpClient GestorCorreo()
//{
//    var cliente = new SmtpClient("smtp.gmail.com", 587)
//    {
//        EnableSsl = true,
//        DeliveryMethod = SmtpDeliveryMethod.Network,
//        UseDefaultCredentials = false,
//        Credentials = new NetworkCredential("parrado.andresb@gmail.com","Macsor10$")
//    };

//    return cliente; 
//}

//void EnviarCorreo(string destinatario, string asunto, string mensaje, SmtpClient client)
//{
//    var email = new MailMessage("parrado.andresb@gmail.com", destinatario, asunto, mensaje);
//    email.IsBodyHtml = true;
//    client.Send(email);
//}

//string GetTemplateHtml(string path)
//{
//    if (!File.Exists(path))
//        return null;
//    var textFile = File.ReadAllText(path);
//    return textFile;
//}

//string ReplateTextAlerta(string templateHtml, string TextRemplazar)
//{
//    var htmlSend = templateHtml.Replace("{TEXTO ALERTA}", TextRemplazar);
//    return htmlSend;
//}