// See https://aka.ms/new-console-template for more information
Console.WriteLine("Hello, World!");
foreach (var item in TimeZoneInfo.GetSystemTimeZones())
{
    Console.WriteLine($"Id:{item.Id}, ZonaHoraria{item}");
}
Console.ReadKey();