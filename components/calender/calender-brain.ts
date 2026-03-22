import {eachDayOfInterval, endOfMonth, endOfWeek, startOfMonth, startOfWeek} from "date-fns";

//here I want to acknowlage a source I found on the net while looking for the best way to handle calender logic:
// https://dev.to/vivekalhat/building-a-calendar-component-with-tailwind-and-date-fns-2c0i

export const getCalenderDayes= (date:Date)=>{
    const startMonth=startOfMonth(date);
    const endMonth=endOfMonth(date);

    const startDate=startOfWeek(startMonth, {weekStartsOn: 1});
    const endDate=endOfWeek(endMonth, {weekStartsOn:1});

    return eachDayOfInterval({start:startDate,end:endDate})
}