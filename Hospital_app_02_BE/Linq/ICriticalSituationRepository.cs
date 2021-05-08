using Hospital_app_02_BE.Contracts.Critical_situations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital_app_02_BE.Linq
{
	public interface ICriticalSituationRepository
	{
		Task<CriticalSituationDto> GetLatest();
		Task<bool> CreateNew(CriticalSituationDto entity);
	}
}
