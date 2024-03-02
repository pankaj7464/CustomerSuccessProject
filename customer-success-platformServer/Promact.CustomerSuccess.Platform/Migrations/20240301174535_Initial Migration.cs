using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Promact.CustomerSuccess.Platform.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {

        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EscalationMatrices_Users_CreatorId",
                table: "EscalationMatrices");

            migrationBuilder.DropForeignKey(
                name: "FK_EscalationMatrices_Users_LastModifierId",
                table: "EscalationMatrices");

            migrationBuilder.DropIndex(
                name: "IX_EscalationMatrices_CreatorId",
                table: "EscalationMatrices");

            migrationBuilder.DropIndex(
                name: "IX_EscalationMatrices_LastModifierId",
                table: "EscalationMatrices");

            migrationBuilder.DropColumn(
                name: "ConcurrencyStamp",
                table: "EscalationMatrices");

            migrationBuilder.DropColumn(
                name: "ExtraProperties",
                table: "EscalationMatrices");

            migrationBuilder.AlterColumn<string>(
                name: "ExtraProperties",
                table: "Users",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ExtraProperties",
                table: "Users",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ConcurrencyStamp",
                table: "EscalationMatrices",
                type: "character varying(40)",
                maxLength: 40,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ExtraProperties",
                table: "EscalationMatrices",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_EscalationMatrices_CreatorId",
                table: "EscalationMatrices",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_EscalationMatrices_LastModifierId",
                table: "EscalationMatrices",
                column: "LastModifierId");

            migrationBuilder.AddForeignKey(
                name: "FK_EscalationMatrices_Users_CreatorId",
                table: "EscalationMatrices",
                column: "CreatorId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EscalationMatrices_Users_LastModifierId",
                table: "EscalationMatrices",
                column: "LastModifierId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
