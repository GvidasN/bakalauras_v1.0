using Hospital_app_02_BE.Contracts.Employees;
using Hospital_app_02_BE.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital_app_02_BE.Contracts.Critical_situations
{
	public static class CriticalSituationExtensions
	{
		public static Critical_situation_confirmations ToDto(this CriticalSituationDto entity)
		{
			return new Critical_situation_confirmations()
			{
				EmployeeId = entity.EmployeeId,
				Date = entity.Date,
				IsCritical = entity.IsCritical
			};
		}

		public static CriticalSituationDto ToEntity(this Critical_situation_confirmations dto)
		{
			return new CriticalSituationDto()
			{
				Id = dto.Id,				
				EmployeeId = dto.EmployeeId,
				Date = dto.Date,
				IsCritical = dto.IsCritical,
				Employee = dto.Employee is null ? new EmployeeDto() : dto.Employee.ToDto()
			};
		}

		public static CriticalSituationDto ToEntity(this CriticalSituationCreate dto)
		{
			return new CriticalSituationDto()
			{
				EmployeeId = dto.EmployeeId,
				Date = dto.Date,
				IsCritical = dto.IsCritical
			};
		}
	}
}
