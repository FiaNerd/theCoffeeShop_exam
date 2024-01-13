using CoffeeAPI.Entities;
using Microsoft.AspNetCore.Identity;


namespace CoffeeAPI.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(StoreContext context, UserManager<User> userManager)
        {
              if (!userManager.Users.Any())
            {
                var user = new User
                {
                    UserName = "user",
                    Email = "user@nomail.com"
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Member");

                var admin = new User
                {
                    UserName = "admin",
                    Email = "admin@nomail.com"
                };

                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRolesAsync(admin, new[] { "Admin", "Member" });
            }


            if(context.Products.Any())
            {
                return;
            }

        var coffeeProducts = new List<Product>
        {
            
            new Product
             {
                Name =  "Decaf Organic",
                BlendDescription = "UPPTÄCK DECAF ORGANIC MED FRISKA TONER",
                Description = "En lätt och mild koffeinfri mörkrostblandning med friska toner och välbalanserad syra. Perfekt för alla som vill kunna njuta av en kopp kaffe på kvällen utan att tänka på att sömnen ska påverkas negativt eller av andra anledningar vill undvika koffein. Zoégas Decaf Organic är ett smakfullt kaffe gjort på 100% certifierade Rainforest Alliance och ekologiskt certifierade Arabicabönor. Bönorna kommer från Central- och Latinamerika och bjuder på en lätt och mild smak med friska toner och välbalanserad syra.",
                ImageUrl = "/images/products/bryggkaffe/ekologiskt/defect_organic_brygg_1200x1200.jpg",
                Type =  ["Bryggkaffe", "Ekologiskt"],
                RoastLevel = "Mellanrost",
                Price = 6280,
                QuantityInStock = 100,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now
            },
            new Product 
            {
                Name =  "Hazienda",
                BlendDescription = "UPPTÄCK TONER AV PLOMMON",
                Description = "Hazienda är en av våra Fairtrade- och KRAV-märkta blandningar gjord på 100% högvuxna Arabicabönor från Afrika, Central- och Sydamerika. Bönorna är varsamt mörkrostade och koppade i vårt kafferosteri i Helsingborg där våra rostmästare lyft fram en frisk kaffekaraktär, med välbalanserad fyllighet och mjuka toner av blå plommon och nötter. Zoégas Hazienda har en fyllig och smakrik karaktär. Smaken är komplex men välbalanserad med toner av mogna bär, plommon och nötter. Kaffet har en frisk karaktär som framträder och bevaras efter salt mat, såsom räkor eller salami. Sältan tar fram en fruktig och balanserad syra samtidigt som komplexiteten bevaras. Tillsammans med choklad får kaffet en friskhet som snabbt avtar och lämnar en känsla av välbehag.",
                ImageUrl = "/images/products/bryggkaffe/mellanrost/hazeienda_brygg_1200x1200.jpg",
                Type = ["Bryggkaffe", "Hela bönor", "Ekologiskt"],
                RoastLevel = "Mellanrost",
                Price  = 8990,
                QuantityInStock = 100,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now
            },
            new Product 
            {
                Name = "Estanzia",
                BlendDescription = "UPPTÄCK TONER AV RÖDA VINBÄR",
                Description = "Estanzia är en Fairtrade- och KRAV-märkt blandning med en komposition av omsorgsfullt handplockade Arabicabönor från Afrika, Central- och Sydamerika. Bönorna är lätt mörkrostade och koppade i vårt kafferosteri i Helsingborg där vi lyft fram en kaffekaraktär med frisk smak, toner av röda vinbär och mjölkchoklad. Gott kaffe är vårt hantverk och passion. Estanzia är en Fairtrade- och KRAV-märkt blandning med en komposition av omsorgsfullt handplockade Arabicabönor från Afrika, Central- och Sydamerika. Bönorna är lätt mörkrostade och koppade i vårt kafferosteri i Helsingborg där vi lyft fram en kaffekaraktär med frisk smak, toner av röda vinbär och mjölkchoklad. Våra rostmästare har rostat kaffebönorna till perfektion och våra kvalitetsspecialister har provat om och om igen för att säkerställa ett hållbart odlat kaffe av högsta kvalitet. Allt för att du som kaffeälskare ska kunna njuta av en smakfull kopp Estanzia och samtidigt vara en del i en positiv och hållbar utveckling för framtiden.",
                ImageUrl = "/images/products/bryggkaffe/mork_rost/estanzia_organic-1200x1200.jpg",
                Type = ["Bryggkaffe", "Ekologiskt"],
                RoastLevel = "Mörkrost",
                Price = 6220,
                QuantityInStock = 100,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now
            },
            new Product
            {
                Name = "Maria Zoéga Skånerost",
                BlendDescription = "UPPTÄCK TONER AV BJÖRNBÄR OCH CHOKLAD",
                Description = "Gott kaffe är vårt hantverk och passion. Maria Zoéga Skånerost är en blandning av kaffe från Östafrika och Central- och Sydamerika. I vårt kafferosteri i Helsingborg har våra rostmästare rostat bönorna extra mörkt för att lyfta fram ett fylligt och kraftfullt kaffe, med toner av björnbär och choklad. Med kaffekunskap från hela världen och passion för vårt hantverk skapar vi ett smakfullt kaffe av högsta kvalitet. Allt för att vi på Zoégasska kunna ge dig som kaffeälskare det bästa kaffet, och låta dig uppleva en Zoégas-stund tillsammans med en smakfull kopp Maria Zoéga Skånerost. Kaffebönorna i Maria Zoéga Skånerost kommer från bland annat Rainforest Alliance certifierade odlingar. Detta är en del av vårt hållbarhetsarbete för att säkra att kaffet odlas på ett sätt som skyddar miljön och ger bättre försörjningsmöjligheter för kaffeodlare. Allt för att du som kaffedrickare ska kunna njuta av den smakfulla Zoégas-koppen och samtidigt vara en del i en positiv och hållbar utveckling för framtiden, för människa och miljö.",
                ImageUrl = "/images/products/bryggkaffe/mork_rost/maria_brygg_1200x1200.jpg",
                Type = ["Bryggkaffe"],
                 RoastLevel = "Mörkrost",
                Price = 8940,
                QuantityInStock = 100,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now
            },
            new Product
            {
                Name = "Pasión Colombia",
                BlendDescription = "UPPTÄCK TONER AV ÄPPLE",
                Description = "Pasión Colombia är en av våra smakfulla blandningar med endast ett unikt ursprung. Bönorna är omsorgsfullt handplockade i Colombia där kaffet växer i vulkanisk jord mellan Chocos lågland och Andernas snöhöljda toppar på upp till 2000 meters höjd. Arabicabönorna är lätt mörkrostade och koppade i vårt kafferosteri i Helsingborg där vi lyft fram en mjuk, fruktig och frisk kaffekaraktär med en touch av syrligt och sött granatäpple. Gott kaffe är vårt hantverk och passion. Vi på Zoégas brinner för vårt kaffehantverk och ingen detalj lämnas åt slumpen. Hantverket bakom vårt kaffe - från den omsorgsfullt handplockade bönan till den smakfulla koppen Pasión Colombia är skapad med kaffekunskap från hela världen, och en stor dos kärlek. Allt för att du som kaffeälskare ska kunna njuta av din Zoégas-stund med det bästa kaffet, och inget annat än det bästa.",
                ImageUrl = "/images/products/bryggkaffe/latt_rost/colombia_brygg_1200x1200.jpg",
                Type = ["Bryggkaffe"],
                 RoastLevel = "Mellanrost",
                Price =  7820,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now
            },
            new Product
            {
                Name = "Forza!",
                BlendDescription = "UPPTÄCK TONER AV CHILI",
                Description = "Zoégas Forza! ger en eldig och kraftfull smak där en lätt jordighet samsas med syra och inslag av tobak. Doften är rik med spår av bittermandel och choklad. Kaffet är utmärkt till choklad, desserter och sötsaker. Sötman parar sig med kaffets strävhet på ett extraordinärt sätt och skapar en harmonisk smakupplevelse. Kaffets eldighet balanserar också avec som whiskey, sherry eller punch. Gott kaffe är vårt hantverk och passion. Forza! är en blandning av Santoskaffe från Brasilien och handplockade högvuxna Arabicabönor från Östafrikas bergssluttningar. I vårt kafferosteri i Helsingborg har våra rostmästare rostat bönorna extra mörkt för att lyfta fram ett eldigt och smakrikt kaffe, med toner av mörk choklad och chili. Med kaffekunskap från hela världen och passion för vårt hantverk skapar vi ett smakfullt kaffe av högsta kvalitet. Allt för att vi på Zoégas ska kunna ge dig som kaffeälskare det bästa kaffet, och låta dig uppleva en Zoégas-stund tillsammans med en smakfull kopp Forza!",
                ImageUrl = "/images/products/hela_bönor/mork_rost/mollbers_hela_boner_1200x1200.jpg",
                Type = ["Bryggkaffe", "Hela bönor"],
                 RoastLevel = "Mörkrost",
                Price = 5640,
                QuantityInStock = 100,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now
            },
            new Product
            {
                Name = "Mollbergs",
                BlendDescription = "UPPTÄCK TONER AV SVARTA VINBÄR",
                Description = "Mollbergs är vår äldsta och finaste blandning som togs fram åt anrika Hotell Mollberg i Helsingborg år 1903. Kaffet får sin arom och långa eftersmak från en stor andel högvuxna Kenyabönor som är smakfullt balanserad med handplockade Arabicabönor från Latinamerika. Från mitten av 2023 rullar nya designade förpackningar ut över hela landet. Mollbergs är samma klassiska blandning i ny design.",
                ImageUrl = "/images/products/bryggkaffe/mork_rost/mollbergs-1200x1200.jpg",
                Type = ["Bryggkaffe", "Hela bönor"],
                 RoastLevel = "Mörkrost",
                Price = 7180,
                QuantityInStock = 100,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now
            },
            new Product
            {
                Name = "Mezzo",
                BlendDescription = "UPPTÄCK MJUKA TONER AV NOUGAT",
                Description = "Mezzo är ett mellanrostat kaffe med en speciellt utvald komposition av handplockade Arabicabönor från Brasilien, smakfullt balanserat med inslag av Arabicabönor från Östafrikas bergssluttningar för att lyfta fram en rundare smaknyans. Gott kaffe är vårt hantverk och passion. Mezzo är ett mellanrostat kaffe med en speciellt utvald komposition av handplockade Arabicabönor från Brasilien, smakfullt balanserat med inslag av Arabicabönor från Östafrikas bergssluttningar för att lyfta fram en rundare smaknyans. Våra rostmästare har varsamt rostat och koppat bönorna i vårt kafferosteri i Helsingborg där vi lyft fram friska toner av gröna druvor och nougat som skapar den unika kaffekaraktären. Med passion för hantverk och kvalitet vill vi förhöja kaffestunden för de som delar vår passion för gott kaffe.",
                ImageUrl = "/images/products/hela_bönor/mellan_rost/mezzo-1200x1200.jpg",
                Type = ["Bryggkaffe", "Hela bönor"],
                RoastLevel = "Mellanrost",
                Price = 5980,
                QuantityInStock = 100,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now
            },
            new Product
            {
                Name = "Dark Temptation",
                BlendDescription = "UPPTÄCK MJUKA TONER AV HASSELNÖT",
                Description = "Dark Temptation är en blandning av högvuxna bönor från Östafrika och pärlbönor från Brasilien. Våra rostmästare har varsamt rostat och koppat bönorna i vårt kafferosteri i Helsingborg där vi lyft fram en smakfull och mjuk kaffekaraktär med tydlig friskhet och toner av hasselnöt på 100% Arabicabönor. Vi på ZOÉGAS hyser ett passionerat förhållande till gott kaffe och vill säkerställa att varje enskild detalj i vårt kaffehantverk är av högsta kvalitet. Allt för att vi på ZOÉGAS ska kunna ge dig som kaffeälskare det bästa kaffet, och låta dig uppleva en ZOÉGAS-stund tillsammans med en smakfull kopp Dark Temptation.",
                ImageUrl = "/images/products/hela_bönor/mork_rost/dark_temptions_hela_boner_1200x1200.jpg",
                Type = ["Hela bönor"],
                 RoastLevel = "Mörkrost",
                Price = 6780,
                QuantityInStock = 100,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now
            },
            new Product
            {
                Name = "Intenzo",
                BlendDescription = "UPPTÄCK TONER AV RÖDA ÄPPLEN",
                Description = "Gott kaffe är vårt hantverk och passion. Intenzo är en aromrik smakkomposition av omsorgsfullt handplockade, högvuxna Arabicabönor från Östafrika som ger en varm fyllighet, smakfullt balanserad med Arabicabönor från Centralamerika. I vårt kafferosteri i Helsingborg har våra rostmästare rostat och koppat bönorna till perfektion för att lyfta fram en fyllig mörkrost med toner av röda äpplen, där sötma och syra kompletterar varandra. Vi på Zoégas brinner för vårt hantverk och uttrycker vår passion genom vårt kaffe och smaken blir således resultatet av vårt arbete. Resan från den omsorgsfullt handplockade bönan till att Intenzo når din kaffekopp är skapat med kunskap från hela världen, omsorg och en stor dos kärlek. Så, låt oss skapa njutning i din vardag med en smakfull kopp Intenzo och ett kaffe av högsta kvalitet.",
                ImageUrl = "/images/products/bryggkaffe/mork_rost/intenzo_brygg_1200x1200.jpg",
                Type = ["Bryggkaffe", "Hela bönor"],
                RoastLevel = "Mellanrost",
                Price = 5940,
                QuantityInStock = 100,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now
                },
            new Product
            {
                Name = "Blue Java",
                BlendDescription = "UPPTÄCK TONER AV CITRUS",
                Description = "Gott kaffe är vårt hantverk och passion. Blue Java är en smakfull komposition gjord på omsorgsfullt handplockade Arabicabönor från Östafrika, Syd- och Centralamerika. Genom att blanda olika ursprung/kaffebönor kan vi ta fram ännu fler rika smaknyanser som skapar den unika Blue Java-koppen. Blue Java har fått sin smakfulla kaffekaraktär i vårt kafferosteri i Helsingborg där våra rostmästare varsamt mörkrostat och koppat tongivande Arabicabönor från Etiopien, och lyft fram en kryddig karaktär med toner av citrus. Vi brinner för vårt kaffe och lägger ner stor passion och omsorg för att varje enskild detalj i vårt kaffehantverk ska vara av högsta kvalitet. Allt för att vi på Zoégas ska kunna ge dig som kaffeälskare möjligheten att uppleva en spännande smakresa med det bästa kaffet, och njuta av en Zoégas-stund.",
                ImageUrl = "/images/products/bryggkaffe/latt_rost/blueJava_brygg_1200x1200.jpg",
                Type = ["Bryggkaffe", "Hela bönor"],
                RoastLevel = "Lättrost",
                Price = 5880,
                QuantityInStock = 100, 
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now
            },
            new Product
            {
                Name = "Skånerost",
                BlendDescription = "UPPTÄCK TONER AV MÖRKA BÄR",
                Description = "Skånerost är en orginalblandning från 1918 som för skåningen är känt som 'den gröne'. En smakrik komposition gjord av omsorgsfullt handplockade Arabicabönor från Östafrika och Brasilien, väl avvägt med högvuxna bönor från Latinamerika. Bönorna är varsamt mörkrostade och koppade i vårt kafferosteri i Helsingborg där vi lyft fram en smakfull kaffekaraktär av kärv mörkrost med behaglig fruktighet och toner av mörka bär. Med skånsk passion och kaffekunskap från hela världen har våra rostmästare sedan 1886 rostat och koppat bönor i vårt kafferosteri i Helsingborg.",
                ImageUrl = "/images/products/bryggkaffe/mork_rost/skane_brygg_1200x1200.jpg",
                Type = ["Bryggkaffe", "Hela bönor"],
                RoastLevel = "Mörkrost",
                Price = 6590,
                QuantityInStock = 100, 
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now
            },
            new Product
            {
                Name = "Kahawa",
                BlendDescription = "UPPTÄCK EN FRUKTIG & BALANSERAD MÖRKROST",
                Description = "KAHAWA - MÄSTARENS BLANDNING FRUKTIG & BALANSERAD MÖRKROST. Zoégas Master Barista Ola Persson står inför en utmaning. Om ett par veckor ska han tävla i International Coffee Championship i Dubai – en tävling som han inte bara vill försöka vinna utan göra det på sitt eget sätt. Han reser därför till Kenya och ger sig ut på ett storslaget äventyr runt foten av Mount Kenya. Där måste han på bara en vecka lyckas hitta den ultimata kaffebönan till sin tävlingsblandning. Expeditionen leder honom kors och tvärs över Kenyas vidsträckta savanner, djupa plantage och höga berg. ZOÉGAS KAHAWA är resultatet av jakten på den ultimata kaffeblandningen. KAHAWA är en fruktig, smakrik, fyllig och balanserad mörkrost med toner av bär och mandarin. 100% Arabicabönor från Brasilien och Östafrika.",
                ImageUrl = "/images/products/bryggkaffe/latt_rost/kahawa-1200x1200.jpg",
                Type = ["Bryggkaffe"],
                RoastLevel = "Lättrost",
                Price =  7860,
                QuantityInStock = 100,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now
            },
            new Product
            {
                Name = "Västkust",
                BlendDescription = "UPPTÄCK EN MJUK OCH FRISK MELLANROST",
                Description = "Västkust är ett mellanrostat kaffe med en smakfull komposition av 100% Arabicabönor med ursprung från världens kaffebälte. Bönorna är varsamt rostade och koppade i vårt kafferosteri i Helsingborg där vi lyft fram en mjuk och frisk kaffekaraktär som speciellt får dig att längta till Västkustens saltstänkta stränder och klippiga övärld. Våra rostmästare har rostat kaffebönorna till perfektion och våra kvalitetsspecialister har provat om och om igen för att säkerställa ett mellanrostat kaffe av högsta kvalitet.",
                ImageUrl = "/images/products/bryggkaffe/mellanrost/vastkust_brygg_1200x1200.jpg",
                Type = ["Bryggkaffe"],
                RoastLevel = "Mellanrost",
                Price = 6430,
                QuantityInStock = 100,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now
            },
            new Product
            {
                Name = "Stockholm",
                BlendDescription = "UPPTÄCK EN BALANSERAD OCH SYRLIG MELLANROST",
                Description = "Stockholm är en aromatisk och mjuk mellanrost, med en speciellt utvald komposition gjord på 100% Arabicabönor som handplockats från olika delar av världen. I vårt kafferosteri i Helsingborg har våra rostmästare varsamt rostat bönorna till perfektion och våra kvalitetsspecialister har provat om och om igen för att säkerställa ett kaffe av högsta kvalitet. Kombinationen av den livliga syrligheten tillsammans med den välbalanserade eftersmaken skapar en spännande smakresa, precis som en riktigt god mellanrost ska smaka.",
                ImageUrl = "/images/products/bryggkaffe/mork_rost/stockholm-1200x1200.jpg",
                Type = ["Bryggkaffe"],
                RoastLevel = "Mellanrost",
                Price = 6670,
                QuantityInStock = 100,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now
            },
            new Product
            {
                Name = "Fikastund",
                BlendDescription = "UPPTÄCK EN MJUK OCH LEN MELLANROST",
                Description = "Fikastund ingår i vår Mellanrost-kollektion, där hittar du våra balanserade och aromatiska mellanrostade kaffeblandningar på 100% Arabicabönor, som smakar precis som en riktigt god mellanrost ska smaka. Kaffebönorna i Fikastund kommer från bland annat Rainforest Alliance certifierade odlingar.* Detta är en del av vårt hållbarhetsarbete för att säkra att kaffet odlas på ett sätt som skyddar miljön och ger bättre försörjningsmöjligheter för kaffeodlare. Allt för att du som kaffedrickare ska kunna njuta av den smakfulla Zoégas-koppen och samtidigt vara en del i en positiv och hållbar utveckling för framtiden, för människa och miljö. Läs mer om Zoégas mångåriga hållbarhetsinitiativ Coffee By Women här.",
                ImageUrl = "/images/products/bryggkaffe/mellanrost/fikastund-1200x1200.jpg",
                Type = ["Bryggkaffe"],
                RoastLevel = "Mellanrost",
                Price = 6880,
                QuantityInStock = 100,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now
            },
            new Product
            {
                Name = "Hazienda",
                BlendDescription = "UPPTÄCK TONER AV PLOMMON",
                Description = "Hazienda är en av våra Fairtrade- och KRAV-märkta blandningar gjord på 100% högvuxna Arabicabönor från Afrika, Central- och Sydamerika. Bönorna är varsamt mörkrostade och koppade i vårt kafferosteri i Helsingborg där våra rostmästare lyft fram en frisk kaffekaraktär, med välbalanserad fyllighet och mjuka toner av blå plommon och nötter. Zoégas Hazienda har en fyllig och smakrik karaktär. Smaken är komplex men välbalanserad med toner av mogna bär, plommon och nötter. Kaffet har en frisk karaktär som framträder och bevaras efter salt mat, såsom räkor eller salami. Sältan tar fram en fruktig och balanserad syra samtidigt som komplexiteten bevaras. Tillsammans med choklad får kaffet en friskhet som snabbt avtar och lämnar en känsla av välbehag.",
                ImageUrl = "/images/products/bryggkaffe/mellanrost/hazeienda_brygg_1200x1200.jpg",
                Type = ["Bryggkaffe", "Hela bönor", "Ekologiskt"],
                RoastLevel = "Mellanrost",
                Price = 6130,
                QuantityInStock = 100,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now
            },
            new Product
            {
                Name = "Mollbergs",
                BlendDescription = "UPPTÄCK DISTINKTA TONER AV SVARTA VINBÄR",
                Description = "Mollbergs är vår äldsta och finaste blandning som togs fram åt anrika Hotell Mollberg i Helsingborg år 1903. Kaffet får sin arom och långa eftersmak från en stor andel högvuxna Kenyabönor som är smakfullt balanserad med handplockade Arabicabönor från Latinamerika. Från mitten av 2023 rullar nya designade förpackningar ut över hela landet. Mollbergs är samma klassiska blandning i ny design. Bönorna är varsamt rostade och koppade i vårt kafferosteri i Helsingborg där våra rostmästare lyft fram en mustig mörkrost med elegant smak och toner av svarta vinbär och smörkola. Den fylliga eftersmaken håller sig kvar länge vilket skapar Zoégas unika karaktär. Våra rostmästare har rostat kaffebönorna till perfektion och våra kvalitetsspecialister har provat om och om igen för att säkerställa ett smakfullt kaffe av högsta kvalitet. En Mollbergs ska ju alltid smaka som en Mollbergs! Vi på Zoégas brinner för vårt kaffehantverk och med gedigen kaffekunskap från hela världen vill vi ge dig som kaffeälskare det bästa kaffet, och låta dig uppleva en Zoégas-stund.",
                ImageUrl = "/images/products/hela_bönor/mork_rost/mollbers_hela_boner_1200x1200.jpg",
                Type = [ "Bryggkaffe", "Hela bönor"],
                RoastLevel = "Mörkrost",
                Price = 7180,
                QuantityInStock = 100,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now
            },
            new Product
            {
                Name = "Forza",
                BlendDescription = "UPPTÄCK TONER AV CHILI",
                Description = "ZOÉGAS Forza! ger en eldig och kraftfull smak där en lätt jordighet samsas med syra och inslag av tobak. Doften är rik med spår av bittermandel och choklad. Gott kaffe är vårt hantverk och passion. Forza! är en blandning av Santoskaffe från Brasilien och handplockade högvuxna Arabicabönor från Östafrikas bergssluttningar. I vårt kafferosteri i Helsingborg har våra rostmästare rostat bönorna extra mörkt för att lyfta fram ett eldigt och smakrikt kaffe, med toner av mörk choklad och chili. Med kaffekunskap från hela världen och passion för vårt hantverk skapar vi ett smakfullt kaffe av högsta kvalitet. Allt för att vi på ZOÉGAS ska kunna ge dig som kaffeälskare det bästa kaffet, och låta dig uppleva en ZOÉGAS-stund tillsammans med en smakfull kopp Forza!",
                ImageUrl = "/images/products/bryggkaffe/mork_rost/froza-1200x1200.jpg",
                Type = ["Bryggkaffe", "Hela bönor"],
                RoastLevel = "Mörkrost",
                Price = 5940,
                QuantityInStock = 100,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now
            }, 
            new Product
            {
                Name = "Intenzo",
                BlendDescription = "UPPTÄCK TONER AV RÖDA ÄPPLEN",
                Description = "Kaffebönorna i Intenzo kommer från bland annat Rainforest Alliance certifierade odlingar. Detta är en del av vårt hållbarhetsarbete för att säkra att kaffet odlas på ett sätt som skyddar miljön och ger bättre försörjningsmöjligheter för kaffeodlare. Hela bönor ger en större smakupplevelse och passar dem som vill unna sig det allra godaste kaffet. Ett nymalet kaffe fyller hemmet med ljuvliga dofter, och genom att mala kaffet precis innan bryggning får drycken ännu mer arom och smak. Hela bönor ger dig dessutom friheten att brygga ditt kaffe precis som du vill ha det med den bryggmetod du vill.",
                ImageUrl = "/images/products/bryggkaffe/mork_rost/intenzo_brygg_1200x1200.jpg",
                Type = ["Bryggkaffe", "Hela bönor"],
                RoastLevel = "Mörkrost",
                Price = 7870,
                QuantityInStock = 100,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now
            },
            new Product
            {
                Name = "Mezzo",
                BlendDescription = "UPPTÄCK MJUKA TONER AV NOUGAT",
                Description = "Mezzo är ett mellanrostat kaffe med en speciellt utvald komposition av handplockade Arabicabönor från Brasilien, smakfullt balanserat med inslag av Arabicabönor från Östafrikas bergssluttningar för att lyfta fram en rundare smaknyans. Våra rostmästare har varsamt rostat och koppat bönorna i vårt kafferosteri i Helsingborg där vi lyft fram friska toner av gröna druvor och nougat som skapar den unika kaffekaraktären. Med passion för hantverk och kvalitet vill vi förhöja kaffestunden för de som delar vår passion för gott kaffe.",
                ImageUrl = "/images/products/hela_bönor/mellan_rost/mezzo-1200x1200.jpg",
                Type = ["Bryggkaffe", "Hela bönor"],
                RoastLevel = "Mellanrost",
                Price = 4980,
                QuantityInStock = 100,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now
            },
            new Product
            {
                Name = "Blue Java",
                BlendDescription ="UPPTÄCK TONER AV CITRUS",
                Description ="Blue Java är en smakfull komposition gjord på omsorgsfullt handplockade Arabicabönor från Östafrika, Syd- och Centralamerika. Genom att blanda olika ursprung/kaffebönor kan vi ta fram ännu fler rika smaknyanser som skapar den unika Blue Java-koppen. Blue Java har fått sin smakfulla kaffekaraktär i vårt kafferosteri i Helsingborg där våra rostmästare varsamt mörkrostat och koppat tongivande Arabicabönor från Etiopien, och lyft fram en kryddig karaktär med toner av citrus. Zoégas Blue Java är ett kryddigt och harmoniskt kaffe med toner av citrus och kanel. I doften hittar du en förnimmelse av de klassiska kanelbulle-kryddorna.",
                ImageUrl = "/images/products/hela_bönor/latt_morkrost/blue_java_hela_boner_1200x1200.jpg",
                Type = ["Bryggkaffe", "Hela bönor"],
                RoastLevel = "Mellanrost",
                Price = 5850,
                QuantityInStock = 100,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now
            },
            new Product
            {
                Name = "Skånerost",
                BlendDescription = "UPPTÄCK TONER AV MÖRKA BÄR",
                Description = "Skånerost är en orginalblandning från 1918 som för skåningen är känt som ”den gröne”. En smakrik komposition gjord av omsorgsfullt handplockade Arabicabönor från Östafrika och Brasilien, väl avvägt med högvuxna bönor från Latinamerika. Bönorna är varsamt mörkrostade och koppade i vårt kafferosteri i Helsingborg där vi lyft fram en smakfull kaffekaraktär av kärv mörkrost med behaglig fruktighet och toner av mörka bär. Med skånsk passion och kaffekunskap från hela världen har våra rostmästare sedan 1886 rostat och koppat bönor i vårt kafferosteri i Helsingborg. Vi på Zoégas brinner för vårt hantverk och uttrycker vår passion genom vårt kaffe och smaken blir således resultatet av vårt arbete. Zoégas Skånerost är ett mörkrostat kaffe med en stor och fyllig doft med inslag av jord, nöt och svarta vinbär. Den kraftiga smaken är fylld av kärvhet med lång eftersmak av frukt och svarta vinbär. Kaffekompositionen passar perfekt till paj eller cheesecake med frukt och bär. Rekommenderas också efter salta och lätt syrliga rätter. Efter en buffé med kallskuret, salami, oliver, ananas, lax och potatis uppträder fruktig fyllighet.",
                ImageUrl = "/images/products/bryggkaffe/mork_rost/skane_brygg_1200x1200.jpg",
                Type = ["Bryggkaffe", "Hela bönor" ],
                RoastLevel = "Mörkrost",
                Price = 7680,
                QuantityInStock = 100, 
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now
            },
            new Product
            {
                Name = "Kahawa",
                BlendDescription = "KAHAWA - MÄSTARENS BLANDNING FRUKTIG & BALANSERAD MÖRKROST",
                Description = "Zoégas Master Barista Ola Persson står inför en utmaning. Om ett par veckor ska han tävla i International Coffee Championship i Dubai - en tävling som han inte bara vill försöka vinna utan göra det på sitt eget sätt. Han reser därför till Kenya och ger sig ut på ett storslaget äventyr runt foten av Mount Kenya. Där måste han på bara en vecka lyckas hitta den ultimata kaffebönan till sin tävlingsblandning. Expeditionen leder honom kors och tvärs över Kenyas vidsträckta savanner, djupa plantage och höga berg.",
                ImageUrl = "/images/products/bryggkaffe/latt_rost/kahawa-1200x1200.jpg",
                Type = ["Bryggkaffe", "Hela bönor"],
                RoastLevel = "Lättrost",
                Price = 6130,
                QuantityInStock = 100, 
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now
            },
            new Product
            {
                Name = "Presso",
                Description = "Presso är en favorit i presskannan och perkolatorn med en smakfull blandning av 100% högvuxna Arabicabönor från Kenya, Centralamerika och Santoskaffe från Brasilien. Våra rostmästare har varsamt rostat och koppat bönorna i vårt kafferosteri i Helsingborg där vi lyft fram en smakfull kaffekaraktär med kärva toner av mörka bär och bitter kakao.\nKaffebönorna i Presso  kommer från bland annat Rainforest Alliance certifierade odlingar. Detta är en del av vårt hållbarhetsarbete för att säkra att kaffet odlas på ett sätt som skyddar miljön och ger bättre försörjningsmöjligheter för kaffeodlare. Allt för att du som kaffedrickare ska kunna njuta av den smakfulla Zoégas-koppen och samtidigt vara en del i en positiv och hållbar utveckling för framtiden, för människa och miljö. Läs mer om Zoégas mångåriga hållbarhetsinitiativ Coffee By Women.",
                ImageUrl = "/images/products/press/presso_press_1200x1200.jpg",
                Type = ["Presskaffe"],
                RoastLevel = "Mörkrost",
                Price =  8970,
                QuantityInStock = 100,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now
            },
        };

          context.Products.AddRange(coffeeProducts);

          context.SaveChanges();
        }
    }
}
