using System.ComponentModel.DataAnnotations.Schema;
using FluentMigrator;

namespace Bikevent.Migrations
{
    [Migration(001)]
    public class Migration_001 : Migration
    {
        public override void Up()
        {
            Delete.Table("clubs");
            Delete.Table("rides");
            Delete.Table("events");

            Create.Table("clubs")
                .WithColumn("id").AsInt32().NotNullable().PrimaryKey()
                .WithColumn("nameOf").AsString(255).NotNullable()
                .WithColumn("president").AsString(255).Nullable()
                .WithColumn("email").AsString(255).NotNullable()
                .WithColumn("websiteUrl").AsString(255).Nullable()
                .WithColumn("mainImageUrl").AsString(255).Nullable()
                .WithColumn("googleMapUrl").AsString(255).Nullable()
                .WithColumn("createdOn").AsDateTime().NotNullable()
                .WithColumn("modifiedOn").AsDateTime().NotNullable();

            Create.Table("rides")
                .WithColumn("title").AsString(255).NotNullable()
                .WithColumn("description").AsString(255).Nullable()
                .WithColumn("startsOn").AsDateTime().NotNullable()
                .WithColumn("endsOnOn").AsDateTime().Nullable()
                .WithColumn("linklUrl").AsString(255).Nullable()
                .WithColumn("startLocation").AsString(255).NotNullable()
                .WithColumn("endLocation").AsString(255).Nullable()
                .WithColumn("mapLink").AsString(255).Nullable()
                .WithColumn("lat").AsDecimal().Nullable()
                .WithColumn("lng").AsDecimal().Nullable()
                .WithColumn("createdOn").AsDateTime().NotNullable()
                .WithColumn("modifiedOn").AsDateTime().NotNullable();

            Create.Table("events")
                .WithColumn("title").AsString(255).NotNullable()
                .WithColumn("description").AsString(255).NotNullable()
                .WithColumn("standsUp").AsDateTime().NotNullable()
                .WithColumn("endsOnOn").AsDateTime().Nullable()
                .WithColumn("linklUrl").AsString(255).Nullable()
                .WithColumn("lat").AsDecimal().Nullable()
                .WithColumn("lng").AsDecimal().Nullable()
                .WithColumn("createdOn").AsDateTime().NotNullable()
                .WithColumn("modifiedOn").AsDateTime().NotNullable();
        }

        public override void Down()
        {
            Delete.Table("clubs");
        }
    }
}
