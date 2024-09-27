using FluentMigrator;

namespace Bikevent.Migrations
{
    [Migration(20240101)]
    public class MigrationIniital : Migration
    {
        public override void Up()
        {
            Create.Table("Clubs")
                .WithColumn("id").AsInt32().NotNullable().PrimaryKey()
                .WithColumn("nameOf").AsString(255)
                .WithColumn("president").AsString(255)
                .WithColumn("email").AsString(255).NotNullable()
                .WithColumn("websiteUrl").AsString(255)
                .WithColumn("mainImageUrl").AsString(255)
                .WithColumn("googleMapUrl").AsString(255)
                .WithColumn("createdOn").AsDateTime()
                .WithColumn("modifiedOn").AsDateTime();            
            
            Create.Table("events")
                .WithColumn("title").AsString(255).NotNullable()
                .WithColumn("description").AsString(255)
                .WithColumn("startsOn").AsDateTime().NotNullable()
                .WithColumn("endsOnOn").AsDateTime()
                .WithColumn("linklUrl").AsString(255)
                .WithColumn("lat").AsDecimal()
                .WithColumn("lng").AsDecimal()
                .WithColumn("createdOn").AsDateTime()
                .WithColumn("modifiedOn").AsDateTime();            
            
            Create.Table("rides")
                .WithColumn("title").AsString(255).NotNullable()
                .WithColumn("description").AsString(255)
                .WithColumn("startsOn").AsDateTime().NotNullable()
                .WithColumn("endsOnOn").AsDateTime()
                .WithColumn("linklUrl").AsString(255)
                .WithColumn("lat").AsDecimal()
                .WithColumn("lng").AsDecimal()
                .WithColumn("createdOn").AsDateTime()
                .WithColumn("modifiedOn").AsDateTime();
        }

        public override void Down()
        {
            Delete.Table("clubs");
        }
    }
}
