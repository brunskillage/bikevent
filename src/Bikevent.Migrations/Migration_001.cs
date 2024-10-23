using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.InteropServices.JavaScript;
using FluentMigrator;

namespace Bikevent.Migrations
{
    [Migration(001)]
    public class Migration_001 : Migration
    {
        public override void Up()
        {
            string[] tables = { "users","userClubs","clubs","rides","events" };

            Execute.Sql($"DROP TABLE IF EXISTS {string.Join(",", tables)};");

            // NOTE: the dates store in UTC

            Create.Table("users")
                .WithColumn("id").AsInt32().NotNullable().PrimaryKey().Identity()
                .WithColumn("nickName").AsString(255).NotNullable()
                .WithColumn("encPassword").AsString(255).Nullable()
                .WithColumn("email").AsString(255).NotNullable()
                .WithColumn("verifiedOn").AsDateTime().Nullable()
                .WithColumn("createdOn").AsDateTime().NotNullable().WithDefault(SystemMethods.CurrentDateTime)
                .WithColumn("modifiedOn").AsDateTime().Nullable();

            Create.Table("userClubs")
                .WithColumn("id").AsInt32().NotNullable().PrimaryKey().Identity()
                .WithColumn("clubId").AsInt32().NotNullable()
                .WithColumn("createdOn").AsDateTime().NotNullable().WithDefault(SystemMethods.CurrentDateTime)
                .WithColumn("modifiedOn").AsDateTime().Nullable();

            Create.Table("clubs")
                .WithColumn("id").AsInt32().NotNullable().PrimaryKey().Identity()
                .WithColumn("createdById").AsInt32().NotNullable()
                .WithColumn("nameOf").AsString(255).NotNullable()
                .WithColumn("president").AsString(255).Nullable()
                .WithColumn("email").AsString(255).NotNullable()
                .WithColumn("websiteUrl").AsString(255).Nullable()
                .WithColumn("mainImageUrl").AsString(255).Nullable()
                .WithColumn("googleMapUrl").AsString(255).Nullable()
                .WithColumn("createdOn").AsDateTime().NotNullable().WithDefault(SystemMethods.CurrentDateTime)
                .WithColumn("modifiedOn").AsDateTime().Nullable();

            Create.Table("rides")
                .WithColumn("id").AsInt32().NotNullable().PrimaryKey().Identity()
                .WithColumn("createdById").AsInt32().NotNullable()
                .WithColumn("clubId").AsInt32().NotNullable()
                .WithColumn("title").AsString(255).NotNullable()
                .WithColumn("description").AsString(255).Nullable()
                .WithColumn("startsOn").AsDateTime().NotNullable()
                .WithColumn("endsOn").AsDateTime().Nullable()
                .WithColumn("linklUrl").AsString(255).Nullable()
                .WithColumn("startLocation").AsString(255).NotNullable()
                .WithColumn("endLocation").AsString(255).Nullable()
                .WithColumn("mapLink").AsString(255).Nullable()
                .WithColumn("lat").AsDecimal().Nullable()
                .WithColumn("lng").AsDecimal().Nullable()
                .WithColumn("createdOn").AsDateTime().NotNullable().WithDefault(SystemMethods.CurrentDateTime)
                .WithColumn("modifiedOn").AsDateTime().Nullable();

            Create.Table("events")
                .WithColumn("id").AsInt32().NotNullable().PrimaryKey().Identity()
                .WithColumn("createdById").AsInt32().NotNullable()
                .WithColumn("clubId").AsInt32().NotNullable()
                .WithColumn("title").AsString(255).NotNullable()
                .WithColumn("description").AsString(255).NotNullable()
                .WithColumn("standsUp").AsDateTime().NotNullable()
                .WithColumn("endsOnOn").AsDateTime().Nullable()
                .WithColumn("linklUrl").AsString(255).Nullable()
                .WithColumn("lat").AsDecimal().Nullable()
                .WithColumn("lng").AsDecimal().Nullable()
                .WithColumn("createdOn").AsDateTime().NotNullable().WithDefault(SystemMethods.CurrentDateTime)
                .WithColumn("modifiedOn").AsDateTime().Nullable();
        }

        public override void Down()
        {
            Delete.Table("clubs");
            Delete.Table("rides");
            Delete.Table("events");
        }
    }
}
