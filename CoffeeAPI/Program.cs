using Microsoft.EntityFrameworkCore;
using CoffeeAPI.Data;
using CoffeeAPI.Entities;
using Microsoft.AspNetCore.Identity;

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

//Adds and configures the identity system for the specified User type
builder.Services.AddIdentityCore<User>()
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<StoreContext>();
builder.Services.AddAuthentication();
builder.Services.AddAuthorization();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(opt => 
{
    // AllowCredential is for allowing the client to pass cookie, otherwhise this would not work
    app.UseCors(opt => opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:5173"));
});


app.UseHttpsRedirection();

app.UseCors("AllowCors");

// app.UseAuthorization();

app.MapControllers();

// Create the database
var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

try
{
     context.Database.Migrate();
     DbInitializer.Initialize(context);
}
catch (Exception ex)
{
    logger.LogError($"An error occurred: {ex.Message}", ex);

    if (ex.InnerException != null)
    {
        logger.LogError($"Inner exception: {ex.InnerException.Message}", ex);
    }
}

app.Run();
