using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace CoffeeAPI.Services
{
    public class ImageService
    {
        private readonly Cloudinary _cloudinary;

        // Config to cloudinary
        public ImageService(IConfiguration config)
        {
            // Comes from cloudinary, my specifik account
            var acc = new Account
            (
                config["Cloudinary:CloudName"],
                config["Cloudinary:ApiKey"],
                config["Cloudinary:ApiSecret"]
            );

            // Giving acces to cloudinary service
            _cloudinary = new Cloudinary(acc);
        }

        // Upload imageas to cloudinary
        public async Task<ImageUploadResult> AddImageAsync(IFormFile file)
        {
            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
            using var stream = file.OpenReadStream();

            var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream)
                };
                
                uploadResult = await _cloudinary.UploadAsync(uploadParams);
            }

            return uploadResult;
        }

        // Remove images from Cloudinary
        public async Task<DeletionResult> DeleteImageAsync(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);

            var result = await _cloudinary.DestroyAsync(deleteParams);

            return result;
        }
    }
}