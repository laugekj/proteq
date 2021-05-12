using Microsoft.EntityFrameworkCore.Migrations;

namespace test.Migrations
{
    public partial class Step : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Mail",
                table: "Images");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Mail",
                table: "Images",
                type: "text",
                nullable: true);
        }
    }
}
