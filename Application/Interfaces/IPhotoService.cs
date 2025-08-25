using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using MediatR;
using Application.Profiles.DTOs;

namespace Application.Interfaces;

public interface IPhotoService
{
    public Task<PhotoUploadResult?> UploadPhoto(IFormFile formFile);

    public Task<string> DeletePhoto(string PublicID);
}
