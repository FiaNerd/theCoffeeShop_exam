using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using CoffeeAPI.Data;
using System.Text;
using CoffeeAPI.Entities;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<StoreContext>(opt =>
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

builder.Services.AddCors();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(opt => 
{
    opt.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:5173/");
});


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// Create the database
var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
try
{
     context.Database.MigrateAsync();
     DbInitializer.Initialize(context);
}
catch (Exception ex)
{
    logger.LogError($"An error occurred during database migration and initialization: {ex.Message}", ex);
}

app.Run();
