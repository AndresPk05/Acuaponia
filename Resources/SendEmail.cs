using Entities.Email;
using Repository.Email;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Resources;

public class SendEmail : ISendEmail
{
    private IEmailRepository _repository;
    public SendEmail(IEmailRepository repository)
    {
        _repository = repository;
    }
    public void SendEmailAlerta(string mensajeAlerta, string from)
    {
        var emailConfig = GetEmailFrom();
        if (emailConfig == null)
        {
            emailConfig = new EmailApiCredentials
            {
                ServidorSmtp = "smtp.gmail.com",
                Puerto = 587,
                UserName = "parrado.andresb@gmail.com",
                ApiKey = "Macsor10$"
            };
        }
        var clientSmpt = GestorCorreo(emailConfig);
        var pathHtml = @"C:\Users\caoti\Downloads\HTML TEMPLATE.html";
        var templateHtml = GetTemplateHtml(pathHtml);
        var htmlSend = ReplateTextAlerta(templateHtml, mensajeAlerta);
        EnviarCorreo(
            emailConfig.UserName,
            from,
            "Alerta Proyecto Acuaponia",
            htmlSend,
            clientSmpt
            );

    }

    private SmtpClient GestorCorreo(EmailApiCredentials emailApi)
    {
        var cliente = new SmtpClient(emailApi.ServidorSmtp, emailApi.Puerto)
        {
            EnableSsl = true,
            DeliveryMethod = SmtpDeliveryMethod.Network,
            UseDefaultCredentials = false,
            Credentials = new NetworkCredential(emailApi.UserName, emailApi.ApiKey)
        };

        return cliente;
    }

    private void EnviarCorreo(string remitente, string destinatario, string asunto, string mensaje, SmtpClient client)
    {
        var email = new MailMessage(remitente, destinatario, asunto, mensaje);
        email.IsBodyHtml = true;
        client.Send(email);
    }
    private string GetTemplateHtml(string path)
    {
        if (!File.Exists(path))
            return null;
        var textFile = File.ReadAllText(path);
        return textFile;
    }

    private string ReplateTextAlerta(string templateHtml, string TextRemplazar)
    {
        var htmlSend = templateHtml.Replace("{TEXTO ALERTA}", TextRemplazar);
        return htmlSend;
    }

    private EmailApiCredentials GetEmailFrom()
    {
        try
        {
            var emailConfig = _repository.getEmailCredentials();
            return emailConfig;
        }
        catch (Exception)
        {
            return null;
            throw;
        }
    }
}


