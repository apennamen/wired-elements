export const getLocaleFromNavigator = function(n: any): string {
    if (n.hasOwnProperty('systemLanguage')) return n['systemLanguage'];
    else if (n.hasOwnProperty('browserLanguage')) return n['browserLanguage'];
    return (n.languages || ['en-US'])[0];
}

export const localizedMonths = function(locale :string = 'en-US', variant: string = 'long'): string[] {
    const d = new Date();
    const months = [];
    // Compute month header texts (like "January", "February", ...)
    d.setDate(1); // Set to first of the month to avoid cases like "February 30"
    for (let m = 0; m < 12; m++) {
      d.setMonth(m);
      months[m] = d.toLocaleString(locale, { month: variant }); 
    }
    return months;
}

export const localizedDays = function(locale :string = 'en-US', variant: string = 'short'): string[] {
    const d = new Date(0,0,0); // 31 Dec 1899 was a sunday
    const days = [];

    // Compute weekday header texts (like "Sun", "Mon", "Tue", ...)
    for (let i = 0; i < 7; i++) {
      days[i] = d.toLocaleString(locale, { weekday: variant });
      d.setDate(d.getDate() +1)
    }
    return days;
}