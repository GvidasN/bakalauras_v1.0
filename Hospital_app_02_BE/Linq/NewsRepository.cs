using Hospital_app_02_BE.Contracts.News;
using Hospital_app_02_BE.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital_app_02_BE.Linq
{
	public class NewsRepository : INewsRepository
	{
		readonly HospitalContext _context;

		public NewsRepository(HospitalContext context)
		{
			_context = context;
		}

		public async Task<List<NewsDto>> GetAll()
		{
			return await _context.News
				.Select(x => x.ToDto())
				.ToListAsync();
		}

		public async Task<NewsDto> GetById(int id)
		{
			return await _context.News
				.Where(x => x.Id == id)
				.Select(x => x.ToDto())
				.SingleOrDefaultAsync();
		}

		public async Task<bool> Create(NewsDto newsDto)
		{
			var entity = newsDto.ToEntity();
			_context.News.Add(entity);
			await _context.SaveChangesAsync();
			return true;
		}

		public async Task<NewsDto> Update(NewsDto newsDto, int newsId)
		{
			var entity = await _context.News.SingleOrDefaultAsync(x => x.Id == newsId);
			if (entity == null) return null;

			entity.Title = newsDto.Title ?? entity.Title;
			entity.Description = newsDto.Description ?? entity.Description;
			entity.Date = newsDto.Date;

			_context.News.Update(entity);
			await _context.SaveChangesAsync();
			return await GetById(entity.Id);
		}

		public async Task<bool> Delete(int newsId)
		{
			var entity = await _context.News.SingleOrDefaultAsync(x => x.Id == newsId);
			if (entity is null) return false;

			_context.News.Remove(entity);
			await _context.SaveChangesAsync();
			return true;
		}
	}
}
