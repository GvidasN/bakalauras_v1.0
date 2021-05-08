using Hospital_app_02_BE.Contracts.Critical_situations;
using Hospital_app_02_BE.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital_app_02_BE.Linq
{
	public class CriticalSituationRepository : ICriticalSituationRepository
	{
		private readonly HospitalContext _context;
		public CriticalSituationRepository(HospitalContext context)
		{
			_context = context;
		}

		public async Task<bool> CreateNew(CriticalSituationDto entity)
		{
			_context.Critical_Situation_Confirmations.Add(entity.ToDto());
			await _context.SaveChangesAsync();
			return true;
		}

		public async Task<CriticalSituationDto> GetLatest()
		{
			return await _context.Critical_Situation_Confirmations
			.OrderByDescending(x => x.Id)			
			.Include(x => x.Employee)
			.Select(x => x.ToEntity())
			.FirstOrDefaultAsync();
		}
	}
}
