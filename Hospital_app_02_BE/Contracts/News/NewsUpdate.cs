using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital_app_02_BE.Contracts.News
{
	public class NewsUpdate
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		public DateTime Date { get; set; }
	}
}
