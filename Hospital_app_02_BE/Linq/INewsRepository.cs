using Hospital_app_02_BE.Contracts.News;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital_app_02_BE.Linq
{
	public interface INewsRepository
	{
		Task<List<NewsDto>> GetAll();
		Task<NewsDto> GetById(int id);
		Task<bool> Create(NewsDto newsDto);
		Task<NewsDto> Update(NewsDto newsDto, int newsId);
		Task<bool> Delete(int id);
	}
}
