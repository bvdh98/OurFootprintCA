import calendar
from calendar import monthrange


def get_monthly_entries(entries):
    months_dict = {}
    for entry in entries:
        months_arr = []

        start_mon = entry.start_date.month
        end_month = entry.end_date.month

        for i in range(start_mon, end_month):
            months_arr.append(Month(entry, i))
            i += 1

        for month in months_arr:
            if month.name in months_dict:
                months_dict[month.name] += month.consumption
            else:
                months_dict[month.name] = month.consumption

    return months_dict


class Month:
    def __init__(self, entry, month):
        start = entry.start_date
        end = entry.end_date
        days_in_entry = entry.num_days
        self.entry = entry
        self.month = month
        if month == start.month:
            weekday, days_in_month = monthrange(start.year, month)
            self.ratio = (days_in_month - start.day) / days_in_entry
        elif month == end.month:
            self.ratio = end.day / days_in_entry
        else:
            weekday, days_in_month = monthrange(end.year, month)
            self.ratio = weekday / days_in_entry

    @property
    def consumption(self):
        return self.ratio * self.entry.consumption

    @property
    def name(self):
        return calendar.month_name[self.month]
