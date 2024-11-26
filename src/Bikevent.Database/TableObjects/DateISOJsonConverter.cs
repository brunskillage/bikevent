using System.Diagnostics;
using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Bikevent.Database.TableObjects;

public class DateIsoJsonConverter : JsonConverter<DateTime?>
{
    public override DateTime? Read(
        ref Utf8JsonReader reader,
        Type typeToConvert,
        JsonSerializerOptions options)
    {
        var value = reader.GetString();
        if (!string.IsNullOrWhiteSpace(value))
        {
            var result = DateTime.Parse(value).ToLocalTime();
            return result.ToUniversalTime();
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