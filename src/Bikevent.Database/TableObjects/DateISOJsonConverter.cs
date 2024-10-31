using System.Diagnostics;
using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Bikevent.Database.TableObjects;

public class DateISOJsonConverter : JsonConverter<DateTime?>
{
    public override DateTime? Read(
        ref Utf8JsonReader reader,
        Type typeToConvert,
        JsonSerializerOptions options)
    {
        var value = reader.GetString();
        if (!string.IsNullOrWhiteSpace(value))
        {
            if (!value.EndsWith("Z"))
            {
                value += "Z";
            }        
            var result = DateTime.Parse(value);
            return result;
        }

        return null;
    }


    public override void Write(
        Utf8JsonWriter writer,
        DateTime? dateTimeValue,
        JsonSerializerOptions options) {

        if (dateTimeValue.HasValue)
        {
            writer.WriteStringValue(dateTimeValue.Value.ToUniversalTime().ToString("yyyy'-'MM'-'dd'T'HH':'mm':'ssZ"));
        }
    }

}