package com.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.Period;
import java.util.Calendar;
import java.util.Date;

public class DateUtils {

	/**
	 * 将时间转换成字符串
	 * 
	 * @param date
	 *            时间
	 * @param pattern
	 *            传入要转换的格式 <br>
	 *            例如：yyyy-MM-dd HH:mm:ss:SSS<br>
	 * @return
	 */
	public static String dateToString(Date date, String pattern) {
		String flag = "";
		try {
			SimpleDateFormat sdf = new SimpleDateFormat(pattern);
			flag = sdf.format(date);
			if ("".equals(pattern)) {
				flag = "error";
			}
		} catch (Exception e) {
			flag = "error";
		}
		return flag;
	}

	/**
	 * 将字符串转换成时间
	 * 
	 * @param source
	 *            字符串
	 * @param pattern
	 *            传入当前字符的格式
	 * @return 发生错误时返回当前时间
	 */
	public static Date StringToDate(String source, String pattern) {
		Date date = null;
		try {
			SimpleDateFormat sdf = new SimpleDateFormat(pattern);
			date = sdf.parse(source);
		} catch (ParseException e) {
			date = new Date();
		}
		return date;
	}

	/**
	 * 将时间转换成时间戳
	 * 
	 * @param date
	 *            时间
	 * @return
	 */
	public static String dateToTime(Date date) {
		return date.getTime() + "";
	}

	/**
	 * 将时间戳转化成字符串
	 * 
	 * @param data
	 *            时间戳
	 * @param pattern
	 *            要转化成的格式
	 * @return
	 */
	public static String longToString(long data, String pattern) {
		String format = "";
		try {
			SimpleDateFormat sdf = new SimpleDateFormat(pattern);
			format = sdf.format(new Date(data));
		} catch (Exception e) {
			format = "error";
		}
		return format;
	}

	/**
	 * 将时间戳转化成时间
	 * 
	 * @param data
	 *            时间戳
	 * @return
	 */
	public static Date longToDate(long data) {
		Date date = null;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss:SSS");
		try {
			date = sdf.parse(sdf.format(new Date(data)));
		} catch (ParseException e) {
			date = new Date();
		}
		return date;
	}

	/**
	 * 获取日期年份
	 * 
	 * @param date
	 * @return
	 */
	public static Integer getYear(Date date) {
		Calendar c2 = Calendar.getInstance();
		c2.setTime(date);
		return c2.get(Calendar.YEAR);
	}

	/**
	 * 获取日期中的月份
	 * 
	 * @param date
	 * @return
	 */
	public static Integer getMonth(Date date) {
		Calendar c2 = Calendar.getInstance();
		c2.setTime(date);
		return c2.get(Calendar.MONTH);
	}

	/**
	 * 获取日期中的当月的天数
	 * 
	 * @param date
	 * @return
	 */
	public static Integer getDayOfMonth(Date date) {
		Calendar c2 = Calendar.getInstance();
		c2.setTime(date);
		return c2.get(Calendar.DAY_OF_MONTH);
	}

	/**
	 * 获取传入的时间是当年中的第几天
	 * 
	 * @param date
	 * @return
	 */
	public static Integer getDayOfYear(Date date) {
		Calendar c2 = Calendar.getInstance();
		c2.setTime(date);
		return c2.get(Calendar.DAY_OF_YEAR);
	}

	/**
	 * 获取传入的时间是周几
	 * 
	 * @param date
	 * @return
	 */
	public static Integer getDayOfWeek(Date date) {
		Calendar c2 = Calendar.getInstance();
		c2.setTime(date);
		Integer rs = c2.get(Calendar.DAY_OF_WEEK) - 1;
		return rs == 0 ? 7 : rs;
	}

	/**
	 * 获取传入的时间是当月内的第几个周
	 * 
	 * @param date
	 * @return
	 */
	public static Integer getWeekInMonth(Date date) {
		Calendar c2 = Calendar.getInstance();
		c2.setTime(date);
		return c2.get(Calendar.DAY_OF_WEEK_IN_MONTH);
	}

	/**
	 * 两个时间相差总秒数
	 * 
	 * @param l
	 * @return
	 */
	public static long getSeconds(long l) {
		l = l / 1000;
		return l;
	}

	/**
	 * 两个时间相差总分钟数
	 * 
	 * @param l
	 * @return
	 */
	public static long getMinutes(long l) {
		l = l / (1000 * 60);
		return l;
	}

	/**
	 * 两个时间相差总小时数
	 * 
	 * @param l
	 * @return
	 */
	public static long getHours(long l) {
		l = l / (60 * 60 * 1000);
		return l;
	}

