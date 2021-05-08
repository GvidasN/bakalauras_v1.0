using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hospital_app_02_BE.Data.Entities;

namespace Hospital_app_02_BE.Contracts.News
{
	public static class NewsExtensions
	{
		public static NewsView ToView(this NewsDto newsDto)
		{
			return new NewsView()
			{
				Title = newsDto.Title,
				Id = newsDto.Id,
				Date = newsDto.Date,
				Description = newsDto.Description
			};
		}
		public static Hospital_app_02_BE.Data.Entities.News ToEntity(this NewsDto newsDto)
		{
			return new Hospital_app_02_BE.Data.Entities.News()
			{
				Title = newsDto.Title,
				Id = newsDto.Id,
				Date = newsDto.Date,
				Description = newsDto.Description
			};
		}
		public static NewsDto ToDto(this Hospital_app_02_BE.Data.Entities.News news)
		{
			return new NewsDto()
			{
				Title = news.Title,
				Id = news.Id,
				Date = news.Date,
				Description = news.Description
			};
		}
		public static NewsDto ToDto(this NewsCreate news)
		{
			return new NewsDto()
			{
				Title = news.Title,
				Date = news.Date,
				Description = news.Description
			};
		}
		public static NewsDto ToDto(this NewsUpdate news)
		{
			return new NewsDto()
			{
				Title = news.Title,
				Id = news.Id,
				Date = news.Date,
				Description = news.Description
			};
		}

	}
}
