using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital_app_02_BE.Contracts.News
{
	public class NewsCreate
	{
		public string Title { get; set; }
		public string Description { get; set; }
		public DateTime Date { get; set; }
	}
}