	/**
	 * 两个时间相差总天数
	 * 
	 * @param l
	 * @return
	 */
	public static long getDay(long l) {
		l = l / (60 * 60 * 1000 * 24);
		return l;
	}

	/**
	 * 根据传入的时间计算时间差
	 * 
	 * @param minDate
	 *            时间
	 * @param maxDate
	 *            时间
	 * @param pattern
	 *            格式
	 * @return xx日xx时xx分xx秒
	 */
	public static String getSubDateTime(Date minDate, Date maxDate) {
		long l = maxDate.getTime() - minDate.getTime();
		long day = getDay(l);
		long hour = getHours(l) - day * 24;
		long min = getMinutes(l) - day * 24 * 60 - hour * 60;
		long s = getSeconds(l) - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60;
		return day + "天" + hour + "小时" + min + "分" + s + "秒";
	}

	/**
	 * 根据传入的时间计算时间差
	 * 
	 * @param minDate
	 * @param maxDate
	 * @return xx时xx分xx秒
	 */
	public static String getSubTime(Date minDate, Date maxDate) {
		long l = maxDate.getTime() - minDate.getTime();
		long hour = getHours(l);// 相差小时数
		long min = getMinutes(l) - hour * 60;// 相差分钟数
		long s = getSeconds(l) - hour * 60 * 60 - min * 60;
		String hourS = hour < 10 ? "0" + hour : hour + "";
		String minS = min < 10 ? "0" + min : min + "";
		String sS = s < 10 ? "0" + s : s + "";
		return hourS + "时" + minS + "分" + sS + "秒";
	}

	/**
	 * 根据传入的时间计算时间差
	 * 
	 * @param minDate
	 * @param maxDate
	 * @return xx年xx月xx日 xx时xx分xx秒
	 */
	public static String getDateTime(Date minDate, Date maxDate) {
		return getSubDate(minDate, maxDate) + " "
				+ getSubTime(minDate, maxDate);
	}

	/**
	 * 根据传入的时间计算时间差
	 * 
	 * @param minDate
	 *            时间
	 * @param maxDate
	 *            时间
	 * @param pattern
	 *            格式
	 * @return xx年xx月xx日
	 */
	public static String getSubDate(Date minDate, Date maxDate) {
		LocalDate min = LocalDate.of(getYear(minDate), getMonth(minDate),
				getDayOfMonth(minDate));
		LocalDate max = LocalDate.of(getYear(maxDate), getMonth(maxDate),
				getDayOfMonth(maxDate));
		Period p = Period.between(min, max);
		int year = p.getYears();
		int month = p.getMonths();
		int day = p.getDays();
		String yearS = year < 10 ? "0" + year : year + "";
		String monthS = month < 10 ? "0" + month : month + "";
		String dayS = day < 10 ? "0" + day : day + "";
		return yearS + "年" + monthS + "月" + dayS + "日";
	}

	/**
	 * 根据传入时间计算星期几 <br/>
	 * 
	 * 蔡勒公式W=[C/4]-2C+y+[y/4]+[26(m+1)/10]+d-1<br/>
	 * 
	 * W = 星期几,C = 公元年份前两个数,y = 公元年份后两个数,m = 月份,d = 日数,[] 指只截取该数整数部分
	 * 
	 * @param date
	 *            时间
	 * @return Integer
	 */
	public static Integer getWeek(Date date) {
		String str = dateToString(date, "yyyy-MM-dd");
		int C = Integer.valueOf(str.substring(0, 2));// 公元年份前两个数
		int y = Integer.valueOf(str.substring(2, 4));// 公元年份后两个数
		int m = Integer.valueOf(str.substring(5, 7));// 月份
		int d = Integer.valueOf(str.substring(8, 10));// 日数
		if (m == 1) {
			y = y - 1;
			m = 13;
		}
		if (m == 2) {
			y = y - 1;
			m = 14;
		}
		Integer W = C / 4 - 2 * C + y + y / 4 + 26 * (m + 1) / 10 + d - 1;
		return W % 7;
	}

	/**
	 * 根据时间计算星期几
	 * 
	 * @param date
	 *            时间
	 * @return String
	 */
	public static String getWeekStr(Date date) {
		String week = "没有算出来";
		switch (getWeek(date)) {
		case 1:
			week = "星期一";
			break;
		case 2:
			week = "星期二";
			break;
		case 3:
			week = "星期三";
			break;
		case 4:
			week = "星期四";
			break;
		case 5:
			week = "星期五";
			break;
		case 6:
			week = "星期六";
			break;
		case 7:
			week = "星期日";
			break;
		}
		return week;
	}

}
