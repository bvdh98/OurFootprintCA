import calendar
from calendar import monthrange


def get_monthly_entries(entries):
    months_dict = {}
    for entry in entries:
        months_arr = []

        start_month = entry.start_date.month
        start_year = entry.start_date.year
        start_month_year = (start_year * 12) + start_month  # for sorting
        end_month = entry.end_date.month
        end_year = entry.end_date.year
        end_month_year = (end_year * 12) + end_month  # for sorting

        for month_year_number in range(start_month_year, end_month_year):
            months_arr.append(Month(entry, month_year_number))
            month_year_number += 1

        for month in months_arr:
            if month.name in months_dict:
                months_dict[month.month_year] += month.consumption
            else:
                months_dict[month.month_year] = month.consumption

    return months_dict


class Month:
    def __init__(self, entry, month_year):
        start = entry.start_date
        end = entry.end_date
        days_in_entry = entry.num_days
        start_month_year = (start.year * 12) + start.month
        end_month_year = (end.year * 12) + end.month
        self.month = month_year % 12 + 1
        self.entry = entry
        self.month_year = month_year
        if month_year == start_month_year:
            weekday, days_in_month = monthrange(start.year, self.month)
            self.ratio = (days_in_month - start.day) / days_in_entry
        elif month_year == end_month_year:
            self.ratio = end.day / days_in_entry
        else:
            weekday, days_in_month = monthrange(end.year, self.month)
            self.ratio = weekday / days_in_entry

    @property
    def consumption(self):
        return self.ratio * self.entry.consumption

    @property
    def name(self):
        return calendar.month_name[self.month]
