using System.ComponentModel.DataAnnotations.Schema;
using FluentMigrator;

namespace Bikevent.Migrations
{
    [Migration(001)]
    public class Migration_001 : Migration
    {
        public override void Up()
        {
            Delete.Table("users");
            Delete.Table("userClubs");
            Delete.Table("clubs");
            Delete.Table("rides");
            Delete.Table("events");

            Create.Table("users")
                .WithColumn("id").AsInt32().NotNullable().PrimaryKey().Identity()
                .WithColumn("nickName").AsString(255).NotNullable()
                .WithColumn("encPassword").AsString(255).Nullable()
                .WithColumn("email").AsString(255).NotNullable()
                .WithColumn("verifiedOn").AsDateTime().NotNullable().WithDefault(SystemMethods.CurrentDateTime)
                .WithColumn("createdOn").AsDateTime().NotNullable().WithDefault(SystemMethods.CurrentDateTime)
                .WithColumn("modifiedOn").AsDateTime().NotNullable().WithDefault(SystemMethods.CurrentDateTime);                 
            
            Create.Table("userClubs")
                .WithColumn("id").AsInt32().NotNullable().PrimaryKey().Identity()
                .WithColumn("clubId").AsInt32().NotNullable()
                .WithColumn("createdOn").AsDateTime().NotNullable().WithDefault(SystemMethods.CurrentDateTime)
                .WithColumn("modifiedOn").AsDateTime().NotNullable().WithDefault(SystemMethods.CurrentDateTime);            
            
            Create.Table("clubs")
                .WithColumn("id").AsInt32().NotNullable().PrimaryKey().Identity()
                .WithColumn("nameOf").AsString(255).NotNullable()
                .WithColumn("president").AsString(255).Nullable()
                .WithColumn("email").AsString(255).NotNullable()
                .WithColumn("websiteUrl").AsString(255).Nullable()
                .WithColumn("mainImageUrl").AsString(255).Nullable()
                .WithColumn("googleMapUrl").AsString(255).Nullable()
                .WithColumn("createdOn").AsDateTime().NotNullable().WithDefault(SystemMethods.CurrentDateTime)
                .WithColumn("modifiedOn").AsDateTime().NotNullable().WithDefault(SystemMethods.CurrentDateTime);

            Create.Table("rides")
                .WithColumn("id").AsInt32().NotNullable().PrimaryKey().Identity()
                .WithColumn("club_id").AsInt32().NotNullable()
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
                .WithColumn("createdOn").AsDateTime().NotNullable().WithDefault(SystemMethods.CurrentDateTime)
                .WithColumn("modifiedOn").AsDateTime().NotNullable().WithDefault(SystemMethods.CurrentDateTime);

            Create.Table("events")
                .WithColumn("id").AsInt32().NotNullable().PrimaryKey().Identity()
                .WithColumn("club_id").AsInt32().NotNullable()
                .WithColumn("title").AsString(255).NotNullable()
                .WithColumn("description").AsString(255).NotNullable()
                .WithColumn("standsUp").AsDateTime().NotNullable()
                .WithColumn("endsOnOn").AsDateTime().Nullable()
                .WithColumn("linklUrl").AsString(255).Nullable()
                .WithColumn("lat").AsDecimal().Nullable()
                .WithColumn("lng").AsDecimal().Nullable()
                .WithColumn("createdOn").AsDateTime().NotNullable().WithDefault(SystemMethods.CurrentDateTime)
                .WithColumn("modifiedOn").AsDateTime().NotNullable().WithDefault(SystemMethods.CurrentDateTime);

        }

        public override void Down()
        {
            Delete.Table("clubs");
            Delete.Table("rides");
            Delete.Table("events");
        }
    }
}
